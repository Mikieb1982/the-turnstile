
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
             hostname: 'googleusercontent.com', // For user profile pictures
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // For app/teams/page.tsx
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // For services/mockData.ts
      },
    ],
  },
};

export default nextConfig;
