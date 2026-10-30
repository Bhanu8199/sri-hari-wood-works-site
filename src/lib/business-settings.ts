import { unstable_cache } from 'next/cache';
import { businessHours as defaultBusinessHours, businessProfile as defaultBusinessProfile, featuredServices } from '@/lib/site-data';
import { getDatabase } from '@/lib/database';
import type { BusinessProfile, Service } from '@/types';

const businessSettingsCacheOptions = {
  revalidate: 300,
  tags: ['business-settings']
};

export type BusinessHoliday = {
  holiday_date: string;
  holiday_name: string;
};

type BusinessProfileRow = {
  business_name: string;
  phone: string | null;
  secondary_phone: string | null;
  whatsapp_phone: string | null;
  email: string | null;
  address: string | null;
  google_business_url: string | null;
  directions_url: string | null;
  service_area: string | null;
  owner_name: string | null;
  co_owner_name: string | null;
  experience_years: number | null;
};

const getCachedBusinessProfile = unstable_cache(async (): Promise<BusinessProfile> => {
  const database = getDatabase();
  if (!database) {
    return defaultBusinessProfile;
  }

  const { rows } = await database.query<BusinessProfileRow>(
    `SELECT business_name, phone, secondary_phone, whatsapp_phone, email, address,
      google_business_url, directions_url, service_area, owner_name, co_owner_name, experience_years
     FROM business_profiles WHERE slug = $1 LIMIT 1`,
    ['sri-hari-wood-works']
  );
  const data = rows[0];

  if (!data) {
    throw new Error('Business profile has not been configured in Neon.');
  }

  return {
    businessName: data.business_name,
    phone: data.phone || defaultBusinessProfile.phone,
    secondaryPhone: data.secondary_phone || defaultBusinessProfile.secondaryPhone,
    whatsappPhone: data.whatsapp_phone || defaultBusinessProfile.whatsappPhone,
    email: data.email || defaultBusinessProfile.email,
    address: data.address || defaultBusinessProfile.address,
    googleBusinessUrl: data.google_business_url || defaultBusinessProfile.googleBusinessUrl,
    directionsUrl: data.directions_url || defaultBusinessProfile.directionsUrl,
    serviceArea: data.service_area || defaultBusinessProfile.serviceArea,
    ownerName: data.owner_name || defaultBusinessProfile.ownerName,
    coOwnerName: data.co_owner_name || defaultBusinessProfile.coOwnerName,
    experienceYears: data.experience_years || defaultBusinessProfile.experienceYears
  };
}, ['business-profile'], businessSettingsCacheOptions);

export function getBusinessProfile(): Promise<BusinessProfile> {
  return getCachedBusinessProfile();
}

const getCachedPublishedServices = unstable_cache(async (): Promise<Service[]> => {
  const database = getDatabase();
  if (!database) {
    return featuredServices;
  }

  const { rows } = await database.query<{
    title: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    cover_image_url: string | null;
    is_published: boolean;
  }>(`SELECT title, slug, short_description, description, cover_image_url, is_published
      FROM services WHERE is_published = TRUE ORDER BY display_order ASC`);

  return rows.map((service) => {
    const defaults = featuredServices.find((item) => item.slug === service.slug);
    return {
      title: service.title,
      slug: service.slug,
      category: defaults?.category || 'Woodworking',
      shortDescription: service.short_description || '',
      description: service.description || service.short_description || '',
      coverImage: defaults?.coverImage || service.cover_image_url || null,
      imageAlt: defaults?.imageAlt || service.title,
      imageCredit: defaults?.imageCredit || '',
      imageSourceUrl: defaults?.imageSourceUrl || '',
      imageLicenseUrl: defaults?.imageLicenseUrl || '',
      imageLicenseLabel: defaults?.imageLicenseLabel || '',
      isPublished: service.is_published
    };
  });
}, ['published-services'], businessSettingsCacheOptions);

export function getPublishedServices(): Promise<Service[]> {
  return getCachedPublishedServices();
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  const date = new Date(Date.UTC(2020, 0, 1, hours, minutes));
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC'
  }).format(date);
}

export async function getBusinessHours() {
  const data = await getBusinessHourConfig();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return data
    .map((entry) => ({
      day: days[entry.dayOfWeek],
      hours: entry.isClosed || !entry.opensAt || !entry.closesAt
        ? 'Closed'
        : `${formatTime(entry.opensAt)} – ${formatTime(entry.closesAt)}`
    }))
    .sort((a, b) => (a.day === 'Sunday' ? 6 : days.indexOf(a.day) - 1) - (b.day === 'Sunday' ? 6 : days.indexOf(b.day) - 1));
}

const getCachedBusinessHourConfig = unstable_cache(async () => {
  const database = getDatabase();
  if (!database) {
    return defaultBusinessHours.map((entry, dayOfWeek) => ({
      dayOfWeek: entry.day === 'Sunday' ? 0 : dayOfWeek + 1,
      opensAt: entry.day === 'Sunday' ? null : '09:30',
      closesAt: entry.day === 'Sunday' ? null : '18:30',
      isClosed: entry.day === 'Sunday'
    })).sort((a, b) => a.dayOfWeek - b.dayOfWeek);
  }

  const { rows: profiles } = await database.query<{ id: string }>(
    'SELECT id FROM business_profiles WHERE slug = $1 LIMIT 1',
    ['sri-hari-wood-works']
  );
  const profile = profiles[0];
  if (!profile) {
    throw new Error('Business hours profile lookup failed: business profile is not configured in Neon.');
  }

  const { rows } = await database.query<{
    day_of_week: number;
    opens_at: string | null;
    closes_at: string | null;
    is_closed: boolean;
  }>(`SELECT day_of_week, opens_at, closes_at, is_closed
      FROM business_hours WHERE business_profile_id = $1 ORDER BY day_of_week ASC`, [profile.id]);

  return rows.map((entry) => ({
    dayOfWeek: entry.day_of_week,
    opensAt: entry.opens_at?.slice(0, 5) || null,
    closesAt: entry.closes_at?.slice(0, 5) || null,
    isClosed: entry.is_closed
  }));
}, ['business-hour-config'], businessSettingsCacheOptions);

export function getBusinessHourConfig() {
  return getCachedBusinessHourConfig();
}

const getCachedBusinessHolidays = unstable_cache(async (): Promise<BusinessHoliday[]> => {
  const database = getDatabase();
  if (!database) {
    return [];
  }

  const { rows: profiles } = await database.query<{ id: string }>(
    'SELECT id FROM business_profiles WHERE slug = $1 LIMIT 1',
    ['sri-hari-wood-works']
  );
  const profile = profiles[0];
  if (!profile) {
    throw new Error('Business holiday profile lookup failed: business profile is not configured in Neon.');
  }

  const { rows } = await database.query<BusinessHoliday>(
    'SELECT holiday_date, holiday_name FROM business_holidays WHERE business_profile_id = $1 ORDER BY holiday_date ASC',
    [profile.id]
  );
  return rows;
}, ['business-holidays'], businessSettingsCacheOptions);

export function getBusinessHolidays(): Promise<BusinessHoliday[]> {
  return getCachedBusinessHolidays();
}
