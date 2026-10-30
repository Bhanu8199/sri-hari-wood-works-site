import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function ReviewSection({ reviews }: { reviews: Array<{ author: string; review: string; source: string }> }) {
  return (
    <section className="bg-[#f2efe9] py-16">
      <div className="container-shell">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Customer reviews</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-walnut md:text-4xl">Verified reviews and business profile</h2>
        </div>

        {reviews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <blockquote key={review.author} className="rounded-3xl border border-border bg-white p-6 shadow-soft">
                <p className="text-base leading-7 text-slate-700">“{review.review}”</p>
                <footer className="mt-4 border-t border-border pt-4 text-sm font-medium text-walnut">
                  {review.author}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-white p-8 text-center shadow-soft">
            <p className="text-base text-slate-700">No review text has been published yet. Use the business’s Google listing for additional verified customer feedback.</p>
            <Link href="/reviews" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-walnut">
              Read customer reviews <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
