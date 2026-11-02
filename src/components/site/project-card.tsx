import Link from 'next/link';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import type { Project } from '@/types';

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
      <div className="overflow-hidden bg-[#f7f2e9]">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            width={project.coverImageWidth ?? 1200}
            height={project.coverImageHeight ?? 800}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="h-auto w-full transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-cream text-walnut">
            <ImageOff className="h-7 w-7 text-olive" aria-hidden="true" />
            <span className="text-sm">Owner-approved project photo coming soon</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">{project.category}</p>
        <h3 className="mt-2 text-2xl font-semibold text-walnut">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">{project.description}</p>
      </div>
    </Link>
  );
}
