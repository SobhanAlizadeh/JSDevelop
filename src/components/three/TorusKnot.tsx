"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// تعریف اینترفیس برای دریافت prop
interface TorusKnotProps {
  isMobile: boolean;
}

export function TorusKnot({ isMobile }: TorusKnotProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const getThemeColors = () => {
    const isDark = document.documentElement.classList.contains("dark");
    return {
      wire: isDark ? "#60a5fa" : "#1d4ed8",
      core: isDark ? "#1e293b" : "#cbd5e1",
      metalness: isDark ? 0.9 : 0.6,
    };
  };

  useEffect(() => {
    const updateColors = () => {
      const colors = getThemeColors();
      if (wireRef.current) {
        (wireRef.current.material as THREE.MeshBasicMaterial).color.set(colors.wire);
      }
      if (meshRef.current) {
        const mat = meshRef.current.material as THREE.MeshStandardMaterial;
        mat.color.set(colors.core);
        mat.metalness = colors.metalness;
        mat.needsUpdate = true;
      }
    };
    
    updateColors();
    const observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useFrame((_, delta) => {
    // در موبایل سرعت چرخش کمی کمتر باشد تا CPU درگیر نشود
    const speed = isMobile ? 0.3 : 0.5;
    const rotationSpeed = speed * delta;

    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.x += rotationSpeed * 0.5;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y += rotationSpeed;
      wireRef.current.rotation.x += rotationSpeed * 0.5;
    }
  });

  // کاهش شدید segments در موبایل برای افزایش پرفورمنس
  const segments = isMobile ? [64, 16] : [128, 32];

  return (
    <group>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.8, 0.6, segments[0], segments[1]]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.82, 0.62, segments[0], segments[1]]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}