"use client";

import type { SiteConfig } from "@/lib/sites";
import PhotoHero from "./PhotoHero";
import PhotoBrandSections from "./PhotoBrandSections";

export default function PhotoBrandComingSoon({
  site,
  aboutParagraphs,
  streamTags,
}: {
  site: SiteConfig;
  aboutParagraphs: string[];
  streamTags: string[];
}) {
  const navLinks = [
    { label: "Stream", href: "#stream" },
    { label: "Videos", href: "#videos" },
    { label: "Discord", href: "#discord" },
    { label: "About", href: "#about" },
    { label: "Socials", href: "#socials" },
  ];

  return (
    <main
      style={
        {
          "--site-text": site.theme.text,
          "--site-text-muted": site.theme.textMuted,
        } as React.CSSProperties
      }
    >
      <PhotoHero site={site} navLinks={navLinks} />
      <PhotoBrandSections site={site} aboutParagraphs={aboutParagraphs} streamTags={streamTags} />
    </main>
  );
}
