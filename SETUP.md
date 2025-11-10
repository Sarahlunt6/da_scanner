# Digital Authority Scanner - Setup Guide

## Prerequisites

- Node.js 18+ installed
- Supabase account
- Vercel account
- GitHub account

## 1. Supabase Setup

### Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL script in `supabase-schema.sql`
4. Verify tables were created: `scans`, `scan_details`, `email_log`

### Get API Keys

1. Go to Project Settings > API
2. Copy your Project URL
3. Copy your `anon` public key
4. Copy your `service_role` secret key (keep this secure!)

## 2. Environment Variables

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. Add other API keys as you get them:
   - Google Places API
   - Google PageSpeed API
   - Yelp Fusion API
   - ScraperAPI
   - Email service API key

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add all variables from `.env.example`
4. Set them for Production, Preview, and Development environments

## 3. Local Development

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 4. Deploy to Vercel

### Via GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Deploy!

### Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts to deploy.

## 5. Custom Domain Setup (scan.opkie.com)

1. In Vercel project settings, go to Domains
2. Add custom domain: `scan.opkie.com`
3. Add the DNS records Vercel provides to your domain registrar:
   - Type: CNAME
   - Name: scan
   - Value: cname.vercel-dns.com
4. Wait for DNS propagation (can take up to 48 hours)

## 6. API Keys Setup

### Google Places API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable "Places API"
4. Create API key in Credentials
5. Restrict key to Places API only
6. Add to environment variables

### Yelp Fusion API

1. Go to [Yelp Developers](https://www.yelp.com/developers)
2. Create an app
3. Copy your API key
4. Add to environment variables

### Google PageSpeed API

1. Same Google Cloud project as Places API
2. Enable "PageSpeed Insights API"
3. Can use same API key or create separate one
4. Add to environment variables

### ScraperAPI (Optional for MVP)

1. Sign up at [ScraperAPI](https://www.scraperapi.com)
2. Get your API key
3. Add to environment variables

### Email Service (Choose One)

**Resend (Recommended)**
1. Sign up at [Resend](https://resend.com)
2. Verify your domain (opkie.com)
3. Get API key
4. Add to environment variables

**SendGrid**
1. Sign up at [SendGrid](https://sendgrid.com)
2. Create API key
3. Verify sender email
4. Add to environment variables

## 7. Testing

### Test the Flow

1. Visit your deployed site
2. Fill out the form with test data
3. Check Supabase to see if record was created
4. Visit processing page
5. Visit results page with token

### Check Database

Go to Supabase > Table Editor > scans to verify data is being stored.

## 8. Next Steps

After basic setup is complete:

1. **Implement background job processing** for actual scanning
2. **Set up email templates** and sending
3. **Integrate scoring algorithms** from PRD
4. **Add calendar booking** (Calendly/GHL)
5. **Set up Google Analytics 4**
6. **Test with real dental practices**

## Troubleshooting

### Build Errors

- Make sure all dependencies are installed: `npm install`
- Check TypeScript errors: `npm run build`
- Verify environment variables are set

### Database Connection Issues

- Verify Supabase URL and keys are correct
- Check if tables exist in Supabase
- Review RLS policies if getting permission errors

### Deployment Issues

- Check Vercel logs for errors
- Ensure all environment variables are set in Vercel
- Verify build command is correct: `next build`

## Support

For issues, contact the development team or check the PRD in README.md for specifications.
