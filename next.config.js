/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  rewrites: async () => {
    return [
      {
        source: '/apis/:path*',
        destination: `${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/:path*`,
      },
      {
        source: '/search-image-api:path*',
        destination: process.env.NEXT_PUBLIC_SEARCH_IMAGE_SERVER_URL,
      },
    ];
  },
};

module.exports = nextConfig;
