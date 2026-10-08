import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JSDevelop",
    short_name: "JSDevelop",
    description:
      "آژانس دیجیتال JSDevelop — طراحی وب‌سایت، سئو، تبلیغات گوگل و اتوماسیون n8n",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/logo.webp", // استفاده از لوگوی موجود برای تست سریع
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}