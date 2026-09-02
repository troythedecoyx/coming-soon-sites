"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/sites";
import CountdownTimer from "./CountdownTimer";

/**
 * Full-height hero: glowing gradient wordmark, role tags, countdown, and a
 * glowing circular portrait — ported from the earlier troythedecoyx-website
 * static-site attempt (floating blurred orbs, gradient text-clip, hover-tilt
 * portrait), rebuilt in React/Framer Motion with the real brand palette.
 */
export default function StreamHero({
  site,
  logoSrc,
  roles,
}: {
  site: SiteConfig;
  logoSrc?: string;
  roles: string[];
}) {
  const { theme } = site;
  const gradient = `linear-gradient(135deg, ${theme.accent} 0%, #a78bfa 50%, #f472b6 100%)`;

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{ background: theme.bg }}
    >
      {/* floating blurred glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full sm:h-[26rem] sm:w-[26rem]"
          style={{ background: `radial-gradient(circle, ${theme.accent}40 0%, transparent 70%)`, filter: "blur(70px)" }}
          animate={{ y: [0, -24, 0], x: [0, 16, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[10%] h-64 w-64 rounded-full sm:h-96 sm:w-96"
          style={{ background: "radial-gradient(circle, #f472b640 0%, transparent 70%)", filter: "blur(70px)" }}
          animate={{ y: [0, 20, 0], x: [0, -16, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* faint moving grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            color: theme.accent,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        {/* left: wordmark, roles, countdown */}
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-[family-name:var(--font-display)] text-4xl leading-none sm:text-6xl lg:text-7xl"
            style={{
              backgroundImage: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: `drop-shadow(0 0 30px ${theme.accent}55)`,
            }}
          >
            {site.displayName ?? site.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start"
          >
            {roles.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                {i > 0 && (
                  <span style={{ color: theme.accent }} className="opacity-60">
                    •
                  </span>
                )}
                <span
                  className="rounded-lg border px-3 py-1.5 text-sm font-medium"
                  style={{ borderColor: `${theme.accent}40`, background: "rgba(255,255,255,0.04)", color: "var(--site-text)" }}
                >
                  {role}
                </span>
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--site-text-muted)" }}
          >
            Stream rebooting in
          </motion.p>
          <div className="mt-2">
            <CountdownTimer targetDate={site.launchDate} accent={theme.accent} variant="glow" gradient={gradient} />
          </div>
        </div>

        {/* right: glowing portrait */}
        {logoSrc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.04, rotate: 2 }}
            className="shrink-0 rounded-full"
            style={{
              boxShadow: `0 20px 60px ${theme.accent}44`,
              filter: `drop-shadow(0 0 30px ${theme.accent}44)`,
            }}
          >
            <Image
              src={logoSrc}
              alt={site.name}
              width={340}
              height={340}
              className="rounded-full border-4"
              style={{ borderColor: `${theme.accent}55` }}
              preload
            />
          </motion.div>
        )}
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border-2 p-1.5"
          style={{ borderColor: `${theme.accent}66` }}
        >
          <span className="h-1.5 w-1 rounded-full" style={{ background: theme.accent }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
