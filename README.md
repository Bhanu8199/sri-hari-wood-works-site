# Sri Hari Wood Works Site

A responsive business website built with Next.js, TypeScript, Tailwind CSS, and Neon PostgreSQL.

## Features

- Public home, services, work gallery, about, contact, reviews, FAQ, and privacy pages
- Phone, WhatsApp, and estimate enquiry actions
- Server-validated estimate form with Neon PostgreSQL persistence
- Protected admin pages for enquiries and business settings
- Business profile, weekly hours, holidays, and service descriptions managed in Neon
- SEO metadata, sitemap, robots rules, and structured business data

## Local setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` to the Neon connection string from the Neon dashboard. Use the pooled connection string for the serverless deployment, and keep the password private.
4. Configure admin credentials.
5. In the Neon SQL Editor, run `neon/migrations/001_initial_schema.sql`, then run `neon/seed.sql`.
6. Start the website:
   ```sh
   npm run dev
   ```
7. Open `http://localhost:3000`.

Without `DATABASE_URL`, public pages use built-in default business data. Forms and database-backed admin features require a working Neon database.

## Neon schema and seed

- `neon/migrations/001_initial_schema.sql` creates the business profile, business hours, services, projects, project images, enquiries, holidays, FAQs, and admin profile tables.
- `neon/seed.sql` inserts the initial business details, five services, hours, and FAQs. Run it once on a new database; it updates the initial profile/service records on rerun.
- Estimate requests are stored in Neon with their submission timestamp. No notification service is called when a form is submitted.
- View submissions in Neon Console → **Tables** → `enquiries`, or sign in and open `/admin/enquiries`.

## Existing data migration

Changing the application connection does not copy existing records from a Supabase project or a local SQLite database. Export any records you need to keep and import them into the corresponding Neon tables before retiring the old database. Preserve UUIDs and the relationships between services and enquiries when migrating.

## Admin access

- Set a unique `ADMIN_USERNAME` and a strong `ADMIN_PASSWORD` in `.env.local`; the example password is rejected.
- Sign in at `/admin/login`.
- The admin login currently uses these server environment credentials; database content and settings are stored in Neon.

## Deployment

- Deploy on Vercel or another Node.js host.
- Set `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` in the deployment environment.
- Keep database credentials server-side; never expose `DATABASE_URL` as a public variable.

## Project structure

- `src/app` – public pages, admin routes, and API routes
- `src/components` – reusable UI
- `src/lib` – Neon connection, business data, validation, and utilities
- `neon/migrations` – PostgreSQL schema
- `neon/seed.sql` – initial business content
