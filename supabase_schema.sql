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
