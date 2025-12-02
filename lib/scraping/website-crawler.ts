import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Core 30 Authority Pages - Essential pages every dental practice should have
 */
const CORE_30_PAGES = [
  // Services (15 pages)
  'dental-implants',
  'cosmetic-dentistry',
  'teeth-whitening',
  'veneers',
  'crowns',
  'bridges',
  'root-canal',
  'dentures',
  'invisalign',
  'orthodontics',
  'emergency-dentist',
  'sedation-dentistry',
  'gum-disease',
  'tooth-extraction',
  'dental-bonding',

  // About/Practice (8 pages)
  'about',
  'team',
  'meet-the-doctor',
  'office-tour',
  'technology',
  'reviews',
  'testimonials',
  'blog',

  // Patient Info (7 pages)
  'contact',
  'appointment',
  'financing',
  'insurance',
  'new-patients',
  'patient-forms',
  'faq'
];

export interface WebsiteCrawlResult {
  foundPages: number;
  totalPages: number;
  missingPages: string[];
  foundPagesList: string[];
  error?: string;
}

/**
 * Crawl a dental practice website to check for Core 30 authority pages
 */
export async function crawlWebsiteForCore30(websiteUrl: string): Promise<WebsiteCrawlResult> {
  if (!websiteUrl) {
    return {
      foundPages: 0,
      totalPages: CORE_30_PAGES.length,
      missingPages: CORE_30_PAGES,
      foundPagesList: [],
      error: 'No website URL provided'
    };
  }

  // Normalize URL
  let baseUrl = websiteUrl.toLowerCase();
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = 'https://' + baseUrl;
  }
  baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash

  const foundPages: string[] = [];
  const missingPages: string[] = [];

  console.log(`Crawling ${baseUrl} for Core 30 pages...`);

  // Check each page in parallel (but with rate limiting)
  const batchSize = 5; // Check 5 pages at a time to avoid overwhelming server
  for (let i = 0; i < CORE_30_PAGES.length; i += batchSize) {
    const batch = CORE_30_PAGES.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(page => checkPageExists(baseUrl, page))
    );

    results.forEach((exists, index) => {
      const pageName = batch[index];
      if (exists) {
        foundPages.push(pageName);
      } else {
        missingPages.push(pageName);
      }
    });

    // Small delay between batches to be respectful
    if (i + batchSize < CORE_30_PAGES.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  console.log(`Found ${foundPages.length}/${CORE_30_PAGES.length} Core 30 pages`);

  return {
    foundPages: foundPages.length,
    totalPages: CORE_30_PAGES.length,
    missingPages,
    foundPagesList: foundPages
  };
}

/**
 * Check if a specific page exists on the website
 */
async function checkPageExists(baseUrl: string, pagePath: string): Promise<boolean> {
  const urlVariations = [
    `${baseUrl}/${pagePath}`,
    `${baseUrl}/${pagePath}/`,
    `${baseUrl}/services/${pagePath}`,
    `${baseUrl}/services/${pagePath}/`,
    `${baseUrl}/${pagePath.replace(/-/g, '')}`,
    `${baseUrl}/${pagePath.replace(/-/g, '_')}`
  ];

  for (const url of urlVariations) {
    try {
      const response = await axios.head(url, {
        timeout: 5000,
        maxRedirects: 3,
        validateStatus: (status) => status < 400
      });

      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      // Try GET request if HEAD fails
      try {
        const response = await axios.get(url, {
          timeout: 5000,
          maxRedirects: 3,
          validateStatus: (status) => status < 400,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; DigitalAuthorityScanner/1.0)'
          }
        });

        if (response.status === 200) {
          return true;
        }
      } catch {
        // Page doesn't exist at this URL, try next variation
        continue;
      }
    }
  }

  return false;
}

/**
 * Alternative: Crawl sitemap.xml if available (faster)
 */
export async function checkSitemapForPages(websiteUrl: string): Promise<string[]> {
  let baseUrl = websiteUrl.toLowerCase();
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = 'https://' + baseUrl;
  }
  baseUrl = baseUrl.replace(/\/$/, '');

  const sitemapUrls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap_index.xml`,
    `${baseUrl}/sitemap-index.xml`
  ];

  for (const sitemapUrl of sitemapUrls) {
    try {
      const response = await axios.get(sitemapUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; DigitalAuthorityScanner/1.0)'
        }
      });

      const $ = cheerio.load(response.data, { xmlMode: true });
      const urls: string[] = [];

      $('url loc').each((_, elem) => {
        urls.push($(elem).text());
      });

      return urls;
    } catch {
      continue;
    }
  }

  return [];
}
