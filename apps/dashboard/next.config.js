/** @type {import('next').NextConfig} */
const basePath = '/dashboard';
const nextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  transpilePackages: ['@kinetic/database', '@kinetic/ui'],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig