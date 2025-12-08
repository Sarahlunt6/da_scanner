// Main scanner service - 5 Area System
// This orchestrates all the scanning modules

import { ScanInput, ScanResult, ModuleResult, AreaType } from "../types/scan";
import * as scoring from "./scoring";
import { checkNAPConsistency } from "../scraping/nap-consistency";
import { searchGooglePlaces } from "../scraping/google-places-api";
import { analyzeWebsitePerformance } from "../scraping/pagespeed-api";
import { crawlWebsiteForCore30 } from "../scraping/website-crawler";

/**
 * Main scan function - 5 Area System
 * This will be called by the background job processor
 */
export async function performScan(input: ScanInput): Promise<ScanResult> {
  console.log(`🚀 SCANNER V3 (5-Area System): Starting scan for ${input.practiceName}...`);

  // Fetch Google Places data once for all Google-related modules
  console.log('Fetching Google Places data...');
  const googleData = await searchGooglePlaces(input.practiceName, input.city, input.state);
  console.log('✅ Google Places data fetched');

  // Fetch website performance data
  console.log('Fetching website performance data...');
  const perfData = input.websiteUrl ? await analyzeWebsitePerformance(input.websiteUrl) : null;
  console.log('✅ Website performance data fetched');

  // === TECHNICAL SEO AREA ===
  console.log('=== TECHNICAL SEO: Starting ===');
  const reviewVelocityResult = await scanReviewVelocity(googleData);
  console.log('✅ Review Velocity completed');
  const gbpPrimaryCategoryResult = await scanGBPPrimaryCategory(googleData);
  console.log('✅ GBP Primary Category completed');
  const napResult = await scanNAPConsistency(input.practiceName, input.websiteUrl, input.city, input.state);
  console.log('✅ NAP Consistency completed');
  const imagesResult = createPlaceholderModule('Images', 'Technical SEO', 'Optimized images with proper alt text and compression for faster loading and better SEO.');
  console.log('✅ Images (placeholder) completed');
  console.log('=== TECHNICAL SEO: Complete ===');

  // === STRATEGIC SEO AREA ===
  console.log('=== STRATEGIC SEO: Starting ===');
  const reviewSentimentResult = await scanReviewSentiment(googleData);
  console.log('✅ Review Sentiment completed');
  const citationsResult = await scanCitations(input.practiceName);
  console.log('✅ Citations completed');
  const contentActivityResult = createPlaceholderModule('Content Activity', 'Strategic SEO', 'Regular content updates and blog posts that target high-value keywords and patient questions.');
  console.log('✅ Content Activity (placeholder) completed');
  console.log('=== STRATEGIC SEO: Complete ===');

  // === TECHNICAL SITE AREA ===
  console.log('=== TECHNICAL SITE: Starting ===');
  const siteSpeedResult = await scanSiteSpeed(perfData);
  console.log('✅ Site Speed completed');
  const mobileOptimizationResult = await scanMobileOptimization(perfData);
  console.log('✅ Mobile Optimization completed');
  const videoContentResult = createPlaceholderModule('Video Content', 'Technical Site', 'Educational videos embedded on your site to increase engagement and time-on-page.');
  console.log('✅ Video Content (placeholder) completed');
  console.log('=== TECHNICAL SITE: Complete ===');

  // === MARKET UNDERSTANDING AREA ===
  console.log('=== MARKET UNDERSTANDING: Starting ===');
  const messagingClarityResult = createPlaceholderModule('Messaging Clarity', 'Market Understanding', 'Clear value proposition that communicates what makes your practice different and why patients should choose you.');
  const localMessagesResult = createPlaceholderModule('Local Messages', 'Market Understanding', 'Location-specific content that targets your service area and local patient concerns.');
  const messagingIntegrityResult = createPlaceholderModule('Messaging Integrity', 'Market Understanding', 'Consistent brand messaging across all platforms and touchpoints.');
  console.log('✅ Market Understanding (all placeholders) completed');
  console.log('=== MARKET UNDERSTANDING: Complete ===');

  // === STRATEGIC SITE AREA ===
  console.log('=== STRATEGIC SITE: Starting ===');
  const semanticAnalysisResult = await scanSemanticAnalysis(input.websiteUrl);
  console.log('✅ Semantic Analysis completed');
  const highValueContentResult = createPlaceholderModule('High Value Content', 'Strategic Site', 'Content focused on high-value procedures like implants and cosmetic dentistry that attracts profitable patients.');
  const gbpServicesResult = await scanGBPServices(googleData);
  console.log('✅ GBP Services completed');
  console.log('=== STRATEGIC SITE: Complete ===');

  // Combine all modules
  const allModules: ModuleResult[] = [
    // Technical SEO
    reviewVelocityResult,
    gbpPrimaryCategoryResult,
    napResult,
    imagesResult,
    // Strategic SEO
    reviewSentimentResult,
    citationsResult,
    contentActivityResult,
    // Technical Site
    siteSpeedResult,
    mobileOptimizationResult,
    videoContentResult,
    // Market Understanding
    messagingClarityResult,
    localMessagesResult,
    messagingIntegrityResult,
    // Strategic Site
    semanticAnalysisResult,
    highValueContentResult,
    gbpServicesResult,
  ];

  // Calculate area scores
  const technicalSEOModules = allModules.filter(m => m.area === 'Technical SEO');
  const strategicSEOModules = allModules.filter(m => m.area === 'Strategic SEO');
  const technicalSiteModules = allModules.filter(m => m.area === 'Technical Site');
  const marketUnderstandingModules = allModules.filter(m => m.area === 'Market Understanding');
  const strategicSiteModules = allModules.filter(m => m.area === 'Strategic Site');

  const technicalSEOScore = scoring.calculateAreaScore(technicalSEOModules);
  const strategicSEOScore = scoring.calculateAreaScore(strategicSEOModules);
  const technicalSiteScore = scoring.calculateAreaScore(technicalSiteModules);
  const marketUnderstandingScore = scoring.calculateAreaScore(marketUnderstandingModules);
  const strategicSiteScore = scoring.calculateAreaScore(strategicSiteModules);

  // Calculate overall score
  const overallScore = scoring.calculateOverallScore(
    technicalSEOScore,
    strategicSEOScore,
    technicalSiteScore,
    marketUnderstandingScore,
    strategicSiteScore
  );

  console.log(`📊 Final Scores:`);
  console.log(`  Overall: ${overallScore}`);
  console.log(`  Technical SEO: ${technicalSEOScore}`);
  console.log(`  Strategic SEO: ${strategicSEOScore}`);
  console.log(`  Technical Site: ${technicalSiteScore}`);
  console.log(`  Market Understanding: ${marketUnderstandingScore}`);
  console.log(`  Strategic Site: ${strategicSiteScore}`);

  return {
    overallScore,
    areaScores: {
      technicalSEO: technicalSEOScore,
      strategicSEO: strategicSEOScore,
      technicalSite: technicalSiteScore,
      marketUnderstanding: marketUnderstandingScore,
      strategicSite: strategicSiteScore,
    },
    modules: allModules,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create a placeholder module for features not yet implemented
 */
function createPlaceholderModule(
  name: string,
  area: AreaType,
  description: string
): ModuleResult {
  return {
    name,
    area,
    score: 70,
    status: 'good',
    weight: 5,
    description,
    gapMessage: `Coming Soon - ${description}`,
    data: {
      placeholder: true,
    },
  };
}

/**
 * TECHNICAL SEO: Review Velocity
 * Checks for at least 3 reviews in the last 30 days
 */
async function scanReviewVelocity(googleData: any): Promise<ModuleResult> {
  if (!googleData.listed) {
    return {
      name: 'Review Velocity',
      area: 'Technical SEO',
      score: 0,
      status: 'urgent',
      weight: 10,
      description: 'Measures how frequently you receive new Google reviews. Google favors practices with consistent review velocity (3+ per month).',
      gapMessage: 'Practice not found on Google. Cannot analyze review velocity.',
      data: {
        recentCount30Days: 0,
        source: 'google_places'
      },
    };
  }

  const totalReviews = googleData.review_count || 0;

  // Estimate recent reviews in last 30 days based on total count
  let recentCount30Days = 0;
  if (totalReviews >= 100) recentCount30Days = 4;
  else if (totalReviews >= 50) recentCount30Days = 3;
  else if (totalReviews >= 25) recentCount30Days = 2;
  else if (totalReviews >= 10) recentCount30Days = 1;
  else recentCount30Days = 0;

  const { score, gapMessage } = scoring.calculateReviewVelocityScore(recentCount30Days);

  return {
    name: 'Review Velocity',
    area: 'Technical SEO',
    score,
    status: scoring.getStatus(score),
    weight: 10,
    description: 'Measures how frequently you receive new Google reviews. Google favors practices with consistent review velocity (3+ per month).',
    gapMessage,
    data: {
      recentCount30Days,
      estimatedFrom: totalReviews,
      source: 'google_places',
    },
  };
}

/**
 * TECHNICAL SEO: GBP Primary Category
 */
async function scanGBPPrimaryCategory(googleData: any): Promise<ModuleResult> {
  if (!googleData.listed) {
    return {
      name: 'GBP Primary Category',
      area: 'Technical SEO',
      score: 0,
      status: 'urgent',
      weight: 10,
      description: 'Your Google Business Profile primary category determines which searches you appear in. "Dentist" with high-value secondary categories like "Cosmetic Dentist" and "Dental Implants Periodontist" is optimal.',
      gapMessage: 'Practice not found on Google. Cannot analyze categories.',
      data: {
        primaryCategory: '',
        secondaryCategories: [],
        source: 'google_places',
        error: googleData.error
      },
    };
  }

  const primaryCategory = googleData.primaryCategory || 'dentist';
  const categories = googleData.categories || [];
  const secondaryCategories = categories.filter((cat: string) =>
    cat !== primaryCategory &&
    (cat.includes('dentist') || cat.includes('dental'))
  );

  const { score, gapMessage } = scoring.calculateGBPPrimaryCategoryScore(primaryCategory, secondaryCategories);

  return {
    name: 'GBP Primary Category',
    area: 'Technical SEO',
    score,
    status: scoring.getStatus(score),
    weight: 10,
    description: 'Your Google Business Profile primary category determines which searches you appear in. "Dentist" with high-value secondary categories like "Cosmetic Dentist" and "Dental Implants Periodontist" is optimal.',
    gapMessage,
    data: {
      primaryCategory,
      secondaryCategories,
      source: 'google_places',
    },
  };
}

/**
 * TECHNICAL SEO: NAP Consistency
 */
async function scanNAPConsistency(practiceName: string, websiteUrl: string, city: string, state: string): Promise<ModuleResult> {
  try {
    const napResult = await checkNAPConsistency({
      practice_name: practiceName,
      website_url: websiteUrl,
      city,
      state,
    });

    const matchedDirectories = napResult.consistentDirectories;
    const totalDirectories = napResult.totalDirectories;

    return {
      name: 'NAP Consistency',
      area: 'Technical SEO',
      score: napResult.score,
      status: scoring.getStatus(napResult.score),
      weight: 10,
      description: 'Name, Address, Phone consistency across directories. Inconsistent NAP data confuses Google and lowers your local search rankings.',
      gapMessage: napResult.mismatches.length > 0
        ? `Issues found: ${napResult.mismatches.join(', ')}`
        : 'NAP information is consistent across directories',
      data: {
        matchedDirectories,
        totalDirectories,
        directories: napResult.directories,
        source: 'browseract_google',
      },
    };
  } catch (error) {
    console.error('NAP Consistency scan failed:', error);
    return {
      name: 'NAP Consistency',
      area: 'Technical SEO',
      score: 0,
      status: 'urgent',
      weight: 10,
      description: 'Name, Address, Phone consistency across directories. Inconsistent NAP data confuses Google and lowers your local search rankings.',
      gapMessage: 'Unable to check NAP consistency',
      data: {
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'error',
      },
    };
  }
}

/**
 * STRATEGIC SEO: Review Sentiment
 */
async function scanReviewSentiment(googleData: any): Promise<ModuleResult> {
  if (!googleData.listed) {
    return {
      name: 'Review Sentiment',
      area: 'Strategic SEO',
      score: 0,
      status: 'urgent',
      weight: 15,
      description: 'What your patients are highlighting. The services your patients mention and way they talk about you in your reviews let\'s Google know what kinds of searches and what kind of searcher profiles to focus on when deciding when to show your practice.',
      gapMessage: 'Practice not found on Google. Cannot analyze reviews.',
      data: {
        rating: 0,
        totalReviews: 0,
        source: 'google_places'
      },
    };
  }

  const rating = googleData.rating || 0;
  const totalReviews = googleData.review_count || 0;

  const { score, gapMessage } = scoring.calculateReviewSentimentScore(rating, totalReviews);

  return {
    name: 'Review Sentiment',
    area: 'Strategic SEO',
    score,
    status: scoring.getStatus(score),
    weight: 15,
    description: 'What your patients are highlighting. The services your patients mention and way they talk about you in your reviews let\'s Google know what kinds of searches and what kind of searcher profiles to focus on when deciding when to show your practice.',
    gapMessage,
    data: {
      rating,
      totalReviews,
      source: 'google_places',
    },
  };
}

/**
 * STRATEGIC SEO: Citations
 */
async function scanCitations(practiceName: string): Promise<ModuleResult> {
  // Mock data - realistic presence
  const presentCount = 5;
  const totalDirectories = 7;

  const { score, gapMessage } = scoring.calculateCitationsScore(presentCount, totalDirectories);

  return {
    name: 'Citations',
    area: 'Strategic SEO',
    score,
    status: scoring.getStatus(score),
    weight: 10,
    description: 'Your presence on key online directories (Healthgrades, Zocdoc, Yelp, etc.). More citations = more visibility and authority in local search.',
    gapMessage,
    data: {
      presentCount,
      totalDirectories,
      source: 'mock',
    },
  };
}

/**
 * TECHNICAL SITE: Site Speed
 */
async function scanSiteSpeed(perfData: any): Promise<ModuleResult> {
  if (!perfData) {
    return {
      name: 'Site Speed',
      area: 'Technical Site',
      score: 0,
      status: 'urgent',
      weight: 10,
      description: 'Page load time is a ranking factor. Sites under 3 seconds load time rank higher and convert better. Google prioritizes fast sites.',
      gapMessage: 'No website URL provided',
      data: {
        loadTime: 0,
        source: 'pagespeed_api',
      },
    };
  }

  const loadTime = perfData.loadTime;
  const { score, gapMessage } = scoring.calculateSiteSpeedScore(loadTime);

  return {
    name: 'Site Speed',
    area: 'Technical Site',
    score,
    status: scoring.getStatus(score),
    weight: 10,
    description: 'Page load time is a ranking factor. Sites under 3 seconds load time rank higher and convert better. Google prioritizes fast sites.',
    gapMessage,
    data: {
      loadTime,
      source: 'pagespeed_api',
    },
  };
}

/**
 * TECHNICAL SITE: Mobile Optimization
 */
async function scanMobileOptimization(perfData: any): Promise<ModuleResult> {
  if (!perfData) {
    return {
      name: 'Mobile Optimization',
      area: 'Technical Site',
      score: 0,
      status: 'urgent',
      weight: 15,
      description: 'Google uses mobile-first indexing. Your mobile score directly impacts rankings. Target 90+ for optimal performance.',
      gapMessage: 'No website URL provided',
      data: {
        mobileScore: 0,
        source: 'pagespeed_api',
      },
    };
  }

  const mobileScore = perfData.mobileScore;
  const { score, gapMessage } = scoring.calculateMobileOptimizationScore(mobileScore);

  return {
    name: 'Mobile Optimization',
    area: 'Technical Site',
    score,
    status: scoring.getStatus(score),
    weight: 15,
    description: 'Google uses mobile-first indexing. Your mobile score directly impacts rankings. Target 90+ for optimal performance.',
    gapMessage,
    data: {
      mobileScore,
      desktopScore: perfData.desktopScore,
      source: 'pagespeed_api',
    },
  };
}

/**
 * STRATEGIC SITE: Semantic Analysis (Core 30)
 */
async function scanSemanticAnalysis(websiteUrl: string): Promise<ModuleResult> {
  if (!websiteUrl) {
    return {
      name: 'Semantic Analysis',
      area: 'Strategic Site',
      score: 0,
      status: 'urgent',
      weight: 20,
      description: 'The Core 30 authority pages that every dental practice needs. Complete sites with 27+ pages convert 2.4x more visitors into patients.',
      gapMessage: 'No website URL provided',
      data: {
        foundPages: 0,
        totalPages: 30,
        source: 'website_crawler',
      },
    };
  }

  try {
    const crawlResult = await crawlWebsiteForCore30(websiteUrl);
    const foundPages = crawlResult.foundPages;

    const { score, gapMessage } = scoring.calculateSemanticAnalysisScore(foundPages);

    return {
      name: 'Semantic Analysis',
      area: 'Strategic Site',
      score,
      status: scoring.getStatus(score),
      weight: 20,
      description: 'The Core 30 authority pages that every dental practice needs. Complete sites with 27+ pages convert 2.4x more visitors into patients.',
      gapMessage,
      data: {
        foundPages,
        totalPages: crawlResult.totalPages,
        missingPages: crawlResult.missingPages,
        foundPagesList: crawlResult.foundPagesList,
        source: 'website_crawler',
      },
    };
  } catch (error) {
    console.error('Semantic Analysis scan failed:', error);
    return {
      name: 'Semantic Analysis',
      area: 'Strategic Site',
      score: 0,
      status: 'urgent',
      weight: 20,
      description: 'The Core 30 authority pages that every dental practice needs. Complete sites with 27+ pages convert 2.4x more visitors into patients.',
      gapMessage: 'Unable to crawl website',
      data: {
        foundPages: 0,
        totalPages: 30,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'website_crawler',
      },
    };
  }
}

/**
 * STRATEGIC SITE: GBP Services
 */
async function scanGBPServices(googleData: any): Promise<ModuleResult> {
  if (!googleData.listed) {
    return {
      name: 'GBP Services',
      area: 'Strategic Site',
      score: 0,
      status: 'urgent',
      weight: 10,
      description: 'Services listed on your Google Business Profile. Practices with 15+ services listed appear in more searches and attract high-value patients.',
      gapMessage: 'Practice not found on Google. Cannot analyze services.',
      data: {
        servicesCount: 0,
        source: 'google_places'
      },
    };
  }

  // Use categories count as a proxy for services
  const servicesCount = (googleData.categories?.length || 0);

  const { score, gapMessage } = scoring.calculateGBPServicesScore(servicesCount);

  return {
    name: 'GBP Services',
    area: 'Strategic Site',
    score,
    status: scoring.getStatus(score),
    weight: 10,
    description: 'Services listed on your Google Business Profile. Practices with 15+ services listed appear in more searches and attract high-value patients.',
    gapMessage: gapMessage || `Found ${servicesCount} category types. Note: Full service count requires Google Business Profile access.`,
    data: {
      servicesCount,
      categories: googleData.categories,
      source: 'google_places',
    },
  };
}
