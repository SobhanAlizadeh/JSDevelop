"use client";

import { useMemo } from "react";
import { Mail } from "lucide-react";

interface SafeEmailProps {
  /** ایمیل به‌صورت Base64 — در HTML خام هیچ ردی از آدرس باقی نمی‌ماند */
  encoded: string;
  className?: string;
  showIcon?: boolean;
  /** اگر داده شود، به‌جای خود آدرس این محتوا داخل لینک mailto نمایش داده می‌شود */
  children?: React.ReactNode;
  /** متن نمایشی قبل از decode (بدون آدرس واقعی) */
  fallbackLabel?: string;
}

// سئو/امنیت — Plaintext Emails Test:
// آدرس ایمیل در سورس صفحه به‌صورت متن/mailto پیدا می‌شود و ربات‌های
// جمع‌آوری اسپم آن را برمی‌دارند. این کامپوننت آدرس را Base64 کد می‌کند و
// فقط در مرورگر decode می‌کند — همان کاری که Email Obfuscation کلادفلر می‌کند.
export function SafeEmail({
  encoded,
  className = "",
  showIcon = false,
  children,
  fallbackLabel = "ایمیل ما",
}: SafeEmailProps) {
  const email = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      return atob(encoded);
    } catch {
      return null;
    }
  }, [encoded]);

  // بدون JS: لینک نمی‌سازیم — برچسب خنثی نشان می‌دهیم
  if (!email) {
    return <span className={className}>{children ?? fallbackLabel}</span>;
  }

  return (
    <a
      href={`mailto:${email}`}
      dir={children ? undefined : "ltr"}
      aria-label="ارسال ایمیل به JSDevelop"
      className={className}
    >
      {showIcon && <Mail className="w-4 h-4 shrink-0" />}
      {children ?? email}
    </a>
  );
}

/** کدگذاری ثابت ایمیل (customers@jsdevelop.ir) — از پیش محاسبه شده تا SSR و کلاینت همیشه یکسان باشند */
export const encodedEmail = "Y3VzdG9tZXJzQGpzZGV2ZWxvcC5pcg==";
