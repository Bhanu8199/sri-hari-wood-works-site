import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from '@/components/site/hero-section';
import { ServiceCard } from '@/components/site/service-card';
import { ProjectCard } from '@/components/site/project-card';
import { ReviewSection } from '@/components/site/review-section';
import { ContactCTA } from '@/components/site/contact-cta';
import { ExperienceBadge } from '@/components/site/experience-badge';
import { FAQAccordion } from '@/components/site/faq-accordion';
import { businessProfile, featuredServices, featuredProjects, faqs } from '@/lib/site-data';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="container-shell py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {['37 years of experience', 'Custom woodworking', 'Local service in Somavarappadu'].map((item) => (
            <ExperienceBadge key={item} label={item} />
          ))}
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

        <div className="grid gap-6 md:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-4 pb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Featured work</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-walnut md:text-4xl">Recent projects</h2>
            </div>
            <Link href="/projects" className="text-sm font-medium text-walnut underline underline-offset-4">Explore all projects</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
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

      <ContactCTA business={businessProfile} />

      <section className="container-shell py-10">
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative h-72 md:h-full">
              <Image
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                alt="Placeholder craftsmanship photography"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Trusted service</p>
              <h3 className="mt-3 text-2xl font-semibold text-walnut md:text-3xl">Professional woodworking with clear communication.</h3>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Images and project details should be replaced with owner-approved gallery content before launch. Until then, this layout is designed to be ready for real work and easy to update through the admin dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
