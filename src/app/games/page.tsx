// src/app/games/page.tsx
// صفحه اختصاصی بازی‌های موبایل JSDevelop — کلمات‌کلیدی:
// دانلود بازی اندروید، بازی‌های کافه بازار، بازی‌های ایرانی، بازی موبایل فارسی
// همه بازی‌ها با لینک دانلود مستقیم از کافه بازار در همین صفحه.
import type { Metadata } from "next";
import Link from "next/link";
import { getIcon } from "@/lib/icons";
import { siteConfig } from "@/lib/metadata";
import {
  games,
  gamePath,
  gamesListSchemaJson,
  bazaarDeveloperUrl,
  bazaarDeveloperLabel,
} from "@/lib/games";
import { Check, Download, ArrowLeft, ChevronLeft, Gamepad2 } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute:
      "دانلود بازی‌های اندروید JSDevelop | بازی‌های فارسی کافه بازار — جی اس دولپ",
  },
  description:
    "بازی‌های موبایل JSDevelop (استودیو جی اس دولپ): ترکیب ۲۰۴۸، دوئل کوییز دو نفره، نووا راکتور فیوژن کیهانی و پژواک — دانلود مستقیم همه بازی‌ها از کافه بازار.",
  alternates: {
    canonical: `${siteConfig.url}/games`,
  },
  openGraph: {
    title: "دانلود بازی‌های اندروید JSDevelop از کافه بازار",
    description:
      "چهار بازی اندرویدی فارسی از استودیو جی اس دولپ: ترکیب ۲۰۴۸، دوئل، نووا و پژواک — دانلود مستقیم از کافه بازار.",
    url: `${siteConfig.url}/games`,
    type: "website",
  },
};

