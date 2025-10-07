import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.137.223",
        port: "6060",
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
  env: {
    BACKEND_URL:
      process.env.NODE_ENV === "production"
        ? "https://modelshostesses.com/api" // Use your Nginx proxy
        : "http://192.168.137.223:6060",
  },
};

export default withNextIntl(nextConfig);
