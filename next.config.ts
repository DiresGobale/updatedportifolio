import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow the sandbox preview origin to access Next.js dev resources.
  allowedDevOrigins: ["*.space-z.ai"],
  // Allow loading remote images (Unsplash, project screenshots, etc.) in <img> tags.
  // Note: we use <img> for portfolio assets; this also enables next/image if needed.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
