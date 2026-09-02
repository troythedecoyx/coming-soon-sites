"use client";

import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

/**
 * Loads a real CC0 glTF model from /public/models/<name>/. Used for the
 * desk, chair, lamp, picture frame, and gamepad props — see
 * public/models/CREDITS.md for attribution.
 */
export default function PropModel({
  name,
  ...props
}: { name: string } & ThreeElements["group"]) {
  const { scene } = useGLTF(`/models/${name}/${name}_1k.gltf`);
  return <primitive object={scene} {...props} />;
}
