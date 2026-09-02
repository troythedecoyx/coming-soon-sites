"use client";

import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/sites";
import SocialLinks from "./SocialLinks";

interface Destination {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}

/**
 * Section grid below the hero, modeled on mkbhd.com's "The Core Four" —
 * bold condensed section title, then a row of cards, alternating light/dark
 * backgrounds for contrast the way the reference sites do. Reuses the same
 * 5 destinations (Stream/Videos/About/Discord/Socials) that were the 3D
 * scene's content panels, now as real linked sections instead.
 */
export default function PhotoBrandSections({
  site,
  aboutParagraphs,
  streamTags,
}: {
  site: SiteConfig;
  aboutParagraphs: string[];
  streamTags: string[];
}) {
  const { theme } = site;

  const destinations: Destination[] = [
    { id: "stream", eyebrow: "01", title: "Stream", body: "Offline right now — back live Sept 8. VODs and clips land here once the reboot is live." },
    { id: "videos", eyebrow: "02", title: "Videos", body: streamTags.join(" · ") },
    { id: "discord", eyebrow: "03", title: "Discord", body: "The community server opens alongside the relaunch. An invite lands here soon." },
  ];

  return (
    <>
      {/* The Core Four -style grid */}
      <section className="bg-[#f4f2ff] px-6 py-20 sm:px-10 sm:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight text-[#171621] sm:text-5xl"
        >
          What&apos;s here
        </motion.h2>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
          {destinations.map((d, i) => (
            <motion.div
              key={d.id}
              id={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl border border-[#413E68]/15 bg-white p-7"
            >
              <span className="font-[family-name:var(--font-display)] text-sm font-bold" style={{ color: theme.accent }}>
                {d.eyebrow}
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold uppercase text-[#171621]">
                {d.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#413E68]/80">{d.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About — dark section, full editorial copy */}
      <section id="about" className="px-6 py-20 sm:px-10 sm:py-28" style={{ background: "#171621" }}>
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: theme.accent }}
          >
            About
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold uppercase text-white sm:text-4xl"
          >
            Hey, I&apos;m {site.name.split(" ")[0]}
          </motion.h2>
          <div className="mt-6 space-y-4">
            {aboutParagraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="text-base leading-relaxed text-white/70"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Socials — closing section */}
      <section id="socials" className="px-6 py-20 sm:px-10 sm:py-24" style={{ background: "#2a2645" }}>
        <div className="mx-auto max-w-xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase text-white"
          >
            Find me
          </motion.h2>
          <div className="mt-6">
            <SocialLinks socials={site.socials} accent={theme.accent} />
          </div>
          <p className="mt-10 text-xs text-white/40">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
}
