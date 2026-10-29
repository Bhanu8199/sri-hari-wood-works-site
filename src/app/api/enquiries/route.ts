import { NextResponse } from 'next/server';
import { z } from 'zod';

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().optional().or(z.literal('')),
  service: z.string().trim().min(2).max(100),
  projectLocation: z.string().trim().min(2).max(200),
  projectDescription: z.string().trim().min(10).max(2000),
  preferredContactMethod: z.enum(['Phone', 'WhatsApp', 'Email']),
  consent: z.literal(true)
});

const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'local';
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip) || 0;

  if (now - lastRequest < 20000) {
    return NextResponse.json({ message: 'Too many requests. Please wait a moment before submitting again.' }, { status: 429 });
  }

  rateLimitMap.set(ip, now);

  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid enquiry details.', errors: parsed.error.flatten() }, { status: 400 });
    }

    const payload = {
      customer_name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      service_id: null,
      project_location: parsed.data.projectLocation,
      project_description: parsed.data.projectDescription,
      preferred_contact_method: parsed.data.preferredContactMethod,
      status: 'New',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      consent_at: new Date().toISOString(),
      internal_notes: null,
      follow_up_at: null
    };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false }
      });

      const { error } = await supabase.from('enquiries').insert(payload);

      if (error) {
        console.error('Supabase enquiry insert failed:', error);
      }
    }

    return NextResponse.json({ success: true, message: 'Your enquiry has been submitted successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong while submitting your enquiry.' }, { status: 500 });
  }
}
