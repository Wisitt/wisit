// next.config.ts
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    nextScriptWorkers: true,
  },
  webpack: (config: Configuration) => {
    // ป้องกันกรณี config.resolve อาจจะ undefined
    config.resolve = config.resolve || {};
    // fallback เป็น property ที่ webpack types อาจไม่ชัดเจน - cast ชั่วคราว
    const resolveAny = config.resolve as any;
    resolveAny.fallback = {
      ...(resolveAny.fallback || {}),
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
