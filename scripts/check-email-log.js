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

async function checkEmailLog() {
  const { data, error } = await supabase
    .from('email_log')
    .select('*')
    .order('sent_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching email log:', error);
    return;
  }

  console.log('\n=== Recent Email Log ===\n');
  if (data.length === 0) {
    console.log('No emails logged.');
  } else {
    data.forEach(log => {
      console.log(`Scan ID: ${log.scan_id}`);
      console.log(`Type: ${log.email_type}`);
      console.log(`Recipient: ${log.recipient_email}`);
      console.log(`Sent At: ${new Date(log.sent_at).toLocaleString()}`);
      console.log('---\n');
    });
  }
}

checkEmailLog();
