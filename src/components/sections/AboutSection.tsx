"use client";

import { motion } from "framer-motion";
import { Code, BarChart, Cpu, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";

const partners = ["Digi Alpha", "Daap App", "Mega Card", "niasa", "دانشگاه شریف", "دانشگاه ری"];

export function AboutSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="relative z-10 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-semibold tracking-wider text-xs md:text-sm uppercase">
              درباره ما
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              شریک دیجیتال قابل اعتماد شما
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6 text-base md:text-lg">
              با بیش از یک دهه تجربه در بازاریابی دیجیتال و توسعه کسب‌وکار، به
              صدها کسب‌وکار کمک کرده‌ایم به اهداف خود دست یابند.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 text-base md:text-lg">
              تیم متخصصان ما خلاقیت را با استراتژی‌های داده‌محور ترکیب می‌کند تا
              نتایج استثنایی ارائه دهد — از صدر نتایج گوگل تا تجربه‌های سه‌بعدی
              immersive و اتوماسیون‌های بی‌نقص.
            </p>

            <div className="glass-panel p-5 md:p-6 rounded-2xl border-l-4 border-l-primary inline-flex items-center gap-4 mb-10 w-full md:w-auto">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-2xl shrink-0">
                👨‍💻
              </div>
              <div>
                <h4 className="font-bold text-white text-base md:text-lg">طیب علیزاده</h4>
                <p className="text-primary text-sm">بنیان‌گذار و مهندس سئو</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs md:text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                شرکای معتبر ما
              </h4>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {partners.map((partner) => (
                  <span
                    key={partner}
                    className="px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/5 text-slate-300 text-xs md:text-sm border border-white/5"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative glass-panel p-6 md:p-8 rounded-3xl border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-28 md:h-32 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                  <Code className="w-8 h-8 md:w-10 md:h-10 text-primary/50" />
                </div>
                <div className="h-28 md:h-32 rounded-2xl bg-slate-800/50 flex items-center justify-center mt-6 md:mt-8">
                  <BarChart className="w-8 h-8 md:w-10 md:h-10 text-secondary/50" />
                </div>
                <div className="h-28 md:h-32 rounded-2xl bg-slate-800/50 flex items-center justify-center -mt-6 md:-mt-8">
                  <Cpu className="w-8 h-8 md:w-10 md:h-10 text-accent/50" />
                </div>
                <div className="h-28 md:h-32 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-green-500/50" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}