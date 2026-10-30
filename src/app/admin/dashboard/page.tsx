import Link from 'next/link';
import { getBusinessProfile } from '@/lib/business-settings';

export default async function AdminDashboardPage() {
  const business = await getBusinessProfile();

  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold text-walnut">Business overview</h1>
      </div>
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-walnut">{business.businessName}</h2>
        <div className="mt-4 space-y-2 text-slate-700">
          <p>Primary phone: <a className="font-semibold text-walnut" href={`tel:${business.phone}`}>{business.phone}</a></p>
          <p>Secondary phone: <a className="font-semibold text-walnut" href={`tel:${business.secondaryPhone}`}>{business.secondaryPhone}</a></p>
          <p>WhatsApp: +{business.whatsappPhone}</p>
          <p>Email: <a className="font-semibold text-walnut" href={`mailto:${business.email}`}>{business.email}</a></p>
          <p>Service area: {business.serviceArea}</p>
        </div>
        <Link href="/admin/settings" className="btn-primary mt-6 inline-flex">Edit business settings</Link>
      </div>
    </div>
  );
}
