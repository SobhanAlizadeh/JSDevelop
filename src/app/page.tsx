// src/app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import { SceneWrapper } from "@/components/three/SceneWrapper";

// ⚠️ عنوان override نشده تا title کلیدواژه‌محور پیش‌فرض
// (طراحی وب‌سایت، سئو و اتوماسیون n8n) در تگ <title> بنشیند
export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      {/* 🌟 صحنه سه‌بعدی به عنوان پس‌زمینه ثابت کل صفحه */}
      <SceneWrapper />

      {/* تمام بخش‌ها relative و z-10 هستند تا روی بوم سه‌بعدی قرار بگیرند */}
      <main className="relative z-10 overflow-x-hidden">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  );
}