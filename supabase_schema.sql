-- Create Projects Table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[],
  github_link TEXT,
  stars INTEGER DEFAULT 0,
  category TEXT CHECK (category IN ('Hardware', 'Software', 'Research')) DEFAULT 'Software',
  last_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_github_sync BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Contacts Table (for messages)
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles for Admin management
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  role TEXT DEFAULT 'admin'
);

-- Section Visibility Table
CREATE TABLE section_visibility (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL UNIQUE,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default visibility for sections
INSERT INTO section_visibility (section_name, is_visible) VALUES
('about', true),
('skills', true),
('projects', true),
('experience', true),
('contact', true);
