/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://www.tiktok.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
