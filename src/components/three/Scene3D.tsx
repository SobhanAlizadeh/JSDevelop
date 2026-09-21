"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TorusKnot } from "./TorusKnot";
import { Particles } from "./Particles";

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={[1, 1.5]} // محدود کردن pixel ratio
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true,
        }}
        style={{ background: "transparent" }}
        frameloop="demand" // فقط وقتی نیاز است رندر کند
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#3b82f6" />
          <pointLight position={[-5, -5, 5]} intensity={2} color="#8b5cf6" />
          <TorusKnot />
          <Particles count={600} />
        </Suspense>
      </Canvas>
    </div>
  );
}