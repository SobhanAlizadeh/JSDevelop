// src/app/products/clinic-ai-assistant/page.tsx
// صفحه اختصاصی محصول «منشی و دستیار هوشمند مطب» — کلمات‌کلیدی:
// منشی هوشمند مطب، نوبت‌دهی آنلاین مطب، دستیار هوش مصنوعی پزشکان
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

const product = getProductBySlug("clinic-ai-assistant")!;

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

export default function ClinicAiAssistantPage() {
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
