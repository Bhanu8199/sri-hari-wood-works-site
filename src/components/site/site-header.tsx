import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Menu, Phone, MessageCircleMore } from 'lucide-react';
import { businessProfile } from '@/lib/site-data';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eadcc5] bg-[#fffdf9]/90 backdrop-blur-sm">
      <div className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-walnut text-lg font-semibold text-white">S</div>
          <div>
            <p className="text-lg font-semibold text-walnut">SRI HARI</p>
            <p className="text-xs uppercase tracking-[0.2em] text-olive">Wood Works</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-walnut md:flex">
          {['Home', 'Services', 'Our Work', 'About', 'Contact', 'FAQ'].map((item) => (
            <Link key={item} href={item === 'Home' ? '/' : item === 'Services' ? '/services' : item === 'Our Work' ? '/projects' : item === 'About' ? '/about' : item === 'Contact' ? '/contact' : '/faq'} className="hover:text-olive">
              {item}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+919948519979" className="btn-primary">Call Now</a>
          <a href="https://wa.me/919948519979" target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp</a>
        </div>

        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-walnut md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
