"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";

/**
 * Loads the hanging_picture_frame_01 CC0 model, but hides its "glass"
 * material sub-mesh. That material has alphaMode BLEND driven by a JPEG
 * baseColorTexture (JPEGs carry no alpha channel), so the intended
 * transparent glass pane renders as an opaque, non-transparent occluder
 * that hides the artwork/frame meshes behind it. Skipping it entirely
 * (rather than trying to coax the JPEG into behaving as an alpha map)
 * leaves the frame + artwork, which is all we actually need visually.
 */
export default function PosterFrameModel(props: ThreeElements["group"]) {
  const { scene } = useGLTF("/models/hanging_picture_frame_01/hanging_picture_frame_01_1k.gltf");

  // Clone so hiding a mesh here doesn't mutate the cached/shared GLTF scene
  // (useGLTF caches by URL; multiple instances would otherwise share state).
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.Material | THREE.Material[];
        const names = Array.isArray(mat) ? mat.map((m) => m.name) : [mat.name];
        const isGlass = names.some((n) => n.includes("glass"));
        if (isGlass) child.visible = false;
      }
    });
  }, [cloned]);

  return <primitive object={cloned} {...props} />;
}
