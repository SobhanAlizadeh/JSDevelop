"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
}

export function Particles({ count = 1500 }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    const color1 = new THREE.Color("#3b82f6"); // آبی
    const color2 = new THREE.Color("#8b5cf6"); // بنفش
    
    for (let i = 0; i < count * 3; i += 3) {
      // موقعیت‌ها
      pos[i] = (Math.random() - 0.5) * 25;
      pos[i + 1] = (Math.random() - 0.5) * 25;
      pos[i + 2] = (Math.random() - 0.5) * 25;
      
      // رنگ‌ها (مخلوط آبی و بنفش)
      const mixedColor = color1.clone().lerp(color2, Math.random());
      cols[i] = mixedColor.r;
      cols[i + 1] = mixedColor.g;
      cols[i + 2] = mixedColor.b;
    }
    
    return { positions: pos, colors: cols };
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.05;
      meshRef.current.rotation.x = time * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}