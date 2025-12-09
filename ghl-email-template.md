# GHL Email Template - Digital Authority Score Report

## Subject Line Options (Choose One):

**Option 1 (Direct):**
```
Your Digital Authority Score: {{inboundWebhookRequest.da_score}}/100
```

**Option 2 (Curiosity-driven):**
```
{{inboundWebhookRequest.contact_name}}, Your Online Visibility Report is Ready
```

**Option 3 (Value-focused):**
```
Here's How {{inboundWebhookRequest.business_name}} Ranks Against Your Competitors
```

**RECOMMENDED Subject Line:**
```
{{inboundWebhookRequest.contact_name}}, Your Digital Authority Score: {{inboundWebhookRequest.da_score}}/100
```

---

## Email Body (HTML Format for GHL):

### Plain Text Version:
```
Hi {{inboundWebhookRequest.contact_name}},

Thank you for requesting your Digital Authority Scan for {{inboundWebhookRequest.business_name}}!

YOUR DIGITAL AUTHORITY SCORE: {{inboundWebhookRequest.da_score}}/100

We've analyzed your business's online presence across 47 critical data points using our TAPS Framework (Trust, Accessibility, Positioning, Site Authority, and Strategic SEO).

Here's your breakdown:

• Trust & Credibility: {{inboundWebhookRequest.trust_score}}/100
• Accessibility & Discoverability: {{inboundWebhookRequest.accessibility_score}}/100
• Competitive Positioning: {{inboundWebhookRequest.positioning_score}}/100
• Website Authority: {{inboundWebhookRequest.site_authority_score}}/100
• Strategic SEO: {{inboundWebhookRequest.strategic_seo_score}}/100

What This Means for Your Business:

Your score of {{inboundWebhookRequest.da_score}}/100 indicates there are opportunities to strengthen your online presence and attract more customers.

The businesses that dominate local search results typically score 85+ across all five TAPS pillars. Every point below that threshold represents potential revenue you're leaving on the table.

Next Steps:

I'd like to personally walk you through your report and show you the specific gaps we've identified—and more importantly, how to fix them.

Would you be available for a quick 15-minute call this week?

[BOOK YOUR STRATEGY CALL]

Best regards,
[Your Name]
HR4Sight - Digital Authority Experts

P.S. The businesses in your area that show up first in Google aren't there by accident. Let's discuss how to get {{inboundWebhookRequest.business_name}} to that same level.

---

Questions? Reply to this email or call us at [YOUR PHONE]
```

---

