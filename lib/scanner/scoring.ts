// Scoring calculation engine based on PRD

import { ModuleResult } from "../types/scan";

/**
 * Calculate overall Digital Authority Score
 * Formula: (Phase 1 × 0.50) + (Phase 2 × 0.35) + (Phase 3 × 0.15)
 */
export function calculateOverallScore(
  phase1Score: number,
  phase2Score: number,
  phase3Score: number
): number {
  return Math.round(phase1Score * 0.5 + phase2Score * 0.35 + phase3Score * 0.15);
}

/**
 * Calculate phase score from module results
 */
export function calculatePhaseScore(modules: ModuleResult[]): number {
  if (modules.length === 0) return 0;

  const totalWeight = modules.reduce((sum, m) => sum + m.weight, 0);
  const weightedScore = modules.reduce((sum, m) => sum + m.score * m.weight, 0);

  return Math.round(weightedScore / totalWeight);
}

/**
 * Determine status based on score
 */
export function getStatus(score: number): 'excellent' | 'good' | 'needs_work' | 'urgent' {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 60) return 'needs_work';
  return 'urgent';
}

/**
 * Calculate Profit Zone (GBP Categories) score - 10% weight
 */
export function calculateProfitZoneScore(
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
 * Calculate Product Shelf (GBP Services) score - 10% weight
 */
export function calculateProductShelfScore(servicesCount: number): { score: number; gapMessage: string } {
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
 * Calculate Review Health score - 15% weight
 */
export function calculateReviewHealthScore(
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
 * Calculate Core 30 score - 20% weight
 */
export function calculateCore30Score(foundPages: number): { score: number; gapMessage: string } {
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
 * Calculate Technical Trust Signals score - 15% weight
 */
export function calculateTechnicalTrustScore(
  hasSSL: boolean,
  mobileScore: number,
  loadTime: number,
  hasSchema: boolean
): { score: number; gapMessage: string } {
  let totalScore = 0;
  const issues: string[] = [];

  // SSL (25% of module = 25 points)
  if (hasSSL) {
    totalScore += 25;
  } else {
    issues.push('Missing SSL certificate (HTTPS)');
  }

  // Mobile Score (25% of module = 25 points)
  if (mobileScore >= 90) {
    totalScore += 25;
  } else if (mobileScore >= 70) {
    totalScore += 15;
    issues.push(`Mobile score is ${mobileScore}/100`);
  } else {
    totalScore += 7;
    issues.push(`Poor mobile score (${mobileScore}/100)`);
  }

  // Load Time (25% of module = 25 points)
  if (loadTime < 3) {
    totalScore += 25;
  } else if (loadTime <= 5) {
    totalScore += 15;
    issues.push(`Slow load time (${loadTime.toFixed(1)}s)`);
  } else {
    totalScore += 7;
    issues.push(`Very slow load time (${loadTime.toFixed(1)}s)`);
  }

  // Schema (25% of module = 25 points)
  if (hasSchema) {
    totalScore += 25;
  } else {
    issues.push('Missing schema markup');
  }

  const gapMessage = issues.length > 0
    ? `Technical issues: ${issues.join(', ')}. These hurt both rankings and conversions.`
    : '';

  return { score: totalScore, gapMessage };
}

/**
 * Calculate Directory Dominance score - 10% weight
 */
export function calculateDirectoryScore(presentCount: number, totalDirectories: number): { score: number; gapMessage: string } {
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
