// src/components/sections/ProductsSection.tsx
// Server Component — بدون JS سمت کلاینت
// محصولات آماده JSDevelop با توضیحات کامل و لینک دسترسی مستقیم.
// اسکیمای ItemList + SoftwareApplication به گوگل کمک می‌کند محصولات را
// به‌عنوان موجودیت‌های جداگانه (school.jsdevelop.ir و takrah.top) بفهمد.

import { SectionHeader } from "@/components/ui/SectionHeader";
import { getIcon } from "@/lib/icons";
import { siteConfig } from "@/lib/metadata";
import { Check, ExternalLink } from "lucide-react";

interface Product {
  icon: string;
  badge: string;
  title: string;
  domain: string;
  url: string;
  description: string;
  features: string[];
  cta: string;
}

const products: Product[] = [
  {
    icon: "graduation-cap",
    badge: "محصول اختصاصی JSDevelop",
    title: "سامانه مدیریت پیشرفته مدرسه",
    domain: "school.jsdevelop.ir",
    url: "https://school.jsdevelop.ir/",
    description:
      "سامانه جامع مدیریت مدرسه برای مدارس و آموزشگاه‌ها: مدیریت دانش‌آموزان و دبیران، ثبت نمرات و صدور خودکار کارنامه، حضور و غیاب، برنامه هفتگی و ارتباط لحظه‌ای با اولیا — همه در یک پنل فارسی، سریع و ساده که بدون آموزش پیچیده استفاده می‌شود.",
    features: [
      "مدیریت کامل دانش‌آموزان، کلاس‌ها و سال تحصیلی",
      "ثبت نمرات و صدور خودکار کارنامه",
      "حضور و غیاب روزانه با گزارش دقیق",
      "برنامه هفتگی و مدیریت دبیران",
      "پورتال اولیا: اطلاع‌رسانی پیام و نمره",
      "دسترسی نقش‌محور: مدیر، معلم، اولیا و دانش‌آموز",
    ],
    cta: "ورود به سامانه مدیریت مدرسه",
  },
  {
    icon: "bot",
    badge: "هوش مصنوعی",
    title: "منشی و دستیار هوشمند مطب (تک‌راه)",
    domain: "takrah.top",
    url: "https://takrah.top/packages",
    description:
      "دستیار هوش مصنوعی که به‌جای منشی برای مطب خصوصی شما کار می‌کند: تماس‌ها و پیام‌های بیماران را ۲۴ ساعته پاسخ می‌دهد، نوبت می‌گیرد و یادآوری می‌کند تا برنامه مطب همیشه منظم بماند و هیچ بیماری به‌خاطر بی‌پاسخی تلفن از دست نرود.",
    features: [
      "پاسخگویی خودکار تماس و پیام بیماران با هوش مصنوعی",
      "نوبت‌دهی آنلاین ۲۴ ساعته، بدون تماس تلفنی",
      "یادآوری پیامکی نوبت و کاهش نرخ نوزشو (no-show)",
      "مدیریت برنامه روزانه و مراجعین مطب",
      "کاهش بار تلفنی مطب و هزینه استخدام منشی",
      "پکیج‌های متنوع متناسب با اندازه هر مطب",
    ],
    cta: "مشاهده پکیج‌ها و تعرفه‌ها",
  },
];

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
      applicationCategory: product.icon === "graduation-cap" ? "EducationalApplication" : "BusinessApplication",
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

                {/* دکمه دسترسی به محصول */}
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm md:text-base hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  {product.cta}
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
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
