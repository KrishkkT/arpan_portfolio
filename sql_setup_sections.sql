-- Run this in the Supabase Dashboard SQL Editor
CREATE TABLE section_visibility (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT UNIQUE NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO section_visibility (section_name, is_visible) VALUES 
('hero', true),
('about', true),
('skills', true),
('projects', true),
('experience', true),
('contact', true)
ON CONFLICT (section_name) DO NOTHING;
