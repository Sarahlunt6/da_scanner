# GoHighLevel Workflow Setup Guide

This guide walks you through setting up automated workflows in GoHighLevel for the Digital Authority Scanner.

## Overview

The workflow will handle:
1. **Immediate confirmation** when scan is requested (handled by app)
2. **Results delivery** when scan completes (handled by app)
3. **Follow-up sequence** 24-48 hours after results if no booking (handled by GHL workflow)
4. **Booking confirmation** and next steps (handled by GHL workflow)

---

## Step 1: Get Your GHL API Credentials

### Getting Your API Key:
1. Log into your GoHighLevel account
2. Go to **Settings** → **API Key** (or **Integrations** → **API Key**)
3. Click **Create API Key** or use existing key
4. Copy the API key
5. Add to your `.env.local` and Vercel:
   ```
   GHL_API_KEY=your_api_key_here
   ```

### Getting Your Location ID:
1. In GHL, go to **Settings** → **Business Profile**
2. Look at the URL: `https://app.gohighlevel.com/location/YOUR_LOCATION_ID/settings`
3. Copy the location ID from the URL
4. Add to your `.env.local` and Vercel:
   ```
   GHL_LOCATION_ID=your_location_id_here
   ```

### Setting Your From Email:
1. In GHL, go to **Settings** → **Email Services**
2. Verify your sending domain
3. Add verified email to `.env.local` and Vercel:
   ```
   GHL_FROM_EMAIL=hello@yourdomain.com
   ```

---

## Step 2: Create Custom Fields in GHL

You need these custom fields to track scan data:

1. Go to **Settings** → **Custom Fields** → **Contact Custom Fields**
2. Create the following fields:

| Field Name | Field Key | Type | Description |
|------------|-----------|------|-------------|
| Practice Name | `practice_name` | Text | Dental practice name |
| Website URL | `website_url` | Text | Practice website |
| Digital Authority Score | `da_score` | Number | Overall score (0-100) |
| Scan Token | `scan_token` | Text | Unique token for results URL |
| Scan Date | `scan_date` | Date | When scan was completed |
| Phase 1 Score | `phase1_score` | Number | Phase 1 score |
| Phase 2 Score | `phase2_score` | Number | Phase 2 score |
| Phase 3 Score | `phase3_score` | Number | Phase 3 score |

---

## Step 3: Create Tags

Create these tags in GHL for workflow triggers:

1. Go to **Settings** → **Tags**
2. Create these tags:
   - `Digital Authority Scan` - Applied when scan is requested
   - `Scan Requested` - Applied at form submission
   - `Scan Completed` - Applied when results are ready
   - `Booked Strategy Call` - Applied when calendar booking happens
   - `High Score` - Applied for scores 75+
   - `Medium Score` - Applied for scores 50-74
   - `Low Score` - Applied for scores below 50

---

## Step 4: Create the Follow-Up Workflow

### Workflow Name: "Digital Authority Scanner - Follow Up"

**Trigger:** Tag added: `Scan Completed`

**Workflow Steps:**

#### Step 1: Wait 24 Hours
- **Action Type:** Wait/Delay
- **Duration:** 24 hours
- **Purpose:** Give them time to review results

#### Step 2: Check if They Booked
- **Action Type:** If/Else Condition
- **Condition:** Contact does NOT have tag `Booked Strategy Call`
- **If True:** Continue to Step 3
- **If False:** Exit workflow

#### Step 3: Send Follow-Up Email
- **Action Type:** Send Email
- **Email Template:** Create "Digital Authority Follow-Up" template
- **From:** Your verified email
- **Subject:** `Still reviewing your score? Quick wins inside - {{practice_name}}`
- **Body:** Use the follow-up email content from your app's template

#### Step 4: Wait 3 Days
- **Action Type:** Wait/Delay
- **Duration:** 3 days (72 hours)

#### Step 5: Check if They Booked (Again)
- **Action Type:** If/Else Condition
- **Condition:** Contact does NOT have tag `Booked Strategy Call`
- **If True:** Continue to Step 6
- **If False:** Exit workflow

#### Step 6: Send Final Follow-Up
- **Action Type:** Send Email
- **Subject:** `Last chance: Your {{da_score}} score review - {{practice_name}}`
- **Body:** Final value-driven email with urgency

#### Step 7: Add to Long-Term Nurture
- **Action Type:** Add Tag
- **Tag:** `Long Term Nurture`
- **Purpose:** Move them to a separate nurture sequence

---

## Step 5: Create Score-Based Workflows (Optional)

Create separate workflows for different score ranges with tailored messaging:

### High Score Workflow (75+)
- **Trigger:** Tag `High Score` is added
- **Message:** Focus on "optimization" and "staying ahead"
- **Urgency:** Lower, they're doing well

