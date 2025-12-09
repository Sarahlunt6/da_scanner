/**
 * Email Service
 * Emails are sent via GoHighLevel webhook workflow
 * The webhook is triggered in process-scan route, this just logs
 */

import { sql } from "@vercel/postgres";

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
    await sql`
      INSERT INTO email_logs (scan_id, email_to, subject, status, provider, created_at)
      VALUES (
        ${params.scanId},
        ${params.email},
        'Your HR Compliance Assessment Results',
        'sent',
        'ghl_webhook',
        NOW()
      )
    `;

    console.log(`Email send logged for: ${params.email}`);
    return true;
  } catch (error) {
    console.error('Error logging email:', error);
    return false;
  }
}
