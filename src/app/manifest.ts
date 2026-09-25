import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JSDevelop - آژانس دیجیتال",
    short_name: "JSDevelop",
    description: "حضور دیجیتال کسب‌وکار شما را به سطحی تازه می‌بریم",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#3b82f6",
    orientation: "portrait-primary",
    lang: "fa",
    dir: "rtl",
    icons: [
      // --- آیکون‌های سایز ۱۹۲ ---
      {
        src: "/icons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any", // حالت عادی (در Android)
      },
      {
        src: "/icons/web-app-manifest-192x192.png", // ⚠️ نکته مهم پایین را بخوانید
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable", // حالت دایره‌ای/نیمه‌دایره‌ای (iOS/PWA)
      },
      
      // --- آیکون‌های سایز ۵۱۲ ---
      {
        src: "/icons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}