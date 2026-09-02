import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { getSite } from "@/lib/sites";

const site = getSite("scalfdigital");

export const metadata: Metadata = {
  title: `${site.name} — Coming Soon`,
  description: site.description,
};

export default function Page() {
  return <ComingSoon site={site} />;
}
