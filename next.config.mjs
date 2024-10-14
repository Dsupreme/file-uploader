/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**", // Temporarily allow any host
          },
        ],
      },
};

export default nextConfig;
