export interface DirectoryData {
  name: string;
  address: string;
  phone: string;
  listed: boolean;
  error?: string;
  rating?: number;
  review_count?: number;
}

export interface WorkflowResult {
  name: string;
  address: string;
  phone: string;
  listed: boolean;
  error?: string;
}

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

  // Mock directory data - API integrations removed
  const mockData: DirectoryData = {
    name: '',
    address: '',
    phone: '',
    listed: false,
    error: 'API integration removed'
  };

  const directories = [
    { name: 'Bing Places', data: mockData },
    { name: 'Yellow Pages', data: mockData },
    { name: 'Google', data: mockData }
  ];

  // Get reference NAP (either provided or from first listed directory)
  let reference: { name: string; address: string; phone: string };

  if (referenceNAP && (referenceNAP.name || referenceNAP.address || referenceNAP.phone)) {
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
          listed: false,
          data: dir.data
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
    data?: WorkflowResult;
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

  // Calculate score based on 3 directories
  const consistencyPercentage = (matchCount / directories.length) * 100;
  let napScore: number;

  if (matchCount === 3) napScore = 100;
  else if (matchCount === 2) napScore = 75;
  else if (matchCount === 1) napScore = 40;
  else napScore = 25;

  const status: 'GREEN' | 'YELLOW' | 'RED' =
    napScore >= 80 ? 'GREEN' : napScore >= 50 ? 'YELLOW' : 'RED';

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
