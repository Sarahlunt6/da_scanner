import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import crypto from "crypto";

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

    // Trigger scan processing in background
    // In production, this should use a job queue (Bull, Inngest, etc.)
    // For now, we'll call it directly but don't await it
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

    console.log(`Triggering scan processing at: ${baseUrl}/api/process-scan`);

    fetch(`${baseUrl}/api/process-scan`, {
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
