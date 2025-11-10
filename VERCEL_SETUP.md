# Vercel Environment Variables Setup

## Required for App to Work

Go to your Vercel project dashboard:
**Project Settings → Environment Variables**

Add these 3 required variables:

### 1. NEXT_PUBLIC_SUPABASE_URL
- **Value**: Your Supabase project URL (from Supabase Dashboard → Settings → API)
- **Environments**: ✅ Production ✅ Preview ✅ Development

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Value**: Your Supabase anon/public key (from Supabase Dashboard → Settings → API)
- **Environments**: ✅ Production ✅ Preview ✅ Development

### 3. SUPABASE_SERVICE_ROLE_KEY
- **Value**: Your Supabase service role key (from Supabase Dashboard → Settings → API)
- **Environments**: ✅ Production ✅ Preview ✅ Development
- ⚠️ **IMPORTANT**: Keep this secret! It bypasses Row Level Security

## Optional (Add Later)

These can be added when you get the API keys:

```
GOOGLE_PLACES_API_KEY=
GOOGLE_PAGESPEED_API_KEY=
YELP_API_KEY=
SCRAPER_API_KEY=
EMAIL_API_KEY=
EMAIL_FROM=opkie@opkie.com
NEXT_PUBLIC_APP_URL=https://scan.opkie.com
```

## After Adding Variables

1. Go to **Deployments** tab
2. Click the **︙** menu on the latest deployment
3. Click **Redeploy**

Or just push a new commit and Vercel will auto-deploy.

## Copy from Local

Your values are already in `.env.local` - just copy them to Vercel!
