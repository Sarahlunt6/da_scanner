// Scoring calculation engine for 5-area system

import { ModuleResult } from "../types/scan";

/**
 * Normalize score to be between 50-89
 * This ensures all scores fall within the target range
 */
export function normalizeScore(rawScore: number): number {
  // Cap minimum at 50, maximum at 89
  return Math.min(89, Math.max(50, Math.round(rawScore)));
}

/**
 * Calculate area score from module results
 * Uses weighted average of all modules in the area
 */
export function calculateAreaScore(modules: ModuleResult[]): number {
  if (modules.length === 0) return 50; // Default to minimum if no modules

  const totalWeight = modules.reduce((sum, m) => sum + m.weight, 0);
  const weightedScore = modules.reduce((sum, m) => sum + m.score * m.weight, 0);

  const rawScore = Math.round(weightedScore / totalWeight);
  return normalizeScore(rawScore);
}

/**
 * Calculate overall Digital Authority Score from 5 area scores
 * Equal weighting across all 5 areas (20% each)
 */
export function calculateOverallScore(
  technicalSEO: number,
  strategicSEO: number,
  technicalSite: number,
  marketUnderstanding: number,
  strategicSite: number
): number {
  const rawScore = Math.round(
    (technicalSEO + strategicSEO + technicalSite + marketUnderstanding + strategicSite) / 5
  );
  return normalizeScore(rawScore);
}

/**
 * Determine status based on score
 * Updated for new scoring ranges (50-89)
 */
export function getStatus(score: number): 'excellent' | 'good' | 'needs_work' | 'urgent' {
  if (score >= 90) return 'excellent'; // Should never happen with normalization
  if (score >= 70) return 'good'; // Above Average
  if (score >= 50) return 'needs_work'; // Average
  return 'urgent'; // Should never happen with normalization
}

/**
 * Calculate GBP Primary Category score
 */
export function calculateGBPPrimaryCategoryScore(
  primaryCategory: string,
  secondaryCategories: string[]
): { score: number; gapMessage: string } {
  const hasCosmetic = secondaryCategories.includes('Cosmetic Dentist');
  const hasImplants = secondaryCategories.includes('Dental Implants Periodontist');
  const isDentistPrimary = primaryCategory === 'Dentist';

  let score = 0;
  let gapMessage = '';

  if (!isDentistPrimary) {
    score = 25;
    gapMessage = 'Your primary category should be "Dentist" for optimal visibility.';
  } else if (hasCosmetic && hasImplants && secondaryCategories.length >= 3) {
    score = 100;
    gapMessage = '';
  } else if (secondaryCategories.length >= 1 && secondaryCategories.length <= 2) {
    score = 75;
    gapMessage = `You're only listed as 'Dentist' with ${secondaryCategories.length} categories—missing key high-value categories like 'Cosmetic Dentist' and 'Dental Implants Periodontist'.`;
  } else if (secondaryCategories.length === 0) {
    score = 50;
    gapMessage = "You're only listed as 'Dentist'—missing 'Cosmetic Dentist' and 'Dental Implants Periodontist' categories that high-value patients search for.";
  }

  return { score, gapMessage };
}

/**
 * Calculate GBP Services score
 */
export function calculateGBPServicesScore(servicesCount: number): { score: number; gapMessage: string } {
  let score = 0;
  let gapMessage = '';

  if (servicesCount >= 15) {
    score = 100;
    gapMessage = '';
  } else if (servicesCount >= 10) {
    score = 75;
    gapMessage = `You have ${servicesCount} services listed. Adding ${20 - servicesCount} more high-value services could improve visibility.`;
  } else if (servicesCount >= 5) {
    score = 50;
    gapMessage = `You're missing ${15 - servicesCount} critical services. Google is 60% less likely to show your practice for 'dental implants near me' searches.`;
  } else {
    score = 25;
    gapMessage = `Only ${servicesCount} services listed. You're missing major opportunities to appear in high-value searches.`;
  }

  return { score, gapMessage };
}

/**
 * Calculate Review Sentiment score
 */
export function calculateReviewSentimentScore(
  rating: number,
  totalReviews: number
): { score: number; gapMessage: string } {
  let score = 0;
  let gapMessage = '';

  if (rating >= 4.8 && totalReviews >= 100) {
    score = 100;
    gapMessage = '';
  } else if (rating >= 4.5 && totalReviews >= 50) {
    score = 75;
    gapMessage = 'Good review foundation. Aim for 100+ reviews with 4.8+ stars for top rankings.';
  } else if (rating >= 4.0 && totalReviews >= 25) {
    score = 50;
    gapMessage = `With ${totalReviews} reviews at ${rating} stars, you're falling behind top practices. Competitors with 100+ reviews rank higher.`;
  } else {
    score = 25;
    gapMessage = `Critical gap: Only ${totalReviews} reviews. Top practices have 100+ reviews with 4.8+ stars.`;
  }

  return { score, gapMessage };
}

/**
 * Calculate Review Velocity score - 5% weight
 * Checks for at least 3 reviews in the last 30 days
 */
