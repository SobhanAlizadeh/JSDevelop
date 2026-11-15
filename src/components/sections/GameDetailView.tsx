// src/components/sections/GameDetailView.tsx
// Server Component — قالب مشترک صفحه اختصاصی هر بازی
// همه محتوا در DOM برای خزندگان؛ آکاردئون FAQ با <details> بومی (بدون JS)؛
// اسکیماهای VideoGame + BreadcrumbList + FAQPage در page.tsx تزریق می‌شوند.

import Link from "next/link";
import { getIcon } from "@/lib/icons";
import { gamePath, games, type Game } from "@/lib/games";
import { Check, Download, ChevronLeft, Sparkles } from "lucide-react";

export function GameDetailView({ game }: { game: Game }) {
  const IconComponent = getIcon(game.icon);

  return (
    <main className="relative z-10 pt-28 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/*Breadcrumb — لینک‌سازی داخلی و مسیر کاربر */}
        <nav aria-label="مسیر صفحه" className="flex items-center gap-1.5 text-xs md:text-sm text-muted-custom mb-8 md:mb-10">
          <Link href="/" className="hover:text-primary transition-colors">
            خانه
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <Link href="/games" className="hover:text-primary transition-colors">
            بازی‌ها
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="text-heading font-semibold">{game.title}</span>
        </nav>

        {/* ═══════════ هدر بازی ═══════════ */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              {IconComponent && <IconComponent className="w-7 h-7 text-primary" />}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              {game.badge}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-heading font-bold mb-4 leading-relaxed">
            {game.h1}
          </h1>
          <p dir="ltr" className="text-center text-xs md:text-sm text-primary font-semibold mb-6">
            {game.domain}
          </p>
          <p className="text-sm md:text-lg text-heading font-semibold leading-relaxed mb-6 text-center">
            «{game.tagline}»
          </p>
          {game.intro.map((paragraph, i) => (
            <p key={i} className="text-sm md:text-base text-muted-custom leading-relaxed mb-4 text-justify">
              {paragraph}
            </p>
          ))}

          <a
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm md:text-base hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            {game.cta}
            <Download className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* ═══════════ ویژگی‌های کامل ═══════════ */}
        <div className="max-w-5xl mx-auto mb-14 md:mb-20">
          <h2 className="text-xl md:text-3xl text-heading font-bold mb-6 md:mb-8">
            ویژگی‌های {game.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {game.featuresDetailed.map((feature) => (
              <div
                key={feature.title}
                className="glass-panel rounded-2xl p-5 md:p-6 border border-custom hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Check className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  <h3 className="text-sm md:text-base font-bold text-heading">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-muted-custom leading-relaxed pr-7">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ مناسب برای چه کسانی ═══════════ */}
        <div className="max-w-5xl mx-auto mb-14 md:mb-20">
          <h2 className="text-xl md:text-3xl text-heading font-bold mb-6">
            مناسب برای چه کسانی؟
          </h2>
          <div className="flex flex-wrap gap-3">
            {game.audiences.map((audience) => (
              <span
                key={audience}
                className="px-4 py-2.5 rounded-xl glass-panel border border-custom text-xs md:text-sm text-muted-custom font-medium"
              >
                {audience}
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════ سوالات متداول ═══════════ */}
        <div className="max-w-3xl mx-auto mb-14 md:mb-20">
          <h2 className="text-xl md:text-3xl text-heading font-bold mb-6">
            سوالات متداول درباره {game.primaryKeyword}
          </h2>
          <div className="space-y-3 md:space-y-4">
            {game.faqs.map((faq, index) => (
              <details
                key={index}
                className="group glass-panel rounded-2xl border border-custom overflow-hidden transition-colors hover:border-primary/40 open:border-primary/50"
                open={index === 0}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6 text-right select-none">
                  <h3 className="text-sm md:text-lg font-bold text-heading leading-relaxed">
                    {faq.question}
                  </h3>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-xs md:text-base text-muted-custom leading-relaxed border-t border-custom pt-4">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ═══════════ سایر بازی‌های استودیو — لینک‌سازی داخلی ═══════════ */}
        <div className="max-w-5xl mx-auto mb-14 md:mb-20">
          <h2 className="text-xl md:text-3xl text-heading font-bold mb-6">
            بازی‌های دیگر استودیو ما
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GameLinks slug={game.slug} />
          </div>
        </div>

        {/* ═══════════ CTA نهایی ═══════════ */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-3xl p-6 md:p-10 border border-custom text-center">
            <h2 className="text-lg md:text-2xl font-bold text-heading mb-3 leading-relaxed">
              بازی را دانلود کنید یا بازی خودتان را بسازیم؟
            </h2>
            <p className="text-xs md:text-base text-muted-custom leading-relaxed mb-6 max-w-2xl mx-auto">
              همین حالا {game.title} را از کافه بازار دانلود کنید؛ اگر هم ایده‌ی
              بازی اختصاصی برای برند، کسب‌وکار یا پروژه‌ی خودتان دارید، تیم
              بازی‌سازی JSDevelop در کنار شماست.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm md:text-base hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                {game.cta}
                <Download className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold text-sm md:text-base hover:bg-primary/20 transition-colors"
              >
                سفارش ساخت بازی اختصاصی
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// لینک‌های بازی‌های دیگر (همه به‌جز بازی جاری) — در grid صفحه

function GameLinks({ slug }: { slug: string }) {
  return (
    <>
      {games
        .filter((g) => g.slug !== slug)
        .map((other) => {
          const OtherIcon = getIcon(other.icon);
          return (
            <Link
              key={other.slug}
              href={gamePath(other)}
              className="glass-panel rounded-2xl p-4 md:p-5 border border-custom hover:border-primary/50 transition-colors flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                {OtherIcon && <OtherIcon className="w-5 h-5 text-primary" />}
              </span>
              <span className="flex flex-col min-w-0">
                <span className="text-xs md:text-sm font-bold text-heading truncate">
                  {other.shortTitle}
                </span>
                <span className="text-[10px] md:text-xs text-muted-custom">
                  {other.badge}
                </span>
              </span>
            </Link>
          );
        })}
    </>
  );
}
