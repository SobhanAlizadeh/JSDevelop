"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const stats = [
  { value: "۱۵+", label: "سال تجربه" },
  { value: "۲۵۶+", label: "مشتری راضی" },
  { value: "۵۱۴+", label: "پروژه موفق" },
  { value: "۱۲", label: "خدمت تخصصی" },
];

export function StatsSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative z-10 py-16 md:py-20 border-y border-white/5 bg-slate-900/50 backdrop-blur-sm">
      <div ref={ref} className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="text-3xl md:text-5xl font-black text-gradient">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}