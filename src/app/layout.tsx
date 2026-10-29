import '@/app/globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Sri Hari Wood Works | Carpenter in Somavarappadu',
    template: '%s | Sri Hari Wood Works'
  },
  description:
    'Custom woodworking and carpentry services in Somavarappadu, Andhra Pradesh. Trusted craftsmanship with 37 years of experience.',
  openGraph: {
    title: 'Sri Hari Wood Works',
    description: 'Custom furniture, doors, wardrobes, and residential carpentry built around your space.',
    type: 'website',
    locale: 'en_IN'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-walnut antialiased">
        <Providers>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(201,154,98,0.16),transparent_30%)]">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
