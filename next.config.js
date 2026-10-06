/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Clerk auth needs a Node server (Vercel). Capacitor loads the hosted URL.
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
