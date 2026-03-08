-- Create Site Visits Table
CREATE TABLE IF NOT EXISTS site_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_visits INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a default row if the table is empty
INSERT INTO site_visits (total_visits)
SELECT 0
WHERE NOT EXISTS (SELECT 1 FROM site_visits);
