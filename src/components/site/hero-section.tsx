import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="container-shell grid gap-8 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Professional carpentry & woodworking</p>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-walnut md:text-6xl">Craftsmanship Built on 37 Years of Experience.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">Custom woodworking and carpentry services for your home, built around your requirements.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/contact" className="btn-primary">Request an Estimate</Link>
          <Link href="/projects" className="btn-secondary">Explore Our Work</Link>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-border bg-white p-3 shadow-soft">
        <div className="relative h-[480px] overflow-hidden rounded-[26px]">
          <Image
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
            alt="Premium woodworking craftsmanship placeholder"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
