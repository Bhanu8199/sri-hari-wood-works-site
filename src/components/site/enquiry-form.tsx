'use client';

import { useState } from 'react';
import { featuredServices } from '@/lib/site-data';
import type { Service } from '@/types';

const defaultValues = {
  name: '',
  phone: '',
  email: '',
  service: featuredServices[0].title,
  city: '',
  notes: '',
  preferredContactMethod: ''
};

export function EnquiryForm({ defaultService, services = featuredServices }: { defaultService?: string; services?: Service[] }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const selectedService = services.find(
    (service) => service.slug === defaultService || service.title === defaultService
  )?.title || defaultValues.service;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      phone: String(formData.get('phone') || ''),
      email: String(formData.get('email') || ''),
      service: String(formData.get('service') || selectedService),
      city: String(formData.get('city') || ''),
      notes: String(formData.get('notes') || ''),
      preferredContactMethod: String(formData.get('preferredContactMethod') || 'Phone'),
      consent: formData.get('consent') === 'on'
    };

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.message || 'Please correct the form and try again.');
        return;
      }

      setStatus('success');
      setMessage(data.message || 'Your enquiry has been received.');
      form.reset();
    } catch (error) {
      console.error('Enquiry submission request failed:', error);
      setStatus('error');
      setMessage('We could not submit your enquiry. Please try again or contact us by phone.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-walnut">Full name</label>
          <input id="name" name="name" defaultValue={defaultValues.name} required minLength={2} maxLength={30} className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-walnut">Phone number</label>
          <input id="phone" name="phone" type="tel" inputMode="numeric" pattern="[0-9]{10}" minLength={10} maxLength={10} title="Enter a 10-digit phone number." defaultValue={defaultValues.phone} required className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-walnut">Email</label>
          <input id="email" name="email" type="email" maxLength={254} defaultValue={defaultValues.email} required className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-walnut">Service required</label>
          <select id="service" name="service" defaultValue={selectedService} required className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm">
            {services.map((service) => (
              <option key={service.slug} value={service.title}>{service.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="city" className="mb-2 block text-sm font-medium text-walnut">Location / city</label>
        <input id="city" name="city" defaultValue={defaultValues.city} required minLength={2} maxLength={200} className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-walnut">Project details / notes</label>
        <textarea id="notes" name="notes" defaultValue={defaultValues.notes} required minLength={10} maxLength={2000} rows={4} className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label htmlFor="preferredContactMethod" className="mb-2 block text-sm font-medium text-walnut">Preferred contact method</label>
        <select id="preferredContactMethod" name="preferredContactMethod" defaultValue={defaultValues.preferredContactMethod} required className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm">
          <option value="" disabled>Select a contact method</option>
          <option>Phone</option>
          <option>WhatsApp</option>
          <option>Email</option>
        </select>
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4" />
        <span>I consent to being contacted about my enquiry.</span>
      </label>

      {status !== 'idle' ? (
        <div role={status === 'error' ? 'alert' : 'status'} aria-live="polite" className={status === 'success' ? 'rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700' : status === 'error' ? 'rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700' : 'rounded-xl border border-border bg-stone px-4 py-3 text-sm text-walnut'}>
          {message}
        </div>
      ) : null}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'loading' ? 'Sending request...' : 'Request an Estimate'}
      </button>
    </form>
  );
}
