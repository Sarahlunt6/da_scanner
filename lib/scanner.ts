import { checkNAPConsistency } from "./scraping/nap-consistency";

export interface ScanResult {
  overallScore: number;
  phase1Score: number;
  phase2Score: number;
  phase3Score: number;
  modules: Array<{
    name: string;
    score: number;
    status: "GREEN" | "YELLOW" | "RED";
    gapMessage: string;
    data: any;
  }>;
}

export async function performScan(scanData: {
  practiceName: string;
  websiteUrl: string;
  email: string;
  phone: string;
  contactName: string;
  address: string;
  city: string;
  state: string;
}): Promise<ScanResult> {
  const modules = [];

  const { city, state } = scanData;

  // Phase 1: Local Presence & Trust (40%)
  console.log("Running NAP Consistency Check...");
  const napResult = await checkNAPConsistency({
    practice_name: scanData.practiceName,
    website_url: scanData.websiteUrl,
    city,
    state,
    referenceNAP: {
      name: scanData.practiceName,
      address: "", // TODO: Add to form
      phone: scanData.phone || ""
    }
  });

  modules.push({
    name: "NAP Consistency",
    score: napResult.score,
    status: napResult.status,
    gapMessage: napResult.mismatches.length > 0
      ? `Found ${napResult.mismatches.length} inconsistencies across directories`
      : "NAP information is consistent across all directories",
    data: napResult
  });

  // TODO: Add more modules here
  // - Google Business Profile
  // - Review Analysis
  // - Website Authority
  // - Technical Trust Signals
  // - etc.

  // Calculate phase scores
  const phase1Score = napResult.score; // For now, just NAP
  const phase2Score = 0; // TODO: Implement Phase 2 modules
  const phase3Score = 0; // TODO: Implement Phase 3 modules

  // Calculate weighted overall score
  // Phase 1: 40%, Phase 2: 30%, Phase 3: 30%
  const overallScore = Math.round(
    (phase1Score * 0.4) + (phase2Score * 0.3) + (phase3Score * 0.3)
  );

  return {
    overallScore,
    phase1Score,
    phase2Score,
    phase3Score,
    modules
  };
}
