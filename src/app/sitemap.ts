import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata"; // اطمینان حاصل کنید این فایل وجود دارد
import { products, productPath } from "@/lib/products";
import { games, gamePath } from "@/lib/games";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url; // مثال: https://www.jsdevelop.ir

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // صفحات اختصاصی محصولات — کلمات‌کلیدی مستقل برای هر محصول
    ...products.map((product) => ({
      url: `${baseUrl}${productPath(product)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // صفحه بازی‌ها + صفحات اختصاصی هر بازی — کلمات‌کلیدی دانلود بازی اندروید
    {
      url: `${baseUrl}/games`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...games.map((game) => ({
      url: `${baseUrl}${gamePath(game)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
