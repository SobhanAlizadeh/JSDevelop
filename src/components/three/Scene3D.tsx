"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { TorusKnot } from "./TorusKnot";
import { Particles } from "./Particles";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // تابعی برای بررسی دقیق و بازگرداندن مقدار boolean
    const checkIfMobile = () => {
      const isSmallScreen = window.innerWidth < 768;
      // استفاده از .test() به جای .match() چون مستقیماً true یا false برمی‌گرداند
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsMobile(isSmallScreen || isMobileDevice);
    };

    // اجرای اولیه
    checkIfMobile();

    // گوش دادن به تغییر سایز پنجره (برای حالتی که کاربر پنجره مرورگر را کوچک/بزرگ می‌کند)
    window.addEventListener("resize", checkIfMobile);

    // پاکسازی event listener هنگام unmount شدن کامپوننت
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={isMobile ? 1 : [1, 1.5]} // در موبایل فقط 1x render شود
        gl={{
          antialias: !isMobile, // خاموش کردن antialias در موبایل برای سرعت بیشتر
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={isMobile ? 1.2 : 2} color="#3b82f6" />
          <pointLight position={[-5, -5, 5]} intensity={isMobile ? 1.2 : 2} color="#8b5cf6" />

          <TorusKnot isMobile={isMobile} />
          <Particles count={isMobile ? 400 : 1500} isMobile={isMobile} />

          {/* Bloom فقط در دسکتاپ فعال باشد */}
          {!isMobile && (
            <EffectComposer>
              <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.4} height={300} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}