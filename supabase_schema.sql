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
  is_visible BOOLEAN DEFAULT TRUE,
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

-- Skills Table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  level INTEGER CHECK (level >= 0 AND level <= 100),
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experience Table
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
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
('contact', true)
ON CONFLICT (section_name) DO NOTHING;

-- Insert default skills
INSERT INTO skills (category, name, level) VALUES
('Electronics', 'Circuit Design', 90),
('Electronics', 'PCB Design', 85),
('Electronics', 'Digital Signal Processing', 80),
('Electronics', 'Microcontrollers (STM32, ESP32)', 95),
('Programming', 'Embedded C', 95),
('Programming', 'C++', 85),
('Programming', 'Python', 90),
('Programming', 'JavaScript / React', 75),
('Engineering Tools', 'MATLAB / Simulink', 90),
('Engineering Tools', 'Arduino IDE', 95),
('Engineering Tools', 'Proteus / Multisim', 85),
('Engineering Tools', 'KiCad / Altium', 80),
('Technologies', 'Internet of Things (IoT)', 90),
('Technologies', 'RTOS', 80),
('Technologies', 'Network Protocols', 85),
('Technologies', 'Embedded Linux', 75)
ON CONFLICT DO NOTHING;

-- Insert default experiences
INSERT INTO experiences (role, company, location, period, description, type) VALUES
('Embedded Systems Intern', 'Tech Electronics Solutions', 'Ahmedabad, India', '2024 - Present', 'Developing firmware for STM32 microcontrollers and designing PCBS for IoT sensing modules.', 'Internship'),
('Junior Research Assistant', 'University Research Lab', 'Remote', '2023 - 2024', 'Assisted in research on digital signal processing algorithms for biomedical signal analysis.', 'Research'),
('Hardware Design Lead', 'Student Project - EcoTrack', 'College Campus', '2022 - 2023', 'Led a team of 4 to build a solar-powered environmental monitoring station.', 'Project')
ON CONFLICT DO NOTHING;
