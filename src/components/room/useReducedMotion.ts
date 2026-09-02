"use client";

import { useEffect, useState } from "react";

function getInitial(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True if the visitor's OS/browser requests reduced motion. */
export function usePrefersReducedMotion(): boolean {
  // Lazy initializer reads matchMedia synchronously on first render (it's
  // already available in the browser, no need to wait for an effect) —
  // the effect below only needs to *subscribe* to later changes.
  const [reduced, setReduced] = useState(getInitial);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
