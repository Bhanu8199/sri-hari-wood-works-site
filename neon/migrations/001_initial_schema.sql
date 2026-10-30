CREATE TABLE IF NOT EXISTS business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  phone TEXT,
  secondary_phone TEXT,
  whatsapp_phone TEXT,
  address TEXT,
  postal_code TEXT,
  google_business_url TEXT,
  directions_url TEXT,
  experience_years INTEGER,
  logo_url TEXT,
  hero_image_url TEXT,
  email TEXT,
  owner_name TEXT,
  co_owner_name TEXT,
  service_area TEXT,
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_profile_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  opens_at TIME,
  closes_at TIME,
  is_closed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (business_profile_id, day_of_week)
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT,
  description TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at DATE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_id UUID REFERENCES services(id),
  project_location TEXT,
  project_description TEXT,
  preferred_contact_method TEXT,
  status TEXT NOT NULL DEFAULT 'New'
    CHECK (status IN ('New', 'Contacted', 'Estimate Pending', 'In Progress', 'Completed', 'Closed')),
  internal_notes TEXT,
  follow_up_at TIMESTAMPTZ,
  consent_at TIMESTAMPTZ,
  notification_status TEXT NOT NULL DEFAULT 'not_configured'
    CHECK (notification_status IN ('pending', 'sent', 'failed', 'not_configured')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS business_holidays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_profile_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  holiday_date DATE NOT NULL,
  holiday_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (business_profile_id, holiday_date)
);

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT,
  category TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_business_hours_profile_id ON business_hours(business_profile_id);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(is_published);
