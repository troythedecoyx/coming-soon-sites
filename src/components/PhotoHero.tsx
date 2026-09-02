"use client";

import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/sites";
import CountdownTimer from "./CountdownTimer";

/**
 * Full-bleed photo-brand hero, modeled on mkbhd.com / carlsberg.com:
 * minimal top nav, one huge full-bleed background (a flat brand color for
 * now — swap `heroImageSrc` in for a real photo later, no layout changes
 * needed), a bold condensed headline, and one quiet outline CTA. No card,
 * no glow, no illustrated background shapes — the confidence comes from
 * scale and restraint, not decoration.
 */
export default function PhotoHero({
  site,
  navLinks,
  heroImageSrc,
}: {
  site: SiteConfig;
  navLinks: { label: string; href: string }[];
  /** Optional real photo to use instead of the flat color background —
   *  drop a file in later and pass its path here, no other changes needed. */
  heroImageSrc?: string;
}) {
  const { theme } = site;

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{
        background: heroImageSrc ? `center / cover no-repeat url(${heroImageSrc})` : "#413E68",
      }}
    >
      {/* subtle dark gradient for text legibility — only matters once a
          real photo is behind it; near-invisible on the flat placeholder
          color so it doesn't read as banding */}
      {heroImageSrc && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,9,16,0.35) 0%, rgba(10,9,16,0.15) 40%, rgba(10,9,16,0.55) 100%)" }}
        />
      )}

      {/* top nav */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10"
      >
        <span className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
          {site.displayName ?? site.name}
        </span>
        <div className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/85 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-[family-name:var(--font-display)] text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Stream rebooting.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <CountdownTimer targetDate={site.launchDate} accent={theme.accent} variant="solid" />
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 rounded-full border border-white/70 px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#413E68]"
        >
          Learn more
        </motion.a>
      </div>
    </section>
  );
}
