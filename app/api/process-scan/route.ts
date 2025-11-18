import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { performScan } from "@/lib/scanner";
import { sendResultsEmail } from "@/lib/email/service";

export async function POST(request: Request) {
  try {
    const { scanId } = await request.json();

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
      return NextResponse.json({ error: "Scan not found" }, { status: 404 });
    }

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

    // Send results email (async, don't block response)
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
