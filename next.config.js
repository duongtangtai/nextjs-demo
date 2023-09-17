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
    reactStrictMode: false
  }

module.exports = nextConfig
