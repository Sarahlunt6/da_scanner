import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "@vercel/postgres";
import { performScan } from "@/lib/scanner";
import { sendResultsEmail } from "@/lib/email/service";
import crypto from "crypto";

// Background processing function
async function processScanInBackground(scan: any) {
  try {
    console.log(`Starting background scan processing for ID: ${scan.id}`);

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
    await sql`
      UPDATE scans
      SET status = 'completed',
          overall_score = ${scanResult.overallScore},
          phase1_score = ${scanResult.phase1Score},
          phase2_score = ${scanResult.phase2Score},
          phase3_score = ${scanResult.phase3Score},
          results_json = ${JSON.stringify(scanResult)},
          updated_at = NOW()
      WHERE id = ${scan.id}
    `;

    // Insert module details
    for (const module of scanResult.modules) {
      await sql`
        INSERT INTO scan_details (scan_id, module_name, score, status, gap_message, data_json)
        VALUES (
          ${scan.id},
          ${module.name},
          ${module.score},
          ${module.status},
          ${module.gapMessage || null},
          ${JSON.stringify(module.data)}
        )
      `;
    }

    // Send results to GHL webhook
    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;
    if (ghlWebhookUrl) {
      await fetch(ghlWebhookUrl, {
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
    });

    console.log(`Background scan processing completed for ID: ${scan.id}`);
  } catch (error) {
    console.error("Error in background scan processing:", error);

    // Mark scan as failed
    await sql`
      UPDATE scans
      SET status = 'failed',
          updated_at = NOW()
      WHERE id = ${scan.id}
    `;
  }
}

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
    const result = await sql`
      INSERT INTO scans (
        practice_name, website_url, email, phone, contact_name,
        address, city, state, unique_token, status, created_at, updated_at, expires_at
      )
      VALUES (
        ${practiceName}, ${websiteUrl}, ${email}, ${phone || ''},
        ${contactName}, ${address}, ${city}, ${state}, ${uniqueToken},
        'processing', NOW(), NOW(), NOW() + INTERVAL '7 days'
      )
      RETURNING *
    `;

    const scan = result.rows[0];

    if (!scan) {
      console.error("Failed to create scan");
      return NextResponse.json(
        { error: "Failed to create scan" },
        { status: 500 }
      );
    }

    // Don't process the scan here - let the processing page trigger it via process-scan API
    // This allows instant response

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
