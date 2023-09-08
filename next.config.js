/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    compiler: {
      styledComponents: {
        ssr: true,
      }
    },
  }

module.exports = nextConfig
