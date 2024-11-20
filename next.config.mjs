import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // تجاهل مكتبة fs على جانب العميل
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
