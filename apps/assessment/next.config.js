/** @type {import('next').NextConfig} */
const basePath = '/assess';
const nextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
  transpilePackages: ['@kinetic/database', '@kinetic/ui'],
}

module.exports = nextConfig