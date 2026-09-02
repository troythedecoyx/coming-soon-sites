"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SiteConfig } from "@/lib/sites";
import CountdownTimer from "./CountdownTimer";
import SocialLinks from "./SocialLinks";
import AnimatedBackground from "./AnimatedBackground";

export default function ComingSoon({ site, logoSrc }: { site: SiteConfig; logoSrc?: string }) {
  const { theme } = site;

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16"
      style={
        {
          background: `linear-gradient(160deg, ${theme.bgGradientFrom}, ${theme.bgGradientTo})`,
          "--site-text": theme.text,
          "--site-text-muted": theme.textMuted,
        } as React.CSSProperties
      }
    >
      <AnimatedBackground accent={theme.accent} />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        {logoSrc ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <Image
              src={logoSrc}
              alt={site.name}
              width={112}
              height={112}
              className="rounded-full"
              style={{ boxShadow: `0 0 0 2px ${theme.accent}55, 0 0 32px ${theme.accentSoft}` }}
              preload
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold"
            style={{ background: theme.accentSoft, color: theme.accent }}
          >
            {site.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-semibold tracking-tight sm:text-5xl"
          style={{ color: theme.text }}
        >
          {site.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mt-3 text-base sm:text-lg"
          style={{ color: theme.accent }}
        >
          {site.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6, ease: "easeOut" }}
          className="mt-2 max-w-md text-sm sm:text-base"
          style={{ color: theme.textMuted }}
        >
          {site.description}
        </motion.p>

        <div className="mt-10">
          <CountdownTimer targetDate={site.launchDate} accent={theme.accent} />
        </div>

        <div className="mt-10">
          <SocialLinks socials={site.socials} accent={theme.accent} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 text-xs"
          style={{ color: theme.textMuted }}
        >
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </motion.p>
      </div>
    </main>
  );
}
