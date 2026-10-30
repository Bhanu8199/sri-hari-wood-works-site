import { NextResponse } from 'next/server';
import { z } from 'zod';
import { featuredServices } from '@/lib/site-data';
import { getDatabase } from '@/lib/database';

export const runtime = 'nodejs';

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().max(254).optional().or(z.literal('')),
  service: z.enum([
    'WARDROBES & CUPBOARDS',
    'DOORS & WINDOWS',
    'MODULAR KITCHENS',
    'COTS & FURNITURE',
    'CUSTOMIZED WOOD WORKS'
  ]),
  projectLocation: z.string().trim().min(2).max(200),
  projectDescription: z.string().trim().min(10).max(2000),
  preferredContactMethod: z.enum(['Phone', 'WhatsApp', 'Email']),
  consent: z.literal(true)
});

const rateLimitMap = new Map<string, number>();

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character] || character);
}

async function sendNotification(payload: z.infer<typeof enquirySchema>, submittedAt: string, businessEmail: string | null, enquiryId: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.BUSINESS_NOTIFICATION_EMAIL || businessEmail || 'mbhanuvardhan630@gmail.com';

  if (!apiKey || !from) {
    return { sent: false, status: 'not_configured' as const, reason: 'Your enquiry was saved, we will reach out as soon as possible.' };
  }

  const submittedDate = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  }).format(new Date(submittedAt));
  const fields: Array<[string, string]> = [
    ['Customer name', payload.name],
    ['Primary contact number', payload.phone],
    ['Email address', payload.email || 'Not provided'],
    ['Selected service', payload.service],
    ['Project location', payload.projectLocation],
    ['Project description', payload.projectDescription],
    ['Preferred contact method', payload.preferredContactMethod],
    ['Submission date and time (Asia/Kolkata)', submittedDate]
  ];
  const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = `<dl>${fields.map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value).replace(/\n/g, '<br>')}</dd>`).join('')}</dl>`;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': `enquiry-${enquiryId}-notification`
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: 'New Customer Enquiry — SRI HARI WOOD WORKS',
          text,
          html
        }),
        signal: AbortSignal.timeout(10000)
      });

      if (response.ok) {
        return { sent: true, status: 'sent' as const };
      }

      const errorDetails = await response.text();
      if (attempt === 0 && response.status >= 500) {
        continue;
      }
      console.error('Resend notification delivery failed:', response.status, errorDetails.slice(0, 500));
      return { sent: false, status: 'failed' as const, reason: 'Your enquiry was saved, but its email notification could not be delivered.' };
    } catch (error) {
      if (attempt === 0) {
        continue;
      }
      console.error('Resend notification request failed after retry:', error);
      return { sent: false, status: 'failed' as const, reason: 'Your enquiry was saved, but its email notification could not be delivered.' };
    }
  }

  return { sent: false, status: 'failed' as const, reason: 'Your enquiry was saved, but its email notification could not be delivered.' };
}

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

    const service = featuredServices.find((item) => item.title === parsed.data.service);
    if (!service) {
      return NextResponse.json({ message: 'The selected service is not available. Please choose another service.' }, { status: 400 });
    }

    const database = getDatabase();
    if (!database) {
      console.error('Enquiry cannot be saved because DATABASE_URL is not configured.');
      return NextResponse.json({ message: 'Enquiry storage is not configured. Please contact us by phone or WhatsApp.' }, { status: 503 });
    }

    const { rows: businesses } = await database.query<{ email: string | null }>(
      'SELECT email FROM business_profiles WHERE slug = $1 LIMIT 1',
      ['sri-hari-wood-works']
    );
    const business = businesses[0];
    if (!business) {
      console.error('Enquiry recipient lookup failed: business profile is not configured in Neon.');
      return NextResponse.json({ message: 'We could not save your enquiry because the business profile is not configured.' }, { status: 503 });
    }

    const { rows: serviceRows } = await database.query<{ id: string }>(
      'SELECT id FROM services WHERE slug = $1 LIMIT 1',
      [service.slug]
    );
    const serviceRow = serviceRows[0];
    if (!serviceRow) {
      console.error('Enquiry service lookup failed: no matching Neon service row.');
      return NextResponse.json({ message: 'We could not save your enquiry because the service list is not configured. Please contact us directly.' }, { status: 503 });
    }

    const submittedAt = new Date().toISOString();
    const { rows: enquiries } = await database.query<{ id: string }>(
      `INSERT INTO enquiries (
        customer_name, phone, email, service_id, project_location, project_description,
        preferred_contact_method, status, created_at, updated_at, consent_at,
        internal_notes, follow_up_at, notification_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'New', $8, $8, $8, NULL, NULL, 'pending')
      RETURNING id`,
      [
        parsed.data.name,
        parsed.data.phone,
        parsed.data.email || null,
        serviceRow.id,
        parsed.data.projectLocation,
        parsed.data.projectDescription,
        parsed.data.preferredContactMethod,
        submittedAt
      ]
    );
    const enquiry = enquiries[0];
    if (!enquiry) {
      throw new Error('Neon did not return the saved enquiry identifier.');
    }

    let notification: { sent: boolean; status: 'sent' | 'failed' | 'not_configured'; reason?: string };
    try {
      notification = await sendNotification(parsed.data, submittedAt, business.email, enquiry.id);
    } catch (error) {
      console.error('Enquiry notification request failed:', error);
      notification = { sent: false, status: 'failed', reason: 'Your enquiry was saved, but its email notification could not be delivered.' };
    }

    try {
      await database.query(
        'UPDATE enquiries SET notification_status = $1, updated_at = $2 WHERE id = $3',
        [notification.status, new Date().toISOString(), enquiry.id]
      );
    } catch (error) {
      console.error('Could not update enquiry notification status:', error);
    }

    return NextResponse.json({
      success: true,
      message: notification.sent
        ? 'Your enquiry has been saved. We will contact you soon.'
        : notification.reason || 'Your enquiry was saved, but its email notification could not be delivered.'
    });
  } catch (error) {
    console.error('Enquiry submission failed:', error);
    return NextResponse.json({ message: 'Something went wrong while submitting your enquiry. Please contact us by phone or WhatsApp.' }, { status: 500 });
  }
}
