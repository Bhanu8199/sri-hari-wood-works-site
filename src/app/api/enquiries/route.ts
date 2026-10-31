import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDatabase } from '@/lib/database';

export const runtime = 'nodejs';

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(30),
  phone: z.string().trim().regex(/^\d{10}$/),
  email: z.string().trim().email().max(254),
  service: z.string().trim().min(2).max(120),
  city: z.string().trim().min(2).max(200).optional(),
  notes: z.string().trim().min(10).max(2000).optional(),
  projectLocation: z.string().trim().min(2).max(200).optional(),
  projectDescription: z.string().trim().min(10).max(2000).optional(),
  preferredContactMethod: z.enum(['Phone', 'WhatsApp', 'Email']),
  consent: z.literal(true)
}).transform((payload, context) => {
  const city = payload.city || payload.projectLocation;
  const notes = payload.notes || payload.projectDescription;

  if (!city) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['city'], message: 'Location is required.' });
  }
  if (!notes) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['notes'], message: 'Project details are required.' });
  }

  return { ...payload, city: city || '', notes: notes || '' };
});

const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  const forwardedIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = request.headers.get('x-real-ip') || forwardedIp || 'unknown';
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip) || 0;

  if (now - lastRequest < 20000) {
    return NextResponse.json({ message: 'Too many requests. Please wait a moment before submitting again.' }, { status: 429 });
  }

  rateLimitMap.set(ip, now);

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      console.warn('Invalid JSON submitted to enquiry endpoint:', error);
      return NextResponse.json({ message: 'Invalid enquiry details.' }, { status: 400 });
    }

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid enquiry details.', errors: parsed.error.flatten() }, { status: 400 });
    }

    const database = getDatabase();
    if (!database) {
      console.error('Enquiry cannot be saved because DATABASE_URL is not configured.');
      return NextResponse.json({ message: 'Enquiry storage is not configured. Please contact us using the details on this page.' }, { status: 503 });
    }

    const { rows: services } = await database.query<{ id: string }>(
      'SELECT id FROM services WHERE title = $1 AND is_published = TRUE LIMIT 1',
      [parsed.data.service]
    );
    const service = services[0];
    if (!service) {
      return NextResponse.json({ message: 'The selected service is not available. Please choose another service.' }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    const { rows: enquiries } = await database.query<{ id: string }>(
      `INSERT INTO enquiries (
        customer_name, phone, email, service_id, project_location, project_description,
        preferred_contact_method, status, created_at, updated_at, consent_at,
        internal_notes, follow_up_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'New', $8, $8, $8, NULL, NULL)
      RETURNING id`,
      [
        parsed.data.name,
        parsed.data.phone,
        parsed.data.email || null,
        service.id,
        parsed.data.city,
        parsed.data.notes,
        parsed.data.preferredContactMethod,
        submittedAt
      ]
    );

    if (!enquiries[0]) {
      throw new Error('Neon did not return the saved enquiry identifier.');
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We've received your request and will contact you shortly."
    }, { status: 201 });
  } catch (error) {
    console.error('Enquiry submission failed:', error);
    return NextResponse.json({ message: 'Something went wrong while saving your enquiry. Please try again or contact us using the details on this page.' }, { status: 500 });
  }
}
