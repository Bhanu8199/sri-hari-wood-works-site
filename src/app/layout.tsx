import '@/app/globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { Providers } from '@/components/providers';
import { getBusinessHourConfig, getBusinessProfile, getPublishedServices } from '@/lib/business-settings';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg'
  },
  title: {
    default: 'SRI HARI WOOD WORKS | Custom Carpentry in Andhra Pradesh & Telangana',
    template: '%s | Sri Hari Wood Works'
  },
  description:
    'SRI HARI WOOD WORKS offers customized woodworking, wardrobes, cupboards, doors, windows, modular kitchens, cots, and furniture across Andhra Pradesh and Telangana. Contact us to discuss your requirements.',
  openGraph: {
    title: 'SRI HARI WOOD WORKS | Custom Carpentry in Andhra Pradesh & Telangana',
    description: 'Wardrobes, cupboards, doors, windows, modular kitchens, cots, furniture, and customized wood works across Andhra Pradesh and Telangana.',
    type: 'website',
    locale: 'en_IN'
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [business, hourConfig, services] = await Promise.all([
    getBusinessProfile(),
    getBusinessHourConfig(),
    getPublishedServices()
  ]);
  const structuredBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: business.businessName,
    telephone: business.phone,
    email: business.email,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: new URL('/icon.svg', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').toString(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressCountry: 'IN'
    },
    areaServed: business.serviceArea.split(/\s+and\s+/i).map((area) => ({
      '@type': 'AdministrativeArea',
      name: area.trim()
    })),
    openingHoursSpecification: hourConfig
      .filter(({ isClosed }) => !isClosed)
      .map(({ dayOfWeek, opensAt, closesAt }) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]}`,
        opens: opensAt,
        closes: closesAt
      })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.secondaryPhone,
      contactType: 'customer service'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Woodworking services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title }
      }))
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* The root layout loads this font stylesheet across every route. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-walnut antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredBusinessData).replace(/</g, '\\u003c') }}
        />
        <Providers>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(201,154,98,0.16),transparent_30%)]">
            <SiteHeader business={business} />
            <main>{children}</main>
            <SiteFooter business={business} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
