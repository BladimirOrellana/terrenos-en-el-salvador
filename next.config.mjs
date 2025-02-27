import nextPWA from "next-pwa";

export default {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // Ensures App Router is enabled
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
  },
};
