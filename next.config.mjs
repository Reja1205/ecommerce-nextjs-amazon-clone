/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
        hostname: "your-image-host.com", // add your image host if different
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
