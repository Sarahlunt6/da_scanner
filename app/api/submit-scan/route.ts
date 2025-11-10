import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { practiceName, websiteUrl, email, phone, contactName } = body;

    // Validate required fields
    if (!practiceName || !websiteUrl || !email || !phone || !contactName) {
      return NextResponse.json(
        { error: "All fields are required" },
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
        phone,
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

    // TODO: Add scan job to queue for background processing
    // For now, we'll just return the token

    // TODO: Send confirmation email
    // await sendConfirmationEmail(email, contactName);

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
