// Script to update existing scan_details with descriptions
import { supabaseAdmin } from "@/lib/supabase";

const MODULE_DESCRIPTIONS: Record<string, string> = {
  "Review Velocity": "Measures how frequently your practice receives new Google reviews. Google's algorithm favors businesses with consistent review activity, prioritizing those with 3+ reviews monthly as it signals active customer engagement.",

  "GBP Primary Category": "Your Google Business Profile primary category determines which searches you appear in. 'Dentist' with high-value secondary categories like 'Cosmetic Dentist' and 'Dental Implants Periodontist' is optimal for maximum visibility.",

  "NAP Consistency": "Name, Address, and Phone number must match exactly across all online directories. Inconsistent NAP data confuses Google's local search algorithm and significantly lowers your local search rankings.",

  "Images": "Optimized images with proper alt text and compression for faster loading and better SEO. High-quality photos of your practice, team, and procedures improve patient trust and engagement.",

  "Review Sentiment": "Your overall Google review rating and total count. This is your digital trust score - practices with 100+ reviews at 4.8+ stars rank highest and convert more new patients.",

  "Citations": "Your presence on key online directories like Healthgrades, Zocdoc, Yelp, and industry-specific platforms. More citations equal more visibility and authority in local search results.",

  "Content Activity": "Regular content updates and blog posts that target high-value keywords and answer patient questions. Fresh, relevant content signals to Google that your practice is active and authoritative.",

  "Site Speed": "Page load time is a direct ranking factor. Sites loading under 3 seconds rank higher and convert better. Google prioritizes fast sites because they provide better user experience.",

  "Mobile Optimization": "Google uses mobile-first indexing, meaning your mobile site performance directly impacts all rankings. Target a mobile score of 90+ for optimal performance and patient experience.",

  "Video Content": "Educational videos embedded on your site increase engagement time and reduce bounce rates. Video content builds trust and helps patients understand procedures before calling.",

  "Messaging Clarity": "Clear value proposition that immediately communicates what makes your practice different and why patients should choose you over competitors in your area.",

  "Local Messages": "Location-specific content that targets your service area demographics, addresses local patient concerns, and mentions nearby landmarks to strengthen local relevance.",

  "Messaging Integrity": "Consistent brand messaging, tone, and positioning across all digital platforms. Inconsistent messaging confuses patients and weakens your brand authority.",

  "Semantic Analysis": "The Core 30 authority pages that every dental practice needs to rank well. Complete sites with 27+ of these pages convert 2.4x more visitors into booked patients.",

  "High Value Content": "Content focused on high-value procedures like implants, full mouth reconstruction, and cosmetic dentistry that attracts profitable patients actively searching for these services.",

  "GBP Services": "Services listed on your Google Business Profile determine which search queries you appear in. Practices with 15+ services listed appear in more searches and attract more high-value patients."
};

async function updateDescriptions() {
  console.log("🚀 Starting description update...");

  // Fetch all scan_details that need descriptions
  const { data: details, error } = await supabaseAdmin
    .from("scan_details")
    .select("id, module_name, data_json");

  if (error) {
    console.error("❌ Error fetching scan details:", error);
    return;
  }

  console.log(`📊 Found ${details?.length || 0} scan details to update`);

  let updated = 0;
  let skipped = 0;

  for (const detail of details || []) {
    const description = MODULE_DESCRIPTIONS[detail.module_name];

    if (!description) {
      console.warn(`⚠️ No description found for module: ${detail.module_name}`);
      skipped++;
      continue;
    }

    // Update data_json to include description
    const { error: updateError } = await supabaseAdmin
      .from("scan_details")
      .update({
        data_json: {
          ...detail.data_json,
          description: description
        }
      })
      .eq("id", detail.id);

    if (updateError) {
      console.error(`❌ Error updating ${detail.module_name}:`, updateError);
      skipped++;
    } else {
      updated++;
      console.log(`✅ Updated: ${detail.module_name}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${details?.length || 0}`);
}

updateDescriptions()
  .then(() => {
    console.log("✅ Description update complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Update failed:", error);
    process.exit(1);
  });
