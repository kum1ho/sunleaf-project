/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin'
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index'
      }
    ];
  }
};

module.exports = nextConfig;
