"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // دریافت مقدار اسکرول جهانی
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;

    if (groupRef.current) {
      // چرخش خودکار
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.002;
      
      // حرکت موجی + جابجایی بر اساس اسکرول
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2 + (scrollY * 0.001);
    }
    
    // زوم دوربین بر اساس اسکرول (هرچه پایین‌تر می‌روید، دوربین نزدیک‌تر می‌شود)
    const targetZ = 6 - (scrollY * 0.002);
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;

    // تعامل با ماوس (فقط در دسکتاپ)
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      const mouseX = (state.mouse.x * Math.PI) / 4;
      const mouseY = (state.mouse.y * Math.PI) / 4;
      
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.05 * (mouseX - groupRef.current.rotation.y);
        groupRef.current.rotation.x += 0.05 * (mouseY - groupRef.current.rotation.x);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* هسته فلزی */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.8, 0.6, 128, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.9} />
      </mesh>
      
      {/* لایه وایرفریم درخشان */}
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.82, 0.62, 128, 32]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}