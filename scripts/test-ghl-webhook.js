// Test script to send a sample webhook payload to GHL for field mapping
// This helps you see all the fields in GHL's "Fetch Sample Requests" feature

const webhookUrl = "https://services.leadconnectorhq.com/hooks/IjasVmmCL1ceglgBzelU/webhook-trigger/295c6ce7-0095-4e0c-bc8b-d4b51ff9c0c0";

const samplePayload = {
  // Business Information
  business_name: "Acme Corporation",
  website: "https://acmecorp.com",
  email: "john.doe@acmecorp.com",
  phone: "(555) 123-4567",
  contact_name: "John Doe",

  // Address Information
  address: "123 Main Street",
  city: "Los Angeles",
  state: "California",

  // Digital Authority Score (0-100)
  da_score: 67,

  // TAPS Breakdown (each 0-100)
  trust_score: 72,
  accessibility_score: 65,
  positioning_score: 58,
  site_authority_score: 70,
  strategic_seo_score: 64,

  // Metadata
  scan_date: new Date().toISOString(),
  report_url: "https://da-scanner.vercel.app/results/sample-token-12345",

  // Status
  status: "completed"
};

async function sendTestWebhook() {
  try {
    console.log("Sending test webhook to GHL...");
    console.log("Payload:", JSON.stringify(samplePayload, null, 2));

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(samplePayload),
    });

    console.log("\nResponse Status:", response.status);
    const responseText = await response.text();
    console.log("Response Body:", responseText);

    if (response.ok) {
      console.log("\n✅ SUCCESS! Webhook sent successfully!");
      console.log("\nNext steps:");
      console.log("1. Go to GHL Workflows → Your Workflow");
      console.log("2. Click on the webhook trigger");
      console.log("3. Click 'Fetch Sample Requests'");
      console.log("4. You should see this test data");
      console.log("5. Map the fields to your GHL custom fields");
    } else {
      console.log("\n❌ ERROR: Webhook failed");
    }
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
  }
}

sendTestWebhook();
