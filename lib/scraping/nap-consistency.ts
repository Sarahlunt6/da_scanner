import {
  scrapeBingPlaces,
  scrapeFacebookBusiness,
  scrapeHealthgrades,
  scrapeZocdoc,
  scrapeWebMD,
  scrapeVitals,
  DirectoryData
} from './directory-scrapers';

export interface NAPConsistencyResult {
  score: number;
  consistentDirectories: number;
  totalDirectories: number;
  consistencyPercentage: number;
  mismatches: string[];
  status: 'GREEN' | 'YELLOW' | 'RED';
  directories: Array<{
    name: string;
    listed: boolean;
    data?: DirectoryData;
    issues?: string[];
  }>;
}

/**
 * Normalize string for comparison
 */
function normalizeString(str: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Normalize address for comparison
 */
function normalizeAddress(address: string): string {
  if (!address) return '';
  return address
    .toLowerCase()
    .replace(/\bstreet\b/g, 'st')
    .replace(/\bavenue\b/g, 'ave')
    .replace(/\broad\b/g, 'rd')
    .replace(/\bdrive\b/g, 'dr')
    .replace(/\bboulevard\b/g, 'blvd')
    .replace(/\bsuite\b/g, 'ste')
    .replace(/\bapartment\b/g, 'apt')
    .replace(/\bfloor\b/g, 'fl')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Normalize phone for comparison
 */
function normalizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\D/g, ''); // Keep only digits
}

/**
 * Check NAP (Name, Address, Phone) consistency across multiple directories
 */
export async function checkNAPConsistency(practiceData: {
  practice_name: string;
  website_url: string;
  city: string;
  state: string;
  referenceNAP?: {
    name: string;
    address: string;
    phone: string;
  };
}): Promise<NAPConsistencyResult> {
  const { practice_name, city, state, referenceNAP } = practiceData;

  console.log(`Checking NAP consistency for ${practice_name}...`);

  // Run all directory checks in parallel
  const [bingData, facebookData, healthgradesData, zocdocData, webmdData, vitalsData] = await Promise.all([
    scrapeBingPlaces(practice_name, city, state),
    scrapeFacebookBusiness(practice_name, city),
    scrapeHealthgrades(practice_name, city, state),
    scrapeZocdoc(practice_name, city, state),
    scrapeWebMD(practice_name, city, state),
    scrapeVitals(practice_name, city, state)
  ]);

  const directories = [
    { name: 'Bing Places', data: bingData },
    { name: 'Facebook', data: facebookData },
    { name: 'Healthgrades', data: healthgradesData },
    { name: 'Zocdoc', data: zocdocData },
    { name: 'WebMD', data: webmdData },
    { name: 'Vitals', data: vitalsData }
  ];

  // Get reference NAP (either provided or from first listed directory)
  let reference: { name: string; address: string; phone: string };

  if (referenceNAP) {
    reference = {
      name: normalizeString(referenceNAP.name),
      address: normalizeAddress(referenceNAP.address),
      phone: normalizePhone(referenceNAP.phone)
    };
  } else {
    // Use first listed directory as reference
    const firstListed = directories.find(dir => dir.data.listed);
    if (!firstListed) {
      return {
        score: 0,
        consistentDirectories: 0,
        totalDirectories: directories.length,
        consistencyPercentage: 0,
        mismatches: ['Practice not found in any directories'],
        status: 'RED',
        directories: directories.map(dir => ({
          name: dir.name,
          listed: false
        }))
      };
    }

    reference = {
      name: normalizeString(firstListed.data.name),
      address: normalizeAddress(firstListed.data.address),
      phone: normalizePhone(firstListed.data.phone)
    };
  }

  // Compare each directory against reference
  let matchCount = 0;
  const mismatches: string[] = [];
  const directoryResults: Array<{
    name: string;
    listed: boolean;
    data?: DirectoryData;
    issues?: string[];
  }> = [];

  for (const dir of directories) {
    if (!dir.data.listed) {
      mismatches.push(`${dir.name}: Not listed`);
      directoryResults.push({
        name: dir.name,
        listed: false,
        data: dir.data
      });
      continue;
    }

    const nameMatch = normalizeString(dir.data.name) === reference.name;
    const addressMatch = normalizeAddress(dir.data.address) === reference.address;
    const phoneMatch = normalizePhone(dir.data.phone) === reference.phone;

    if (nameMatch && addressMatch && phoneMatch) {
      matchCount++;
      directoryResults.push({
        name: dir.name,
        listed: true,
        data: dir.data
      });
    } else {
      const issues: string[] = [];
      if (!nameMatch) issues.push('name');
      if (!addressMatch) issues.push('address');
      if (!phoneMatch) issues.push('phone');

      mismatches.push(`${dir.name}: ${issues.join(', ')} mismatch`);
      directoryResults.push({
        name: dir.name,
        listed: true,
        data: dir.data,
        issues
      });
    }
  }

  // Calculate score (Module 1.4: 10% of total TAPS score)
  const consistencyPercentage = (matchCount / directories.length) * 100;
  let napScore: number;

  if (matchCount === 6) napScore = 100;
  else if (matchCount === 5) napScore = 85;
  else if (matchCount === 4) napScore = 70;
  else if (matchCount === 3) napScore = 50;
  else if (matchCount === 2) napScore = 35;
  else napScore = 25;

  const status: 'GREEN' | 'YELLOW' | 'RED' =
    napScore >= 85 ? 'GREEN' : napScore >= 50 ? 'YELLOW' : 'RED';

  return {
    score: napScore,
    consistentDirectories: matchCount,
    totalDirectories: directories.length,
    consistencyPercentage: Math.round(consistencyPercentage),
    mismatches,
    status,
    directories: directoryResults
  };
}
