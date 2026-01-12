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
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.paddle.com https://*.paddle.com https://public.profitwell.com https://*.profitwell.com;
              style-src 'self' 'unsafe-inline' https://cdn.paddle.com https://*.paddle.com;
              img-src 'self' blob: data: https://*.paddle.com https://dojetjntlqidtfdtykxt.supabase.co https://neurometricslatam.com https://flagcdn.com;
              font-src 'self' data: https://*.paddle.com;
              frame-src 'self' https://*.paddle.com;
              connect-src 'self' ws://localhost:* wss://localhost:* https://*.paddle.com https://*.profitwell.com https://dojetjntlqidtfdtykxt.supabase.co https://mindicador.cl https://open.er-api.com https://ipwho.is https://api.openweathermap.org;
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
