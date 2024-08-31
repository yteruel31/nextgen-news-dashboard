/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.guim.co.uk",
      },
      {
        protocol: "http",
        hostname: "**.guim.co.uk",
      },
    ],
  },
};

export default nextConfig;
