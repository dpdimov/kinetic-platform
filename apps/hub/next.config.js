/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kinetic/ui'],
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/assess', destination: 'https://kinetic-assessment.vercel.app/assess' },
        { source: '/assess/:path+', destination: 'https://kinetic-assessment.vercel.app/assess/:path+' },
        { source: '/dashboard', destination: 'https://kinetic-dashboard.vercel.app/dashboard' },
        { source: '/dashboard/:path+', destination: 'https://kinetic-dashboard.vercel.app/dashboard/:path+' },
        { source: '/analyze', destination: 'https://kinetic-analyzer.vercel.app/analyze' },
        { source: '/analyze/:path+', destination: 'https://kinetic-analyzer.vercel.app/analyze/:path+' },
        { source: '/coach', destination: 'https://kinetic-coach.vercel.app/coach' },
        { source: '/coach/:path+', destination: 'https://kinetic-coach.vercel.app/coach/:path+' },
      ],
    };
  },
};
module.exports = nextConfig;
