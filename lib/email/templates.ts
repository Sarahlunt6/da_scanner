/**
 * Email Templates for Digital Authority Scanner
 */

const PRIMARY_COLOR = "#2C5F7C";
const SECONDARY_COLOR = "#FFC629";

/**
 * Base email wrapper with Opkie branding
 */
function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Opkie Digital Authority Scanner</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #1e3a5f 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Opkie</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Digital Authority Scanner</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">
                Opkie - Digital Authority Scanner
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                This email was sent because you requested a Digital Authority Scan for your practice.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Scan Confirmation Email
 * Sent immediately after form submission
 */
export function getConfirmationEmail(params: {
  contactName: string;
  practiceName: string;
}): { subject: string; html: string } {
  const content = `
    <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 22px; font-weight: bold;">
      Thanks for requesting your Digital Authority Scan!
    </h2>

    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 1.6;">
      Hi ${params.contactName},
    </p>

    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 1.6;">
      We're currently analyzing <strong>${params.practiceName}</strong>'s online presence across 47 data points.
    </p>

    <div style="background-color: #f0f9ff; border-left: 4px solid ${PRIMARY_COLOR}; padding: 20px; margin: 24px 0; border-radius: 6px;">
      <p style="margin: 0 0 12px 0; color: #1e3a8a; font-size: 15px; font-weight: 600;">
        What we're scanning:
      </p>
      <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; line-height: 1.8;">
        <li>Profit Zone positioning (high-value services)</li>
        <li>Review health and velocity</li>
        <li>NAP consistency across directories</li>
        <li>Core 30 trust signals</li>
        <li>Technical trust factors</li>
        <li>Directory dominance</li>
      </ul>
    </div>

    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 1.6;">
      Your personalized Digital Authority Score and detailed report will be ready in approximately <strong>2-5 minutes</strong>.
    </p>

    <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
      We'll email you as soon as it's ready.
    </p>
  `;

  return {
    subject: `Your Digital Authority Scan is Processing - ${params.practiceName}`,
    html: emailWrapper(content),
  };
}

/**
 * Results Ready Email
 * Sent when scan completes with results link
 */
export function getResultsReadyEmail(params: {
  contactName: string;
  practiceName: string;
  overallScore: number;
  resultsUrl: string;
}): { subject: string; html: string } {
  const scoreColor = params.overallScore >= 75 ? "#16a34a" : params.overallScore >= 50 ? "#eab308" : "#dc2626";
  const scoreLabel = params.overallScore >= 75 ? "Strong" : params.overallScore >= 50 ? "Moderate" : "Needs Improvement";

  const content = `
    <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 22px; font-weight: bold;">
      Your Digital Authority Score is Ready
    </h2>

    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 1.6;">
      Hi ${params.contactName},
    </p>

    <p style="margin: 0 0 24px 0; color: #374151; font-size: 16px; line-height: 1.6;">
      We've completed analyzing <strong>${params.practiceName}</strong>'s digital presence. Here's what we found:
    </p>

    <div style="background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #1e3a5f 100%); padding: 30px; text-align: center; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0 0 8px 0; color: rgba(255,255,255,0.9); font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
        Your Digital Authority Score
      </p>
      <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 56px; font-weight: bold; line-height: 1;">
        ${params.overallScore}
      </p>
      <p style="margin: 0; padding: 8px 16px; background-color: ${scoreColor}; color: #ffffff; font-size: 14px; font-weight: 600; border-radius: 20px; display: inline-block;">
        ${scoreLabel}
      </p>
    </div>

    <p style="margin: 0 0 24px 0; color: #374151; font-size: 16px; line-height: 1.6;">
      Your detailed report includes:
    </p>

    <ul style="margin: 0 0 24px 0; padding-left: 20px; color: #374151; font-size: 15px; line-height: 1.8;">
      <li>Phase-by-phase breakdown of your scores</li>
      <li>Specific gaps identified in each module</li>
      <li>Prioritized action items to improve your score</li>
      <li>Competitive positioning analysis</li>
    </ul>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${params.resultsUrl}" style="display: inline-block; background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #1e3a5f 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
        View Your Complete Report
      </a>
    </div>

    <div style="background-color: #fffbeb; border-left: 4px solid ${SECONDARY_COLOR}; padding: 20px; margin: 24px 0; border-radius: 6px;">
      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
        <strong>Want to discuss your results?</strong><br>
        Book a free 15-minute strategy call to learn how to improve your Digital Authority Score and attract more high-value patients.
      </p>
    </div>
  `;

  return {
    subject: `Your Digital Authority Score: ${params.overallScore}/100 - ${params.practiceName}`,
    html: emailWrapper(content),
  };
}

/**
 * Follow-up Email
 * Sent 24-48 hours after results if no booking
 */
export function getFollowUpEmail(params: {
  contactName: string;
  practiceName: string;
  overallScore: number;
  resultsUrl: string;
}): { subject: string; html: string } {
  const content = `
    <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 22px; font-weight: bold;">
      Have you reviewed your Digital Authority Score?
    </h2>

    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 1.6;">
      Hi ${params.contactName},
    </p>

    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 1.6;">
      A few days ago, we sent you <strong>${params.practiceName}</strong>'s Digital Authority Score of <strong>${params.overallScore}/100</strong>.
    </p>

    <p style="margin: 0 0 24px 0; color: #374151; font-size: 16px; line-height: 1.6;">
      Most practices we scan discover they're losing 5-10 high-value patients per month to competitors with stronger digital authority. The good news? These gaps are fixable.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${params.resultsUrl}" style="display: inline-block; background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #1e3a5f 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
        Review Your Report
      </a>
    </div>

    <div style="background-color: #f0f9ff; padding: 24px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0 0 12px 0; color: #1e3a8a; font-size: 16px; font-weight: 600;">
        Quick wins we've identified for your practice:
      </p>
      <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.8;">
        Our analysis found specific opportunities that could improve your visibility to patients searching for implants, veneers, and Invisalign. These aren't generic recommendations - they're based on your actual digital footprint.
      </p>
    </div>

    <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
      Want to discuss how to implement these improvements? Book a free 15-minute strategy call.
    </p>
  `;

  return {
    subject: `Still reviewing your score? Quick wins inside - ${params.practiceName}`,
    html: emailWrapper(content),
  };
}
