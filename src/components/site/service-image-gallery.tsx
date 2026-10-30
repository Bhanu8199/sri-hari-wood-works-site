import Image from 'next/image';
import type { Service } from '@/types';

export function ServiceImageGallery({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <div key={service.slug} className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#f7f2e9]">
          {service.coverImage ? (
            <Image
              src={service.coverImage}
              alt={service.imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-2"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
