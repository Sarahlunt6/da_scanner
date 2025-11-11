# GHL Calendar Integration Setup Guide

This guide will help you add your GHL calendar widget to the results page.

---

## Step 1: Add the Calendar Embed Code to Environment Variables

### For Local Development:

1. Open your `.env.local` file
2. Add the following variable with your actual embed code:

```bash
NEXT_PUBLIC_GHL_CALENDAR_EMBED='<iframe src="https://link.opkie.com/widget/booking/cNv53O2YjeuWsPpjs2Js" style="width: 100%;border:none;overflow: hidden;" scrolling="no" id="cNv53O2YjeuWsPpjs2Js_1762880603408"></iframe><br><script src="https://link.opkie.com/js/form_embed.js" type="text/javascript"></script>'
```

**Important:** The entire HTML code must be wrapped in single quotes!

### For Vercel Production:

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Set:
   - **Name:** `NEXT_PUBLIC_GHL_CALENDAR_EMBED`
   - **Value:** Paste your entire embed code (same as above)
   - **Environment:** Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your app for changes to take effect

---

## Step 2: How the Calendar Widget Works

### Where It Appears:
The calendar widget appears in **two places** on the results page:
1. **Top Section** - Right after the score comparison chart
2. **Bottom Section** - In the final CTA after all phase breakdowns

### What Happens When Someone Books:

1. **User books appointment** through the embedded calendar
2. **GHL automatically:**
   - Creates/updates contact in your CRM
   - Tags them with "Booked Strategy Call" (you need to configure this)
   - Sends booking confirmation (if configured in your calendar settings)
3. **Your workflow triggers:**
   - The "Booked Strategy Call" tag prevents follow-up emails from being sent
   - Booking confirmation workflow starts (24hr reminder, 1hr reminder)

---

## Step 3: Configure GHL Calendar to Tag Contacts

To ensure contacts get tagged when they book, you need to configure your calendar:

1. In GHL, go to **Calendars** → **Calendar Settings**
2. Select your "Strategy Call" calendar
3. Go to the **Automation** tab
4. Under **After Booking**, add action:
   - **Action Type:** Add Tag
   - **Tag:** `Booked Strategy Call`
5. Save the calendar settings

**This is critical** - without this tag, the workflow logic won't work properly and users will continue to receive follow-up emails even after booking.

---

## Step 4: Test the Integration

### Testing Locally:

1. Make sure your `.env.local` has the `NEXT_PUBLIC_GHL_CALENDAR_EMBED` variable
2. Restart your dev server: `npm run dev`
3. Submit a test scan or use an existing results URL
4. Navigate to the results page
5. You should see the GHL calendar widget embedded in the page
6. Try booking an appointment

### Testing on Vercel:

1. Add the environment variable to Vercel (see Step 1)
2. Trigger a new deployment (push code or click "Redeploy")
3. Visit your results page on the live site
4. Verify the calendar widget loads and works

### Verify in GHL:

1. After booking, go to your GHL account
2. Find the contact in **Contacts**
3. Check that:
   - Contact has the "Booked Strategy Call" tag
   - Appointment appears in **Calendar**
   - Booking confirmation workflow triggered (if configured)

---

## Troubleshooting

### Calendar widget not showing:

**Problem:** Empty gray box with "Calendar booking widget will appear here"

**Solution:**
- Check that `NEXT_PUBLIC_GHL_CALENDAR_EMBED` is set in your environment
- Verify the variable name is spelled correctly (case-sensitive)
- Make sure the entire embed code is wrapped in single quotes
- Restart dev server or redeploy to Vercel

### Calendar widget shows but doesn't load:

**Problem:** Widget container appears but calendar doesn't render

**Solution:**
- Check browser console for errors
- Verify the iframe URL is correct and accessible
- Make sure the calendar is published in GHL
- Try accessing the iframe URL directly in browser

### Bookings not creating contacts in GHL:

**Problem:** Appointments are created but contacts aren't in CRM

**Solution:**
- Check your calendar settings in GHL
- Verify the calendar is connected to your location
- Make sure "Create Contact" is enabled in calendar automation

### "Booked Strategy Call" tag not applying:

**Problem:** Contact created but tag missing

**Solution:**
- Go to Calendar Settings → Automation → After Booking
- Add the "Add Tag" action with tag "Booked Strategy Call"
- Test by booking a new appointment

### Follow-up emails still sending after booking:

**Problem:** User books but still receives follow-up emails

**Solution:**
- Verify the "Booked Strategy Call" tag is applied to the contact
- Check workflow filter: should skip contacts WITH this tag
- Make sure workflow condition is "Does NOT have tag: Booked Strategy Call"

---

## Changing Your Calendar

If you need to use a different calendar or update the embed code:

1. **Get new embed code** from GHL:
   - Calendars → Calendar Settings → Share → Embed Code

2. **Update locally:**
   - Edit `.env.local`
   - Replace the value of `NEXT_PUBLIC_GHL_CALENDAR_EMBED`
   - Restart dev server

3. **Update on Vercel:**
   - Go to project Settings → Environment Variables
   - Edit the `NEXT_PUBLIC_GHL_CALENDAR_EMBED` variable
   - Save and redeploy

---

## Customizing the Calendar Appearance

The calendar widget inherits its styling from GHL's calendar settings:

1. In GHL, go to **Calendars** → **Calendar Settings**
2. Click **Widget Customization** or **Appearance**
3. Customize:
   - Colors (primary, secondary, text)
   - Font
   - Button styles
   - Form fields
4. Save changes
5. Changes will automatically reflect in your embedded widget

---

## Security Notes

- The embed code is safe to include in environment variables
- The calendar ID is public and meant to be embedded
- Booking data is securely processed by GHL
- All contact information goes directly to your GHL account

---

## Next Steps

Once your calendar is integrated:

1. ✅ Test the full booking flow
2. ✅ Verify GHL tagging works correctly
3. ✅ Confirm workflow automation triggers
4. ✅ Test reminder emails (24hr, 1hr before call)
5. ✅ Update email templates with any custom messaging

Your calendar booking is now fully integrated with your Digital Authority Scanner!
