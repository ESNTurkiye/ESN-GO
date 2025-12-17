import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ESN GO - Explore Türkiye',
    short_name: 'ESN GO',
    description: 'Erasmus student platform for exploring Turkish cities',
    start_url: '/',
    display: 'standalone',
    background_color: '#2e3192',
    theme_color: '#2e3192',
    icons: [
      {
        src: '/images/logos/web-esn-white.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}

