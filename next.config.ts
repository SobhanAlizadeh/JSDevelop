import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/postprocessing",
    ],
    // این گزینه باعث می‌شود Next.js کدهای قدیمی را برای مرورگرهای منسوخ تولید نکند
    optimizeCss: true, 
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  turbopack: {},
  compress: true,
  // هدف‌گیری مرورگرهای مدرن برای حذف پلی‌فیل‌های غیرضروری
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;