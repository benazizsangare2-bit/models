import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["192.168.137.223"], // Add your backend's IP or hostname here
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.137.223:6060",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
