import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { featuredProjects, whatsappUrl } from '@/lib/site-data';
import { getBusinessProfile } from '@/lib/business-settings';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

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

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const business = await getBusinessProfile();
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
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-border bg-[#f7f2e9] shadow-soft">
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority
                className="object-contain p-2"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 bg-cream text-walnut">
                <span>Owner-approved project photo coming soon</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">{project.category}</p>
          <h1 className="text-4xl font-semibold text-walnut">{project.title}</h1>
          <p className="text-base leading-7 text-slate-700">{project.description}</p>
          {project.completedAt ? <p className="text-sm text-slate-600">Completed: {project.completedAt}</p> : null}
          <div>
            <a
              href={whatsappUrl(`Hello Sri Hari Wood Works, I would like to enquire about a similar ${project.category.toLowerCase()} project to ${project.title}. Please contact me to discuss my requirements.`, business.whatsappPhone)}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              Ask about a similar product on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
