import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { getSite } from "@/lib/sites";

const site = getSite("troythedecoyx");

export const metadata: Metadata = {
  title: `${site.name} — Coming Soon`,
  description: site.description,
};

// Swap in the real logo once it's uploaded to public/logos/troythedecoyx.png
// by changing logoSrc back to "/logos/troythedecoyx.png".
export default function Page() {
  return <ComingSoon site={site} />;
}
