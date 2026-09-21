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
    <html lang="en" className="dark">
      <body className="bg-slate-950 min-h-screen text-slate-100 flex justify-center antialiased">
        {/* Mobile Viewport Container Shell */}
        <div className="w-full max-w-md min-h-screen bg-slate-900 border-x border-slate-800/80 shadow-2xl relative flex flex-col overflow-x-hidden">
          <BhandaraProvider>{children}</BhandaraProvider>
        </div>
      </body>
    </html>
  );
}
