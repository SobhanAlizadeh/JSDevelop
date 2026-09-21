// src/app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import { SceneWrapper } from "@/components/three/SceneWrapper"; // ایمپورت کامپوننت جدید

export const metadata: Metadata = {
  title: "صفحه اصلی",
  description: siteConfig.description,
};

export default function Home() {
  return (
    <>
      {/* 🌟 صحنه سه‌بعدی به عنوان پس‌زمینه ثابت کل صفحه */}
      <SceneWrapper />

      {/* تمام بخش‌ها relative و z-10 هستند تا روی بوم سه‌بعدی قرار بگیرند */}
      <main className="relative z-10">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}