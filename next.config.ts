/* eslint-disable @typescript-eslint/no-explicit-any */
import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    nextScriptWorkers: true,
  },
  webpack: (config: any) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

const millionConfig = {
  auto: {
    rsc: true,
    threshold: 0.05,
  },
  mute: true,
}

module.exports = million.next(nextConfig, millionConfig);