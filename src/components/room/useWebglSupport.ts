"use client";

import { useEffect, useState } from "react";

/** True once we've confirmed the browser can create a WebGL context. Starts
 *  `null` (unknown) so callers can render nothing until the check resolves,
 *  avoiding a flash of the wrong experience. */
export function useWebglSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // Deferred via setTimeout (not called directly in the effect body) so
    // the first real value arrives without a synchronous setState during
    // the effect itself — keeps `supported` genuinely null through the
    // initial render/hydration, avoiding an SSR/client mismatch.
    const id = setTimeout(() => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        setSupported(!!gl);
      } catch {
        setSupported(false);
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return supported;
}
