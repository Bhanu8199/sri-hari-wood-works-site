import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
      <div className="relative h-60 overflow-hidden">
        <Image src={service.coverImage} alt={service.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">{service.category}</p>
        <h3 className="mt-2 text-2xl font-semibold text-walnut">{service.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">{service.shortDescription}</p>
        <Link href={`/services#${service.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-walnut">
          Enquire about this service <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
