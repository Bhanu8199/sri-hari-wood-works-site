import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
      <div className="relative h-72 overflow-hidden">
        <Image src={project.coverImage} alt={project.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">{project.category}</p>
        <h3 className="mt-2 text-2xl font-semibold text-walnut">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">{project.description}</p>
      </div>
    </Link>
  );
}
