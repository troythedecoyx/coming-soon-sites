"use client";

import { useState } from "react";

/** Procedural phone lying on the desk, leading to Socials. */
export default function Phone({
  position,
  accent,
  onSelect,
}: {
  position: [number, number, number];
  accent: string;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      rotation={[-Math.PI / 2, 0, 0.3]}
      scale={hovered ? 1.15 : 1}
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
      <mesh castShadow>
        <boxGeometry args={[0.12, 0.24, 0.012]} />
        <meshStandardMaterial color="#151420" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.007]}>
        <planeGeometry args={[0.1, 0.2]} />
        <meshStandardMaterial
          color="#000000"
          emissive={accent}
          emissiveIntensity={hovered ? 1.2 : 0.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
