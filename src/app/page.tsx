import ComingSoon from "@/components/ComingSoon";
import { getSite } from "@/lib/sites";

// This route is only ever hit if proxy.ts fails to match a known host
// (e.g. previewing the raw deployment URL). Every real domain gets
// rewritten to /sites/[siteId] before reaching here.
export default function Home() {
  return <ComingSoon site={getSite("troythedecoyx")} logoSrc="/logos/troythedecoyx.png" />;
}
