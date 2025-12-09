# Vercel Postgres Setup Guide

## Steps to Set Up Vercel Postgres

### 1. Create Vercel Postgres Database

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (da_scanner)
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name for your database (e.g., "hr4sight-db")
7. Click **Create**

### 2. Run Database Schema

After creating the database:

1. In your Vercel dashboard, go to **Storage** → Your Postgres database
2. Click on the **Query** tab
3. Copy the entire contents of `schema.sql` file
4. Paste it into the query editor
5. Click **Run** to execute the schema

This will create all necessary tables:
- `scans` - Stores scan submissions and results
- `scan_details` - Stores detailed module scores
- `email_logs` - Logs email sends

### 3. Environment Variables

Vercel automatically adds these environment variables to your project when you create a Postgres database:

- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

**You don't need to manually add these!** They're automatically configured.

### 4. Remove Old Supabase Environment Variables

In your Vercel project settings → Environment Variables, remove these if they exist:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 5. Deploy

After setting up the database and running the schema:

```bash
git add .
git commit -m "Migrate to Vercel Postgres"
git push
```

Vercel will automatically deploy with the new Postgres database connected.

## Verifying Setup

After deployment, test the application:

1. Submit a test scan form
2. Check if the scan is created in the database:
   - Go to Vercel Storage → Your Postgres database → Data tab
   - Check the `scans` table

3. Check if scan processing works:
   - Wait for the results
   - Verify `scan_details` and `email_logs` tables have entries

## Local Development

For local development, you need to pull the environment variables:

```bash
vercel env pull .env.local
```

This will download the Postgres connection strings to your local `.env.local` file.

## Troubleshooting

### "POSTGRES_URL is not defined"

- Make sure you've created the Postgres database in Vercel Storage
- Redeploy your project to pick up the new environment variables

### Schema errors

- Make sure you ran the entire `schema.sql` file
- Check the Query tab in Vercel Storage for any error messages

### Connection errors

- Vercel Postgres uses connection pooling
- The `@vercel/postgres` package handles this automatically
- No additional configuration needed

## Migration Checklist

- [x] Install `@vercel/postgres` package
- [x] Remove `@supabase/supabase-js` package
- [x] Update all API routes to use Vercel Postgres
- [x] Update results page to use Vercel Postgres
- [x] Create database schema file
- [ ] Create Vercel Postgres database
- [ ] Run schema.sql in Vercel
- [ ] Remove Supabase environment variables
- [ ] Deploy to Vercel
- [ ] Test with a real scan submission
