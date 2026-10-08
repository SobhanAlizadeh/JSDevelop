import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/metadata";
import { Logo } from "@/components/ui/Logo";
import { SafeEmail, encodedEmail } from "@/components/ui/SafeEmail";
export function Footer() {
  return (
    <footer className="relative z-10 py-12 md:py-16 border-t border-custom bg-card-custom text-muted-custom">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          <div className="lg:col-span-2">
           <Logo size={40} />
            <p className="leading-relaxed max-w-sm mb-6 text-sm md:text-base">
              JSDevelop آژانس دیجیتال در تهران است؛ از طراحی وب‌سایت و سئو تا
              تبلیغات گوگل و اتوماسیون n8n — از سال ۲۰۰۹ در کنار کسب‌وکارها.
            </p>
          </div>
          <div>
            <h4 className="text-heading font-bold mb-4 text-sm md:text-base">
              خدمات
            </h4>
            {/* لینک‌سازی داخلی با انکرتکست کلیدواژه‌محور */}
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors">
                  طراحی وب‌سایت
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors">
                  سئو و بهینه‌سازی سایت
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors">
                  اتوماسیون n8n
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors">
                  تبلیغات گوگل
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-primary transition-colors">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-primary transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-primary transition-colors">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-heading font-bold mb-4 text-sm md:text-base">
              اطلاعات تماس
            </h4>
            <ul className="space-y-3 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-2" dir="ltr">
                <Phone className="w-4 h-4" />
                {siteConfig.phone}
              </li>
              <li className="flex items-center gap-2">
                <SafeEmail
                  encoded={encodedEmail}
                  className="hover:text-primary transition-colors"
                  showIcon
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-custom pt-8 text-center text-xs md:text-sm">
          <p>© ۲۰۰۹–۲۰۲۶ JSDevelop — تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}