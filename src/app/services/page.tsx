import type { Metadata } from 'next';
import Link from 'next/link';
import { ServiceCard } from '@/components/site/service-card';
import { EnquiryForm } from '@/components/site/enquiry-form';
import { whatsappUrl } from '@/lib/site-data';
import { getBusinessProfile, getPublishedServices } from '@/lib/business-settings';

export const metadata: Metadata = {
  title: 'Woodworking Services',
  description: 'Explore wardrobes, cupboards, doors, windows, modular kitchens, cots, furniture, and customized wood works across Andhra Pradesh and Telangana.'
};

export default async function ServicesPage() {
  const [business, services] = await Promise.all([getBusinessProfile(), getPublishedServices()]);
  return (
    <div className="container-shell py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Our services</p>
        <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Woodworking services built around your requirements.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Serving customers across {business.serviceArea}. Project feasibility and any travel charges will be discussed during the estimate process.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} whatsappPhone={business.whatsappPhone} />
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-white p-8 shadow-soft">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Need a custom service?</p>
            <h2 className="mt-2 text-3xl font-semibold text-walnut">Tell us what you need.</h2>
            <p className="mt-4 text-slate-700">
              Service charges apply for estimates and travel depending on the project. We discuss your requirements directly before confirming the work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${business.phone}`} className="btn-primary">Call now</a>
              <a href={whatsappUrl(undefined, business.whatsappPhone)} target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp us</a>
            </div>
          </div>
          <EnquiryForm defaultService="customized-wood-works" services={services} />
        </div>
      </div>
    </div>
  );
}
