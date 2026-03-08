-- Create Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default resume URL
INSERT INTO settings (id, value)
VALUES ('resume_url', '/resume.pdf')
ON CONFLICT (id) DO NOTHING;
