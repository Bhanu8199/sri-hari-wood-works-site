'use client';

import { useState } from 'react';

const defaultValues = {
  name: '',
  phone: '',
  email: '',
  service: 'Residential carpentry',
  projectLocation: '',
  projectDescription: '',
  preferredContactMethod: 'Phone',
  consent: true
};

export function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      phone: String(formData.get('phone') || ''),
      email: String(formData.get('email') || ''),
      service: String(formData.get('service') || defaultService || 'General enquiry'),
      projectLocation: String(formData.get('projectLocation') || ''),
      projectDescription: String(formData.get('projectDescription') || ''),
      preferredContactMethod: String(formData.get('preferredContactMethod') || 'Phone'),
      consent: formData.get('consent') === 'on'
    };

    setStatus('loading');
    setMessage('');

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
    setMessage(data.message || 'Your enquiry was sent successfully.');
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-walnut">Full name</label>
          <input id="name" name="name" defaultValue={defaultValues.name} required className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-walnut">Phone number</label>
          <input id="phone" name="phone" defaultValue={defaultValues.phone} required className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-walnut">Email (optional)</label>
          <input id="email" name="email" type="email" defaultValue={defaultValues.email} className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-walnut">Service required</label>
          <select id="service" name="service" defaultValue={defaultService || defaultValues.service} className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm">
            <option>Residential carpentry</option>
            <option>Custom furniture</option>
            <option>Doors and windows</option>
            <option>Wardrobes and storage</option>
            <option>Kitchen and interior woodwork</option>
            <option>New construction woodwork</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="projectLocation" className="mb-2 block text-sm font-medium text-walnut">Project location</label>
        <input id="projectLocation" name="projectLocation" defaultValue={defaultValues.projectLocation} required className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label htmlFor="projectDescription" className="mb-2 block text-sm font-medium text-walnut">Project description</label>
        <textarea id="projectDescription" name="projectDescription" defaultValue={defaultValues.projectDescription} required rows={4} className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label htmlFor="preferredContactMethod" className="mb-2 block text-sm font-medium text-walnut">Preferred contact method</label>
        <select id="preferredContactMethod" name="preferredContactMethod" defaultValue={defaultValues.preferredContactMethod} className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm">
          <option>Phone</option>
          <option>WhatsApp</option>
          <option>Email</option>
        </select>
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input type="checkbox" name="consent" defaultChecked className="mt-1 h-4 w-4" />
        <span>I consent to being contacted about my enquiry.</span>
      </label>

      {status !== 'idle' ? (
        <div className={status === 'success' ? 'rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700' : 'rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'}>
          {message}
        </div>
      ) : null}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'loading' ? 'Submitting...' : 'Request an Estimate'}
      </button>
    </form>
  );
}
