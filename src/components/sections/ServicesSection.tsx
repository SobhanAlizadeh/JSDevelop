"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProjectModal } from "@/components/ui/ProjectModal";

interface Project {
  name: string;
  image: string;
  link: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  relatedProjects?: Project[];
}

// تصویر placeholder برای پروژه‌های در حال ساخت
const PLACEHOLDER_IMAGE = "/images/None.webp";

const services: Service[] = [
  // ═══════════════════════════════════════════
  // ۱. سئو و بهینه‌سازی وب‌سایت
  // ═══════════════════════════════════════════
  {
    icon: "search",
    title: "سئو و بهینه‌سازی وب‌سایت",
    description:
      "تحلیل تکنیکال کامل، کلیدواژه‌های هدفمند با ابزارهای حرفه‌ای و لینک‌سازی استراتژیک برای صدر نتایج گوگل.",
    relatedProjects: [
      {
        name: "تک راه : مسیر تو به دنیای تکنولوژی",
        image: "/images/takrah.webp",
        link: "https://takrah.vercel.app/",
      },
      {
        name: "JSDevelop ",
        image: "/images/JSD.webp",
        link: "https://jsdevelop.ir",
      },
      {
        name: "وکیل سایرس",
        image: "/images/cyruslaw.webp",
        link: "https://cyruslaw.net/",
      },
      {
        name: "بیمارستان مجازی",
        image: "/images/virtualhospital.webp",
        link: "https://virtualhospital.ir/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۲. مدیریت تبلیغات گوگل
  // ═══════════════════════════════════════════
  {
    icon: "bar-chart-3",
    title: "مدیریت تبلیغات گوگل",
    description:
      "بهینه‌سازی روزانه بودجه و کلیدواژه، تست A/B خلاقیت‌ها و داشبورد لحظه‌ای برای بیشترین ROI.",
    relatedProjects: [
      {
        name: "Mega Card - کمپین تبلیغاتی",
        image: "/images/megacard.webp",
        link: "https://megacard.tr.co/",
      },
      {
        name: "Visual Ads - تبلیغات بصری",
        image: "/images/visualads.webp",
        link: "https://visualads.com/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۳. مدیریت شبکه‌های اجتماعی
  // ═══════════════════════════════════════════
  {
    icon: "share-2",
    title: "مدیریت شبکه‌های اجتماعی",
    description:
      "استراتژی اختصاصی، تولید محتوای بصری و مدیریت تعامل در اینستاگرام و لینکدین.",
    relatedProjects: [
      {
        name: "SunTeam - بازاریابی شبکه‌ای",
        image: "/images/sunteam.webp",
        link: "https://sunteam-mlm.com/",
      },
      {
        name: "Soranto - مدیریت محتوا",
        image: "/images/soranto.webp",
        link: "https://soranto.com/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۴. ارتقای فروش آنلاین
  // ═══════════════════════════════════════════
  {
    icon: "trending-up",
    title: "ارتقای فروش آنلاین",
    description:
      "بهینه‌سازی قیف فروش، لندینگ‌های اعتمادساز و اتوماسیون ایمیل برای افزایش نرخ تبدیل.",
    relatedProjects: [
      {
        name: "Amaze Deals - فروشگاه آنلاین",
        image: "/images/amaze-deals.webp",
        link: "https://amaze-deals.vercel.app/",
      },
      {
        name: "Bootimar - پلتفرم رزرو بلیط",
        image: "/images/bootimar.webp",
        link: "https://bootimar.com/",
      },
      {
        name: "Navaran - ناوبری آنلاین",
        image: "/images/navaran.webp",
        link: "https://navaran.com/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۵. طراحی وب‌سایت
  // ═══════════════════════════════════════════
  {
    icon: "globe",
    title: "طراحی وب‌سایت",
    description:
      "وب‌سایت‌های سریع، امن و واکنش‌گرا با UI/UX سفارشی و بهترین شیوه‌های سئو.",
    relatedProjects: [
      {
        name: "Hotelyar - رزرواسیون هتل",
        image: "/images/hotelyar.webp",
        link: "https://hotelyar.com/",
      },
      {
        name: "Liftino - صنعت آسانسور",
        image: "/images/liftino.webp",
        link: "https://liftino.ir/",
      },
      {
        name: "Cyrus Law - سایت حقوقی",
        image: "/images/cyruslaw.webp",
        link: "https://cyruslaw.net/",
      },
      {
        name: "Virtual Hospital - سلامت",
        image: "/images/virtualhospital.webp",
        link: "https://virtualhospital.ir/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۶. توسعه نرم‌افزار
  // ═══════════════════════════════════════════
  {
    icon: "code-2",
    title: "توسعه نرم‌افزار",
    description:
      "نرم‌افزارهای سفارشی با معماری ماژولار، API امن و پشتیبانی و به‌روزرسانی مستمر.",
    relatedProjects: [
      {
        name: "Virtual Hospital - وب‌اپ سلامت",
        image: "/images/virtualhospital.webp",
        link: "https://virtualhospital.ir/",
      },
      {
        name: "Wallet Crypto - کیف پول ارز دیجیتال",
        image: "/images/wallet-crypto.webp",
        link: "https://wallet-crypto.eu/",
      },
      {
        name: "Daap App - پلتفرم غیرمتمرکز",
        image: "/images/daapapp.webp",
        link: "https://daapapp.com/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۷. اپلیکیشن موبایل
  // ═══════════════════════════════════════════
  {
    icon: "smartphone",
    title: "اپلیکیشن موبایل",
    description:
      "طراحی و توسعه اپلیکیشن‌های موبایل برای ارتقای کسب‌وکار آنلاین شما با تست رایگان.",
    relatedProjects: [
      {
        name: "Daap App - اپ غیرمتمرکز",
        image: "/images/daapapp.webp",
        link: "https://daapapp.com/",
      },
      {
        name: "Papachi Kids - اپ کودک",
        image: "/images/papachikids.webp",
        link: "https://www.papachikids.com/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۸. طراحی UI/UX
  // ═══════════════════════════════════════════
  {
    icon: "pen-tool",
    title: "طراحی UI/UX",
    description:
      "تحقیق پرسونا، وایرفریم و پروتوتایپ تا رابط نهایی با تست دسترسی‌پذیری.",
    relatedProjects: [
     
      {
        name: "Visual Ads - طراحی تبلیغات",
        image: "/images/visualads.webp",
        link: "https://visualads.com/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۹. تولید محتوا
  // ═══════════════════════════════════════════
  {
    icon: "file-text",
    title: "تولید محتوا",
    description:
      "مقالات، کپشن‌ها و تقویم محتوای منظم با ویرایش حرفه‌ای برای ماندگاری برند.",
    relatedProjects: [
    
      {
        name: "Takrah - محتوای تکنولوژی",
        image: "/images/takrah.webp",
        link: "https://takrah.vercel.app/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۱۰. هویت بصری
  // ═══════════════════════════════════════════
  {
    icon: "palette",
    title: "هویت بصری",
    description:
      "طراحی لوگو، پالت رنگ و سند کامل راهنمای برند برای هویتی منسجم و یکتا.",
    relatedProjects: [
      {
        name: "Visual Ads - هویت بصری تبلیغاتی",
        image: "/images/visualads.webp",
        link: "https://visualads.com/",
      },
      {
        name: "Mega Card - برندینگ",
        image: "/images/megacard.webp",
        link: "https://megacard.tr.co/",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۱۱. اتوماسیون n8n (در انتظار پروژه واقعی)
  // ═══════════════════════════════════════════
  {
    icon: "workflow",
    title: "اتوماسیون n8n",
    description:
      "اتصال CRM، ایمیل و بیش از ۴۰۰ اپلیکیشن با ورک‌فلوهای هوشمند و خطای صفر.",
    relatedProjects: [
      {
        name: "در حال آماده‌سازی",
        image: "/images/None.webp",
        link: "#",
      },
    ],
  },

  // ═══════════════════════════════════════════
  // ۱۲. وب سه‌بعدی (در انتظار پروژه واقعی)
  // ═══════════════════════════════════════════
  {
    icon: "box",
    title: "وب سه‌بعدی (Three.js)",
    description:
      "تجربه‌های غوطه‌ور با WebGL و شیدرهای سفارشی، ۶۰ فریم روان روی همه دستگاه‌ها.",
    relatedProjects: [
      {
        name: "JSDevelop",
        image: "/images/JSD.webp",
        link: "/",
      },
      {
        name: "Canoon",
        image: "/images/canoon.webp",
        link: "https://camera-webgi.vercel.app/",
      },
    ],
  },
];

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="relative z-10 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="خدمات ما"
          title="راهکارهای جامع برای نیازهای کسب‌وکار شما"
          subtitle="از سئو و تبلیغات تا وب‌سه‌بعدی و اتوماسیون — همه‌چیز زیر یک سقف"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
              relatedProjects={service.relatedProjects}
              onViewProjects={
                service.relatedProjects
                  ? () => setSelectedService(service)
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      <ProjectModal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        serviceTitle={selectedService?.title || ""}
        projects={selectedService?.relatedProjects || []}
      />
    </section>
  );
}