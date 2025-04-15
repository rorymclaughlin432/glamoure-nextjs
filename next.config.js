// filepath: c:\Users\rmcla\Documents\nextjs-ecommerce\next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "i.ibb.co",
        "unsplash.com",
        "images.unsplash.com",
        "lh3.googleusercontent.com",
      ],
      remotePatterns: [
        { hostname: "images.unsplash.com" },
        { hostname: "lh3.googleusercontent.com" },
      ],
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value: `
                default-src 'self';
                script-src 'self' https://js.stripe.com https://m.stripe.network 'unsafe-inline' 'unsafe-eval';
                style-src 'self' 'unsafe-inline';
                img-src 'self' data:;
                frame-src https://js.stripe.com https://m.stripe.network;
                connect-src 'self' https://api.stripe.com;
              `
                .replace(/\s{2,}/g, " ")
                .trim(),
            },
          ],
        },
      ];
    },
  };

  module.exports = nextConfig;