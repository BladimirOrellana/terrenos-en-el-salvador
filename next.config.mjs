import nextPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true, // ✅ Next.js best practice
};

export default nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // ✅ Disable PWA in development
  register: true,
  skipWaiting: true,
});
