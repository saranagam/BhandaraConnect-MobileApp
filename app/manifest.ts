import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BhandaraConnect - Live Community Food Drive Discovery',
    short_name: 'BhandaraConnect',
    description: 'Discover nearby community bhandaras, live menus, crowd meter, volunteer leaderboards, and AI nutrition macro estimation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#f97316',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
