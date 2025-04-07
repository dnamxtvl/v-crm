// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

const withNextIntl = createNextIntlPlugin();
module.exports = withNextIntl(nextConfig);