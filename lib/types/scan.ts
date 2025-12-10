// Scan types and interfaces

export interface ScanInput {
  practiceName: string;
  websiteUrl: string;
  email: string;
  phone: string;
  contactName: string;
  address: string;
  city: string;
  state: string;
}

export type AreaType = 'Technical SEO' | 'Strategic SEO' | 'Technical Site' | 'Market Understanding' | 'Strategic Site';

export interface ScanResult {
  overallScore: number;
  areaScores: {
    trust_score: number;
    accessibility_score: number;
    positioning_score: number;
    site_authority_score: number;
    strategic_seo_score: number;
  };
  modules: ModuleResult[];
  timestamp: string;
}

export interface ModuleResult {
  name: string;
  area: AreaType;
  score: number;
  status: 'excellent' | 'good' | 'needs_work' | 'urgent';
  weight: number;
  description: string; // What this module measures
  gapMessage: string; // What was found
  data: Record<string, any>;
}

// Phase 1 Modules
export interface ProfitZoneResult {
  primaryCategory: string;
  secondaryCategories: string[];
  hasCosmetic: boolean;
  hasImplants: boolean;
  score: number;
}

export interface ProductShelfResult {
  servicesCount: number;
  services: string[];
  hasHighValueServices: boolean;
  score: number;
}

export interface ReviewHealthResult {
  rating: number;
  totalReviews: number;
  score: number;
}

export interface ReviewVelocityResult {
  recentReviewsCount: number;
  recentReviews: Array<{ date: string; text: string }>;
  velocityScore: number;
}

export interface NAPConsistencyResult {
  matchedDirectories: number;
  totalDirectories: number;
  inconsistencies: string[];
  score: number;
}

// Phase 2 Modules
export interface Core30Result {
  foundPages: number;
  totalPages: number;
  missingPages: string[];
  score: number;
}

export interface TechnicalTrustResult {
  hasSSL: boolean;
  mobileScore: number;
  loadTime: number;
  hasSchema: boolean;
  overallScore: number;
}

// Phase 3 Modules
export interface DirectoryDominanceResult {
  presentDirectories: number;
  totalDirectories: number;
  missingDirectories: string[];
  score: number;
}
// Force rebuild Tue Nov 18 12:15:43 MST 2025
