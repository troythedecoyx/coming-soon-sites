"use client";

import { useState } from "react";
import PosterFrameModel from "./PosterFrameModel";
import type { ThreeElements } from "@react-three/fiber";

/** Wraps the real hanging-picture-frame model with hover/click + a "peel" tilt. */
export default function Poster({
  onSelect,
  ...props
}: { onSelect: () => void } & ThreeElements["group"]) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      {...props}
      rotation={hovered ? [0, 0.25, 0.06] : [0, 0, 0]}
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
      <PosterFrameModel scale={1.4} />
    </group>
  );
}
