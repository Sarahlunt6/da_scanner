/**
 * Email Service
 * Handles sending emails via GHL and logging to database
 */

import { ghlClient } from "./ghl-client";
import { getConfirmationEmail, getResultsReadyEmail, getFollowUpEmail } from "./templates";
import { supabaseAdmin } from "../supabase";

interface SendConfirmationParams {
  scanId: string;
  email: string;
  contactName: string;
  practiceName: string;
  phone: string;
}

interface SendResultsParams {
  scanId: string;
  email: string;
  contactName: string;
  practiceName: string;
  overallScore: number;
  token: string;
  phase1Score?: number;
  phase2Score?: number;
  phase3Score?: number;
  websiteUrl?: string;
}

/**
 * Send scan confirmation email
 */
export async function sendConfirmationEmail(params: SendConfirmationParams): Promise<boolean> {
  const emailTemplate = getConfirmationEmail({
    contactName: params.contactName,
    practiceName: params.practiceName,
  });

  // Create or update contact in GHL
  const contactResult = await ghlClient.createOrUpdateContact({
    email: params.email,
    name: params.contactName,
    phone: params.phone,
    customFields: {
      practice_name: params.practiceName,
    },
    tags: ["Digital Authority Scan", "Scan Requested"],
  });

  // Send email
  const emailSent = await ghlClient.sendEmail({
    to: params.email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
  });

  // Log email in database
  if (emailSent) {
    await supabaseAdmin.from("email_log").insert({
      scan_id: params.scanId,
      email_type: "confirmation",
      recipient_email: params.email,
      sent_at: new Date().toISOString(),
      ghl_contact_id: contactResult?.contactId,
    });
  }

  return emailSent;
}

/**
 * Send results ready email
 */
export async function sendResultsEmail(params: SendResultsParams): Promise<boolean> {
  const resultsUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com"}/results/${params.token}`;

  const emailTemplate = getResultsReadyEmail({
    contactName: params.contactName,
    practiceName: params.practiceName,
    overallScore: params.overallScore,
    resultsUrl,
  });

  // Send email
  const emailSent = await ghlClient.sendEmail({
    to: params.email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
  });

  // Get GHL contact ID from confirmation email log
  const { data: emailLog } = await supabaseAdmin
    .from("email_log")
    .select("ghl_contact_id")
    .eq("scan_id", params.scanId)
    .eq("email_type", "confirmation")
    .single();

  if (emailLog?.ghl_contact_id) {
    // Determine score-based tag
    const scoreTag = params.overallScore >= 75 ? 'High Score'
      : params.overallScore >= 50 ? 'Medium Score'
      : 'Low Score';

    // Add tags to contact
    await ghlClient.addTagsToContact(emailLog.ghl_contact_id, [
      "Scan Completed",
      scoreTag,
    ]);

    // Update custom fields with scan data
    await ghlClient.updateContactCustomFields(emailLog.ghl_contact_id, {
      da_score: params.overallScore.toString(),
      scan_token: params.token,
      scan_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      ...(params.phase1Score && { phase1_score: params.phase1Score.toString() }),
      ...(params.phase2Score && { phase2_score: params.phase2Score.toString() }),
      ...(params.phase3Score && { phase3_score: params.phase3Score.toString() }),
      ...(params.websiteUrl && { website_url: params.websiteUrl }),
    });
  }

  // Log email in database
  if (emailSent) {
    await supabaseAdmin.from("email_log").insert({
      scan_id: params.scanId,
      email_type: "results",
      recipient_email: params.email,
      sent_at: new Date().toISOString(),
      ghl_contact_id: emailLog?.ghl_contact_id,
    });
  }

  return emailSent;
}

/**
 * Send follow-up email
 */
export async function sendFollowUpEmail(params: SendResultsParams): Promise<boolean> {
  const resultsUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com"}/results/${params.token}`;

  const emailTemplate = getFollowUpEmail({
    contactName: params.contactName,
    practiceName: params.practiceName,
    overallScore: params.overallScore,
    resultsUrl,
  });

  // Send email
  const emailSent = await ghlClient.sendEmail({
    to: params.email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
  });

  // Log email in database
  if (emailSent) {
    await supabaseAdmin.from("email_log").insert({
      scan_id: params.scanId,
      email_type: "follow_up",
      recipient_email: params.email,
      sent_at: new Date().toISOString(),
    });
  }

  return emailSent;
}
