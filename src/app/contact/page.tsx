import type { Metadata } from 'next';
import { EnquiryForm } from '@/components/site/enquiry-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Sri Hari Wood Works by phone, WhatsApp, or enquiry form for custom carpentry and woodworking projects.'
};

export default function ContactPage() {
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
            <a href="tel:+919948519979" className="mt-2 block text-xl font-semibold text-walnut">+91 99485 19979</a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">WhatsApp</p>
            <a href="https://wa.me/919948519979" target="_blank" rel="noreferrer" className="mt-2 block text-xl font-semibold text-walnut">Message on WhatsApp</a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Address</p>
            <p className="mt-2 text-lg text-slate-700">Somavarappadu, Andhra Pradesh 534450</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Opening hours</p>
            <p className="mt-2 text-lg text-slate-700">Open until 6:00 PM (confirm weekly schedule before publishing)</p>
          </div>
          <div>
            <a href="https://maps.google.com/?q=Somavarappadu+Andhra+Pradesh+534450" target="_blank" rel="noreferrer" className="btn-primary">Get directions</a>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
