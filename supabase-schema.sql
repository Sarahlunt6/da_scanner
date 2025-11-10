-- Digital Authority Scanner Database Schema
-- Run this in your Supabase SQL Editor

-- Create scans table
CREATE TABLE scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_name VARCHAR(255) NOT NULL,
    website_url VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'processing',
    overall_score INTEGER,
    phase1_score INTEGER,
    phase2_score INTEGER,
    phase3_score INTEGER,
    results_json JSONB,
    unique_token VARCHAR(100) UNIQUE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scan_details table
CREATE TABLE scan_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID REFERENCES scans(id) ON DELETE CASCADE,
    module_name VARCHAR(100) NOT NULL,
    score INTEGER,
    status VARCHAR(20),
    gap_message TEXT,
    data_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email_log table
CREATE TABLE email_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID REFERENCES scans(id) ON DELETE CASCADE,
    email_type VARCHAR(50) NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    delivery_status VARCHAR(50) DEFAULT 'pending'
);

-- Create indexes for better query performance
CREATE INDEX idx_scans_unique_token ON scans(unique_token);
CREATE INDEX idx_scans_email ON scans(email);
CREATE INDEX idx_scans_created_at ON scans(created_at DESC);
CREATE INDEX idx_scans_status ON scans(status);
CREATE INDEX idx_scan_details_scan_id ON scan_details(scan_id);
CREATE INDEX idx_email_log_scan_id ON email_log(scan_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for scans table
CREATE TRIGGER update_scans_updated_at BEFORE UPDATE ON scans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;

-- Create policies (allow service role to do everything, read access via token)
CREATE POLICY "Allow public read access via token" ON scans
    FOR SELECT
    USING (true);

CREATE POLICY "Allow service role full access" ON scans
    FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Allow public read access to scan details" ON scan_details
    FOR SELECT
    USING (true);

CREATE POLICY "Allow service role full access" ON scan_details
    FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON email_log
    FOR ALL
    USING (auth.role() = 'service_role');
