export type SiteId = "troyscalf" | "troythedecoyx" | "scalfdigital";

export interface SocialLink {
  label: string;
  href: string;
  icon: "twitch" | "github" | "linkedin" | "x" | "instagram" | "youtube" | "mail" | "globe";
}

export interface SiteConfig {
  id: SiteId;
  domain: string;
  name: string;
  /** Stylized wordmark form for logo-like display (e.g. "TroyTheDecoyX" —
   *  never underscored, uppercased, or lowercased). Falls back to `name`. */
  displayName?: string;
  tagline: string;
  description: string;
  /** ISO date string the countdown targets. Update anytime. */
  launchDate: string;
  theme: {
    bg: string;
    bgGradientFrom: string;
    bgGradientTo: string;
    accent: string;
    accentSoft: string;
    text: string;
    textMuted: string;
    font: string;
  };
  socials: SocialLink[];
}

export const sites: Record<SiteId, SiteConfig> = {
  troyscalf: {
    id: "troyscalf",
    domain: "troyscalf.com",
    name: "Troy Scalf",
    tagline: "Personal site — coming soon",
    description: "The personal home of Troy Scalf is under construction.",
    launchDate: "2026-12-01T00:00:00Z",
    theme: {
      bg: "#0a0a0f",
      bgGradientFrom: "#0a0a0f",
      bgGradientTo: "#14141f",
      accent: "#6ee7f2",
      accentSoft: "#6ee7f233",
      text: "#f5f5f7",
      textMuted: "#a1a1aa",
      font: "var(--font-sans)",
    },
    socials: [
      { label: "Email", href: "mailto:hello@troythedecoyx.com", icon: "mail" },
    ],
  },
  troythedecoyx: {
    id: "troythedecoyx",
    domain: "troythedecoyx.com",
    name: "Troy the Decoy X",
    // Always styled this exact way — never underscored, never all-caps/lowercase.
    displayName: "TroyTheDecoyX",
    tagline: "Gaming. Internet. Code.",
    description: "I'm streaming again. New site, new content, going live soon.",
    launchDate: "2026-12-01T00:00:00Z",
    theme: {
      // Troy the Decoy X brand kit: ND1 (near-dark), Primary/Secondary purples,
      // Accent lavender, NL1 (near-light) — see brand-assets/troythedecoyx/colors/
      bg: "#171621",
      bgGradientFrom: "#171621",
      bgGradientTo: "#2a2645",
      accent: "#c7b9ff",
      accentSoft: "#c7b9ff33",
      text: "#f4f2ff",
      textMuted: "#b7b0e8",
      font: "var(--font-sans)",
    },
    socials: [
      { label: "Twitch", href: "https://twitch.tv/troythedecoyx", icon: "twitch" },
      { label: "GitHub", href: "https://github.com/troythedecoyx", icon: "github" },
      { label: "X", href: "https://x.com/troythedecoyx", icon: "x" },
    ],
  },
  scalfdigital: {
    id: "scalfdigital",
    domain: "scalfdigitalconsulting.com",
    name: "Scalf Digital Consulting",
    tagline: "Tech support & web solutions for your business.",
    description: "Scalf Digital Consulting is opening its doors soon.",
    launchDate: "2026-12-01T00:00:00Z",
    theme: {
      bg: "#08110f",
      bgGradientFrom: "#08110f",
      bgGradientTo: "#0e1f1a",
      accent: "#34d399",
      accentSoft: "#34d39933",
      text: "#f5f5f7",
      textMuted: "#a1a1aa",
      font: "var(--font-sans)",
    },
    socials: [
      { label: "Email", href: "mailto:hello@scalfdigitalconsulting.com", icon: "mail" },
      { label: "LinkedIn", href: "https://linkedin.com/company/scalfdigitalconsulting", icon: "linkedin" },
    ],
  },
};

const domainMap: Record<string, SiteId> = {
  "troyscalf.com": "troyscalf",
  "www.troyscalf.com": "troyscalf",
  "troythedecoyx.com": "troythedecoyx",
  "www.troythedecoyx.com": "troythedecoyx",
  "scalfdigitalconsulting.com": "scalfdigital",
  "www.scalfdigitalconsulting.com": "scalfdigital",
  // local dev fallback (localhost, 127.0.0.1, LAN IPs while testing)
  "localhost": "troythedecoyx",
};

export function resolveSiteId(host: string | null | undefined): SiteId {
  if (!host) return "troythedecoyx";
  // Host headers can carry a port (e.g. "troyscalf.com:3000" in local dev,
  // or an IPv6 literal like "[::1]:3000") — strip it before lookup.
  const hostname = host.startsWith("[")
    ? host.slice(1, host.indexOf("]"))
    : host.split(":")[0];
  return domainMap[hostname] ?? "troythedecoyx";
}

export function getSite(id: SiteId): SiteConfig {
  return sites[id];
}
