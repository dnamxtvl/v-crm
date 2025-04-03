// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cấu hình Next.js của bạn ở đây
};

const withNextIntl = createNextIntlPlugin();
module.exports = withNextIntl(nextConfig);