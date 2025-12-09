-- Vercel Postgres Schema for HR4Sight Compliance Scanner
-- Run this in your Vercel Postgres database

-- Create scans table
CREATE TABLE IF NOT EXISTS scans (
  id SERIAL PRIMARY KEY,
  practice_name VARCHAR(255) NOT NULL,
  website_url TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  contact_name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  unique_token VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  overall_score INTEGER,
  phase1_score INTEGER,
  phase2_score INTEGER,
  phase3_score INTEGER,
  results_json JSONB,
  error_message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '7 days')
);

-- Create scan_details table
CREATE TABLE IF NOT EXISTS scan_details (
  id SERIAL PRIMARY KEY,
  scan_id INTEGER NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
  module_name VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  gap_message TEXT,
  data_json JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id SERIAL PRIMARY KEY,
  scan_id INTEGER REFERENCES scans(id) ON DELETE SET NULL,
  email_to VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  status VARCHAR(50) NOT NULL,
  provider VARCHAR(50),
  error_message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_scans_token ON scans(unique_token);
CREATE INDEX IF NOT EXISTS idx_scans_email ON scans(email);
CREATE INDEX IF NOT EXISTS idx_scans_status ON scans(status);
CREATE INDEX IF NOT EXISTS idx_scans_expires_at ON scans(expires_at);
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON scans(created_at);
CREATE INDEX IF NOT EXISTS idx_scan_details_scan_id ON scan_details(scan_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_scan_id ON email_logs(scan_id);
