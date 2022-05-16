/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_URL.replace("https://", "")],
  },
  // TODO: Temporarily, should be removed soon.
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
