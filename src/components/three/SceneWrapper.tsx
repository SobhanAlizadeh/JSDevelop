// src/components/three/SceneWrapper.tsx
"use client"; // این خط بسیار مهم است

import dynamic from "next/dynamic";

// بارگذاری تنبل فقط در سمت کلاینت
const Scene3D = dynamic(
  () => import("@/components/three/Scene3D").then((mod) => mod.Scene3D),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-dark">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary animate-pulse"></div>
      </div>
    ),
  }
);

export function SceneWrapper() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Scene3D />
    </div>
  );
}