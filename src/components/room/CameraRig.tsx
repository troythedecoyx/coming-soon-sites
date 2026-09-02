"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

export interface CameraShot {
  position: [number, number, number];
  lookAt: [number, number, number];
}

// Shots are computed against Room.tsx's actual object placements:
// desk at z=-1.5 (spans x: -1 to 1), monitor screen centered around
// (0, 1.06, -1.76), PC tower at (1.35, 0.24, -1.4) — clear of the desk's
// footprint — poster at (-1.6, 1.7, -1.97), door slab centered at
// (-2.97, 1.05, 0.5), phone at (0.5, 0.8, -1.15).
export const SHOTS: Record<string, CameraShot> = {
  wide: { position: [2.2, 1.6, 1.8], lookAt: [-0.3, 0.9, -1] },
  monitor: { position: [0, 1.15, -0.7], lookAt: [0, 1.06, -1.76] },
  pc: { position: [1.35, 0.55, -0.4], lookAt: [1.35, 0.3, -1.4] },
  poster: { position: [-1.6, 1.7, -0.6], lookAt: [-1.6, 1.7, -1.95] },
  // door slab faces +x; approach from in front of it, offset in z to keep
  // the handle (at local z=0.35) in frame rather than dead-center
  door: { position: [-1.9, 1.2, 0.65], lookAt: [-2.97, 1.05, 0.5] },
  phone: { position: [0.5, 1.15, -0.55], lookAt: [0.5, 0.8, -1.15] },
};

/**
 * Drives the camera between named shots with a GSAP tween — this IS the
 * navigation (clicking an object moves the camera to frame it), rather than
 * a scroll-triggered animation layered on top of a static camera.
 */
export default function CameraRig({ target }: { target: string }) {
  const { camera } = useThree();
  const lookAtRef = useRef(new THREE.Vector3(...SHOTS.wide.lookAt));
  const currentLookAt = useRef(new THREE.Vector3(...SHOTS.wide.lookAt));

  useEffect(() => {
    // `camera` from useThree() is a stable reference for the life of the
    // Canvas, so closing over it directly (rather than mirroring it into a
    // ref) is both simpler and avoids mutating a ref during render.
    const cam = camera;
    const shot = SHOTS[target] ?? SHOTS.wide;
    const tweenTarget = { ...currentLookAt.current };

    gsap.to(cam.position, {
      x: shot.position[0],
      y: shot.position[1],
      z: shot.position[2],
      duration: 1.4,
      ease: "power3.inOut",
    });

    gsap.to(tweenTarget, {
      x: shot.lookAt[0],
      y: shot.lookAt[1],
      z: shot.lookAt[2],
      duration: 1.4,
      ease: "power3.inOut",
      onUpdate: () => {
        lookAtRef.current.set(tweenTarget.x, tweenTarget.y, tweenTarget.z);
        cam.lookAt(lookAtRef.current);
      },
      onComplete: () => {
        currentLookAt.current.copy(lookAtRef.current);
      },
    });
  }, [target, camera]);

  return null;
}
