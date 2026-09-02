"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string;
  accent: string;
  /** "soft" (default): rounded glass card with a bordered box per digit.
   *  "glow": borderless, large gradient-clipped digits with a drop-shadow
   *  glow. "solid": plain bold white numerals directly on a photo/color
   *  hero, no card/glow — matches a photo-brand hero (MKBHD/Carlsberg
   *  style) where the countdown reads like part of the headline. */
  variant?: "soft" | "glow" | "solid";
  /** Required when variant is "glow": CSS gradient for the digit text-clip. */
  gradient?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function CountdownTimer({ targetDate, accent, variant = "soft", gradient }: CountdownTimerProps) {
  // Start null so server and client render the same markup on hydration;
  // fill in real numbers only after mount.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(targetDate));
    // Fire once immediately (via a 0ms timeout, not a direct call) so the
    // first real numbers appear on mount without a synchronous setState
    // inside the effect body, then keep ticking every second.
    const immediate = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(immediate);
      clearInterval(interval);
    };
  }, [targetDate]);

  const display = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (variant === "solid") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4" aria-live="polite">
        {units.map((unit, i) => (
          <motion.div
            key={unit.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4, ease: "easeOut" }}
            className="flex items-baseline gap-1"
          >
            <span
              className="font-[family-name:var(--font-display)] text-3xl font-bold leading-none tabular-nums text-white sm:text-4xl"
            >
              {String(display[unit.key]).padStart(2, "0")}
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-white/70">{unit.label.slice(0, 1)}</span>
            {i < units.length - 1 && <span className="ml-2 text-white/30">/</span>}
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-3" aria-live="polite">
        {units.map((unit, i) => (
          <motion.div
            key={unit.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.5, ease: "easeOut" }}
            className="flex items-center"
          >
            <div className="flex flex-col items-center">
              <span
                className="font-[family-name:var(--font-display)] text-3xl leading-none tabular-nums sm:text-5xl"
                style={{
                  backgroundImage: gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 20px ${accent}55)`,
                }}
              >
                {String(display[unit.key]).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-widest sm:text-xs" style={{ color: "var(--site-text-muted)" }}>
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span
                className="mb-4 ml-2 font-[family-name:var(--font-display)] text-2xl sm:ml-3 sm:text-4xl"
                style={{ color: accent, opacity: 0.5 }}
              >
                :
              </span>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5" aria-live="polite">
      {units.map((unit, i) => (
        <motion.div
          key={unit.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * i, duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-xl border text-2xl font-semibold tabular-nums sm:h-20 sm:w-20 sm:text-3xl backdrop-blur-sm"
            style={{
              borderColor: `${accent}33`,
              background: "rgba(255,255,255,0.03)",
              color: "var(--site-text)",
            }}
          >
            {String(display[unit.key]).padStart(2, "0")}
          </div>
          <span className="mt-2 text-[10px] uppercase tracking-widest sm:text-xs" style={{ color: "var(--site-text-muted)" }}>
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
