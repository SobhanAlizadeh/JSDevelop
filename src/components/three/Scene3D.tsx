"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TorusKnot } from "./TorusKnot";
import { Particles } from "./Particles";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#3b82f6" />
          <pointLight position={[-5, -5, 5]} intensity={2} color="#8b5cf6" />

          <TorusKnot />
          <Particles count={1500} />

          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.4}
              height={300}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}