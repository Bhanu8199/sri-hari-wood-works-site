import type { Metadata } from 'next';
import { FAQAccordion } from '@/components/site/faq-accordion';
import { faqs } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about custom woodwork, estimates, site visits, and project enquiries.'
};

export default function FAQPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">FAQ</p>
          <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Answers to common questions</h1>
        </div>
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}
