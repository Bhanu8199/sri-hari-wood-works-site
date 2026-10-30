import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ImageOff } from 'lucide-react';
import { whatsappUrl } from '@/lib/site-data';
import type { Service } from '@/types';

export function ServiceCard({ service, whatsappPhone }: { service: Service; whatsappPhone?: string }) {
  return (
    <article id={service.slug} className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f2e9]">
        {service.coverImage ? (
          <>
            <Image
              src={service.coverImage}
              alt={service.imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain p-2"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-xs text-white">
              {service.imageSourceUrl && service.imageLicenseUrl ? (
                <>
                  <span>Illustrative photo · </span>
                  <a href={service.imageSourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    {service.imageCredit}
                  </a>
                  <span> · </span>
                  <a href={service.imageLicenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    {service.imageLicenseLabel}
                  </a>
                </>
              ) : (
                <span>{service.imageCredit}</span>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-walnut">
            <ImageOff className="h-7 w-7 text-olive" aria-hidden="true" />
            <p className="max-w-[16rem] px-4 text-sm">Owner-approved {service.title.toLowerCase()} photos coming soon</p>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">{service.category}</p>
        <h3 className="mt-2 text-2xl font-semibold text-walnut">{service.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">{service.shortDescription}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/contact?service=${service.slug}`} className="btn-primary">
            Request an Estimate <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
          <a
            href={whatsappUrl(`Hello Sri Hari Wood Works, I would like to enquire about ${service.title}. Please contact me to discuss my requirements.`, whatsappPhone)}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
