import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    //  domains: ["192.168.1.87"], // Add your backend's IP or hostname here
    domains: ["modelshostesses.com"], // Add your backend's IP or hostname here

    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.87",
        port: "6061",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "modelshostesses.com",
        port: "6060",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "modelshostesses.com",
        pathname: "/**",
      },
      // Add this for local development without port
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      // Add this for your production backend (port 6061 based on your Nginx config)
      {
        protocol: "https",
        hostname: "modelshostesses.com",
        port: "6061",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
