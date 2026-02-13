/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kinetic/database'],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig