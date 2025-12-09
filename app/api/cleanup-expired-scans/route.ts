import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * Cleanup API endpoint for deleting scan_details of expired scans (>90 days old)
 * while keeping the scan summary data intact.
 *
 * This should be run daily via a cron job.
 *
 * Security: Protected by CRON_SECRET environment variable
 */
export async function GET(request: Request) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find scans older than 90 days
    const expiredScansResult = await sql`
      SELECT id, practice_name, created_at
      FROM scans
      WHERE created_at < NOW() - INTERVAL '90 days'
    `;

    const expiredScans = expiredScansResult.rows;

    if (!expiredScans || expiredScans.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No expired scans found",
        deleted: 0,
      });
    }

    // Delete scan_details for expired scans (keeping scan summary)
    const scanIds = expiredScans.map(scan => scan.id);

    const deleteResult = await sql`
      DELETE FROM scan_details
      WHERE scan_id = ANY(ARRAY[${sql.raw(scanIds.join(','))}])
    `;

    console.log(`Successfully cleaned up ${deleteResult.rowCount} scan_details records for ${expiredScans.length} expired scans`);

    return NextResponse.json({
      success: true,
      message: `Cleaned up scan details for ${expiredScans.length} expired scans`,
      scansProcessed: expiredScans.length,
      detailsDeleted: deleteResult.rowCount || 0,
      scans: expiredScans.map(s => ({
        id: s.id,
        practice_name: s.practice_name,
        created_at: s.created_at,
      })),
    });
  } catch (error) {
    console.error("Error in cleanup-expired-scans:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
