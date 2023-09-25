/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd-mobile'],
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: {
      ssr: true,
    }
  },
  reactStrictMode: false,
}

module.exports = nextConfig
