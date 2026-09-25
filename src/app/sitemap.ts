import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata"; // اطمینان حاصل کنید این فایل وجود دارد

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url; // مثال: https://www.jsdevelop.ir

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // اگر صفحات دیگری دارید، اینجا اضافه کنید:
    // {
    //   url: `${baseUrl}/services`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ];
}