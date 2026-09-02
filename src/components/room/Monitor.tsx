"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural monitor: a flat-shaded stand + screen, glowing to show status
 * text ("OFFLINE" until live, swappable later for "LIVE"). Built as
 * primitives (not a downloaded model) specifically so the screen material
 * can pulse/glow and its text can change at runtime.
 *
 * Real-world scale: ~0.6m wide screen (a 27" monitor), stand base sits at
 * `position` (i.e. the desk surface) and the screen center is ~0.22m above
 * that, matching a typical monitor-arm/stand height.
 */
export default function Monitor({
  position,
  accent,
  onSelect,
  label = "OFFLINE",
}: {
  position: [number, number, number];
  accent: string;
  onSelect: () => void;
  label?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (screenRef.current) {
      const pulse = 0.9 + Math.sin(clock.elapsedTime * 1.5) * 0.15;
      screenRef.current.emissiveIntensity = (hovered ? 1.6 : 1.1) * pulse;
    }
  });

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* stand base, resting on the desk (position is the desk surface) */}
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.02, 24]} />
        <meshStandardMaterial color="#1c1a26" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* stand neck */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.03, 0.22, 0.03]} />
        <meshStandardMaterial color="#1c1a26" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* bezel */}
      <mesh position={[0, 0.27, 0]} castShadow>
        <boxGeometry args={[0.6, 0.36, 0.025]} />
        <meshStandardMaterial color="#0d0c14" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* screen */}
      <mesh position={[0, 0.27, 0.014]}>
        <planeGeometry args={[0.55, 0.31]} />
        <meshStandardMaterial ref={screenRef} color="#000000" emissive={accent} emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      <Text position={[0, 0.27, 0.016]} fontSize={0.055} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.05}>
        {label}
      </Text>
    </group>
  );
}
