import type { Metadata } from 'next';
import Link from 'next/link';
import { ServiceCard } from '@/components/site/service-card';
import { EnquiryForm } from '@/components/site/enquiry-form';
import { businessProfile, featuredServices } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore custom carpentry, furniture, wardrobes, doors, and residential woodworking services by Sri Hari Wood Works.'
};

export default function ServicesPage() {
  return (
    <div className="container-shell py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Our services</p>
        <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Woodworking services built around your requirements.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          We provide custom carpentry and woodworking services for residential projects, interior spaces, and ongoing home improvements. Each service can be activated, edited, or removed from the admin dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featuredServices.map((service) => (
          <ServiceCard key={service.slug} service={service} />
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
              <a href="tel:+919948519979" className="btn-primary">Call now</a>
              <a href="https://wa.me/919948519979" target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp us</a>
            </div>
          </div>
          <EnquiryForm defaultService="Custom Woodwork" />
        </div>
      </div>
    </div>
  );
}
