import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About us',
  description: 'Learn about the story, experience, and personalized approach behind Sri Hari Wood Works.'
};

export default function AboutPage() {
  return (
    <div className="container-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">About us</p>
          <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Craftsmanship built on 37 years of practical woodworking experience.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            SRI HARI WOOD WORKS is a family-owned carpentry and woodworking business serving Somavarappadu and nearby residential customers. We focus on custom woodwork, practical project execution, and direct customer communication from enquiry to handover.
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Every project is reviewed with the customer’s requirements in mind, from material choices and finish details to site conditions and timeline expectations. We keep communication clear and transparent, including estimate discussions and travel-related charges when applicable.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-white p-4 shadow-soft">
          <div className="relative h-[540px] overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
              alt="Workshop interior placeholder"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
