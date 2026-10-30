import { MessageCircleMore, PhoneCall } from 'lucide-react';
import { whatsappUrl } from '@/lib/site-data';

export function ContactCTA({ business }: { business: { phone: string; secondaryPhone: string; whatsappPhone: string } }) {
  return (
    <section className="container-shell py-16">
      <div className="rounded-[32px] bg-walnut px-6 py-10 text-[#f8f4ec] shadow-soft md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d9c8b3]">Get in touch</p>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Planning a woodworking project? Let’s discuss your requirements.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${business.phone}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-walnut"><PhoneCall className="h-4 w-4" /> Call now</a>
            <a href={`tel:${business.secondaryPhone}`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-5 py-3 text-sm font-semibold text-white"><PhoneCall className="h-4 w-4" /> Call second number</a>
            <a href={whatsappUrl(undefined, business.whatsappPhone)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-5 py-3 text-sm font-semibold text-white"><MessageCircleMore className="h-4 w-4" /> WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}
