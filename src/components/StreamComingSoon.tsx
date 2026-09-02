"use client";

import type { SiteConfig } from "@/lib/sites";
import StreamHero from "./StreamHero";
import AboutSection from "./AboutSection";

export default function StreamComingSoon({
  site,
  logoSrc,
  roles,
  aboutParagraphs,
  streamTags,
}: {
  site: SiteConfig;
  logoSrc?: string;
  roles: string[];
  aboutParagraphs: string[];
  streamTags: string[];
}) {
  return (
    <main
      style={
        {
          "--site-text": site.theme.text,
          "--site-text-muted": site.theme.textMuted,
        } as React.CSSProperties
      }
    >
      <StreamHero site={site} logoSrc={logoSrc} roles={roles} />
      <AboutSection site={site} paragraphs={aboutParagraphs} streamTags={streamTags} />
    </main>
  );
}
