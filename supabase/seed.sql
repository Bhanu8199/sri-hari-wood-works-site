INSERT INTO business_profiles (
  business_name,
  slug,
  description,
  phone,
  whatsapp_phone,
  address,
  postal_code,
  google_business_url,
  directions_url,
  experience_years,
  email
) VALUES (
  'SRI HARI WOOD WORKS',
  'sri-hari-wood-works',
  'We provide comprehensive services encompassing new construction and custom woodworking. Service charges apply for estimates and travel expenses.',
  '+91 99485 19979',
  '919948519979',
  'Somavarappadu, Andhra Pradesh, India',
  '534450',
  'https://share.google/nuxOcu96HdkfuPgMk',
  'https://maps.google.com/?q=Somavarappadu+Andhra+Pradesh+534450',
  37,
  'business@example.com'
);

INSERT INTO services (title, slug, short_description, description, is_published, display_order) VALUES
('Custom furniture', 'custom-furniture', 'Bespoke furniture tailored to your home.', 'Custom-made furniture designed around your space and practical requirements.', true, 1),
('Doors and window woodwork', 'doors-and-window-woodwork', 'Durable, functional woodwork for doors and windows.', 'Project-specific carpentry and finish work for doors, frames, shutters, and window features.', true, 2),
('Wardrobes and storage', 'wardrobes-and-storage', 'Space-saving wardrobe and storage solutions.', 'Built-in storage solutions designed for homes that need organized, efficient space.', true, 3);

INSERT INTO faqs (question, answer, category, is_published, display_order) VALUES
('Do you build custom furniture?', 'Yes, custom furniture is available depending on project scope, size, and final requirements.', 'services', true, 1),
('How are estimate charges handled?', 'Service charges apply for estimate and travel as required. We explain the applicable charges before work confirmation.', 'estimates', true, 2),
('Do you offer site visits?', 'Site visits can be arranged to review project requirements, dimensions, and practical execution.', 'site visits', true, 3);
