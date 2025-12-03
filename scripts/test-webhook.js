// Test the GHL webhook directly
const webhookUrl = 'https://services.leadconnectorhq.com/hooks/vmzEamyXqsd9g2bEFYGu/webhook-trigger/7207f2e9-17ba-4902-b4f6-20921a881482';

const testData = {
  email: 'sarah@opkie.com',
  first_name: 'Sarah',
  last_name: 'Lunt',
  phone: '(555) 123-4567',
  practice_name: 'Test Dental Practice',
  website_url: 'https://example.com',
  address: '123 Test St',
  city: 'Austin',
  state: 'TX',
  da_score: 75,
  phase1_score: 80,
  phase2_score: 70,
  phase3_score: 75,
  scan_token: 'test-token-manual',
  results_url: 'https://digital-authority-scanner.vercel.app/results/test-token-manual',
};

console.log('Testing GHL webhook...');
console.log('Sending data:', JSON.stringify(testData, null, 2));

fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData),
})
  .then(async response => {
    console.log('\n✅ Webhook Response Status:', response.status);
    const text = await response.text();
    console.log('Response Body:', text || '(empty)');

    if (response.ok) {
      console.log('\n✅ SUCCESS! Webhook accepted the data.');
      console.log('Check your email at sarah@opkie.com for the test email.');
    } else {
      console.log('\n❌ FAILED! Webhook rejected the data.');
    }
  })
  .catch(error => {
    console.error('\n❌ ERROR calling webhook:', error.message);
  });
