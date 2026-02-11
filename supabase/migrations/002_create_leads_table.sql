-- Create leads table for RateCutter lead capture
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    business_name TEXT,
    monthly_volume NUMERIC,
    monthly_fees NUMERIC,
    effective_rate NUMERIC,
    proposed_rate NUMERIC,
    monthly_savings NUMERIC,
    annual_savings NUMERIC,
    business_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from web app
CREATE POLICY IF NOT EXISTS "Allow anonymous inserts" 
    ON leads 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Allow reading (for verification)
CREATE POLICY IF NOT EXISTS "Allow anonymous select" 
    ON leads 
    FOR SELECT 
    TO anon 
    USING (true);
