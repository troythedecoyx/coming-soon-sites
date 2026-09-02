import type { Metadata } from "next";
import StreamComingSoon from "@/components/StreamComingSoon";
import { getSite } from "@/lib/sites";

const site = getSite("troythedecoyx");

export const metadata: Metadata = {
  title: `${site.name} — Coming Soon`,
  description: site.description,
};

const roles = ["Variety Streamer", "Developer", "Content Creator"];

const aboutParagraphs = [
  "I'm Troy, a variety streamer who's all about keeping things fresh and fun. Whether I'm diving into the latest releases, trying out indie gems, or just hanging out with the community, every stream is different. No two days are the same here.",
  "When I'm not streaming, I'm building widgets and tools for other streamers — because why not make cool stuff? This is a place where everyone's welcome, the chat's always active, and we're just here to have a good time together.",
];

const streamTags = ["Valorant", "Fortnite", "New Games", "Reaction Content", "Coding Streams"];

export default function Page() {
  return (
    <StreamComingSoon
      site={site}
      logoSrc="/logos/troythedecoyx.png"
      roles={roles}
      aboutParagraphs={aboutParagraphs}
      streamTags={streamTags}
    />
  );
}
