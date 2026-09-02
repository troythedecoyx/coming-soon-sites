"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural PC tower with a glowing accent strip down the front edge.
 * Real-world scale: ~0.22m wide x 0.48m tall x 0.45m deep (mid-tower size).
 * `position` is the floor contact point.
 */
export default function PCTower({
  position,
  accent,
  onSelect,
}: {
  position: [number, number, number];
  accent: string;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const stripRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (stripRef.current) {
      const pulse = 0.8 + Math.sin(clock.elapsedTime * 2) * 0.2;
      stripRef.current.emissiveIntensity = (hovered ? 2.2 : 1.4) * pulse;
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
      <mesh position={[0, 0.24, 0]} castShadow>
        <boxGeometry args={[0.22, 0.48, 0.45]} />
        <meshStandardMaterial color="#3a3550" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* front accent strip */}
      <mesh position={[0.11, 0.24, 0.12]}>
        <boxGeometry args={[0.008, 0.42, 0.025]} />
        <meshStandardMaterial ref={stripRef} color={accent} emissive={accent} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      {/* fan detail */}
      <mesh position={[0.11, 0.1, -0.12]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.07, 0.008, 8, 24]} />
        <meshStandardMaterial color="#2a2836" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}