export default function GamesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: gamesListSchemaJson() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: siteConfig.url },
              { "@type": "ListItem", position: 2, name: "بازی‌ها", item: `${siteConfig.url}/games` },
            ],
          }),
        }}
      />

      <main className="relative z-10 pt-28 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          {/*Breadcrumb — لینک‌سازی داخلی و مسیر کاربر */}
          <nav
            aria-label="مسیر صفحه"
            className="flex items-center gap-1.5 text-xs md:text-sm text-muted-custom mb-8 md:mb-10"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              خانه
            </Link>
            <ChevronLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="text-heading font-semibold">بازی‌ها</span>
          </nav>

          {/* ═══════════ هدر صفحه ═══════════ */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-primary" aria-hidden="true" />
              </span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                استودیو بازی‌سازی جی اس دولپ
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-heading font-bold mb-4 leading-relaxed">
              دانلود بازی‌های اندروید JSDevelop از کافه بازار
            </h1>
            {[
              "JSDevelop فقط وب‌سایت و سئو نیست؛ استودیو بازی‌سازی ما با نام «جی اس دولپ» بازی‌های اندرویدی فارسی توسعه می‌دهد که همه از کافه بازار قابل دانلود هستند. چهار بازی فعلی استودیو — ترکیب ۲۰۴۸، دوئل، نووا و پژواک — چهار ژانر متفاوت را پوشش می‌دهند: پازل عددی، کوییز دو نفره، پازل فضایی و ماجرای بقا با سونار.",
              "در این صفحه هر بازی را با توضیح کامل گیم‌پلی، ویژگی‌ها و لینک دانلود مستقیم کافه بازار معرفی می‌کنیم. برای هر بازی هم صفحه جزئیات اختصاصی داریم؛ کافی است روی «جزئیات بازی» بزنید تا سوالات متداول و همه ویژگی‌ها را ببینید. همه بازی‌ها با رابط فارسی و برای گوشی‌های اندروید ساخته شده‌اند.",
              "اگر به‌دنبال بازی برای لحظه‌های کوتاه فرصت هستید، ترکیب ۲۰۴۸ و نووا انتخاب‌های عالی‌اند؛ اگر رقابت با دوستان را دوست دارید، دوئل کوییز دو نفره را نصب کنید؛ و اگر تجربه‌ای متفاوت و اتمسفریک می‌خواهید، پژواک با گیم‌پلی سونار منتظر شماست.",
            ].map((paragraph, i) => (
              <p
                key={i}
                className="text-sm md:text-base text-muted-custom leading-relaxed mb-4 text-justify"
              >
                {paragraph}
              </p>
            ))}

            <a
              href={bazaarDeveloperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm md:text-base hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              مشاهده همه بازی‌ها در صفحه استودیو کافه بازار
              <Download className="w-4 h-4" aria-hidden="true" />
            </a>
            <p dir="ltr" className="text-center text-xs text-muted-custom mt-3">
              {bazaarDeveloperLabel}
            </p>
          </div>

          {/* ═══════════ کارت بازی‌ها با لینک دانلود ═══════════ */}
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 mb-14 md:mb-20">
            {games.map((game) => {
              const IconComponent = getIcon(game.icon);
              return (
                <article
                  key={game.slug}
                  className="glass-panel rounded-3xl p-6 md:p-8 border border-custom hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-5 md:gap-8">
                    {/* ستون آیکون و دکمه‌ها */}
                    <div className="md:w-56 shrink-0 flex md:flex-col items-center md:items-stretch justify-center gap-4">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        {IconComponent && (
                          <IconComponent className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                        )}
                      </div>
                      <a
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all whitespace-nowrap"
                      >
                        {game.cta}
                        <Download className="w-4 h-4" aria-hidden="true" />
                      </a>
                      <Link
                        href={gamePath(game)}
                        className="flex-1 md:w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors whitespace-nowrap"
                      >
                        جزئیات بازی
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>

                    {/* ستون محتوا */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-lg md:text-2xl font-bold text-heading leading-relaxed">
                          {game.title}
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-bold border border-primary/20 whitespace-nowrap">
                          {game.badge}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-primary font-semibold mb-3 leading-relaxed">
                        {game.tagline}
                      </p>
                      <p className="text-xs md:text-base text-muted-custom leading-relaxed mb-4">
                        {game.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {game.features.slice(0, 4).map((feature) => (
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
                      <p
                        dir="ltr"
                        className="text-left text-[10px] md:text-xs text-muted-custom mt-4"
                      >
                        {game.domain}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ═══════════ درباره استودیو ═══════════ */}
          <div className="max-w-3xl mx-auto mb-14 md:mb-20">
            <h2 className="text-xl md:text-3xl text-heading font-bold mb-6">
              استودیو بازی‌سازی جی اس دولپ (JSDevelop)
            </h2>
            {[
              "استودیو جی اس دولپ بخش بازی‌سازی آژانس دیجیتال JSDevelop است؛ همان تیمی که سال‌ها وب‌سایت، سئو و محصولات وب ساخته، حالا بازی‌های موبایل فارسی هم توسعه می‌دهد. بازی‌های استودیو در کافه بازار منتشر می‌شوند تا نصب برای کاربران ایرانی ساده و مطمئن باشد.",
              "رویکرد ما در ساخت بازی ساده است: مکانیک ساده برای شروع، عمق کافی برای ماندگاری و رابط کامل فارسی. به‌جای بازی‌های شلوغ و پرتبلیغ، بازی‌هایی می‌سازیم که با چند دقیقه بازی کردن معنا بدهند و روی هر گوشی اندرویدی روان اجرا شوند.",
              "فهرست بازی‌های استودیو به‌مرور طولانی‌تر می‌شود؛ بهترین راه برای به‌روز ماندن، بازدید از صفحه استودیو در کافه بازار یا همین صفحه است که همیشه با تازه‌ترین بازی‌ها به‌روزرسانی می‌شود. اگر هم ایده‌ی بازی اختصاصی برای برند یا کسب‌وکار خودتان را دارید، از صفحه تماس با ما در میان بگذارید.",
            ].map((paragraph, i) => (
              <p
                key={i}
                className="text-sm md:text-base text-muted-custom leading-relaxed mb-4 text-justify"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* ═══════════ CTA نهایی ═══════════ */}
          <div className="max-w-5xl mx-auto">
            <div className="glass-panel rounded-3xl p-6 md:p-10 border border-custom text-center">
              <h2 className="text-lg md:text-2xl font-bold text-heading mb-3 leading-relaxed">
                ایده‌ی بازی دارید؟ آن را با هم بسازیم
              </h2>
              <p className="text-xs md:text-base text-muted-custom leading-relaxed mb-6 max-w-2xl mx-auto">
                از بازی آموزشی برای مدرسه و آموزشگاه تا بازی تبلیغاتی برای برند
                شما — تیم بازی‌سازی JSDevelop ایده‌ی شما را از طراحی گیم‌پلی تا
                انتشار در کافه بازار پیش می‌برد.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={bazaarDeveloperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm md:text-base hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  صفحه استودیو در کافه بازار
                  <Download className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  href="/#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold text-sm md:text-base hover:bg-primary/20 transition-colors"
                >
                  سفارش ساخت بازی اختصاصی
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
