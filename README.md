# Sri Hari Wood Works Site

A responsive business website built with Next.js, TypeScript, Tailwind CSS, Neon PostgreSQL, and Resend.

## Features

- Public home, services, work gallery, about, contact, reviews, FAQ, and privacy pages
- Phone, WhatsApp, and estimate enquiry actions
- Server-validated enquiry form with Neon PostgreSQL persistence and optional Resend email notifications
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
4. Configure admin credentials and, optionally, Resend email variables.
5. In the Neon SQL Editor, run `neon/migrations/001_initial_schema.sql` and `neon/migrations/002_whatsapp_notifications.sql`, then run `neon/seed.sql`.
6. Start the website:
   ```sh
   npm run dev
   ```
7. Open `http://localhost:3000`.

Without `DATABASE_URL`, public pages use built-in default business data. Forms and database-backed admin features require a working Neon database.

## Neon schema and seed

- `neon/migrations/001_initial_schema.sql` creates the business profile, business hours, services, projects, project images, enquiries, holidays, FAQs, and admin profile tables.
- `neon/seed.sql` inserts the initial business details, five services, hours, and FAQs. Run it once on a new database; it updates the initial profile/service records on rerun.
- Enquiries are inserted into Neon before Resend is contacted. Email configuration or delivery failures do not remove saved enquiries.
- Estimate requests are also sent to the configured business WhatsApp number when WhatsApp Cloud API is configured. Delivery status is stored separately from email notification status.
- View submissions in Neon Console → **Tables** → `enquiries`, or sign in and open `/admin/enquiries`.

## Existing data migration

Changing the application connection does not copy existing records from a Supabase project or a local SQLite database. Export any records you need to keep and import them into the corresponding Neon tables before retiring the old database. Preserve UUIDs and the relationships between services and enquiries when migrating.

For an existing Neon database that already has the enquiries table, run `neon/migrations/002_whatsapp_notifications.sql` to add its WhatsApp delivery status column before deploying this version.

## Admin access

- Set a unique `ADMIN_USERNAME` and a strong `ADMIN_PASSWORD` in `.env.local`; the example password is rejected.
- Sign in at `/admin/login`.
- The admin login currently uses these server environment credentials; database content and settings are stored in Neon.

## Email setup

- Configure `RESEND_API_KEY`, `BUSINESS_NOTIFICATION_EMAIL`, and a verified `RESEND_FROM_EMAIL`.
- Verify the sender domain with Resend before production email sending.
- The enquiry API saves the request to Neon first, then records whether its email notification was sent, failed, or is unconfigured.

## WhatsApp estimate alerts

- Create a WhatsApp Business Cloud API app and configure `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` on the server.
- Create and get approval for a WhatsApp message template named by `WHATSAPP_TEMPLATE_NAME` (default `estimate_submission_alert`) and set its language with `WHATSAPP_TEMPLATE_LANGUAGE` (default `en`). Business-initiated WhatsApp messages must use an approved template.
- Use this template body, then submit it for approval. Its six text variables are customer name, phone, service, location, project notes, and submission date/time, in that order:
  ```
  New estimate request for Sri Hari Wood Works
  Customer: {{1}}
  Phone: {{2}}
  Service: {{3}}
  Location: {{4}}
  Project notes: {{5}}
  Submitted: {{6}}
  ```
- Set `WHATSAPP_NOTIFICATION_TO` to the business recipient's international number, digits only. If unset, the API uses `whatsapp_phone` from the Neon business profile.
- WhatsApp delivery results are recorded in `enquiries.whatsapp_notification_status`; a notification failure does not discard the saved request.

## Deployment

- Deploy on Vercel or another Node.js host.
- Set `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` in the deployment environment.
- Set the Resend variables if email notifications are desired.
- Keep database credentials server-side; never expose `DATABASE_URL` as a public variable.

## Project structure

- `src/app` – public pages, admin routes, and API routes
- `src/components` – reusable UI
- `src/lib` – Neon connection, business data, validation, and utilities
- `neon/migrations` – PostgreSQL schema
- `neon/seed.sql` – initial business content
