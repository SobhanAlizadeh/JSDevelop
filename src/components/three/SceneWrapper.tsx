"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(
  () => import("@/components/three/Scene3D").then((mod) => mod.Scene3D),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-dark">
        {/* یک لودینگ بسیار سبک فقط برای جلوگیری از پرش صفحه */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    ),
  }
);

export function SceneWrapper() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <Scene3D />
    </div>
  );
}