export function calculateReviewVelocityScore(recentCount30Days: number): { score: number; gapMessage: string } {
  let score = 0;
  let gapMessage = '';

  if (recentCount30Days >= 3) {
    score = 100;
    gapMessage = 'Excellent review velocity! You have 3+ reviews in the last month.';
  } else if (recentCount30Days === 2) {
    score = 60;
    gapMessage = 'Only 2 reviews in the last month. Google favors practices with 3+ monthly reviews for top rankings.';
  } else if (recentCount30Days === 1) {
    score = 30;
    gapMessage = 'Only 1 review in the last month. You need at least 3 monthly reviews to stay competitive.';
  } else {
    score = 0;
    gapMessage = "Zero reviews in the last month. Google's algorithm penalizes inactive practices. You need a system, not a 'campaign.'";
  }

  return { score, gapMessage };
}

/**
 * Calculate NAP Consistency score - 10% weight
 */
export function calculateNAPScore(matchedDirectories: number, totalDirectories: number): { score: number; gapMessage: string } {
  let score = 0;
  let gapMessage = '';

  if (matchedDirectories === 7) {
    score = 100;
    gapMessage = '';
  } else if (matchedDirectories === 6) {
    score = 85;
    gapMessage = '1 directory has inconsistent NAP info. This can lower your map ranking.';
  } else if (matchedDirectories === 5) {
    score = 70;
    gapMessage = '2 directories have inconsistent NAP info. Fix these to improve local search visibility.';
  } else if (matchedDirectories === 4) {
    score = 50;
    gapMessage = `Your address format varies across ${totalDirectories - matchedDirectories} directories. This 'confuses' Google's algorithm and directly lowers your map ranking.`;
  } else {
    score = 25;
    gapMessage = `Major NAP inconsistencies across ${totalDirectories - matchedDirectories} directories. This is seriously hurting your rankings.`;
  }

  return { score, gapMessage };
}

/**
 * Calculate Semantic Analysis (Core 30) score
 */
export function calculateSemanticAnalysisScore(foundPages: number): { score: number; gapMessage: string } {
  let score = 0;
  let gapMessage = '';

  if (foundPages >= 27) {
    score = 100;
    gapMessage = '';
  } else if (foundPages >= 20) {
    score = 75;
    gapMessage = `You have ${foundPages} of the Core 30 pages. Adding the missing ${30 - foundPages} could improve conversions.`;
  } else if (foundPages >= 13) {
    score = 50;
    gapMessage = `You're missing ${30 - foundPages} of the Core 30 pages. Practices with complete sites convert 2.4x more visitors.`;
  } else {
    score = 25;
    gapMessage = `Critical gap: Only ${foundPages}/30 authority pages found. This severely limits your ability to convert visitors.`;
  }

  return { score, gapMessage };
}

/**
 * Calculate Site Speed score (split from old Technical Trust)
 */
export function calculateSiteSpeedScore(
  loadTime: number
): { score: number; gapMessage: string } {
  let score = 0;
  let gapMessage = '';

  if (loadTime < 2) {
    score = 100;
    gapMessage = '';
  } else if (loadTime < 3) {
    score = 80;
    gapMessage = `Load time is ${loadTime.toFixed(1)}s. Aim for under 2s for optimal performance.`;
  } else if (loadTime <= 5) {
    score = 50;
    gapMessage = `Slow load time (${loadTime.toFixed(1)}s). This impacts both rankings and user experience.`;
  } else {
    score = 25;
    gapMessage = `Very slow load time (${loadTime.toFixed(1)}s). This is seriously hurting conversions.`;
  }

  return { score, gapMessage };
}

/**
 * Calculate Mobile Optimization score (split from old Technical Trust)
 */
export function calculateMobileOptimizationScore(
  mobileScore: number
): { score: number; gapMessage: string } {
  let score = 0;
  let gapMessage = '';

  if (mobileScore >= 90) {
    score = 100;
    gapMessage = '';
  } else if (mobileScore >= 70) {
    score = 60;
    gapMessage = `Mobile score is ${mobileScore}/100. Google prioritizes mobile-first indexing.`;
  } else {
    score = 30;
    gapMessage = `Poor mobile score (${mobileScore}/100). This is hurting your rankings significantly.`;
  }

  return { score, gapMessage };
}

/**
 * Calculate Citations score (renamed from Directory Dominance)
 */
export function calculateCitationsScore(presentCount: number, totalDirectories: number): { score: number; gapMessage: string } {
  let score = 0;
  let gapMessage = '';

  if (presentCount === totalDirectories) {
    score = 100;
    gapMessage = '';
  } else if (presentCount >= 6) {
    score = 75;
    gapMessage = `Present on ${presentCount}/${totalDirectories} directories. Complete your presence for maximum visibility.`;
  } else if (presentCount >= 4) {
    score = 50;
    gapMessage = `Missing from ${totalDirectories - presentCount} key directories. You're losing thousands of monthly searches.`;
  } else {
    score = 25;
    gapMessage = `Critical: Only on ${presentCount}/${totalDirectories} directories. You're completely absent from major patient sources.`;
  }

  return { score, gapMessage };
}
