/**
 * Email Service
 * Handles sending emails via GHL and logging to database
 */

import { ghlClient } from "./ghl-client";
import { getConfirmationEmail, getResultsReadyEmail, getFollowUpEmail } from "./templates";
import { supabaseAdmin } from "../supabase-admin";

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

  // Update contact tags in GHL
  const { data: emailLog } = await supabaseAdmin
    .from("email_log")
    .select("ghl_contact_id")
    .eq("scan_id", params.scanId)
    .eq("email_type", "confirmation")
    .single();

  if (emailLog?.ghl_contact_id) {
    await ghlClient.addTagsToContact(emailLog.ghl_contact_id, [
      "Scan Completed",
      `Score: ${params.overallScore}`,
    ]);
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
