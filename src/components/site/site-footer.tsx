import Link from 'next/link';
import { ArrowRight, MapPin, Phone, MessageCircleMore } from 'lucide-react';
import { businessProfile } from '@/lib/site-data';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#eadcc5] bg-[#211710] text-[#f8f4ec]">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold">SRI HARI WOOD WORKS</p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-[#d8d8d0]">Custom woodworking, carpentry, and home fit-out services in Somavarappadu, Andhra Pradesh.</p>
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
              <p>+91 99485 19979</p>
              <p>Somavarappadu, Andhra Pradesh 534450</p>
              <p>Open until 6:00 PM</p>
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
