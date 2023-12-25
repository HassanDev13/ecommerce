/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  images : {
    domains : ['localhost', 'picsum.photos'] // <== Domain name
  }
}

module.exports = nextConfig
