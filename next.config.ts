import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
// Force restart: v2

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {

  transpilePackages: ['@react-pdf/renderer'],

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.paddle.com https://sandbox-buy.paddle.com;
              style-src 'self' 'unsafe-inline' https://cdn.paddle.com https://sandbox-cdn.paddle.com;
              img-src 'self' blob: data: https://*.paddle.com https://dojetjntlqidtfdtykxt.supabase.co https://neurometricslatam.com;
              font-src 'self';
              frame-src 'self' https://sandbox-buy.paddle.com https://buy.paddle.com;
              connect-src 'self' https://sandbox-buy.paddle.com https://buy.paddle.com https://*.paddle.com https://dojetjntlqidtfdtykxt.supabase.co https://mindicador.cl https://open.er-api.com https://ipwho.is;
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
    ];
  },
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
