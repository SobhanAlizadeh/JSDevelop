// src/components/sections/ProductsSection.tsx
// Server Component — بدون JS سمت کلاینت
// محصولات آماده JSDevelop با توضیحات کامل، لینک صفحه اختصاصی و لینک دسترسی مستقیم.
// دیتا از src/lib/products.ts (تک منبع حقیقت) می‌آید.
// اسکیمای ItemList + SoftwareApplication به گوگل کمک می‌کند محصولات را
// به‌عنوان موجودیت‌های جداگانه (school.jsdevelop.ir و takrah.top) بفهمد.

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getIcon } from "@/lib/icons";
import { siteConfig } from "@/lib/metadata";
import { products, productPath } from "@/lib/products";
import { Check, ExternalLink, ArrowLeft } from "lucide-react";

// اسکیمای محصولات — بدون invent کردن قیمت؛ offers عمداً حذف شده است
const productsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "محصولات JSDevelop",
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareApplication",
      name: product.title,
      url: product.url,
      description: product.description,
      applicationCategory:
        product.slug === "school-management"
          ? "EducationalApplication"
          : "BusinessApplication",
      operatingSystem: "Web",
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  })),
};

export function ProductsSection() {
  return (
    <section
      id="products"
      className="relative z-10 section-backdrop py-16 md:py-24 lg:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="محصولات ما"
          title="محصولات آماده — سامانه مدرسه و دستیار هوشمند مطب"
          subtitle="علاوه بر خدمات سفارشی، محصولات آماده و آزموده JSDevelop را همین امروز راه‌اندازی کنید؛ بدون هزینه توسعه از صفر."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {products.map((product) => {
            const IconComponent = getIcon(product.icon);
            return (
              <article
                key={product.title}
                className="group glass-panel rounded-3xl p-6 md:p-8 border border-custom hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                {/* آیکون + برچسب */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {IconComponent && (
                      <IconComponent className="w-7 h-7 text-primary" />
                    )}
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-bold border border-primary/20 whitespace-nowrap">
                    {product.badge}
                  </span>
                </div>

                {/* عنوان و دامنه */}
                <h3 className="text-lg md:text-2xl font-bold text-heading mb-1 leading-relaxed">
                  {product.title}
                </h3>
                <p
                  dir="ltr"
                  className="text-left text-xs md:text-sm text-primary font-semibold mb-4"
                >
                  {product.domain}
                </p>

                {/* توضیحات کامل */}
                <p className="text-xs md:text-base text-muted-custom leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* امکانات */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-xs md:text-sm text-muted-custom leading-relaxed"
                    >
                      <Check
                        className="w-4 h-4 text-primary shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* دکمه‌ها: صفحه اختصاصی (داخلی، سئو) + دسترسی مستقیم محصول */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={productPath(product)}
                    className="flex-1 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold text-sm md:text-base hover:bg-primary/20 transition-colors"
                  >
                    جزئیات و امکانات
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm md:text-base hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    {product.cta}
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA پایین — پل به خدمات سفارشی */}
        <div className="max-w-5xl mx-auto mt-8 md:mt-10">
          <div className="glass-panel rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-custom">
            <p className="text-xs md:text-base text-muted-custom leading-relaxed text-center sm:text-right">
              به دنبال محصولی اختصاصی برای کسب‌وکار خودتان هستید؟ تیم ما ایده
              شما را به یک سامانه کامل تبدیل می‌کند.
            </p>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold text-xs md:text-sm hover:bg-primary/20 transition-colors"
            >
              درخواست مشاوره رایگان
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
