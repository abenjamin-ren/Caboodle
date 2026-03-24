import type { Metadata } from 'next';
import { MainNav } from '@/components/nav/MainNav';
import '@/styles/globals.css';
import '@/styles/components.css';

export const metadata: Metadata = {
  title: { default: 'Caboodle', template: '%s — Caboodle' },
  description: 'Structured tools and workflows for designing products around shared objects.',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1a1a2e" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/3938384a1a.js" crossOrigin="anonymous" async></script>
      </head>
      <body className="page">
        <header className="page-header">
          <MainNav />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
