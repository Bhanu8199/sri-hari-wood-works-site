INSERT INTO business_profiles (
  business_name, slug, description, phone, secondary_phone, whatsapp_phone, email,
  address, postal_code, google_business_url, directions_url, experience_years,
  owner_name, co_owner_name, service_area, timezone
) VALUES (
  'SRI HARI WOOD WORKS',
  'sri-hari-wood-works',
  'Wardrobes and cupboards, doors and windows, modular kitchens, cots and furniture, and customized wood works across Andhra Pradesh and Telangana.',
  '+919347978199',
  '+919948519979',
  '919347978199',
  'mbhanuvardhan630@gmail.com',
  'Somavarappadu, Eluru, Andhra Pradesh 534450',
  '534450',
  'https://share.google/nuxOcu96HdkfuPgMk',
  'https://www.google.com/maps/place/SRI+HARI+WOOD+WORKS/@16.75036,81.1116351,17z/data=!3m1!4b1!4m6!3m5!1s0x3a366bb71e153ef3:0xd3496e0b2fd37b8c!8m2!3d16.75036!4d81.11421!16s%2Fg%2F11s84khd_3?entry=ttu&g_ep=EgoyMDI2MTAyNy4wIKXMDSoASAFQAw%3D%3D',
  37,
  'SRI HARI MEDAPALLI',
  'BHANU VARDHAN MEDAPALLI',
  'Andhra Pradesh and Telangana',
  'Asia/Kolkata'
)
ON CONFLICT (slug) DO UPDATE SET
  business_name = EXCLUDED.business_name,
  description = EXCLUDED.description,
  phone = EXCLUDED.phone,
  secondary_phone = EXCLUDED.secondary_phone,
  whatsapp_phone = EXCLUDED.whatsapp_phone,
  email = EXCLUDED.email,
  address = EXCLUDED.address,
  postal_code = EXCLUDED.postal_code,
  google_business_url = EXCLUDED.google_business_url,
  directions_url = EXCLUDED.directions_url,
  experience_years = EXCLUDED.experience_years,
  owner_name = EXCLUDED.owner_name,
  co_owner_name = EXCLUDED.co_owner_name,
  service_area = EXCLUDED.service_area,
  timezone = EXCLUDED.timezone,
  updated_at = NOW();

INSERT INTO services (
  title, slug, short_description, description, cover_image_url, is_published, display_order
) VALUES
  ('WARDROBES & CUPBOARDS', 'wardrobes-cupboards', 'Custom-designed wardrobes and cupboards tailored to your space, storage needs, and preferred finish.', 'Custom-designed wardrobes and cupboards tailored to your space, storage needs, and preferred finish.', '/images/wardrobes-cupboards.png', TRUE, 1),
  ('DOORS & WINDOWS', 'doors-windows', 'Wooden doors and window woodwork designed to suit your home and project requirements.', 'Wooden doors and window woodwork designed to suit your home and project requirements.', '/images/doors-windows.png', TRUE, 2),
  ('MODULAR KITCHENS', 'modular-kitchens', 'Kitchen woodwork planned around your available space, storage needs, and preferred design.', 'Kitchen woodwork planned around your available space, storage needs, and preferred design.', '/images/modular-kitchens.png', TRUE, 3),
  ('COTS & FURNITURE', 'cots-furniture', 'Custom wooden cots and furniture created to match your preferred size, design, and requirements.', 'Custom wooden cots and furniture created to match your preferred size, design, and requirements.', '/images/cots-furniture.png', TRUE, 4),
  ('CUSTOMIZED WOOD WORKS', 'customized-wood-works', 'Personalized woodworking solutions designed around your ideas, measurements, and project needs.', 'Personalized woodworking solutions designed around your ideas, measurements, and project needs.', '/images/customized-wood-works.png', TRUE, 5)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  cover_image_url = EXCLUDED.cover_image_url,
  is_published = TRUE,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();

INSERT INTO business_hours (business_profile_id, day_of_week, opens_at, closes_at, is_closed)
SELECT profile.id, schedule.day_of_week, schedule.opens_at, schedule.closes_at, schedule.is_closed
FROM business_profiles profile
CROSS JOIN (VALUES
  (0, NULL::TIME, NULL::TIME, TRUE),
  (1, '09:30'::TIME, '18:30'::TIME, FALSE),
  (2, '09:30'::TIME, '18:30'::TIME, FALSE),
  (3, '09:30'::TIME, '18:30'::TIME, FALSE),
  (4, '09:30'::TIME, '18:30'::TIME, FALSE),
  (5, '09:30'::TIME, '18:30'::TIME, FALSE),
  (6, '09:30'::TIME, '18:30'::TIME, FALSE)
) AS schedule(day_of_week, opens_at, closes_at, is_closed)
WHERE profile.slug = 'sri-hari-wood-works'
ON CONFLICT (business_profile_id, day_of_week) DO NOTHING;

INSERT INTO faqs (question, answer, category, is_published, display_order)
SELECT seed.question, seed.answer, seed.category, TRUE, seed.display_order
FROM (VALUES
  ('What woodworking services do you offer?', 'We offer wardrobes and cupboards, doors and windows, modular kitchens, cots and furniture, and customized wood works.', 'services', 1),
  ('How are estimate charges handled?', 'Service charges apply for estimate and travel as required. We explain the applicable charges before work confirmation.', 'estimates', 2),
  ('Do you offer site visits?', 'Site visits can be arranged to review project requirements, dimensions, and practical execution.', 'site visits', 3)
) AS seed(question, answer, category, display_order)
WHERE NOT EXISTS (SELECT 1 FROM faqs existing WHERE existing.question = seed.question);
