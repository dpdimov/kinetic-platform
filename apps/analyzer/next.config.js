/** @type {import('next').NextConfig} */
const basePath = '/analyze';
const nextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  transpilePackages: ['@kinetic/frameworks', '@kinetic/visualization', '@kinetic/ui'],
};
module.exports = nextConfig;
