import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { performScan } from "@/lib/scanner/index";
import { sendResultsEmail } from "@/lib/email/service";
import { getAppUrl } from "@/lib/utils/env";

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
    const result = await sql`
      SELECT * FROM scans WHERE id = ${scanId} LIMIT 1
    `;

    const scan = result.rows[0];

    if (!scan) {
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
    await sql`
      UPDATE scans
      SET status = 'completed',
          overall_score = ${scanResult.overallScore},
          phase1_score = ${scanResult.areaScores.trust_score},
          phase2_score = ${scanResult.areaScores.accessibility_score},
          phase3_score = ${scanResult.areaScores.positioning_score},
          results_json = ${JSON.stringify(scanResult)},
          updated_at = NOW()
      WHERE id = ${scanId}
    `;

    // Insert module details
    for (const module of scanResult.modules) {
      await sql`
        INSERT INTO scan_details (scan_id, module_name, score, status, gap_message, data_json)
        VALUES (
          ${scanId},
          ${module.name},
          ${module.score},
          ${module.status},
          ${module.gapMessage || null},
          ${JSON.stringify({
            ...module.data,
            description: module.description
          })}
        )
      `;
    }

    // Send results to GHL webhook
    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;
    console.log(`GHL_WEBHOOK_URL configured: ${ghlWebhookUrl ? 'YES' : 'NO'}`);

    if (ghlWebhookUrl) {
      const appUrl = getAppUrl();
      const webhookData = {
        business_name: scan.practice_name,
        website: scan.website_url,
        email: scan.email,
        phone: scan.phone,
        contact_name: scan.contact_name,
        address: scan.address,
        city: scan.city,
        state: scan.state,
        da_score: scanResult.overallScore,
        trust_score: scanResult.areaScores.trust_score,
        accessibility_score: scanResult.areaScores.accessibility_score,
        positioning_score: scanResult.areaScores.positioning_score,
        site_authority_score: scanResult.areaScores.site_authority_score,
        strategic_seo_score: scanResult.areaScores.strategic_seo_score,
        scan_date: new Date().toISOString(),
        report_url: `${appUrl}/results/${scan.unique_token}`,
        status: 'completed'
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
      phase1Score: scanResult.areaScores.trust_score,
      phase2Score: scanResult.areaScores.accessibility_score,
      phase3Score: scanResult.areaScores.positioning_score,
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
        trust_score: scanResult.areaScores.trust_score,
        accessibility_score: scanResult.areaScores.accessibility_score,
        positioning_score: scanResult.areaScores.positioning_score,
        site_authority_score: scanResult.areaScores.site_authority_score,
        strategic_seo_score: scanResult.areaScores.strategic_seo_score,
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
