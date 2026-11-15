// src/app/products/school-management/page.tsx
// صفحه اختصاصی محصول «سامانه مدیریت پیشرفته مدرسه» — کلمات‌کلیدی:
// سامانه مدیریت مدرسه، نرم‌افزار مدیریت مدرسه، کارنامه، حضور و غیاب
import type { Metadata } from "next";
import { ProductDetailView } from "@/components/sections/ProductDetailView";
import {
  getProductBySlug,
  productPath,
  productSchemaJson,
  breadcrumbSchemaJson,
  faqSchemaJson,
} from "@/lib/products";
import { siteConfig } from "@/lib/metadata";

const product = getProductBySlug("school-management")!;

export const metadata: Metadata = {
  title: { absolute: product.seoTitle },
  description: product.seoDescription,
  alternates: {
    canonical: `${siteConfig.url}${productPath(product)}`,
  },
  openGraph: {
    title: product.seoTitle,
    description: product.seoDescription,
    url: `${siteConfig.url}${productPath(product)}`,
    type: "website",
  },
};

export default function SchoolManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productSchemaJson(product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchemaJson(product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson(product) }}
      />
      <ProductDetailView product={product} />
    </>
  );
}
