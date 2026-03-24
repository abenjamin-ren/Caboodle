import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Caboodle',
    short_name: 'Caboodle',
    description:
      'Structured tools and workflows for designing products around shared objects.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#1a1a2e',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
