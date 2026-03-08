# Arpan Bhuva Portfolio - EC Engineer

A modern, professional portfolio website for Arpan Bhuva, an Electronics & Communication Engineer.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS V4, Framer Motion, GSAP, AOS.
- **Backend**: Next.js API Routes (Serverless).
- **Database**: Supabase (PostgreSQL).
- **Auth**: NextAuth.js (Integrated with Supabase Auth).
- **Icons**: Lucide React.
- **Animations**: AOS, Framer Motion.

## Features
- **Modern UI**: Light theme inspired by Stripe/Linear.
- **Project Sync**: Automatically pull projects from GitHub API.
- **Supabase Integration**: Real-time database and secure authentication.
- **Admin Panel**: Secure dashboard to manage projects, messages, and content.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Contact Form**: Interactive form with MongoDB storage.
- **SEO Ready**: OpenGraph tags and performance optimized.

## Getting Started

### 1. Prerequisites
- Node.js 18+
- Supabase account

### 2. Environment Setup
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:5000
GITHUB_TOKEN=your_github_token (optional)
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Deployment
Deploy easily on **Vercel** or **Netlify**. Ensure you add the environment variables to your deployment settings.

## Folder Structure
- `src/app`: App router pages and layouts.
- `src/components`: UI components and sections.
- `src/lib`: Database connections and models.
- `src/api`: API routes for GitHub, Contact, and Projects.
- `src/context`: Auth context provider.
- `src/data`: Static content.

## Admin Access
Login at `/admin/login`. Default credentials need to be seeded into the database or created via an initial sign-up logic.

## License
MIT
