"use client";

import { ArrowLeft, Briefcase, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
<section className="relative min-h-[100dvh] flex items-center pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">      {/* دیگر نیازی به Scene3D اینجا نیست */}
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 text-center lg:text-right"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-primary text-xs md:text-sm font-semibold border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              آژانس دیجیتال — از سال ۲۰۰۹
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              حضور دیجیتال کسب‌وکار شما را به{" "}
              <span className="text-gradient">سطحی تازه</span> می‌بریم
            </h1>

            <p className="text-base md:text-lg text-muted-custom leading-relaxed max-w-xl mx-auto lg:mx-0">
              با استراتژی‌های پیشرفته بازاریابی دیجیتال، طراحی وب‌سایت‌های
              سه‌بعدی با Three.js و اتوماسیون هوشمند با n8n، رشد کسب‌وکار شما
              را تسریع می‌کنیم.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/30 text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  شروع پروژه
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="#portfolio"
                className="px-8 py-4 rounded-xl font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <Briefcase className="w-5 h-5 text-secondary" />
                مشاهده نمونه‌کارها
              </Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 pt-4 border-t border-white/10">
              {["تیم متخصص سئو", "تحویل به‌موقع", "پشتیبانی مستمر"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs md:text-sm text-slate-400">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}