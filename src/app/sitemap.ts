import type { MetadataRoute } from 'next';
import { featuredProjects } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['/', '/services', '/projects', '/about', '/contact', '/reviews', '/faq', '/privacy'];

  return [
    ...routes.map((route) => ({
      url: new URL(route, siteUrl).toString(),
      lastModified: new Date()
    })),
    ...featuredProjects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
      lastModified: new Date()
    }))
  ];
}
