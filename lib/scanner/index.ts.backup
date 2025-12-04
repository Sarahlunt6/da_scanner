// Main scanner service
// This orchestrates all the scanning modules

import { ScanInput, ScanResult, ModuleResult } from "../types/scan";
import * as scoring from "./scoring";
import { checkNAPConsistency } from "../scraping/nap-consistency";
import { searchGooglePlaces } from "../scraping/google-places-api";
import { analyzeWebsitePerformance } from "../scraping/pagespeed-api";
import { crawlWebsiteForCore30 } from "../scraping/website-crawler";

/**
 * Main scan function
 * This will be called by the background job processor
 */
export async function performScan(input: ScanInput): Promise<ScanResult> {
  console.log(`🚀 SCANNER V2: Starting scan for ${input.practiceName}...`);

  // Fetch Google Places data once for all Phase 1 modules
  console.log('Fetching Google Places data...');
  const googleData = await searchGooglePlaces(input.practiceName, input.city, input.state);
  console.log('✅ Google Places data fetched');

  // Phase 1 Modules
  console.log('=== PHASE 1: Starting ===');
  const profitZoneResult = await scanProfitZone(googleData);
  console.log('✅ Profit Zone completed');
  const productShelfResult = await scanProductShelf(googleData);
  console.log('✅ Product Shelf completed');
  const reviewHealthResult = await scanReviewHealth(googleData);
  console.log('✅ Review Health completed');
  const reviewVelocityResult = await scanReviewVelocity(googleData);
  console.log('✅ Review Velocity completed');
  const napResult = await scanNAPConsistencyModule(input.practiceName, input.websiteUrl, input.city, input.state);
  console.log('✅ NAP Consistency completed');
  console.log('=== PHASE 1: Complete ===');

  // Phase 2 Modules
  console.log('=== PHASE 2: Starting ===');
  console.log('Running Core 30 scan...');
  const core30Result = await scanCore30(input.websiteUrl);
  console.log('✅ Core 30 completed, score:', core30Result.score);
  console.log('Running Technical Trust scan...');
  const technicalResult = await scanTechnicalTrust(input.websiteUrl);
  console.log('✅ Technical Trust completed, score:', technicalResult.score);
  console.log('=== PHASE 2: Complete ===');

  // Phase 3 Modules
  console.log('=== PHASE 3: Starting ===');
  const directoryResult = await scanDirectoryDominance(input.practiceName);
  console.log('✅ Directory Dominance completed, score:', directoryResult.score);
  console.log('=== PHASE 3: Complete ===');

  // Combine all modules
  const allModules: ModuleResult[] = [
    profitZoneResult,
    productShelfResult,
    reviewHealthResult,
    reviewVelocityResult,
    napResult,
    core30Result,
    technicalResult,
    directoryResult,
  ];

  // Calculate phase scores
  const phase1Modules = allModules.filter(m => m.phase === 1);
  const phase2Modules = allModules.filter(m => m.phase === 2);
  const phase3Modules = allModules.filter(m => m.phase === 3);

  const phase1Score = scoring.calculatePhaseScore(phase1Modules);
  const phase2Score = scoring.calculatePhaseScore(phase2Modules);
  const phase3Score = scoring.calculatePhaseScore(phase3Modules);

  // Calculate overall score
  const overallScore = scoring.calculateOverallScore(phase1Score, phase2Score, phase3Score);

  return {
    overallScore,
    phase1Score,
    phase2Score,
    phase3Score,
    modules: allModules,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Module 1.1: Business Categories (GBP Categories)
 */
async function scanProfitZone(googleData: any): Promise<ModuleResult> {
  if (!googleData.listed) {
    return {
      name: 'Business Categories',
      phase: 1,
      score: 0,
      status: 'urgent',
      weight: 10,
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

  // Extract meaningful secondary categories from types array
  const secondaryCategories = categories.filter((cat: string) =>
    cat !== primaryCategory &&
    (cat.includes('dentist') || cat.includes('dental'))
  );

  const { score, gapMessage } = scoring.calculateProfitZoneScore(primaryCategory, secondaryCategories);

  return {
    name: 'Business Categories',
    phase: 1,
    score,
    status: scoring.getStatus(score),
    weight: 10,
    gapMessage,
    data: {
      primaryCategory,
      secondaryCategories,
      source: 'google_places',
    },
  };
}

/**
 * Module 1.2: Business Services (GBP Services)
 * Note: Google Places API doesn't return services list, so we use category count as proxy
 */
async function scanProductShelf(googleData: any): Promise<ModuleResult> {
  if (!googleData.listed) {
    return {
      name: 'Business Services',
      phase: 1,
      score: 0,
      status: 'urgent',
      weight: 10,
      gapMessage: 'Practice not found on Google. Cannot analyze services.',
      data: {
        servicesCount: 0,
        source: 'google_places'
      },
    };
  }

  // Use categories count as a proxy for services (limited by API)
  // Most practices with good service listings will have 10+ total categories
  const servicesCount = (googleData.categories?.length || 0);

  const { score, gapMessage } = scoring.calculateProductShelfScore(servicesCount);

  return {
    name: 'Business Services',
    phase: 1,
    score,
    status: scoring.getStatus(score),
    weight: 10,
    gapMessage: gapMessage || `Found ${servicesCount} category types. Note: Full service count requires Google Business Profile access.`,
    data: {
      servicesCount,
      categories: googleData.categories,
      source: 'google_places',
    },
  };
}

/**
 * Module 1.3a: Review Health
 */
async function scanReviewHealth(googleData: any): Promise<ModuleResult> {
  if (!googleData.listed) {
    return {
      name: 'Review Boost',
      phase: 1,
      score: 0,
      status: 'urgent',
      weight: 15,
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

  const { score, gapMessage } = scoring.calculateReviewHealthScore(rating, totalReviews);

  // Build descriptive gap message
  const description = `Your overall Google review rating (${rating} stars) and total review count (${totalReviews} reviews). This is your trust score.`;
  const fullGapMessage = gapMessage ? `${description} ${gapMessage}` : description;

  return {
    name: 'Review Boost',
    phase: 1,
    score,
    status: scoring.getStatus(score),
    weight: 15,
    gapMessage: fullGapMessage,
    data: {
      rating,
      totalReviews,
      source: 'google_places',
    },
  };
}

/**
 * Module 1.3b: Review Velocity
 * Checks for at least 3 reviews in the last 30 days
 * Note: Google Places API doesn't provide review dates, estimate based on total count
 */
async function scanReviewVelocity(googleData: any): Promise<ModuleResult> {
  if (!googleData.listed) {
    return {
      name: 'Review Velocity',
      phase: 1,
      score: 0,
      status: 'urgent',
      weight: 5,
      gapMessage: 'Practice not found on Google. Cannot analyze review velocity.',
      data: {
        recentCount30Days: 0,
        source: 'google_places'
      },
    };
  }

  const totalReviews = googleData.review_count || 0;

  // Estimate recent reviews in last 30 days based on total count
  // This is a rough estimate since API doesn't provide review dates
  // Practices with good velocity should have 3+ reviews per month
  let recentCount30Days = 0;
  if (totalReviews >= 100) recentCount30Days = 4; // Very active practice
  else if (totalReviews >= 50) recentCount30Days = 3; // Active practice
  else if (totalReviews >= 25) recentCount30Days = 2; // Moderate activity
  else if (totalReviews >= 10) recentCount30Days = 1; // Low activity
  else recentCount30Days = 0; // Inactive

  const { score, gapMessage } = scoring.calculateReviewVelocityScore(recentCount30Days);

  // Build descriptive gap message
  const fullGapMessage = score === 100
    ? gapMessage
    : `Checking for 3+ recent reviews in the last 30 days. ${gapMessage}`;

  return {
    name: 'Review Velocity',
    phase: 1,
    score,
    status: scoring.getStatus(score),
    weight: 5,
    gapMessage: fullGapMessage,
    data: {
      recentCount30Days,
      estimatedFrom: totalReviews,
      source: 'google_places',
    },
  };
}

/**
 * Module 1.4: NAP Consistency
 * Uses BrowserAct workflows and Google Places API
 */
async function scanNAPConsistencyModule(practiceName: string, websiteUrl: string, city: string, state: string): Promise<ModuleResult> {
  try {
    const napResult = await checkNAPConsistency({
      practice_name: practiceName,
      website_url: websiteUrl,
      city,
      state,
    });

    const matchedDirectories = napResult.consistentDirectories;
    const totalDirectories = napResult.totalDirectories;

    const { score, gapMessage } = scoring.calculateNAPScore(matchedDirectories, totalDirectories);

    return {
      name: 'NAP Consistency',
      phase: 1,
      score: napResult.score, // Use the score from NAP checker
      status: scoring.getStatus(napResult.score),
      weight: 10,
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
      phase: 1,
      score: 0,
      status: 'urgent',
      weight: 10,
      gapMessage: 'Unable to check NAP consistency',
      data: {
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'error',
      },
    };
  }
}

/**
 * Module 2.1: Core 30 Authority Pages
 */
async function scanCore30(websiteUrl: string): Promise<ModuleResult> {
  if (!websiteUrl) {
    return {
      name: 'Core 30 Authority Asset',
      phase: 2,
      score: 0,
      status: 'urgent',
      weight: 20,
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

    const { score, gapMessage } = scoring.calculateCore30Score(foundPages);

    return {
      name: 'Core 30 Authority Asset',
      phase: 2,
      score,
      status: scoring.getStatus(score),
      weight: 20,
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
    console.error('Core 30 scan failed:', error);
    return {
      name: 'Core 30 Authority Asset',
      phase: 2,
      score: 0,
      status: 'urgent',
      weight: 20,
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
 * Module 2.2: Technical Trust Signals
 */
async function scanTechnicalTrust(websiteUrl: string): Promise<ModuleResult> {
  if (!websiteUrl) {
    return {
      name: 'Technical Trust Signals',
      phase: 2,
      score: 0,
      status: 'urgent',
      weight: 15,
      gapMessage: 'No website URL provided',
      data: {
        hasSSL: false,
        mobileScore: 0,
        loadTime: 0,
        hasSchema: false,
        source: 'pagespeed_api',
      },
    };
  }

  try {
    const perfResult = await analyzeWebsitePerformance(websiteUrl);

    const hasSSL = perfResult.hasSSL;
    const mobileScore = perfResult.mobileScore;
    const loadTime = perfResult.loadTime;
    const hasSchema = perfResult.hasSchema;

    const { score, gapMessage } = scoring.calculateTechnicalTrustScore(hasSSL, mobileScore, loadTime, hasSchema);

    return {
      name: 'Technical Trust Signals',
      phase: 2,
      score,
      status: scoring.getStatus(score),
      weight: 15,
      gapMessage,
      data: {
        hasSSL,
        mobileScore,
        desktopScore: perfResult.desktopScore,
        loadTime,
        hasSchema,
        source: 'pagespeed_api',
      },
    };
  } catch (error) {
    console.error('Technical Trust scan failed:', error);
    return {
      name: 'Technical Trust Signals',
      phase: 2,
      score: 0,
      status: 'urgent',
      weight: 15,
      gapMessage: 'Unable to analyze website performance',
      data: {
        hasSSL: false,
        mobileScore: 0,
        loadTime: 0,
        hasSchema: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: 'pagespeed_api',
      },
    };
  }
}

/**
 * Module 3.1: Directory Dominance
 * TODO: Integrate with directory APIs and web scraping
 */
async function scanDirectoryDominance(practiceName: string): Promise<ModuleResult> {
  // Mock data - realistic presence
  const presentCount = 5;
  const totalDirectories = 7;

  const { score, gapMessage } = scoring.calculateDirectoryScore(presentCount, totalDirectories);

  return {
    name: 'Directory Dominance',
    phase: 3,
    score,
    status: scoring.getStatus(score),
    weight: 10,
    gapMessage,
    data: {
      presentCount,
      totalDirectories,
      source: 'mock',
    },
  };
}
