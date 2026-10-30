'use client';

import { useState } from 'react';
import type { BusinessProfile, Service } from '@/types';

type BusinessHour = {
  dayOfWeek: number;
  opensAt: string | null;
  closesAt: string | null;
  isClosed: boolean;
};

type Holiday = {
  holiday_date: string;
  holiday_name: string;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function SettingsForm({
  profile,
  hours: initialHours,
  holidays: initialHolidays,
  services: initialServices
}: {
  profile: BusinessProfile;
  hours: BusinessHour[];
  holidays: Holiday[];
  services: Service[];
}) {
  const [hours, setHours] = useState(initialHours);
  const [holidays, setHolidays] = useState(initialHolidays);
  const [services, setServices] = useState(initialServices);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [holidayName, setHolidayName] = useState('');

  function updateHour(dayOfWeek: number, patch: Partial<BusinessHour>) {
    setHours((current) => current.map((hour) =>
      hour.dayOfWeek === dayOfWeek ? { ...hour, ...patch } : hour
    ));
  }

  function updateService(slug: string, patch: Partial<Service>) {
    setServices((current) => current.map((service) =>
      service.slug === slug ? { ...service, ...patch } : service
    ));
  }

  function addHoliday() {
    if (!holidayDate || holidayName.trim().length < 2) {
      return;
    }
    if (holidays.some((holiday) => holiday.holiday_date === holidayDate)) {
      setMessage('That holiday date is already listed.');
      setStatus('error');
      return;
    }
    setHolidays((current) => [...current, { holiday_date: holidayDate, holiday_name: holidayName.trim() }]);
    setHolidayDate('');
    setHolidayName('');
    setMessage('');
    setStatus('idle');
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus('saving');
    setMessage('');

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.get('businessName'),
          phone: formData.get('phone'),
          secondaryPhone: formData.get('secondaryPhone'),
          whatsappPhone: formData.get('whatsappPhone'),
          email: formData.get('email'),
          ownerName: formData.get('ownerName'),
          coOwnerName: formData.get('coOwnerName'),
          serviceArea: formData.get('serviceArea'),
          address: formData.get('address'),
          googleBusinessUrl: formData.get('googleBusinessUrl'),
          directionsUrl: formData.get('directionsUrl'),
          timezone: 'Asia/Kolkata',
          hours,
          holidays: holidays.map(({ holiday_date, holiday_name }) => ({ date: holiday_date, name: holiday_name })),
          services: services.map(({ slug, shortDescription, description }) => ({ slug, shortDescription, description }))
        })
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.message || 'Settings could not be saved.');
        return;
      }

      setStatus('saved');
      setMessage(data.message || 'Business settings saved.');
    } catch (error) {
      console.error('Business settings request failed:', error);
      setStatus('error');
      setMessage('Settings could not be saved. Please try again.');
    }
  }

  const inputClass = 'w-full rounded-xl border border-border bg-cream px-3 py-2.5';

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="grid gap-5 rounded-3xl border border-border bg-white p-6 shadow-soft md:grid-cols-2">
        <h2 className="text-xl font-semibold text-walnut md:col-span-2">Business information</h2>
        <label className="text-sm font-medium text-walnut">Business name
          <input name="businessName" defaultValue={profile.businessName} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut">Primary phone
          <input name="phone" defaultValue={profile.phone} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut">Secondary phone
          <input name="secondaryPhone" defaultValue={profile.secondaryPhone} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut">WhatsApp number (international digits)
          <input name="whatsappPhone" defaultValue={profile.whatsappPhone} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut">Business email
          <input name="email" type="email" defaultValue={profile.email} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut">Proprietor
          <input name="ownerName" defaultValue={profile.ownerName} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut">Co-proprietor
          <input name="coOwnerName" defaultValue={profile.coOwnerName} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut">Service area
          <input name="serviceArea" defaultValue={profile.serviceArea} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut md:col-span-2">Address
          <input name="address" defaultValue={profile.address} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut">Google Business Profile URL
          <input name="googleBusinessUrl" type="url" defaultValue={profile.googleBusinessUrl} required className={`${inputClass} mt-2`} />
        </label>
        <label className="text-sm font-medium text-walnut">Directions URL
          <input name="directionsUrl" type="url" defaultValue={profile.directionsUrl} required className={`${inputClass} mt-2`} />
        </label>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
        <div>
          <h2 className="text-xl font-semibold text-walnut">Weekly business hours</h2>
          <p className="mt-1 text-sm text-slate-600">Timezone: Asia/Kolkata</p>
        </div>
        {days.map((day, dayOfWeek) => {
          const hour = hours.find((entry) => entry.dayOfWeek === dayOfWeek);
          if (!hour) {
            return null;
          }
          return (
            <div key={day} className="grid items-center gap-3 border-t border-border pt-4 sm:grid-cols-[1fr_auto_1fr_1fr]">
              <span className="font-medium text-walnut">{day}</span>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={hour.isClosed} onChange={(event) => updateHour(dayOfWeek, { isClosed: event.target.checked })} />
                Closed
              </label>
              <input aria-label={`${day} opening time`} type="time" value={hour.opensAt || ''} disabled={hour.isClosed} onChange={(event) => updateHour(dayOfWeek, { opensAt: event.target.value })} className={inputClass} />
              <input aria-label={`${day} closing time`} type="time" value={hour.closesAt || ''} disabled={hour.isClosed} onChange={(event) => updateHour(dayOfWeek, { closesAt: event.target.value })} className={inputClass} />
            </div>
          );
        })}
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
        <div>
          <h2 className="text-xl font-semibold text-walnut">Festival holidays</h2>
          <p className="mt-1 text-sm text-slate-600">Add dates when the business will be closed, or remove a date from the list.</p>
        </div>
        {holidays.map((holiday) => (
          <div key={holiday.holiday_date} className="flex items-center justify-between gap-4 rounded-xl bg-cream px-4 py-3">
            <span className="text-sm text-walnut">{holiday.holiday_date} — {holiday.holiday_name}</span>
            <button type="button" onClick={() => setHolidays((current) => current.filter((entry) => entry.holiday_date !== holiday.holiday_date))} className="text-sm font-semibold text-red-700">Remove</button>
          </div>
        ))}
        <div className="grid gap-3 sm:grid-cols-[1fr_2fr_auto]">
          <input aria-label="Holiday date" type="date" value={holidayDate} onChange={(event) => setHolidayDate(event.target.value)} className={inputClass} />
          <input aria-label="Holiday name" value={holidayName} onChange={(event) => setHolidayName(event.target.value)} placeholder="Holiday name" className={inputClass} />
          <button type="button" onClick={addHoliday} className="btn-secondary">Add holiday</button>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-walnut">Service descriptions</h2>
        {services.map((service) => (
          <div key={service.slug} className="space-y-3 border-t border-border pt-4">
            <h3 className="font-semibold text-walnut">{service.title}</h3>
            <label className="block text-sm font-medium text-walnut">Short description
              <textarea value={service.shortDescription} onChange={(event) => updateService(service.slug, { shortDescription: event.target.value })} rows={2} className={`${inputClass} mt-2`} />
            </label>
            <label className="block text-sm font-medium text-walnut">Full description
              <textarea value={service.description} onChange={(event) => updateService(service.slug, { description: event.target.value })} rows={3} className={`${inputClass} mt-2`} />
            </label>
          </div>
        ))}
      </section>

      <div className="rounded-2xl border border-dashed border-border bg-white p-5 text-sm leading-6 text-slate-700">
        Authentic business photographs cannot be managed here because this project does not currently have an image-upload or Supabase Storage workflow. Please supply owner-approved photographs and storage permissions before publishing them.
      </div>

      {status !== 'idle' ? (
        <p role="status" className={status === 'error' ? 'rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700' : 'rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700'}>
          {message}
        </p>
      ) : null}
      <button disabled={status === 'saving'} className="btn-primary disabled:opacity-60">
        {status === 'saving' ? 'Saving settings…' : 'Save business settings'}
      </button>
    </form>
  );
}
