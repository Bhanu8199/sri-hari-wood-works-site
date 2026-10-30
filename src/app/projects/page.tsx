import type { Metadata } from 'next';
import { ServiceImageGallery } from '@/components/site/service-image-gallery';
import { featuredServices } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Explore five woodworking specialties and owner-supplied photos from SRI HARI WOOD WORKS.'
};

export default function ProjectsPage() {
  return (
    <div className="container-shell py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Our work</p>
        <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Woodwork for your home.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Explore our work photos
        </p>
      </div>

      <ServiceImageGallery services={featuredServices} />
    </div>
  );
}
