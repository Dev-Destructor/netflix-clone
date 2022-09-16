/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["rb.gy"],
    dangerouslyAllowSVG: true,
  }
}

module.exports = nextConfig
