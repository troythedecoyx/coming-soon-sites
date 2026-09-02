"use client";

import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/sites";
import SocialLinks from "./SocialLinks";

export default function AboutSection({
  site,
  paragraphs,
  streamTags,
}: {
  site: SiteConfig;
  paragraphs: string[];
  streamTags: string[];
}) {
  const { theme } = site;

  return (
    <section className="relative overflow-hidden px-6 py-24" style={{ background: theme.bgGradientTo }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-24 top-1/4 h-72 w-72 rounded-full"
          style={{ background: `radial-gradient(circle, ${theme.accent}22 0%, transparent 70%)`, filter: "blur(60px)" }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-5xl gap-12 sm:grid-cols-[1.2fr_1fr] sm:gap-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--site-text)" }}
          >
            Hey, I&apos;m Troy
            <br />
            <span
              className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl"
              style={{ color: theme.accent }}
            >
              aka {site.displayName ?? site.name}!
            </span>
          </motion.h2>

          <div className="mt-6 space-y-4">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="text-sm leading-relaxed sm:text-base"
                style={{ color: "var(--site-text-muted)" }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-fit rounded-2xl border p-6"
          style={{ borderColor: `${theme.accent}33`, background: "rgba(255,255,255,0.03)" }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: theme.accent }}>
            What I Stream
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {streamTags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg px-3 py-1.5 text-xs font-medium"
                style={{ background: `${theme.accent}18`, color: "var(--site-text)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide" style={{ color: theme.accent }}>
            Find Me
          </h3>
          <div className="mt-4">
            <SocialLinks socials={site.socials} accent={theme.accent} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
