import Link from 'next/link';
import { formatPhoneNumber } from '@/lib/site-data';
import type { BusinessProfile } from '@/types';

export function SiteFooter({ business }: { business: BusinessProfile }) {
  return (
    <footer className="border-t border-[#eadcc5] bg-[#211710] text-[#f8f4ec]">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold">{business.businessName}</p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-[#d8d8d0]">Woodworking services for customers across {business.serviceArea}.</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d6c5af]">Quick links</p>
            <div className="mt-4 space-y-2 text-sm text-[#f8f4ec]">
              <Link href="/services">Services</Link><br />
              <Link href="/projects">Our Work</Link><br />
              <Link href="/about">About</Link><br />
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d6c5af]">Contact</p>
            <div className="mt-4 space-y-2 text-sm text-[#f8f4ec]">
              <a className="block" href={`tel:${business.phone}`}>{formatPhoneNumber(business.phone)}</a>
              <a className="block" href={`tel:${business.secondaryPhone}`}>{formatPhoneNumber(business.secondaryPhone)}</a>
              <a className="block break-all" href={`mailto:${business.email}`}>{business.email}</a>
              <p>{business.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-[#d8d8d0]">
          © 2026 Sri Hari Wood Works • <Link href="/privacy">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
}
