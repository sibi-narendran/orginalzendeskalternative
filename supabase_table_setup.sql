-- Create emails table for storing email submissions
CREATE TABLE emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional, for added security)
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust as needed)
CREATE POLICY "Allow all operations on emails" ON emails
FOR ALL USING (true) WITH CHECK (true);

-- Create an index for better query performance
CREATE INDEX emails_timestamp_idx ON emails (timestamp DESC);
CREATE INDEX emails_email_idx ON emails (email);
