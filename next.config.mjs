import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: { domains: ["example.com"] },
};

export default withNextIntl(nextConfig);
