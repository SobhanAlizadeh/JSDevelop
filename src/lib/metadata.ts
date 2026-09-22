import type { Metadata } from "next";

export const siteConfig = {
  name: "JSDevelop",
  title: "JSDevelop | آژانس دیجیتال و توسعه کسب‌وکار",
  description:
    "آژانس دیجیتال JSDevelop — سئو، تبلیغات گوگل، طراحی وب‌سایت سه‌بعدی و اتوماسیون با n8n. از سال ۲۰۹ در کنار کسب‌وکارها.",
  url: "https://jsdevelop.ir",
  locale: "fa_IR",
  twitter: "@jsdevelop",
  email: "customers@jsdevelop.ir",
  phone: "+989229033102",
  address: "تهران، خیابان شریعتی، میرداماد، پلاک ۹۱۱",
  founded: "2009",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "سئو",
    "طراحی وب‌سایت",
    "اتوماسیون n8n",
    "وب‌سایت سه‌بعدی",
    "Three.js",
    "توسعه نرم‌افزار",
    "UI/UX",
    "JSDevelop",
  ],
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
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
};