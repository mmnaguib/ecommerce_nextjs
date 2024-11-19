import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'encrypted-tbn2.gstatic.com',
  //       pathname: '/images/**',
  //     },
  //   ],
  // },
};

export default withNextIntl(nextConfig);
