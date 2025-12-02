import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { performScan } from "@/lib/scanner";
import { sendResultsEmail } from "@/lib/email/service";
import crypto from "crypto";

// Extend timeout to 5 minutes for long-running scans
export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { practiceName, websiteUrl, email, phone, contactName, address, city, state } = body;

    // Validate required fields
    if (!practiceName || !websiteUrl || !email || !contactName || !address || !city || !state) {
      return NextResponse.json(
        { error: "Practice name, website, email, contact name, address, city, and state are required" },
        { status: 400 }
      );
    }

    // Generate unique token for results page
    const uniqueToken = crypto.randomBytes(32).toString("hex");

    // Insert scan into database
    const { data: scan, error } = await supabaseAdmin
      .from("scans")
      .insert({
        practice_name: practiceName,
        website_url: websiteUrl,
        email,
        phone: phone || "",
        contact_name: contactName,
        address,
        city,
        state,
        unique_token: uniqueToken,
        status: "processing",
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to create scan" },
        { status: 500 }
      );
    }

    // Perform the scan processing directly in this request
    // This avoids the complexity of background jobs and fetch() calls to self
    console.log(`Starting scan processing for ID: ${scan.id}`);

    try {
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
        .eq("id", scan.id);

      if (updateError) {
        console.error("Error updating scan:", updateError);
      }

      // Insert module details
      const moduleInserts = scanResult.modules.map((module) => ({
        scan_id: scan.id,
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
      }

      // Send results to GHL webhook
      const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;
      if (ghlWebhookUrl) {
        fetch(ghlWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
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
          }),
        }).catch((error) => {
          console.error("Error sending GHL webhook:", error);
        });
      }

      // Send results email
      sendResultsEmail({
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
      }).catch((error) => {
        console.error("Error sending results email:", error);
      });

      console.log(`Scan processing completed for ID: ${scan.id}`);
    } catch (scanError) {
      console.error("Error processing scan:", scanError);
      // Don't fail the request - user still gets redirected to processing page
    }

    return NextResponse.json({
      success: true,
      token: uniqueToken,
      scanId: scan.id,
    });
  } catch (error) {
    console.error("Error in submit-scan:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
