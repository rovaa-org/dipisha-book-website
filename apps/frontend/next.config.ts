import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@dipisha/ui'],
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.ts",
    },
  },
};

export default withSentryConfig(nextConfig, {
  org: "rovaa",
  project: "dipisha-book-website",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  webpack: {
    reactComponentAnnotation: {
      enabled: true,
    },
  },
  sourcemaps: {
    disable: false,
  },
});
