/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.ibb.co', 'unsplash.com', 'images.unsplash.com', 'lh3.googleusercontent.com'],
        remotePatterns: [{hostname: "images.unsplash.com"},
        {hostname: "lh3.googleusercontent.com"}]
    },
}

module.exports = nextConfig
