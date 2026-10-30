import type { Metadata } from 'next';
import { EnquiryForm } from '@/components/site/enquiry-form';
import { formatPhoneNumber, whatsappUrl } from '@/lib/site-data';
import { getBusinessHours, getBusinessProfile, getPublishedServices } from '@/lib/business-settings';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact SRI HARI WOOD WORKS by phone, WhatsApp, or enquiry form for woodworking projects across Andhra Pradesh and Telangana.'
};

export default async function ContactPage({ searchParams }: { searchParams: { service?: string } }) {
  const [business, hours, services] = await Promise.all([
    getBusinessProfile(),
    getBusinessHours(),
    getPublishedServices()
  ]);
  return (
    <div className="container-shell py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Contact us</p>
        <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Planning a woodworking project?</h1>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5 rounded-3xl border border-border bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Phone</p>
            <a href={`tel:${business.phone}`} className="mt-2 block text-xl font-semibold text-walnut">{formatPhoneNumber(business.phone)}</a>
            <p className="mt-1 text-sm text-slate-600">Primary contact</p>
            <a href={`tel:${business.secondaryPhone}`} className="mt-3 block text-xl font-semibold text-walnut">{formatPhoneNumber(business.secondaryPhone)}</a>
            <p className="mt-1 text-sm text-slate-600">Secondary contact</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">WhatsApp</p>
            <a href={whatsappUrl('Hello Sri Hari Wood Works, I would like to enquire about your woodworking services. Please contact me to discuss my requirements.', business.whatsappPhone)} target="_blank" rel="noreferrer" className="mt-2 block text-xl font-semibold text-walnut">Message us on WhatsApp</a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Email</p>
            <a href={`mailto:${business.email}`} className="mt-2 block break-all text-lg font-semibold text-walnut">{business.email}</a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Address</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-lg font-semibold text-walnut">{business.address}</p>
              <span aria-hidden="true" className="text-walnut">-</span>
              <a href={business.directionsUrl} target="_blank" rel="noreferrer" className="btn-primary shrink-0">
                Get directions <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Opening hours</p>
            <dl className="mt-2 space-y-1 text-sm text-slate-700">
              {hours.map(({ day, hours: schedule }) => (
                <div key={day} className="flex justify-between gap-6">
                  <dt>{day}</dt><dd>{schedule}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-slate-600">Closed on Sundays and applicable festival holidays.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Service area</p>
            <p className="mt-2 text-lg text-slate-700">Serving customers across {business.serviceArea}.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Project feasibility and any travel charges will be discussed during the estimate process.</p>
          </div>
          <div>
            <a href={business.googleBusinessUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-walnut underline underline-offset-4">Find Us on Google</a>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
          <EnquiryForm defaultService={searchParams.service} services={services} />
        </div>
      </div>
    </div>
  );
}
