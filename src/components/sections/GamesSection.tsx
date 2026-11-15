// src/components/sections/GamesSection.tsx
// Server Component — بدون JS سمت کلاینت
// بازی‌های موبایل JSDevelop (استودیو جی اس دولپ در کافه بازار) با لینک صفحه
// اختصاصی هر بازی (/games/<slug>) و لینک مستقیم دانلود از کافه بازار.
// دیتا از src/lib/games.ts (تک منبع حقیقت) می‌آید.
// اسکیمای ItemList + VideoGame به گوگل کمک می‌کند هر بازی را به‌عنوان موجودیت جدا بفهمد.

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getIcon } from "@/lib/icons";
import { games, gamePath, gamesListSchemaJson, bazaarDeveloperUrl } from "@/lib/games";
import { Check, Download, ArrowLeft } from "lucide-react";

export function GamesSection() {
  return (
    <section
      id="games"
      className="relative z-10 section-backdrop py-16 md:py-24 lg:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: gamesListSchemaJson() }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="بازی‌های ما"
          title="بازی‌های موبایل JSDevelop — دانلود از کافه بازار"
          subtitle="استودیو بازی‌سازی ما (جی اس دولپ) بازی‌های اندرویدی فارسی می‌سازد؛ از پازل عددی تا کوییز دو نفره — همه‌جا در دسترس کافه بازار."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {games.map((game) => {
            const IconComponent = getIcon(game.icon);
            return (
              <article
                key={game.slug}
                className="group glass-panel rounded-3xl p-6 md:p-8 border border-custom hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                {/* آیکون + ژانر */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {IconComponent && (
                      <IconComponent className="w-7 h-7 text-primary" />
                    )}
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-bold border border-primary/20 whitespace-nowrap">
                    {game.badge}
                  </span>
                </div>

                {/* عنوان و شعار رسمی کافه بازار */}
                <h3 className="text-lg md:text-2xl font-bold text-heading mb-1 leading-relaxed">
                  {game.title}
                </h3>
                <p className="text-xs md:text-sm text-primary font-semibold mb-4 leading-relaxed">
                  {game.tagline}
                </p>

                {/* توضیحات کامل */}
                <p className="text-xs md:text-base text-muted-custom leading-relaxed mb-5">
                  {game.description}
                </p>

                {/* ویژگی‌ها */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {game.features.map((feature) => (
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

                {/* دکمه‌ها: صفحه اختصاصی بازی (داخلی، سئو) + دانلود مستقیم کافه بازار */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={gamePath(game)}
                    className="flex-1 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold text-sm md:text-base hover:bg-primary/20 transition-colors"
                  >
                    جزئیات بازی
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm md:text-base hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    {game.cta}
                    <Download className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA پایین — لینک به صفحه بازی‌ها و صفحه استودیو در کافه بازار */}
        <div className="max-w-5xl mx-auto mt-8 md:mt-10">
          <div className="glass-panel rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-custom">
            <p className="text-xs md:text-base text-muted-custom leading-relaxed text-center sm:text-right">
              همه بازی‌های استودیو ما را یک‌جا ببینید؛ صفحه ما در کافه بازار
              همیشه به‌روزترین نسخه‌ها را دارد.
            </p>
            <div className="flex flex-col sm:flex-row shrink-0 gap-3">
              <Link
                href="/games"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold text-xs md:text-sm hover:bg-primary/20 transition-colors"
              >
                صفحه بازی‌ها
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={bazaarDeveloperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs md:text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                استودیو در کافه بازار
                <Download className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
