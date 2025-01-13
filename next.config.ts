import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
   turbo: {
     resolveAlias: {
       canvas: './empty-module.ts',
     },
   },
 },
};

export default nextConfig;
