import type { Metadata } from "next";

export const siteConfig = {
  name: "JSDevelop",
  title: "آژانس دیجیتال JSDevelop | طراحی وب‌سایت، سئو و اتوماسیون n8n",
  description:
    "آژانس دیجیتال JSDevelop از سال ۲۰۰۹ در تهران — طراحی وب‌سایت حرفه‌ای و سه‌بعدی، سئو و صدر نتایج گوگل، مدیریت تبلیغات گوگل و اتوماسیون کسب‌وکار با n8n. مشاوره رایگان بگیرید.",
  url: "https://jsdevelop.ir",
  locale: "fa_IR",
  twitter: "@jsdevelop",
  email: "customers@jsdevelop.ir",
  phone: "+989229033102",
  address: "تهران، خیابان شریعتی، میرداماد، پلاک ۹۱۱",
  founded: "2009",
};

// کلیدواژه‌های هدف بر اساس تحلیل رقابت SERP فارسی:
// — کلیدواژه‌های دم‌بلند با رقابت پایین (اتوماسیون n8n، وب سه‌بعدی) + کلیدواژه‌های اصلی
export const targetKeywords = [
  "طراحی وب‌سایت",
  "طراحی سایت",
  "آژانس دیجیتال در تهران",
  "سئو",
  "بهینه‌سازی وب‌سایت",
  "سئو تکنیکال",
  "اتوماسیون n8n",
  "اتوماسیون کسب‌وکار",
  "طراحی وب‌سایت سه‌بعدی",
  "وب سه بعدی",
  "Three.js",
  "تبلیغات گوگل",
  "مدیریت کمپین گوگل ادز",
  "بازاریابی دیجیتال",
  "تولید محتوا",
  "UI/UX",
  "JSDevelop",
];

// کد تأیید سرچ کنسول از متغیر محیطی خوانده می‌شود —
// کافی است GOOGLE_SITE_VERIFICATION یا YANDEX_VERIFICATION را در env ست کنید
const verification: Metadata["verification"] = {
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  }),
  ...(process.env.YANDEX_VERIFICATION && {
    yandex: process.env.YANDEX_VERIFICATION,
  }),
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: targetKeywords,
  authors: [{ name: "JSDevelop", url: siteConfig.url }],
  creator: "JSDevelop",
  publisher: "JSDevelop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    // تصویر به‌صورت خودکار از src/app/opengraph-image.tsx تزریق می‌شود (بدون ۴۰۴)
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification,
};
