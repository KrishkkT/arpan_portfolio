/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ["github.com", "avatars.githubusercontent.com", "raw.githubusercontent.com"],
  },
};

export default nextConfig;
