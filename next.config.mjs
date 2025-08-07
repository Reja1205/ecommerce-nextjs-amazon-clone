/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true, // ✅ Allow Vercel to build even with ESLint errors
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "your-image-host.com", // keep your current host
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com", // <--- Added example.com here
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
