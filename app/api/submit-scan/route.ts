import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendConfirmationEmail } from "@/lib/email/service";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { practiceName, websiteUrl, email, phone, contactName } = body;

    // Validate required fields
    if (!practiceName || !websiteUrl || !email || !contactName) {
      return NextResponse.json(
        { error: "Practice name, website, email, and contact name are required" },
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

    // Send confirmation email (don't await - run async)
    sendConfirmationEmail({
      scanId: scan.id,
      email,
      contactName,
      practiceName,
      phone,
    }).catch((error) => {
      console.error("Error sending confirmation email:", error);
    });

    // Trigger scan processing in background
    // In production, this should use a job queue (Bull, Inngest, etc.)
    // For now, we'll call it directly but don't await it
    fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/process-scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scanId: scan.id }),
    }).catch((error) => {
      console.error("Error triggering scan:", error);
    });

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
