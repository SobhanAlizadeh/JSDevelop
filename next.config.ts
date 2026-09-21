import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // بهینه‌سازی حجم باندل برای پکیج‌های سنگین
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
  // این خط باعث می‌شود هشدار توربوپک برطرف شود
  turbopack: {}, 
    allowedDevOrigins: ['127.0.0.1
      
      '],
};

export default nextConfig;