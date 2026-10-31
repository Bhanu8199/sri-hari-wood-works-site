import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDatabase } from '@/lib/database';

export const runtime = 'nodejs';

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().max(254).optional().or(z.literal('')),
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

type NotificationStatus = 'sent' | 'failed' | 'not_configured';

type NotificationResult = {
  sent: boolean;
  status: NotificationStatus;
  reason?: string;
};

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
    ['Project location', payload.city],
    ['Project description', payload.notes],
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

async function sendWhatsAppNotification(
  payload: z.infer<typeof enquirySchema>,
  submittedAt: string,
  businessWhatsApp: string | null
): Promise<NotificationResult> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const recipient = process.env.WHATSAPP_NOTIFICATION_TO || businessWhatsApp;
  const isConfigured = accessToken || phoneNumberId || templateName;

  if (!isConfigured) {
    return { sent: false, status: 'not_configured' };
  }

  const recipientDigits = recipient?.replace(/\D/g, '');
  if (
    !accessToken ||
    !phoneNumberId ||
    !templateName ||
    !recipientDigits ||
    !/^\d{8,15}$/.test(recipientDigits) ||
    !/^\d+$/.test(phoneNumberId)
  ) {
    console.error('WhatsApp notification configuration is incomplete or invalid.');
    return {
      sent: false,
      status: 'failed',
      reason: 'Your request was saved, but its WhatsApp alert could not be sent.'
    };
  }

  const submittedDate = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  }).format(new Date(submittedAt));
  const parameters = [
    payload.name,
    payload.phone,
    payload.service,
    payload.city,
    payload.notes,
    submittedDate
  ];

  try {
    const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipientDigits,
        type: 'template',
        template: {
          name: templateName,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en' },
          components: [{
            type: 'body',
            parameters: parameters.map((text) => ({ type: 'text', text }))
          }]
        }
      }),
      signal: AbortSignal.timeout(10000)
    });

    if (response.ok) {
      return { sent: true, status: 'sent' };
    }

    const errorDetails = await response.text();
    console.error('WhatsApp notification delivery failed:', response.status, errorDetails.slice(0, 500));
    return {
      sent: false,
      status: 'failed',
      reason: 'Your request was saved, but its WhatsApp alert could not be sent.'
    };
  } catch (error) {
    console.error('WhatsApp notification request failed:', error);
    return {
      sent: false,
      status: 'failed',
      reason: 'Your request was saved, but its WhatsApp alert could not be sent.'
    };
  }
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

    const database = getDatabase();
    if (!database) {
      console.error('Enquiry cannot be saved because DATABASE_URL is not configured.');
      return NextResponse.json({ message: 'Enquiry storage is not configured. Please contact us by phone or WhatsApp.' }, { status: 503 });
    }

    const { rows: serviceRows } = await database.query<{ id: string }>(
      'SELECT id FROM services WHERE title = $1 AND is_published = TRUE LIMIT 1',
      [parsed.data.service]
    );
    const service = serviceRows[0];
    if (!service) {
      return NextResponse.json({ message: 'The selected service is not available. Please choose another service.' }, { status: 400 });
    }

    const { rows: businesses } = await database.query<{ email: string | null; whatsapp_phone: string | null }>(
      'SELECT email, whatsapp_phone FROM business_profiles WHERE slug = $1 LIMIT 1',
      ['sri-hari-wood-works']
    );
    const business = businesses[0];
    if (!business) {
      console.error('Enquiry recipient lookup failed: business profile is not configured in Neon.');
      return NextResponse.json({ message: 'We could not save your enquiry because the business profile is not configured.' }, { status: 503 });
    }

    const submittedAt = new Date().toISOString();
    const { rows: enquiries } = await database.query<{ id: string }>(
      `INSERT INTO enquiries (
        customer_name, phone, email, service_id, project_location, project_description,
        preferred_contact_method, status, created_at, updated_at, consent_at,
        internal_notes, follow_up_at, notification_status, whatsapp_notification_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'New', $8, $8, $8, NULL, NULL, 'pending', 'pending')
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
    const enquiry = enquiries[0];
    if (!enquiry) {
      throw new Error('Neon did not return the saved enquiry identifier.');
    }

    const [notification, whatsappNotification] = await Promise.all([
      sendNotification(parsed.data, submittedAt, business.email, enquiry.id).catch((error): NotificationResult => {
        console.error('Enquiry email notification request failed:', error);
        return { sent: false, status: 'failed', reason: 'Your enquiry was saved, but its email notification could not be delivered.' };
      }),
      sendWhatsAppNotification(parsed.data, submittedAt, business.whatsapp_phone)
    ]);

    try {
      await database.query(
        'UPDATE enquiries SET notification_status = $1, whatsapp_notification_status = $2, updated_at = $3 WHERE id = $4',
        [notification.status, whatsappNotification.status, new Date().toISOString(), enquiry.id]
      );
    } catch (error) {
      console.error('Could not update enquiry notification status:', error);
    }

    return NextResponse.json({
      success: true,
      message: whatsappNotification.sent
        ? "Thank you! We've received your request and will contact you shortly."
        : whatsappNotification.status === 'not_configured'
          ? "We've received your request, but WhatsApp alerts are not configured yet."
          : whatsappNotification.reason || "We've received your request, but its WhatsApp alert could not be sent."
    });
  } catch (error) {
    console.error('Enquiry submission failed:', error);
    return NextResponse.json({ message: 'Something went wrong while submitting your enquiry. Please contact us by phone or WhatsApp.' }, { status: 500 });
  }
}
