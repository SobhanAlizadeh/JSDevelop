"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// تعریف اینترفیس برای دریافت propها
interface ParticlesProps {
  count: number;
  isMobile: boolean;
}

export function Particles({ count, isMobile }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 25;
      pos[i + 1] = (Math.random() - 0.5) * 25;
      pos[i + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, [count]);

  useEffect(() => {
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (materialRef.current) {
        materialRef.current.color.set(isDark ? "#a78bfa" : "#6d28d9");
      }
    };
    
    updateColor();
    const observer = new MutationObserver(() => updateColor());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // در موبایل سرعت انیمیشن کمتر باشد
      const speed = isMobile ? 0.02 : 0.05;
      meshRef.current.rotation.y += delta * speed;
      meshRef.current.rotation.x += delta * (speed * 0.4);
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={isMobile ? 0.06 : 0.04} // در موبایل کمی بزرگتر دیده شود چون تعداد کمتر است
        color="#8b5cf6"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}