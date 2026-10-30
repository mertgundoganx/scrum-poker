import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Scrum Poker Online — Free Planning Poker for Agile Teams',
    short_name: 'Scrum Poker',
    description: 'Free real-time planning poker tool for agile sprint estimation. Fibonacci, T-Shirt, custom decks. No sign-up required.',
    id: '/',
    start_url: '/',
    scope: '/',
    lang: 'en',
    display: 'standalone',
    background_color: '#FBFAF7',
    theme_color: '#FBFAF7',
    categories: ['productivity', 'utilities', 'business'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
