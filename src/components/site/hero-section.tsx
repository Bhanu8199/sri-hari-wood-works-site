import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';

export function HeroSection({ serviceArea, baseLocation }: { serviceArea: string; baseLocation: string }) {
  return (
    <section className="container-shell grid gap-8 py-10 md:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-[#eadcc5] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-walnut">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Based in {baseLocation} · Serving {serviceArea}
        </p>
        <h1 className="mt-5 max-w-[700px] text-[2.5rem] font-semibold tracking-tight text-walnut">End-to-End Custom Woodwork, Perfected Over 37 Years of Mastery.</h1>
        <p className="mt-5 max-w-xl text-lg leading-[1.6] text-slate-700">Complete residential woodwork solutions—custom wardrobes, ergonomic modular kitchens, and handcrafted furniture tailored precisely to your floor plan and finish preferences.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/projects" className="btn-secondary inline-flex items-center gap-2">Explore Our Work <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>

      <div className="relative min-h-[360px] overflow-hidden rounded-[32px] border border-[#d8c39d] bg-[#f5ecdc] shadow-soft md:min-h-[480px]">
        <Image
          src="/images/sri-hari-wood-works-emblem.png"
          alt="Carved wooden Vinayaka emblem with the Sri Hari Wood Works name."
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}
