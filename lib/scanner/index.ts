// Main scanner service
// This orchestrates all the scanning modules

import { ScanInput, ScanResult, ModuleResult } from "../types/scan";
import * as scoring from "./scoring";
import { checkNAPConsistency } from "../scraping/nap-consistency";

/**
 * Main scan function
 * This will be called by the background job processor
 */
export async function performScan(input: ScanInput): Promise<ScanResult> {
  console.log(`Starting scan for ${input.practiceName}...`);

  // Phase 1 Modules
  const profitZoneResult = await scanProfitZone(input.websiteUrl);
  const productShelfResult = await scanProductShelf(input.websiteUrl);
  const reviewHealthResult = await scanReviewHealth(input.websiteUrl);
  const reviewVelocityResult = await scanReviewVelocity(input.websiteUrl);
  const napResult = await scanNAPConsistencyModule(input.practiceName, input.websiteUrl, input.city, input.state);

  // Phase 2 Modules
  const core30Result = await scanCore30(input.websiteUrl);
  const technicalResult = await scanTechnicalTrust(input.websiteUrl);

  // Phase 3 Modules
  const directoryResult = await scanDirectoryDominance(input.practiceName);

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
 * Module 1.1: Profit Zone (GBP Categories)
 * TODO: Integrate with Google Places API
 */
async function scanProfitZone(websiteUrl: string): Promise<ModuleResult> {
  // Mock data - Replace with actual Google Places API call
  const primaryCategory = 'Dentist';
  const secondaryCategories = ['Cosmetic Dentist']; // Example: missing implants category

  const { score, gapMessage } = scoring.calculateProfitZoneScore(primaryCategory, secondaryCategories);

  return {
    name: 'Profit Zone',
    phase: 1,
    score,
    status: scoring.getStatus(score),
    weight: 10,
    gapMessage,
    data: {
      primaryCategory,
      secondaryCategories,
      source: 'mock', // Will be 'google_places' when integrated
    },
  };
}

/**
 * Module 1.2: Product Shelf (GBP Services)
 * TODO: Integrate with Google Places API
 */
async function scanProductShelf(websiteUrl: string): Promise<ModuleResult> {
  // Mock data
  const servicesCount = 8; // Example: needs more services

  const { score, gapMessage } = scoring.calculateProductShelfScore(servicesCount);

  return {
    name: 'Product Shelf',
    phase: 1,
    score,
    status: scoring.getStatus(score),
    weight: 10,
    gapMessage,
    data: {
      servicesCount,
      source: 'mock',
    },
  };
}

/**
 * Module 1.3a: Review Health
 * TODO: Integrate with Google Places API
 */
async function scanReviewHealth(websiteUrl: string): Promise<ModuleResult> {
  // Mock data
  const rating = 4.6;
  const totalReviews = 45;

  const { score, gapMessage } = scoring.calculateReviewHealthScore(rating, totalReviews);

  return {
    name: 'Review Boost',
    phase: 1,
    score,
    status: scoring.getStatus(score),
    weight: 15,
    gapMessage,
    data: {
      rating,
      totalReviews,
      source: 'mock',
    },
  };
}

/**
 * Module 1.3b: Review Velocity
 * TODO: Integrate with Google Places API
 */
async function scanReviewVelocity(websiteUrl: string): Promise<ModuleResult> {
  // Mock data
  const recentCount90Days = 2; // Example: sporadic reviews

  const { score, gapMessage } = scoring.calculateReviewVelocityScore(recentCount90Days);

  return {
    name: 'Review Velocity',
    phase: 1,
    score,
    status: scoring.getStatus(score),
    weight: 5,
    gapMessage,
    data: {
      recentCount90Days,
      source: 'mock',
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
 * TODO: Implement website crawler
 */
async function scanCore30(websiteUrl: string): Promise<ModuleResult> {
  // Mock data
  const foundPages = 18;

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
      totalPages: 30,
      source: 'mock',
    },
  };
}

/**
 * Module 2.2: Technical Trust Signals
 * TODO: Integrate with Google PageSpeed API and SSL checker
 */
async function scanTechnicalTrust(websiteUrl: string): Promise<ModuleResult> {
  // Mock data
  const hasSSL = true;
  const mobileScore = 75;
  const loadTime = 4.2;
  const hasSchema = false;

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
      loadTime,
      hasSchema,
      source: 'mock',
    },
  };
}

/**
 * Module 3.1: Directory Dominance
 * TODO: Integrate with directory APIs and web scraping
 */
async function scanDirectoryDominance(practiceName: string): Promise<ModuleResult> {
  // Mock data
  const presentCount = 4;
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