### HTML Version (Styled for GHL):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header with Logo/Branding -->
          <tr>
            <td style="background: linear-gradient(135deg, #29377f 0%, #1e2654 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Your Digital Authority Score</h1>
              <p style="color: #fbab3f; margin: 10px 0 0 0; font-size: 16px; font-weight: 600;">Powered by HR4Sight</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">

              <!-- Greeting -->
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi <strong>{{inboundWebhookRequest.contact_name}}</strong>,
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Thank you for requesting your Digital Authority Scan for <strong>{{inboundWebhookRequest.business_name}}</strong>!
              </p>

              <!-- Score Highlight Box -->
              <table width="100%" cellpadding="20" cellspacing="0" style="background: linear-gradient(135deg, #fbab3f 0%, #e89a2d 100%); border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <p style="color: #1e2654; font-size: 14px; font-weight: 600; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">Your Digital Authority Score</p>
                    <h2 style="color: #1e2654; font-size: 48px; font-weight: bold; margin: 0;">{{inboundWebhookRequest.da_score}}/100</h2>
                  </td>
                </tr>
              </table>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                We've analyzed your business's online presence across <strong>47 critical data points</strong> using our TAPS Framework.
              </p>

              <!-- TAPS Breakdown -->
              <h3 style="color: #29377f; font-size: 20px; font-weight: bold; margin: 30px 0 20px 0;">Your TAPS Breakdown:</h3>

              <!-- Trust Score -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #29377f; border-radius: 4px;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="margin: 0; color: #29377f; font-size: 14px; font-weight: 600;">Trust & Credibility</p>
                        </td>
                        <td align="right">
                          <p style="margin: 0; color: #29377f; font-size: 18px; font-weight: bold;">{{inboundWebhookRequest.trust_score}}/100</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Accessibility Score -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #279dd8; border-radius: 4px;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="margin: 0; color: #279dd8; font-size: 14px; font-weight: 600;">Accessibility & Discoverability</p>
                        </td>
                        <td align="right">
                          <p style="margin: 0; color: #279dd8; font-size: 18px; font-weight: bold;">{{inboundWebhookRequest.accessibility_score}}/100</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Positioning Score -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #fbab3f; border-radius: 4px;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="margin: 0; color: #fbab3f; font-size: 14px; font-weight: 600;">Competitive Positioning</p>
                        </td>
                        <td align="right">
                          <p style="margin: 0; color: #fbab3f; font-size: 18px; font-weight: bold;">{{inboundWebhookRequest.positioning_score}}/100</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Site Authority Score -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #29377f; border-radius: 4px;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="margin: 0; color: #29377f; font-size: 14px; font-weight: 600;">Website Authority</p>
                        </td>
                        <td align="right">
                          <p style="margin: 0; color: #29377f; font-size: 18px; font-weight: bold;">{{inboundWebhookRequest.site_authority_score}}/100</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Strategic SEO Score -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #ef402c; border-radius: 4px;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="margin: 0; color: #ef402c; font-size: 14px; font-weight: 600;">Strategic SEO</p>
                        </td>
                        <td align="right">
                          <p style="margin: 0; color: #ef402c; font-size: 18px; font-weight: bold;">{{inboundWebhookRequest.strategic_seo_score}}/100</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What This Means -->
              <h3 style="color: #29377f; font-size: 20px; font-weight: bold; margin: 30px 0 15px 0;">What This Means for Your Business:</h3>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Your score of <strong>{{inboundWebhookRequest.da_score}}/100</strong> indicates there are opportunities to strengthen your online presence and attract more customers.
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                The businesses that dominate local search results typically score <strong>85+</strong> across all five TAPS pillars. Every point below that threshold represents potential revenue you're leaving on the table.
              </p>

              <!-- CTA Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f7ff; border-radius: 8px; border: 2px solid #29377f; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <h3 style="color: #29377f; font-size: 22px; font-weight: bold; margin: 0 0 15px 0;">Ready to Improve Your Score?</h3>
                    <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                      I'd like to personally walk you through your report and show you the specific gaps we've identified—and more importantly, how to fix them.
                    </p>
                    <a href="[YOUR_CALENDAR_LINK]" style="display: inline-block; background: linear-gradient(135deg, #fbab3f 0%, #e89a2d 100%); color: #1e2654; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 12px rgba(251, 171, 63, 0.3);">
                      Book Your Strategy Call →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Closing -->
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 10px 0;">
                Best regards,
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 5px 0; font-weight: 600;">
                [Your Name]
              </p>
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                HR4Sight - Digital Authority Experts
              </p>

              <!-- P.S. -->
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; padding: 20px; background-color: #fffbf0; border-left: 3px solid #fbab3f; border-radius: 4px;">
                <strong>P.S.</strong> The businesses in your area that show up first in Google aren't there by accident. Let's discuss how to get <strong>{{inboundWebhookRequest.business_name}}</strong> to that same level.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #666666; font-size: 12px; line-height: 1.6; margin: 0 0 10px 0;">
                Questions? Reply to this email or call us at <a href="tel:[YOUR_PHONE]" style="color: #29377f; text-decoration: none;">[YOUR PHONE]</a>
              </p>
              <p style="color: #999999; font-size: 11px; line-height: 1.6; margin: 0;">
                © 2025 HR4Sight. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## GHL Custom Values to Map:

When setting up this email in GHL, map these custom values:

- `{{inboundWebhookRequest.contact_name}}` → Contact First Name or Full Name
- `{{inboundWebhookRequest.business_name}}` → Custom Field: Business Name
- `{{inboundWebhookRequest.da_score}}` → Custom Field: DA Score
- `{{inboundWebhookRequest.trust_score}}` → Custom Field: Trust Score
- `{{inboundWebhookRequest.accessibility_score}}` → Custom Field: Accessibility Score
- `{{inboundWebhookRequest.positioning_score}}` → Custom Field: Positioning Score
- `{{inboundWebhookRequest.site_authority_score}}` → Custom Field: Site Authority Score
- `{{inboundWebhookRequest.strategic_seo_score}}` → Custom Field: Strategic SEO Score

Replace `[YOUR_CALENDAR_LINK]` with your actual GHL calendar booking link.
Replace `[YOUR_PHONE]` with your actual phone number.
Replace `[Your Name]` with the sender's name.

---

## Quick Setup in GHL:

1. Create a new email template in GHL
2. Copy the HTML version above
3. Replace all placeholder values with GHL custom fields
4. Test send to yourself
5. Add to your workflow after the webhook trigger

