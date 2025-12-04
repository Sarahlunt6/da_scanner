import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

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

    // Calculate the cutoff date (90 days ago)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    // Find scans older than 90 days
    const { data: expiredScans, error: findError } = await supabaseAdmin
      .from("scans")
      .select("id, practice_name, created_at")
      .lt("created_at", ninetyDaysAgo.toISOString());

    if (findError) {
      console.error("Error finding expired scans:", findError);
      return NextResponse.json(
        { error: "Failed to find expired scans" },
        { status: 500 }
      );
    }

    if (!expiredScans || expiredScans.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No expired scans found",
        deleted: 0,
      });
    }

    // Delete scan_details for expired scans (keeping scan summary)
    const scanIds = expiredScans.map(scan => scan.id);

    const { error: deleteError, count } = await supabaseAdmin
      .from("scan_details")
      .delete()
      .in("scan_id", scanIds);

    if (deleteError) {
      console.error("Error deleting scan details:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete scan details" },
        { status: 500 }
      );
    }

    console.log(`Successfully cleaned up ${count} scan_details records for ${expiredScans.length} expired scans`);

    return NextResponse.json({
      success: true,
      message: `Cleaned up scan details for ${expiredScans.length} expired scans`,
      scansProcessed: expiredScans.length,
      detailsDeleted: count || 0,
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
