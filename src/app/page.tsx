import Link from 'next/link';
import { HeroSection } from '@/components/site/hero-section';
import { ServiceCard } from '@/components/site/service-card';
import { ServiceImageGallery } from '@/components/site/service-image-gallery';
import { ReviewSection } from '@/components/site/review-section';
import { ContactCTA } from '@/components/site/contact-cta';
import { ExperienceBadge } from '@/components/site/experience-badge';
import { FAQAccordion } from '@/components/site/faq-accordion';
import { ArrowUpRight, Hammer, LayoutGrid, MapPinned } from 'lucide-react';
import { featuredServices, faqs } from '@/lib/site-data';
import { getBusinessProfile, getPublishedServices } from '@/lib/business-settings';

export default async function HomePage() {
  const [business, services] = await Promise.all([getBusinessProfile(), getPublishedServices()]);
  return (
    <>
      <HeroSection serviceArea={business.serviceArea} baseLocation={business.address.split(',').slice(0, 2).join(',').trim()} />

      <section className="container-shell pb-8 pt-2 md:pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          <ExperienceBadge
            value={`${business.experienceYears}+`}
            label="Years of Experience"
            detail="Of trusted craftsmanship"
            icon={<Hammer className="h-6 w-6" />}
          />
          <ExperienceBadge
            value={String(services.length)}
            label="Core Specialties"
            detail="Kitchens, wardrobes, doors & more"
            icon={<LayoutGrid className="h-6 w-6" />}
          />
          <ExperienceBadge
            value="2 States"
            label="AP & Telangana Coverage"
            detail="Project feasibility discussed by location"
            icon={<MapPinned className="h-6 w-6" />}
          />
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="flex items-end justify-between gap-4 pb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Our services</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-walnut md:text-4xl">Crafted around your home</h2>
          </div>
          <Link href="/services" className="text-sm font-medium text-walnut underline underline-offset-4">View all services</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} whatsappPhone={business.whatsappPhone} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-4 pb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Our work</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-walnut md:text-4xl">Explore our specialties</h2>
            </div>
            <Link href="/projects" className="text-sm font-medium text-walnut underline underline-offset-4">Explore all our work</Link>
          </div>

          <ServiceImageGallery services={featuredServices} />
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Why choose us</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-walnut md:text-4xl">Honest work, clear communication, reliable execution.</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-slate-700">
              <p>With 37 years of hands-on carpentry experience, we work closely with homeowners to understand the space, materials, and finish that best suit the project.</p>
              <p>Every enquiry is reviewed directly by the business, and we explain estimate and travel charges clearly before work begins.</p>
              <p>We focus on durable residential carpentry, custom furniture, and woodwork tailored to specific requirements without making unsupported promises.</p>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
            <div className="rounded-2xl bg-cream p-4">
              <h3 className="text-lg font-semibold text-walnut">Our process</h3>
            </div>
            <ol className="space-y-4">
              {[
                'Customer enquiry',
                'Requirement discussion',
                'Estimate and applicable charges',
                'Work confirmation',
                'Project execution',
                'Handover'
              ].map((step, index) => (
                <li key={step} className="flex gap-3 rounded-2xl border border-border bg-stone p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-walnut text-sm font-semibold text-white">{index + 1}</span>
                  <span className="pt-1.5 text-base font-medium text-walnut">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ReviewSection reviews={[]} />

      <section className="bg-white py-16">
        <div className="container-shell max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Frequently asked questions</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-walnut md:text-4xl">Everything you need to know</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <ContactCTA business={business} />

      <section className="container-shell pb-16">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Shop address</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="text-2xl font-semibold text-walnut">{business.address}</h2>
              <span aria-hidden="true" className="text-walnut">-</span>
              <a href={business.directionsUrl} target="_blank" rel="noreferrer" className="btn-primary shrink-0">
                Get directions <ArrowUpRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">Serving customers across {business.serviceArea}. Project feasibility and any travel charges will be discussed during the estimate process.</p>
          </div>
        </div>
      </section>
    </>
  );
}
