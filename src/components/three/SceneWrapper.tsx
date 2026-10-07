"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// سه‌بعدی به صورت داینامیک و کاملاً سمت کلاینت لود می‌شود
const Scene3D = dynamic(
  () => import("@/components/three/Scene3D").then((mod) => mod.Scene3D),
  { ssr: false }
);

/**
 * SceneWrapper
 * - به‌جای لود فوری three.js (که LCP و TBT را خراب می‌کند)،
 *   صحنه سه‌بعدی فقط بعد از رویداد load و در اولین فرصت بیکاری مرورگر mount می‌شود.
 * - تا قبل از آن، یک گرادیان CSS سبک (هماهنگ با تم) پس‌زمینه را می‌سازد
 *   تا هیچ فلش تیره‌ای در لایت‌مود دیده نشود و CLS صفر بماند.
 */
export function SceneWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      };
      // اگر مرورگر بیکار شد اجرا کن؛ وگرنه حداکثر بعد از ۱.۵ ثانیه (فال‌بک)
      if (w.requestIdleCallback) {
        w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      } else {
        const t = setTimeout(() => setReady(true), 800);
        void t;
      }
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
      return () => {
        cancelled = true;
        window.removeEventListener("load", start);
      };
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none scene-placeholder"
      aria-hidden="true"
    >
      {ready && (
        <div className="scene-fade w-full h-full">
          <Scene3D />
        </div>
      )}
    </div>
  );
}
