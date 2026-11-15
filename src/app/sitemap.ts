import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata"; // اطمینان حاصل کنید این فایل وجود دارد
import { products, productPath } from "@/lib/products";

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
  ];
}
