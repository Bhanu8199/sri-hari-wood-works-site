import type { Metadata } from 'next';
import Image from 'next/image';
import { getBusinessProfile } from '@/lib/business-settings';

export const metadata: Metadata = {
  title: 'About us',
  description: 'Meet the proprietors of SRI HARI WOOD WORKS, with 37 Years of Experience serving Andhra Pradesh and Telangana.'
};

export default async function AboutPage() {
  const business = await getBusinessProfile();
  return (
    <div className="container-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">About us</p>
          <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Craftsmanship built on {business.experienceYears} Years of Experience.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            SRI HARI WOOD WORKS provides woodworking services based on each customer’s project requirements. We focus on practical project execution and direct communication from enquiry to handover.
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            We serve customers across {business.serviceArea}. Project feasibility and any travel charges are discussed during the estimate process.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-olive">Business proprietors</p>
            <p className="mt-4 text-lg font-semibold text-walnut">Prop.: {business.ownerName}</p>
            <p className="mt-2 text-lg font-semibold text-walnut">Co-Prop.: {business.coOwnerName}</p>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-[#f5ecdc] shadow-soft">
          <Image
            src="/images/venkateswara-swamy-woodwork.png"
            alt="Intricately carved wooden Venkateswara Swamy panel."
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
