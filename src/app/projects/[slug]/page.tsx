import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { featuredProjects } from '@/lib/site-data';

export async function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = featuredProjects.find((item) => item.slug === params.slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: project.title,
    description: project.description
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = featuredProjects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container-shell py-16">
      <div className="mb-8">
        <Link href="/projects" className="text-sm font-medium text-olive underline underline-offset-4">← Back to projects</Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
            <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">{project.category}</p>
          <h1 className="text-4xl font-semibold text-walnut">{project.title}</h1>
          <p className="text-base leading-7 text-slate-700">{project.description}</p>
          {project.completedAt ? <p className="text-sm text-slate-600">Completed: {project.completedAt}</p> : null}
          <div className="flex flex-wrap gap-3">
            <a href="tel:+919948519979" className="btn-primary">Ask about a similar project</a>
            <a href="https://wa.me/919948519979" target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
