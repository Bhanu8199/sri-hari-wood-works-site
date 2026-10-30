import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { getBusinessProfile } from '@/lib/business-settings';

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description: 'Read verified customer feedback for SRI HARI WOOD WORKS.'
};

export default async function ReviewsPage() {
  const business = await getBusinessProfile();

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Customer reviews</p>
        <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Verified reviews</h1>
        <div className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-soft">
          <p className="text-base leading-7 text-slate-700">
            No review text has been published on this website yet. Visit our Google Business Profile to read available customer feedback.
          </p>
          <a
            href={business.googleBusinessUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-6 inline-flex items-center gap-2"
          >
            View Google Business Profile <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
