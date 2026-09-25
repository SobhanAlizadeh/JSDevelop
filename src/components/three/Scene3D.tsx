"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { TorusKnot } from "./TorusKnot";
import { Particles } from "./Particles";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true); // وضعیت پشتیبانی WebGL

  useEffect(() => {
    // تشخیص موبایل
    setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    
    // بررسی پشتیبانی WebGL
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  // اگر WebGL پشتیبانی نشد، یک پس‌زمینه ساده CSS نمایش دهیم (بدون کرش)
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 opacity-20 animate-pulse" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", display: "block" }}
        // ⬇️ مدیریت خطای داخلی Three.js
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn("WebGL Context Lost - Falling back to static background");
            setHasWebGL(false);
          });
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={isMobile ? 1.2 : 2} color="#3b82f6" />
          <pointLight position={[-5, -5, 5]} intensity={isMobile ? 1.2 : 2} color="#8b5cf6" />

          <TorusKnot isMobile={isMobile} />
          <Particles count={isMobile ? 400 : 1500} isMobile={isMobile} />

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