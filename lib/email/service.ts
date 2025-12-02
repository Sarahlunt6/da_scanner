/**
 * Email Service
 * Emails are sent via GoHighLevel API
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
 * Send results ready email via GHL API
 */
export async function sendResultsEmail(params: SendResultsParams): Promise<boolean> {
  try {
    const resultsUrl = `${process.env.NEXT_PUBLIC_APP_URL}/results/${params.token}`;

    // Create contact in GHL first
    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;
    const ghlFromEmail = process.env.GHL_FROM_EMAIL || 'noreply@opkie.com';

    if (!ghlApiKey || !ghlLocationId) {
      console.error('GHL API credentials not configured');
      return false;
    }

    // First, create or update the contact
    const firstName = params.contactName.split(' ')[0] || params.contactName;
    const lastName = params.contactName.split(' ').slice(1).join(' ') || '';

    const contactResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email: params.email,
        locationId: ghlLocationId,
        source: 'Digital Authority Scanner',
        customFields: [
          { key: 'practice_name', value: params.practiceName },
          { key: 'da_score', value: params.overallScore.toString() },
          { key: 'phase1_score', value: (params.phase1Score || 0).toString() },
          { key: 'phase2_score', value: (params.phase2Score || 0).toString() },
          { key: 'phase3_score', value: (params.phase3Score || 0).toString() },
          { key: 'results_url', value: resultsUrl },
        ],
      }),
    });

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text();
      console.error('Failed to create GHL contact:', contactResponse.status, errorText);
    }

    // Send email via GHL
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2C5F7C;">Your Digital Authority Score is Ready!</h1>

        <p>Hi ${firstName},</p>

        <p>Great news! We've completed the Digital Authority scan for <strong>${params.practiceName}</strong>.</p>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #2C5F7C; margin-top: 0;">Your Overall Score: ${params.overallScore}/100</h2>
          <p style="margin: 10px 0;">
            <strong>Phase 1 (Foundation):</strong> ${params.phase1Score || 0}/100<br>
            <strong>Phase 2 (Visibility):</strong> ${params.phase2Score || 0}/100<br>
            <strong>Phase 3 (Authority):</strong> ${params.phase3Score || 0}/100
          </p>
        </div>

        <p>Your detailed report includes:</p>
        <ul>
          <li>Comprehensive analysis of 47+ data points</li>
          <li>Specific gaps in your digital authority</li>
          <li>Actionable recommendations to improve your score</li>
          <li>Competitive positioning insights</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resultsUrl}" style="background-color: #2C5F7C; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            View Your Full Report
          </a>
        </div>

        <p>Questions about your results? Ready to improve your score?</p>
        <p><a href="https://link.opkie.com/widget/bookings/strategy-meeting30" style="color: #2C5F7C;">Book a free strategy call</a> to discuss your Digital Authority roadmap.</p>

        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          Best regards,<br>
          The Opkie Team
        </p>
      </div>
    `;

    const emailResponse = await fetch('https://services.leadconnectorhq.com/conversations/messages/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        locationId: ghlLocationId,
        toEmail: params.email,
        fromEmail: ghlFromEmail,
        subject: `${firstName}, Your Digital Authority Score (${params.overallScore}/100) is Ready!`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Failed to send GHL email:', emailResponse.status, errorText);
      return false;
    }

    // Log email in database
    await supabaseAdmin.from("email_log").insert({
      scan_id: params.scanId,
      email_type: "results",
      recipient_email: params.email,
      sent_at: new Date().toISOString(),
    });

    console.log(`Results email sent successfully to: ${params.email}`);
    return true;
  } catch (error) {
    console.error('Error sending results email:', error);
    return false;
  }
}
