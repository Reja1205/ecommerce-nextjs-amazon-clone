// ✅ next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com"], // or your actual image CDN/domain
  },
  reactStrictMode: true,
};

export default nextConfig;
