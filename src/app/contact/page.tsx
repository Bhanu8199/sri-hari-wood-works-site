import type { Metadata } from 'next';
import { Clock3, Mail, MapPin, MessageCircleMore, PhoneCall } from 'lucide-react';
import { whatsappUrl } from '@/lib/site-data';
import { getBusinessHours, getBusinessProfile } from '@/lib/business-settings';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact SRI HARI WOOD WORKS by phone or WhatsApp for woodworking projects across Andhra Pradesh and Telangana.'
};

export default async function ContactPage() {
  const [business, hours] = await Promise.all([getBusinessProfile(), getBusinessHours()]);

  return (
    <>
      <section className="container-shell py-14 pb-16 md:py-16">
        <div className="mb-8 max-w-3xl md:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Contact us</p>
          <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Planning a woodworking project? Let’s discuss your requirements.</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-3xl border border-border bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-walnut">
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-olive">Call us</h2>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <a href={`tel:${business.phone}`} className="btn-primary inline-flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  Call now
                </a>
              </div>
              <div>
                <a href={`tel:${business.secondaryPhone}`} className="btn-primary inline-flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  Call second number
                </a>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-border bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-walnut">
                <MessageCircleMore className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-olive">WhatsApp</h2>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">Message us to discuss your woodworking requirements.</p>
            <a
              href={whatsappUrl('Hello Sri Hari Wood Works, I would like to enquire about your woodworking services. Please contact me to discuss my requirements.', business.whatsappPhone)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1eae54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#167a39]"
            >
              <MessageCircleMore className="h-4 w-4" aria-hidden="true" />
              WhatsApp us
            </a>
          </article>

          <article className="rounded-3xl border border-border bg-white p-6 shadow-soft md:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-walnut">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-olive">Email</h2>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">Send us a message about your project.</p>
            <a
              href={`mailto:${business.email}`}
              className="btn-primary mt-4 inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email us
            </a>
          </article>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-3xl border border-border bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-walnut">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-olive">Visit us</h2>
            </div>
            <p className="mt-5 text-lg font-semibold leading-7 text-walnut">{business.address}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={business.directionsUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Get directions <span aria-hidden="true">↗</span>
              </a>
              <a href={business.googleBusinessUrl} target="_blank" rel="noreferrer" className="btn-secondary">Find us on Google</a>
            </div>
          </article>

          <article className="rounded-3xl border border-border bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-walnut">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-olive">Opening hours</h2>
            </div>
            <dl className="mt-5 space-y-2 text-sm text-slate-700">
              {hours.map(({ day, hours: schedule }) => (
                <div key={day} className="flex justify-between gap-4">
                  <dt>{day}</dt>
                  <dd className="text-right">{schedule}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-border pt-3 text-sm text-slate-600">Closed on Sundays and applicable festival holidays.</p>
          </article>

          <article className="rounded-3xl border border-border bg-white p-6 shadow-soft md:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-walnut">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-olive">Service area</h2>
            </div>
            <p className="mt-5 text-lg font-medium leading-7 text-walnut">Serving customers across {business.serviceArea}.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Project feasibility and any travel charges will be discussed during the estimate process.</p>
          </article>
        </div>
      </section>
    </>
  );
}
