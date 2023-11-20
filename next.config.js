const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {  
  output: 'export',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig;