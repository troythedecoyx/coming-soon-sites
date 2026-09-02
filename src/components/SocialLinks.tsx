"use client";

import { motion } from "framer-motion";
import { SocialIcon } from "./icons";
import type { SocialLink } from "@/lib/sites";

export default function SocialLinks({ socials, accent }: { socials: SocialLink[]; accent: string }) {
  if (socials.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      {socials.map((social, i) => (
        <motion.a
          key={social.href}
          href={social.href}
          target={social.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={social.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
          whileHover={{ y: -3, scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
          style={{
            borderColor: `${accent}40`,
            color: "var(--site-text-muted)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <SocialIcon icon={social.icon} className="h-5 w-5" />
        </motion.a>
      ))}
    </div>
  );
}
