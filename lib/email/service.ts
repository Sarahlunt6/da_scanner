/**
 * Email Service
 * Emails are sent via GHL webhook workflow
 */

import { supabaseAdmin } from "../supabase";

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
 * Send results ready email
 * Note: Actual email is sent via GHL webhook in process-scan route
 * This function just logs the email to the database
 */
export async function sendResultsEmail(params: SendResultsParams): Promise<boolean> {
  // Log email in database
  await supabaseAdmin.from("email_log").insert({
    scan_id: params.scanId,
    email_type: "results",
    recipient_email: params.email,
    sent_at: new Date().toISOString(),
  });

  console.log(`Results email logged for: ${params.email}`);
  return true;
}
