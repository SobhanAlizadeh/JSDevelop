"use client";

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
    <section className="relative z-10 py-16 md:py-20 border-y border-custom section-surface">
      <div ref={ref} className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`reveal space-y-2 ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-5xl font-black text-gradient">
                {stat.value}
              </div>
              <div className="text-muted-custom text-sm md:text-base font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
