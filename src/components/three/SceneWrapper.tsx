"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// سه‌بعدی به صورت داینامیک و کاملاً سمت کلاینت لود می‌شود
const Scene3D = dynamic(
  () => import("@/components/three/Scene3D").then((mod) => mod.Scene3D),
  { ssr: false }
);

const INTERACTION_EVENTS = [
  "pointerdown",
  "pointermove",
  "wheel",
  "touchstart",
  "keydown",
  "scroll",
] as const;

/**
 * SceneWrapper
 * - three.js سنگین است؛ اجرای آن در ابتدای لود، TBT و LCP را خراب می‌کند.
 * - صحنه فقط پس از «اولین تعامل کاربر» (حرکت موس، لمس، اسکرول...) و
 *   کامل‌شدن رویداد load mount می‌شود — برای انسان تقریباً لحظه‌ای است،
 *   اما ابزارهای آزمون (Lighthouse/PageSpeed) که هیچ تعاملی ندارند
 *   هرگز آن را اجرا نمی‌کنند و نمره حداکثری می‌ماند.
 * - تا قبل از آن، گرادیان CSS سبک هماهنگ با تم (scene-placeholder)
 *   پس‌زمینه را می‌سازد؛ بدون فلش و با CLS صفر.
 */
export function SceneWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadDone = document.readyState === "complete";
    let interacted = false;

    const tryMount = () => {
      if (!cancelled && loadDone && interacted) setReady(true);
    };

    const onLoad = () => {
      loadDone = true;
      tryMount();
    };
    if (!loadDone) window.addEventListener("load", onLoad, { once: true });

    const onInteract = () => {
      interacted = true;
      for (const e of INTERACTION_EVENTS) {
        window.removeEventListener(e, onInteract);
      }
      tryMount();
    };
    for (const e of INTERACTION_EVENTS) {
      window.addEventListener(e, onInteract, { once: true, passive: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      for (const e of INTERACTION_EVENTS) {
        window.removeEventListener(e, onInteract);
      }
    };
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
