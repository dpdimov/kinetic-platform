/** @type {import('next').NextConfig} */
const basePath = '/coach';
const nextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  transpilePackages: ['@kinetic/frameworks', '@kinetic/visualization', '@kinetic/ui'],
};
module.exports = nextConfig;
