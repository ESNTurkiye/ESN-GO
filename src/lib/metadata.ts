import { Metadata } from 'next';

export const siteConfig = {
  name: 'ESN GO',
  title: 'ESN GO - Explore Türkiye with Erasmus Students',
  description: 'ESN GO is a digital platform that enables Erasmus students visiting Türkiye to easily explore cities with features such as city guides, tour packages, favourite route saving, and student reviews.',
  url: 'https://esn-go.com',
  ogImage: 'https://esn-go.com/images/og-image.jpg',
  twitter: '@esn_turkey',
  keywords: [
    'ESN',
    'Erasmus',
    'Turkey',
    'Türkiye',
    'Student Exchange',
    'Travel Guide',
    'City Guides',
    'Student Life',
    'International Students',
    'Study Abroad'
  ],
};

export function createMetadata({
  title,
  description,
  path = '',
  images = [siteConfig.ogImage],
}: {
  title?: string;
  description?: string;
  path?: string;
  images?: string[];
}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const fullDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: 'ESN Turkey' }],
    creator: 'ESN Turkey',
    publisher: 'ESN Turkey',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: fullTitle,
      description: fullDescription,
      siteName: siteConfig.name,
      images: images.map(image => ({
        url: image,
        width: 1200,
        height: 630,
        alt: fullTitle,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images,
      creator: siteConfig.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      // Add other verification codes as needed
    },
  };
}

export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logos/web-esn-white.png`,
    sameAs: [
      'https://www.instagram.com/esn_turkey/',
      'https://www.facebook.com/ESNTurkey',
      'https://twitter.com/esn_turkey',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Turkish'],
    },
  };
}

