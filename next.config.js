/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const isProd = process.env.NODE_ENV === 'production';

// Strict Content-Security-Policy (CSP)
// Eliminates unused third-party domains and locks down frames, workers, and objects
const scriptSrc = isProd
  ? "default-src 'self'; script-src 'self' 'unsafe-inline';"
  : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';";

const cspValue = `${scriptSrc} style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://api.country.is https://ipwho.is https://ipapi.co; frame-src 'none'; child-src 'none'; worker-src 'none'; manifest-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspValue,
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=(), payment=(), usb=(), bluetooth=(), magnetometer=(), accelerometer=(), gyroscope=(), screen-wake-lock=(), display-capture=(), publickey-credentials-get=(), identity-credentials-get=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'credentialless',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none',
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: 'https://lidzenmac.com',
  },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET, HEAD, OPTIONS',
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: 'Content-Type, Authorization',
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: isProd ? { exclude: ['error'] } : false,
  },
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        source: '/lidZen.dmg',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="lidZen.dmg"',
          },
          {
            key: 'Content-Type',
            value: 'application/x-apple-diskimage',
          },
        ],
      },
      {
        source: '/lidZen.zip',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="lidZen.zip"',
          },
          {
            key: 'Content-Type',
            value: 'application/zip',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
