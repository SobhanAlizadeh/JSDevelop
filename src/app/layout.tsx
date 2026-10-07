import type { Metadata, Viewport } from "next";
import { Vazirmatn, Space_Grotesk } from "next/font/google"; // ✅ هر دو فونت در یک خط ایمپورت شدند
import { ThemeProvider } from "next-themes";
import { defaultMetadata, siteConfig } from "@/lib/metadata";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// فونت فارسی


// فونت انگلیسی برای شرکا — preload:false چون فقط در مارکی شرکا استفاده می‌شود و نباید با LCP رقابت کند
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  ...defaultMetadata,
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eeeeee" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD Schema برای Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  foundingDate: siteConfig.founded,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tehran",
    addressCountry: "IR",
    streetAddress: siteConfig.address,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    contactType: "customer service",
    email: siteConfig.email,
    availableLanguage: ["Persian", "English"],
  },
};

// JSON-LD Schema برای WebSite
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
};
const vazir = Vazirmatn({
  subsets: ["arabic"],
  // فقط وزن‌های واقعاً استفاده‌شده: ۴۰۰ (بدنه)، ۵۰۰ (متوسط)، ۷۰۰ (بولد)، ۹۰۰ (بلک)
  weight: ["400", "500", "700", "900"],
  variable: "--font-vazir",
  display: "swap",
  preload: true,
  // adjustFontFallback پیش‌فرض (true) باقی می‌ماند تا فونت جایگزین اندازه دقیق داشته باشد و CLS صفر بماند
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazir.variable} ${spaceGrotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        {/* preload لوگو حذف شد — کامپوننت Logo با priority خودش preload صحیح می‌سازد */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      {/* رفع باگ لایت‌مود: استایل inline تیره حذف شد — رنگ‌ها از متغیرهای CSS در globals.css می‌آیند */}
      <body
        className={`${vazir.className} antialiased bg-background text-foreground selection:bg-primary selection:text-white`}
      >        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
          >
            پرش به محتوا
          </a>

          <Header />
          <main id="main-content" className="overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}