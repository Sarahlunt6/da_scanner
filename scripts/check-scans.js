const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.+)$/);
  if (match) {
    envVars[match[1]] = match[2];
  }
});

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
);

async function checkRecentScans() {
  const { data, error } = await supabase
    .from('scans')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching scans:', error);
    return;
  }

  console.log('\n=== Recent Scans ===\n');
  data.forEach(scan => {
    console.log(`ID: ${scan.id}`);
    console.log(`Practice: ${scan.practice_name}`);
    console.log(`Email: ${scan.email}`);
    console.log(`Status: ${scan.status}`);
    console.log(`Overall Score: ${scan.overall_score || 'N/A'}`);
    console.log(`Created: ${new Date(scan.created_at).toLocaleString()}`);
    console.log(`Token: ${scan.unique_token}`);
    console.log('---\n');
  });
}

checkRecentScans();
