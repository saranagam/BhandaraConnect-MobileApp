import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BhandaraProvider } from '@/context/BhandaraContext';

export const metadata: Metadata = {
  title: 'BhandaraConnect - Community Food Drive Discovery',
  description: 'Discover nearby community bhandaras, live menus, crowd meter, volunteer leaderboards, and AI nutrition macro estimation.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BhandaraConnect',
  },
};

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen flex justify-center antialiased transition-colors duration-200">
        {/* Mobile Viewport Container Shell */}
        <div className="w-full max-w-md min-h-screen bg-stone-50 dark:bg-slate-900 border-x border-stone-200 dark:border-slate-800/80 shadow-2xl relative flex flex-col overflow-x-hidden transition-colors duration-200">
          <BhandaraProvider>{children}</BhandaraProvider>
        </div>
      </body>
    </html>
  );
}
