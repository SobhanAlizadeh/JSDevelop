"use client";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/metadata";
import { Logo } from "@/components/ui/Logo";
export function Footer() {
  return (
    <footer className="relative z-10 py-12 md:py-16 border-t border-white/5 bg-dark text-slate-400">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          <div className="lg:col-span-2">
           <Logo size={40} />
            <p className="leading-relaxed max-w-sm mb-6 text-sm md:text-base">
              ما با استراتژی‌های پیشرفته بازاریابی دیجیتال و راهکارهای توسعه
              کسب‌وکار، رشد شما را تسریع می‌کنیم.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm md:text-base">
              دسترسی سریع
            </h4>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link href="#services" className="hover:text-primary transition-colors">
                  خدمات
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-primary transition-colors">
                  نمونه‌کارها
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-primary transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-primary transition-colors">
                  تماس
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm md:text-base">
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
              <li className="flex items-center gap-2" dir="ltr">
                <Mail className="w-4 h-4" />
                {siteConfig.email}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-xs md:text-sm">
          <p>© ۲۰۰۹–۲۰۲۶ JSDevelop — تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}