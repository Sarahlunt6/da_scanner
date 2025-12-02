// Retry a stuck scan by calling the process-scan API
const scanId = process.argv[2];

if (!scanId) {
  console.error('Usage: node scripts/retry-scan.js <scanId>');
  process.exit(1);
}

const VERCEL_URL = 'https://digital-authority-scanner.vercel.app';

async function retryScan() {
  console.log(`Triggering scan processing for ID: ${scanId}`);

  try {
    const response = await fetch(`${VERCEL_URL}/api/process-scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scanId }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Scan processing completed successfully!');
      console.log(JSON.stringify(data, null, 2));
    } else {
      const error = await response.text();
      console.error('❌ Scan processing failed:', response.status, error);
    }
  } catch (error) {
    console.error('❌ Error calling process-scan:', error.message);
  }
}

retryScan();
