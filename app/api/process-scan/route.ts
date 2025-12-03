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
    const { error: updateError } = await supabaseAdmin
      .from("scans")
      .update({
        status: "completed",
        overall_score: scanResult.overallScore,
        phase1_score: scanResult.phase1Score,
        phase2_score: scanResult.phase2Score,
        phase3_score: scanResult.phase3Score,
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
        phase1_score: scanResult.phase1Score,
        phase2_score: scanResult.phase2Score,
        phase3_score: scanResult.phase3Score,
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
      phase1Score: scanResult.phase1Score,
      phase2Score: scanResult.phase2Score,
      phase3Score: scanResult.phase3Score,
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
        phase1: scanResult.phase1Score,
        phase2: scanResult.phase2Score,
        phase3: scanResult.phase3Score,
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
