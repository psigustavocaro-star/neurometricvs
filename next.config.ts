import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],
  experimental: {
    esmExternals: 'loose'
  },
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
              style-src 'self' 'unsafe-inline' https://sandbox-cdn.paddle.com;
              img-src 'self' blob: data: https://*.paddle.com https://dojetjntlqidtfdtykxt.supabase.co https://neurometricslatam.com;
              font-src 'self';
              frame-src 'self' https://sandbox-buy.paddle.com https://buy.paddle.com;
              connect-src 'self' https://sandbox-buy.paddle.com https://buy.paddle.com https://*.paddle.com https://dojetjntlqidtfdtykxt.supabase.co https://mindicador.cl https://open.er-api.com;
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
