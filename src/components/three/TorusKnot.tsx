"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current && wireRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
      wireRef.current.rotation.y = meshRef.current.rotation.y;
      wireRef.current.rotation.x = meshRef.current.rotation.x;
    }
  });

  return (
    <group>
      {/* هسته فلزی */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.8, 0.6, 128, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* لایه وایرفریم درخشان */}
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.82, 0.62, 128, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}