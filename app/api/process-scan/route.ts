import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { performScan } from "@/lib/scanner/index";
import { sendResultsEmail } from "@/lib/email/service";

// Extend timeout to 5 minutes for long-running scans
export const maxDuration = 300;

export async function POST(request: Request) {
  console.log('🔵 /api/process-scan endpoint called!');
  try {
    const { scanId } = await request.json();
    console.log('📝 Received scanId:', scanId);

    if (!scanId) {
      return NextResponse.json({ error: "scanId is required" }, { status: 400 });
    }

    // Fetch scan from database
    const { data: scan, error: fetchError } = await supabaseAdmin
      .from("scans")
      .select("*")
      .eq("id", scanId)
      .single();

    if (fetchError || !scan) {
      console.error('❌ Scan not found in database for scanId:', scanId);
      return NextResponse.json({ error: "Scan not found" }, { status: 404 });
    }

    console.log('✅ Scan found in database:', scan.practice_name);
    console.log('🚀 About to call performScan()...');

    // Perform the actual scan
    const scanResult = await performScan({
      practiceName: scan.practice_name,
      websiteUrl: scan.website_url,
      email: scan.email,
      phone: scan.phone,
      contactName: scan.contact_name,
      address: scan.address,
      city: scan.city,
      state: scan.state,
    });

    // Update scan in database with results
    // NOTE: Database still has phase columns - mapping area scores to them temporarily
    // TODO: Migrate database schema to area_scores
    const { error: updateError } = await supabaseAdmin
      .from("scans")
      .update({
        status: "completed",
        overall_score: scanResult.overallScore,
        // Map 5 area scores to 3 phase columns temporarily
        phase1_score: scanResult.areaScores.technicalSEO,
        phase2_score: scanResult.areaScores.strategicSEO,
        phase3_score: scanResult.areaScores.technicalSite,
        // Store full results including all 5 area scores in JSON
        results_json: scanResult,
      })
      .eq("id", scanId);

    if (updateError) {
      console.error("Error updating scan:", updateError);
      return NextResponse.json({ error: "Failed to update scan" }, { status: 500 });
    }

    // Insert module details
    const moduleInserts = scanResult.modules.map((module) => ({
      scan_id: scanId,
      module_name: module.name,
      score: module.score,
      status: module.status,
      gap_message: module.gapMessage,
      data_json: module.data,
    }));

    const { error: moduleError } = await supabaseAdmin
      .from("scan_details")
      .insert(moduleInserts);

    if (moduleError) {
      console.error("Error inserting modules:", moduleError);
      // Don't fail the whole operation if module insert fails
    }

    // Send results to GHL webhook
    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;
    console.log(`GHL_WEBHOOK_URL configured: ${ghlWebhookUrl ? 'YES' : 'NO'}`);

    if (ghlWebhookUrl) {
      const webhookData = {
        email: scan.email,
        first_name: scan.contact_name.split(' ')[0],
        last_name: scan.contact_name.split(' ').slice(1).join(' ') || '',
        phone: scan.phone,
        practice_name: scan.practice_name,
        website_url: scan.website_url,
        address: scan.address,
        city: scan.city,
        state: scan.state,
        da_score: scanResult.overallScore,
        // Send area scores (5 areas)
        technical_seo_score: scanResult.areaScores.technicalSEO,
        strategic_seo_score: scanResult.areaScores.strategicSEO,
        technical_site_score: scanResult.areaScores.technicalSite,
        market_understanding_score: scanResult.areaScores.marketUnderstanding,
        strategic_site_score: scanResult.areaScores.strategicSite,
        // Legacy phase scores for backwards compatibility
        phase1_score: scanResult.areaScores.technicalSEO,
        phase2_score: scanResult.areaScores.strategicSEO,
        phase3_score: scanResult.areaScores.technicalSite,
        scan_token: scan.unique_token,
        results_url: `${process.env.NEXT_PUBLIC_APP_URL}/results/${scan.unique_token}`,
      };

      console.log('Sending webhook to GHL:', JSON.stringify(webhookData, null, 2));

      await fetch(ghlWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookData),
      }).then(async res => {
        if (res.ok) {
          console.log("✅ GHL webhook sent successfully");
        } else {
          const errorText = await res.text();
          console.error("❌ GHL webhook failed:", res.status, errorText);
        }
      }).catch((error) => {
        console.error("❌ Error sending GHL webhook:", error);
      });
    } else {
      console.log("⚠️ GHL_WEBHOOK_URL not configured - skipping webhook");
    }

    // Send results email (log to database)
    console.log('Calling sendResultsEmail...');
    await sendResultsEmail({
      scanId: scan.id,
      email: scan.email,
      contactName: scan.contact_name,
      practiceName: scan.practice_name,
      overallScore: scanResult.overallScore,
      token: scan.unique_token,
      // Map area scores to phase scores for email compatibility
      phase1Score: scanResult.areaScores.technicalSEO,
      phase2Score: scanResult.areaScores.strategicSEO,
      phase3Score: scanResult.areaScores.technicalSite,
      websiteUrl: scan.website_url,
    }).then(() => {
      console.log('✅ Email logged successfully');
    }).catch((error) => {
      console.error("❌ Error logging email:", error);
    });

    return NextResponse.json({
      success: true,
      scanId,
      scores: {
        overall: scanResult.overallScore,
        // Return area scores
        technicalSEO: scanResult.areaScores.technicalSEO,
        strategicSEO: scanResult.areaScores.strategicSEO,
        technicalSite: scanResult.areaScores.technicalSite,
        marketUnderstanding: scanResult.areaScores.marketUnderstanding,
        strategicSite: scanResult.areaScores.strategicSite,
        // Legacy phase scores for backwards compatibility
        phase1: scanResult.areaScores.technicalSEO,
        phase2: scanResult.areaScores.strategicSEO,
        phase3: scanResult.areaScores.technicalSite,
      },
    });
  } catch (error) {
    console.error("Error in process-scan:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
