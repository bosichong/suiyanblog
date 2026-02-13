

import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['react-markdown', 'remark-gfm', 'rehype-raw', 'reading-time'],
  },
  turbopack: {},
  output: 'export',
  trailingSlash: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              chunks: 'all',
              priority: 30,
              reuseExistingChunk: true,
              enforce: true,
            },
            markdown: {
              name: 'markdown',
              test: /[\\/]node_modules[\\/](react-markdown|remark-gfm|rehype-raw|reading-time|gray-matter)[\\/]/,
              chunks: 'all',
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
            },
            giscus: {
              name: 'giscus',
              test: /[\\/]node_modules[\\/]@giscus[\\/]/,
              chunks: 'all',
              priority: 20,
              reuseExistingChunk: true,
              enforce: true,
            },
            styles: {
              name: 'styles',
              type: 'css/mini-extract',
              chunks: 'all',
              enforce: true,
              priority: 5,
            },
            lib: {
              name: 'lib',
              test: /[\\/]node_modules[\\/](lodash|underscore|date-fns|moment)[\\/]/,
              chunks: 'all',
              priority: 15,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.suiyan.cc',
      },
      {
        protocol: 'https',
        hostname: 'suiyan.cc',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: '*.github.com',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://giscus.app https://gc.zgo.at https://www.googletagmanager.com https://www.google-analytics.com https://www.googletagservices.com https://*.bilibili.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob: https://www.suiyan.cc https://github.com https://cdn.jsdelivr.net https://*.githubusercontent.com https://*.bilibili.com; font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https://giscus.app https://gc.zgo.at https://www.google-analytics.com https://suiyan.goatcounter.com https://api.github.com https://*.bilibili.com; child-src 'self' https://player.bilibili.com https://*.bilibili.com; frame-src 'self' https://giscus.app https://player.bilibili.com https://*.bilibili.com https://www.youtube.com; media-src 'self' https://player.bilibili.com https://*.bilibili.com; base-uri 'self'; form-action 'self';"
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      },
    ];
  },
};

// 使用 withBundleAnalyzer 包装配置
const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundle(nextConfig);
