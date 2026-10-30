import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDatabase } from '@/lib/database';

export const runtime = 'nodejs';

const serviceSlugs = [
  'wardrobes-cupboards',
  'doors-windows',
  'modular-kitchens',
  'cots-furniture',
  'customized-wood-works'
] as const;

const settingsSchema = z.object({
  businessName: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(/^\+?[0-9\s()-]{8,20}$/),
  secondaryPhone: z.string().trim().regex(/^\+?[0-9\s()-]{8,20}$/),
  whatsappPhone: z.string().trim().regex(/^[0-9]{8,15}$/),
  email: z.string().trim().email().max(254),
  ownerName: z.string().trim().min(2).max(120),
  coOwnerName: z.string().trim().min(2).max(120),
  serviceArea: z.string().trim().min(2).max(200),
  address: z.string().trim().min(2).max(300),
  googleBusinessUrl: z.string().url(),
  directionsUrl: z.string().url(),
  timezone: z.literal('Asia/Kolkata'),
  hours: z.array(z.object({
    dayOfWeek: z.number().int().min(0).max(6),
    opensAt: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/).nullable(),
    closesAt: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/).nullable(),
    isClosed: z.boolean()
  })).length(7).superRefine((hours, context) => {
    if (new Set(hours.map((hour) => hour.dayOfWeek)).size !== 7) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'Each weekday must be configured exactly once.' });
    }
    hours.forEach((hour, index) => {
      if (!hour.isClosed && (!hour.opensAt || !hour.closesAt || hour.opensAt >= hour.closesAt)) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: [index], message: 'Open days need valid opening and closing times.' });
      }
    });
  }),
  holidays: z.array(z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    name: z.string().trim().min(2).max(120)
  })).max(100).superRefine((holidays, context) => {
    if (new Set(holidays.map((holiday) => holiday.date)).size !== holidays.length) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'Holiday dates must be unique.' });
    }
  }),
  services: z.array(z.object({
    slug: z.enum(serviceSlugs),
    shortDescription: z.string().trim().min(10).max(500),
    description: z.string().trim().min(10).max(2000)
  })).length(5).superRefine((services, context) => {
    if (new Set(services.map((service) => service.slug)).size !== serviceSlugs.length) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: 'Each service must be configured exactly once.' });
    }
  })
});

export async function PUT(request: Request) {
  if (cookies().get('shww_admin')?.value !== '1') {
    return NextResponse.json({ message: 'You must be signed in to update business settings.' }, { status: 401 });
  }

  const database = getDatabase();
  if (!database) {
    return NextResponse.json({ message: 'Business settings cannot be saved until DATABASE_URL is configured.' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    console.warn('Invalid JSON submitted to business settings:', error);
    return NextResponse.json({ message: 'Invalid settings data.' }, { status: 400 });
  }

  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Please review the business settings and try again.', errors: parsed.error.flatten() }, { status: 400 });
  }

  const values = parsed.data;
  const client = await database.connect();
  try {
    await client.query('BEGIN');
    const { rows: profiles } = await client.query<{ id: string }>(
      'SELECT id FROM business_profiles WHERE slug = $1 LIMIT 1',
      ['sri-hari-wood-works']
    );
    const profile = profiles[0];
    if (!profile) {
      throw new Error('Business profile is not configured in Neon.');
    }

    await client.query(
      `UPDATE business_profiles SET
          business_name = $1, phone = $2, secondary_phone = $3, whatsapp_phone = $4,
          email = $5, owner_name = $6, co_owner_name = $7, service_area = $8,
          address = $9, google_business_url = $10, directions_url = $11,
          timezone = $12, updated_at = NOW()
        WHERE id = $13`,
      [
        values.businessName,
        values.phone,
        values.secondaryPhone,
        values.whatsappPhone,
        values.email,
        values.ownerName,
        values.coOwnerName,
        values.serviceArea,
        values.address,
        values.googleBusinessUrl,
        values.directionsUrl,
        values.timezone,
        profile.id
      ]
    );

    for (const hour of values.hours) {
      await client.query(
        `INSERT INTO business_hours (
            business_profile_id, day_of_week, opens_at, closes_at, is_closed, updated_at
          ) VALUES ($1, $2, $3, $4, $5, NOW())
          ON CONFLICT (business_profile_id, day_of_week) DO UPDATE SET
            opens_at = EXCLUDED.opens_at,
            closes_at = EXCLUDED.closes_at,
            is_closed = EXCLUDED.is_closed,
            updated_at = NOW()`,
        [profile.id, hour.dayOfWeek, hour.isClosed ? null : hour.opensAt, hour.isClosed ? null : hour.closesAt, hour.isClosed]
      );
    }

    for (const service of values.services) {
      await client.query(
        `UPDATE services
          SET short_description = $1,
            description = $2,
            updated_at = NOW()
          WHERE slug = $3`,
        [service.shortDescription, service.description, service.slug]
      );
    }

    await client.query('DELETE FROM business_holidays WHERE business_profile_id = $1', [profile.id]);

    for (const holiday of values.holidays) {
      await client.query(
        'INSERT INTO business_holidays (business_profile_id, holiday_date, holiday_name) VALUES ($1, $2, $3)',
        [profile.id, holiday.date, holiday.name]
      );
    }
    await client.query('COMMIT');
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Neon business settings rollback failed:', rollbackError);
    }
    console.error('Neon business settings transaction failed:', error);
    return NextResponse.json({ message: 'Business settings could not be saved.' }, { status: 500 });
  } finally {
    client.release();
  }

  revalidateTag('business-settings');
  return NextResponse.json({ success: true, message: 'Business settings saved.' });
}
