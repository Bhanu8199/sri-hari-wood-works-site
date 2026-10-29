# Sri Hari Wood Works Site

A production-ready, responsive business website built with Next.js, TypeScript, Tailwind CSS, and Supabase-ready architecture.

## Features
- Public website for home, services, projects, about, contact, FAQ, and privacy pages
- Conversion-focused calls-to-action for phone, WhatsApp, and estimate requests
- Enquiry form with server-side validation, rate limiting, and Supabase-ready insertion logic
- Protected admin dashboard for enquiries, services, projects, settings, and content management
- Local admin bootstrap using trusted server-side credentials before Supabase Auth is configured
- SEO metadata, sitemap, robots rules, and structured business data
- Responsive design, accessible UI patterns, and reusable components

## Tech stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL + Auth
- Resend email integration
- shadcn/ui-inspired design system

## Local setup
1. Install dependencies:
   npm install
2. Copy `.env.example` to `.env.local` and replace placeholder values.
3. Run the app:
   npm run dev
4. Open `http://localhost:3000`

## Admin bootstrap
- Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`.
- Visit `/admin/login`.
- Sign in using those values.
- In production, replace this fallback with an authenticated Supabase admin user and secure RLS policies.

## Database setup
1. Create a Supabase project.
2. Run the migration files under `supabase/migrations`.
3. Add the public and service-role keys to your environment.
4. Configure RLS for private admin tables and public content tables.

## Email setup
- Configure `RESEND_API_KEY`, `BUSINESS_NOTIFICATION_EMAIL`, and `RESEND_FROM_EMAIL`.
- Verify the sender domain in Resend before production email sending.

## Deployment
- Deploy on Vercel.
- Add all production variables in Vercel project settings.
- Configure Cloudflare DNS if needed.
- Submit the sitemap to Google Search Console after launch.

## Repository structure
- `src/app` – public pages and admin routes
- `src/components` – reusable UI blocks
- `src/lib` – business data, validation, Supabase helpers, and utilities
- `supabase/migrations` – SQL schema and policies
- `supabase/seed.sql` – sample public content

## External configuration checklist
- Supabase project URL and anon key
- Supabase service role key
- Resend API key and verified sender email
- Google Business Profile verification link
- Business-specific gallery and service photos from the owner

## Remaining blockers
- Live Supabase credentials must be added for production persistence and authentication.
- Real owner-approved project photos and business profile details should replace placeholder content before publication.
- Final business hours and local service coverage should be confirmed with the owner before launch.
