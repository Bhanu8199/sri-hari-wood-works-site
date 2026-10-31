'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Menu, MessageCircleMore } from 'lucide-react';
import { formatPhoneNumber, whatsappUrl } from '@/lib/site-data';
import type { BusinessProfile } from '@/types';

export function SiteHeader({ business }: { business: BusinessProfile }) {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  function closeMobileMenu() {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadcc5] bg-[#fffdf9]/90 backdrop-blur-sm">
      <div className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6b77c] bg-walnut font-serif text-lg font-bold tracking-tight text-[#f4d99e]"
          >
            SH
          </div>
          <div>
            <p className="text-sm font-semibold text-walnut sm:text-lg">{business.businessName}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-walnut lg:flex">
          {['Home', 'Services', 'Our Work', 'About', 'Contact', 'FAQ'].map((item) => (
            <Link key={item} href={item === 'Home' ? '/' : item === 'Services' ? '/services' : item === 'Our Work' ? '/projects' : item === 'About' ? '/about' : item === 'Contact' ? '/contact' : '/faq'} className="hover:text-olive">
              {item}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className="btn-primary">Request an Estimate</Link>
          <a
            href={whatsappUrl(undefined, business.whatsappPhone)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/60 bg-white px-5 py-3 text-sm font-semibold text-[#167a39] transition hover:bg-[#effbf3]"
          >
            <MessageCircleMore className="h-4 w-4" aria-hidden="true" /> WhatsApp
          </a>
        </div>

        <details ref={mobileMenuRef} className="relative lg:hidden">
          <summary className="flex h-11 w-11 list-none cursor-pointer items-center justify-center rounded-full border border-border bg-white text-walnut" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </summary>
          <nav className="absolute right-0 top-14 z-50 w-64 space-y-3 rounded-2xl border border-border bg-white p-5 shadow-soft">
            {[
              ['Home', '/'],
              ['Services', '/services'],
              ['Our Work', '/projects'],
              ['About', '/about'],
              ['Contact', '/contact'],
              ['FAQ', '/faq']
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={closeMobileMenu} className="block text-sm font-medium text-walnut">{label}</Link>
            ))}
            <a href={`tel:${business.phone}`} onClick={closeMobileMenu} className="block text-sm font-semibold text-walnut">Call {formatPhoneNumber(business.phone)}</a>
            <a href={`tel:${business.secondaryPhone}`} onClick={closeMobileMenu} className="block text-sm font-semibold text-walnut">Call {formatPhoneNumber(business.secondaryPhone)}</a>
            <Link href="/contact" onClick={closeMobileMenu} className="block text-sm font-semibold text-walnut">Request an Estimate</Link>
            <a href={whatsappUrl(undefined, business.whatsappPhone)} onClick={closeMobileMenu} target="_blank" rel="noreferrer" className="block text-sm font-semibold text-[#167a39]">WhatsApp</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
