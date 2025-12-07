import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
              img-src 'self' blob: data: https://*.paddle.com https://dojetjntlqidtfdtykxt.supabase.co;
              font-src 'self';
              frame-src 'self' https://sandbox-buy.paddle.com https://buy.paddle.com;
              connect-src 'self' https://sandbox-buy.paddle.com https://buy.paddle.com https://*.paddle.com https://dojetjntlqidtfdtykxt.supabase.co;
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
    ];
  },
};

export default nextConfig;
