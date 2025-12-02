/**
 * Email Service
 * Emails are sent via GoHighLevel webhook workflow
 * The webhook is triggered in process-scan route, this just logs
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
 * Log email send attempt
 * Actual email is sent via GHL webhook in process-scan route
 */
export async function sendResultsEmail(params: SendResultsParams): Promise<boolean> {
  try {
    // Log email in database
    await supabaseAdmin.from("email_log").insert({
      scan_id: params.scanId,
      email_type: "results",
      recipient_email: params.email,
      sent_at: new Date().toISOString(),
    });

    console.log(`Email send logged for: ${params.email}`);
    return true;
  } catch (error) {
    console.error('Error logging email:', error);
    return false;
  }
}
