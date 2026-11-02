import type { Metadata } from 'next';
import { ProjectCard } from '@/components/site/project-card';
import { GoogleBusinessSection } from '@/components/site/google-business-section';
import { businessProfile, featuredProjects } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Explore project photos of custom doors, kitchen cabinetry, TV units, wardrobes, and furniture by SRI HARI WOOD WORKS.'
};

export default function ProjectsPage() {
  return (
    <>
      <div className="container-shell py-16">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Our work</p>
          <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Woodwork for your home.</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">A selection of our custom doors, kitchen cabinetry, TV units, wardrobes, and furniture.</p>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {featuredProjects.map((project, index) => (
            <div key={project.slug} className="mb-6 break-inside-avoid">
              <ProjectCard project={project} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
      <GoogleBusinessSection googleBusinessUrl={businessProfile.googleBusinessUrl} />
    </>
  );
}
