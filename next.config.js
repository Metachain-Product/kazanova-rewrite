/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // next.config.js

  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              `frame-ancestors verify.walletconnect.org verify.walletconnect.com;`,
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
