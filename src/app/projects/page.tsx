import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { featuredProjects, businessProfile } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Project gallery',
  description: 'Portfolio of woodworking and carpentry work by Sri Hari Wood Works.'
};

export default function ProjectsPage() {
  return (
    <div className="container-shell py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Our work</p>
        <h1 className="mt-3 text-4xl font-semibold text-walnut md:text-5xl">Recent woodworking projects.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This gallery is designed to display owner-approved photography and project details. Replace placeholders with published client work before going live.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featuredProjects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
            <div className="relative h-72 overflow-hidden">
              <Image src={project.coverImage} alt={project.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">{project.category}</p>
              <h3 className="mt-2 text-2xl font-semibold text-walnut">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
