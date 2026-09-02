"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EnterScreen({
  displayName,
  logoSrc,
  accent,
  onEnter,
}: {
  displayName: string;
  logoSrc?: string;
  accent: string;
  onEnter: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 px-6"
      style={{ background: "#0a0910" }}
    >
      {logoSrc && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src={logoSrc}
            alt={displayName}
            width={140}
            height={140}
            className="rounded-full border-4"
            style={{ borderColor: `${accent}55`, boxShadow: `0 0 40px ${accent}44` }}
            preload
          />
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl"
        style={{
          backgroundImage: `linear-gradient(135deg, ${accent} 0%, #a78bfa 50%, #f472b6 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: `drop-shadow(0 0 24px ${accent}55)`,
        }}
      >
        {displayName}
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onEnter}
        className="rounded-full border-2 px-8 py-3 text-sm font-bold uppercase tracking-widest"
        style={{ borderColor: accent, color: accent }}
      >
        Enter
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-xs"
        style={{ color: "var(--site-text-muted)" }}
      >
        Best viewed with sound and motion on
      </motion.p>
    </motion.div>
  );
}
