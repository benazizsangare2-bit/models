import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "192.168.137.223", // Your local backend IP (keep for development)
      "localhost", // Local development
      "modelshostesses.com", // Your production domain
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.137.223",
        port: "6060", // Your backend port
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "modelshostesses.com",
        port: "6060", // Your backend port
        pathname: "/**",
      },
      // Add this for your production backend (assuming it's on the same domain but different port)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081", // Your new custom backend port
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "modelshostesses.com",
        pathname: "/**",
      },
    ],
  },
  // Optional: Add env variables for your backend URL
  env: {
    BACKEND_URL:
      process.env.NODE_ENV === "production"
        ? "https://modelshostesses.com:8081"
        : "http://192.168.137.223:6060",
  },
};

export default withNextIntl(nextConfig);
