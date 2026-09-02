"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import type { SocialLink } from "@/lib/sites";
import SocialLinks from "../SocialLinks";

interface PanelContent {
  title: string;
  body: ReactNode;
}

export function getPanelContent(
  target: string,
  socials: SocialLink[],
  accent: string,
  streamTags: string[]
): PanelContent | null {
  switch (target) {
    case "monitor":
      return {
        title: "Streams",
        body: (
          <p className="text-sm" style={{ color: "var(--site-text-muted)" }}>
            Offline right now — the stream comes back online Sept 8. Once live, this screen shows the current status
            and recent VODs.
          </p>
        ),
      };
    case "pc":
      return {
        title: "What I Stream",
        body: (
          <div className="flex flex-wrap gap-2">
            {streamTags.map((tag) => (
              <span key={tag} className="rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: `${accent}18`, color: "var(--site-text)" }}>
                {tag}
              </span>
            ))}
          </div>
        ),
      };
    case "poster":
      return {
        title: "About Troy",
        body: (
          <div className="space-y-3 text-sm" style={{ color: "var(--site-text-muted)" }}>
            <p>
              I&apos;m Troy, a variety streamer who&apos;s all about keeping things fresh and fun. Whether I&apos;m
              diving into the latest releases, trying out indie gems, or just hanging out with the community, every
              stream is different.
            </p>
            <p>
              When I&apos;m not streaming, I&apos;m building widgets and tools for other streamers — this room is one
              of them.
            </p>
          </div>
        ),
      };
    case "door":
      return {
        title: "Discord",
        body: (
          <p className="text-sm" style={{ color: "var(--site-text-muted)" }}>
            The community server opens alongside the stream relaunch. Check back soon for an invite.
          </p>
        ),
      };
    case "phone":
      return {
        title: "Find Me",
        body: <SocialLinks socials={socials} accent={accent} />,
      };
    default:
      return null;
  }
}

export default function ContentPanel({
  target,
  content,
  onClose,
}: {
  target: string;
  content: PanelContent | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {content && (
        <motion.div
          key={target}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-auto absolute right-6 top-1/2 w-[min(90vw,360px)] -translate-y-1/2 rounded-2xl border p-6 backdrop-blur-md sm:right-10"
          style={{ borderColor: "var(--site-text-muted)", background: "rgba(10,9,16,0.75)" }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-1 opacity-70 hover:opacity-100"
            style={{ color: "var(--site-text)" }}
          >
            <X className="h-4 w-4" />
          </button>
          <h3 className="pr-6 text-lg font-semibold" style={{ color: "var(--site-text)" }}>
            {content.title}
          </h3>
          <div className="mt-3">{content.body}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
