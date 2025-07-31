import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com", // add your image host here if needed
      // "your-cdn-domain.com"
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
