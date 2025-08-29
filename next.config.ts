import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,   // 🚀 skip ESLint errors in production
  },
  typescript: {
    ignoreBuildErrors: true,    // 🚀 skip TypeScript errors in production
  },
};

export default nextConfig;
