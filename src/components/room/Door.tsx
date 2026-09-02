"use client";

import { useState } from "react";

/**
 * Procedural door mounted flush on the side wall (which runs along the Z
 * axis at x = SIDE_WALL_X), leading to Discord. Built already facing +x
 * (the door's own thin dimension is on the x-axis) so it doesn't need an
 * external rotation to reorient it — `position` is the door's center,
 * flush against the wall.
 */
export default function Door({
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
      {/* door slab: thin along x (into the wall), wide along z, tall along y.
          Lighter color + slight emissive so it reads distinctly against the
          near-black room instead of disappearing into it. */}
      <mesh castShadow>
        <boxGeometry args={[0.06, 2.1, 1]} />
        <meshStandardMaterial
          color={hovered ? "#6d5f9c" : "#4a4070"}
          emissive={hovered ? "#5a4d85" : "#3d3364"}
          emissiveIntensity={0.8}
          roughness={0.5}
        />
      </mesh>
      {/* handle, on the +x face (the room-facing side) */}
      <mesh position={[0.04, -0.1, 0.35]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={hovered ? 1.2 : 0.5} toneMapped={false} />
      </mesh>
      {/* frame glow when hovered */}
      {hovered && (
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.02, 2.2, 1.1]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} toneMapped={false} transparent opacity={0.25} />
        </mesh>
      )}
    </group>
  );
}
