"use client";

import { useInView } from "@/hooks/useInView";
import type { ReactNode, CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  /** تاخیر شروع انیمیشن (میلی‌ثانیه) برای افکت آبشاری */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * جایگزین سبکِ motion.div در framer-motion.
 * با IntersectionObserver خودمان (useInView) کلاس is-visible اضافه می‌کند
 * و انیمیشن فقط با opacity/transform در کامپوزیتور اجرا می‌شود —
 * بدون هيچ کتابخانه اضافه‌ای روی Main-Thread.
 */
export function Reveal({ children, delay = 0, className = "", style }: RevealProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  );
}
