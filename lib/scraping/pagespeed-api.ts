import axios from 'axios';

const PAGESPEED_API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;

export interface PageSpeedResult {
  hasSSL: boolean;
  mobileScore: number;
  desktopScore: number;
  loadTime: number;
  hasSchema: boolean;
  error?: string;
}

/**
 * Analyze website technical performance using Google PageSpeed Insights API
 */
export async function analyzeWebsitePerformance(websiteUrl: string): Promise<PageSpeedResult> {
  if (!websiteUrl) {
    return {
      hasSSL: false,
      mobileScore: 0,
      desktopScore: 0,
      loadTime: 0,
      hasSchema: false,
      error: 'No website URL provided'
    };
  }

  // Check SSL
  const hasSSL = websiteUrl.toLowerCase().startsWith('https://');

  // If no API key, return basic SSL check only
  if (!PAGESPEED_API_KEY) {
    console.warn('GOOGLE_PAGESPEED_API_KEY not configured - using basic checks only');
    return {
      hasSSL,
      mobileScore: 0,
      desktopScore: 0,
      loadTime: 0,
      hasSchema: false,
      error: 'PageSpeed API key not configured'
    };
  }

  try {
    // Run mobile and desktop tests in parallel
    const [mobileResult, desktopResult] = await Promise.all([
      fetchPageSpeedData(websiteUrl, 'mobile'),
      fetchPageSpeedData(websiteUrl, 'desktop')
    ]);

    // Extract mobile metrics
    const mobileScore = Math.round((mobileResult.lighthouseResult?.categories?.performance?.score || 0) * 100);
    const loadTime = mobileResult.lighthouseResult?.audits?.['speed-index']?.numericValue || 0;
    const loadTimeSeconds = loadTime / 1000;

    // Extract desktop metrics
    const desktopScore = Math.round((desktopResult.lighthouseResult?.categories?.performance?.score || 0) * 100);

    // Check for schema markup
    const hasSchema = checkForSchema(mobileResult);

    return {
      hasSSL,
      mobileScore,
      desktopScore,
      loadTime: loadTimeSeconds,
      hasSchema
    };

  } catch (error: any) {
    console.error('PageSpeed API error:', error.message);
    return {
      hasSSL,
      mobileScore: 0,
      desktopScore: 0,
      loadTime: 0,
      hasSchema: false,
      error: error.message
    };
  }
}

/**
 * Fetch PageSpeed data for a specific strategy (mobile/desktop)
 */
async function fetchPageSpeedData(url: string, strategy: 'mobile' | 'desktop'): Promise<any> {
  const response = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
    params: {
      url: url,
      key: PAGESPEED_API_KEY,
      strategy: strategy,
      category: 'performance'
    },
    timeout: 60000 // 60 second timeout
  });

  return response.data;
}

/**
 * Check if website has schema markup
 */
function checkForSchema(pageSpeedData: any): boolean {
  try {
    const structuredData = pageSpeedData.lighthouseResult?.audits?.['structured-data'];
    if (structuredData) {
      return structuredData.score === 1 || structuredData.details?.items?.length > 0;
    }
    return false;
  } catch {
    return false;
  }
}
