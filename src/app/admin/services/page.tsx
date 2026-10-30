import { getPublishedServices } from '@/lib/business-settings';

export default async function AdminServicesPage() {
  const services = await getPublishedServices();

  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Services</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Published offerings</h1>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.slug} className="flex items-center justify-between gap-5 rounded-2xl border border-border bg-white p-4 shadow-soft">
            <div>
              <h2 className="text-lg font-semibold text-walnut">{service.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-700">{service.shortDescription}</p>
            </div>
            <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-walnut">Live</span>
          </div>
        ))}
      </div>
    </div>
  );
}
