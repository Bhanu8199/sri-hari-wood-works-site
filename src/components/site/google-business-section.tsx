import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export function GoogleBusinessSection({ googleBusinessUrl }: { googleBusinessUrl: string }) {
  return (
    <section className="bg-[#f2efe9] py-12 md:py-16">
      <div className="container-shell">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-8 lg:flex-row lg:p-10">
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Google Business Profile</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-walnut md:text-4xl">
              Verified reviews and business profile
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
              Scan the code to open our Google profile, see more photos, and read customer reviews.
            </p>
            <a
              href={googleBusinessUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5 inline-flex items-center gap-2"
            >
              Open our Google profile <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the Sri Hari Wood Works Google Business Profile"
            className="w-full max-w-[280px] shrink-0 rounded-2xl border border-border bg-white p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-walnut sm:max-w-[320px] sm:p-4"
          >
            <Image
              src="/images/google-business-qr.png"
              alt="Scannable QR code for the SRI HARI WOOD WORKS Google Business Profile"
              width={810}
              height={810}
              priority
              unoptimized
              className="h-auto w-full"
            />
            <span className="mt-2 block text-center text-sm font-medium text-walnut">Scan to check us out on Google</span>
          </a>
        </div>
      </div>
    </section>
  );
}