### Medium Score Workflow (50-74)
- **Trigger:** Tag `Medium Score` is added
- **Message:** Focus on "quick wins" and "closing gaps"
- **Urgency:** Moderate

### Low Score Workflow (<50)
- **Trigger:** Tag `Low Score` is added
- **Message:** Focus on "opportunity" and "competitor advantage"
- **Urgency:** Higher, they're losing patients

---

## Step 6: Create Booking Confirmation Workflow

### Workflow Name: "Digital Authority Scanner - Booking Confirmed"

**Trigger:** Tag added: `Booked Strategy Call`

#### Step 1: Send Confirmation Email
- **Action Type:** Send Email
- **Subject:** `Strategy Call Confirmed - {{contact.name}}`
- **Body:** Include:
  - Confirmation of date/time
  - What to prepare
  - Calendar link (if not already sent)
  - Reminder about their score

#### Step 2: Send Reminder 24 Hours Before
- **Action Type:** Wait Until Date
- **Date:** Appointment start time - 24 hours
- **Then:** Send reminder email

#### Step 3: Send Pre-Call Email 1 Hour Before
- **Action Type:** Wait Until Date
- **Date:** Appointment start time - 1 hour
- **Then:** Send final reminder with Zoom/meeting link

---

## Step 7: Update Your App to Send More Data to GHL

To make these workflows work better, update your GHL client to send custom field data:

```typescript
// In lib/email/service.ts - Update sendResultsEmail function

// After sending the results email, update custom fields
await ghlClient.updateContactCustomFields(contactId, {
  practice_name: params.practiceName,
  da_score: params.overallScore.toString(),
  scan_token: params.token,
  scan_date: new Date().toISOString(),
  phase1_score: phase1Score.toString(),
  phase2_score: phase2Score.toString(),
  phase3_score: phase3Score.toString(),
});

// Add score-based tag
const scoreTag = params.overallScore >= 75 ? 'High Score'
  : params.overallScore >= 50 ? 'Medium Score'
  : 'Low Score';

await ghlClient.addTagsToContact(contactId, [scoreTag]);
```

---

## Step 8: Test Your Workflow

1. Submit a test scan through your app
2. Check GHL to confirm contact was created
3. Verify tags were applied: `Digital Authority Scan`, `Scan Requested`
4. Wait for scan to complete
5. Check that `Scan Completed` tag was added
6. Wait 24 hours (or manually advance in workflow test mode)
7. Verify follow-up email sent
8. Test booking flow and confirm tag application

---

## Email Template Examples for GHL

### Follow-Up Email Template (for Step 3)

**Subject:** `Still reviewing your score? Quick wins inside - {{custom_values.practice_name}}`

**Body:**
```html
Hi {{contact.first_name}},

A few days ago, we sent you {{custom_values.practice_name}}'s Digital Authority Score of {{custom_values.da_score}}/100.

Most practices we scan discover they're losing 5-10 high-value patients per month to competitors with stronger digital authority. The good news? These gaps are fixable.

<a href="https://yourapp.com/results/{{custom_values.scan_token}}">View Your Complete Report</a>

Our analysis found specific opportunities that could improve your visibility to patients searching for implants, veneers, and Invisalign. These aren't generic recommendations - they're based on your actual digital footprint.

Want to discuss how to implement these improvements? Book a free 15-minute strategy call.

<a href="YOUR_CALENDAR_LINK">Book Your Strategy Call</a>

Best,
Your Name
Opkie
```

---

## Monitoring & Optimization

### Key Metrics to Track:
1. **Email Open Rates** - Check in GHL reporting
2. **Click-Through Rates** - Results page visits after email
3. **Booking Rate** - % who book strategy call
4. **Time to Book** - How long after results they book
5. **Score Correlation** - Do higher scores book more/less?

### Optimization Tips:
- Test different send times for follow-ups
- A/B test email subject lines
- Adjust wait times based on engagement data
- Segment by score for better personalization

---

## Troubleshooting

**Contacts Not Being Created:**
- Verify API key is correct
- Check location ID matches your account
- Look at app logs for GHL API errors

**Emails Not Sending:**
- Verify from email is verified in GHL
- Check email service settings in GHL
- Confirm GHL has email credits/active plan

**Tags Not Applying:**
- Check tag names match exactly (case-sensitive)
- Verify contact was created successfully
- Check GHL activity log for contact

**Custom Fields Not Populating:**
- Ensure custom field keys match exactly
- Verify fields are set to "Contact" level, not "Opportunity"
- Check API response for error messages

---

## Next Steps

After setting up workflows:
1. Integrate GHL calendar booking (see next task)
2. Add calendar link to emails and results page
3. Set up GHL conversations inbox for responses
4. Create internal notifications for bookings
5. Set up reporting dashboard in GHL

---

Need help? Check GHL's documentation or support at support.gohighlevel.com
