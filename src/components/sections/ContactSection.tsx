"use client";

import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowUpLeft } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/metadata";

export function ContactSection() {
  const contactCards = [
    {
      icon: MapPin,
      title: "آدرس دفتر",
      value: siteConfig.address,
      href: "https://maps.google.com/?q=تهران+شریعتی+میرداماد+2911",
      color: "text-primary",
      bgColor: "bg-primary/10",
      cta: "مشاهده روی نقشه",
    },
    {
      icon: Phone,
      title: "تماس تلفنی",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      cta: "تماس بگیرید",
    },
    {
      icon: Mail,
      title: "ایمیل",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      color: "text-accent",
      bgColor: "bg-accent/10",
      cta: "ارسال ایمیل",
    },
    {
      icon: MessageCircle,
      title: "واتساپ",
      value: "پاسخگویی سریع",
      href: `https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      cta: "شروع گفتگو",
    },
  ];

  return (
    <section
      id="contact"
      className="relative z-10 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* سرصفحه بخش */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold tracking-wider text-xs md:text-sm uppercase">
            تماس با ما
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-heading">
            در ارتباط باشید
          </h2>
          <p className="text-muted-custom text-sm md:text-lg max-w-2xl mx-auto px-4">
            برای مشاوره رایگان و شروع پروژه، از طریق هر یک از راه‌های زیر با ما در تماس باشید.
          </p>
        </motion.div>

        {/* کارت‌های تماس */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {contactCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-panel p-6 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center"
              >
                {/* آیکون */}
                <div
                  className={`w-14 h-14 rounded-2xl ${card.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className={`w-7 h-7 ${card.color}`} />
                </div>

                {/* عنوان */}
                <h3 className="text-base md:text-lg font-bold mb-2 text-heading">
                  {card.title}
                </h3>

                {/* مقدار */}
                <p
                  className="text-sm text-muted-custom leading-relaxed mb-4 break-all"
                  dir={card.title === "ایمیل" || card.title === "تماس تلفنی" ? "ltr" : "rtl"}
                >
                  {card.value}
                </p>

                {/* دکمه CTA */}
                <span
                  className={`mt-auto inline-flex items-center gap-1 text-xs md:text-sm ${card.color} font-semibold group-hover:gap-2 transition-all`}
                >
                  {card.cta}
                  <ArrowUpLeft className="w-4 h-4" />
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* نوار اطلاعات تکمیلی */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 md:mt-14 max-w-4xl mx-auto glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-heading text-base md:text-lg">
                ساعات کاری
              </h3>
              <p className="text-muted-custom text-sm">
                شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر
              </p>
            </div>
          </div>

          <div className="hidden md:block h-12 w-px bg-custom"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-heading text-base md:text-lg">
                پاسخگویی سریع
              </h3>
              <p className="text-muted-custom text-sm">
                کمتر از ۲ ساعت در روزهای کاری
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA نهایی */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}?text=سلام،%20می‌خواهم%20درباره%20خدمات%20JSDevelop%20مشاوره%20بگیرم.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-green-500/30 transition-all transform hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5" />
            مشاوره رایگان در واتساپ
          </a>
          <p className="text-muted-custom text-xs md:text-sm mt-4">
            بدون نیاز به فرم، مستقیم با ما گفتگو کنید
          </p>
        </motion.div>
      </div>
    </section>
  );
}