/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/admin/profile",
        destination: "/admin/profile/products",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
