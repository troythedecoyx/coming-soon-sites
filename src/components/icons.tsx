import { Mail, Globe, type LucideIcon } from "lucide-react";
import type { SocialLink } from "@/lib/sites";

// Brand marks aren't part of lucide-react's icon set, so each is a small
// hand-drawn SVG sharing the same 24x24 viewBox / currentColor contract as
// the lucide icons they sit next to.
function TwitchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 3 3 6.5v13h5V22l3.5-2.5H16L21 15V3H4Z" />
      <path d="M15.5 7.5v5" />
      <path d="M11 7.5v5" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12c0 4.53 2.94 8.37 7.02 9.73.51.1.7-.22.7-.49 0-.24-.01-.88-.01-1.72-2.86.62-3.46-1.38-3.46-1.38-.47-1.18-1.14-1.5-1.14-1.5-.93-.64.07-.62.07-.62 1.03.07 1.57 1.06 1.57 1.06.91 1.57 2.39 1.11 2.98.85.09-.66.36-1.11.65-1.37-2.28-.26-4.68-1.14-4.68-5.08 0-1.12.4-2.04 1.05-2.76-.1-.26-.46-1.3.1-2.71 0 0 .86-.28 2.8 1.05a9.7 9.7 0 0 1 5.1 0c1.94-1.33 2.8-1.05 2.8-1.05.56 1.41.2 2.45.1 2.71.65.72 1.05 1.64 1.05 2.76 0 3.95-2.4 4.82-4.69 5.07.37.32.7.94.7 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.19.6.71.49A10.26 10.26 0 0 0 22.25 12c0-5.66-4.59-10.25-10.25-10.25Z"
      />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.5 7.19a2.86 2.86 0 0 0-2-2.02C18.7 4.75 12 4.75 12 4.75s-6.7 0-8.5.42a2.86 2.86 0 0 0-2 2.02A29.9 29.9 0 0 0 1.1 12a29.9 29.9 0 0 0 .4 4.81 2.86 2.86 0 0 0 2 2.02c1.8.42 8.5.42 8.5.42s6.7 0 8.5-.42a2.86 2.86 0 0 0 2-2.02 29.9 29.9 0 0 0 .4-4.81 29.9 29.9 0 0 0-.4-4.81ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const iconMap: Record<SocialLink["icon"], LucideIcon | typeof TwitchIcon> = {
  twitch: TwitchIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  mail: Mail,
  globe: Globe,
};

export function SocialIcon({ icon, ...props }: { icon: SocialLink["icon"] } & React.SVGProps<SVGSVGElement>) {
  const Icon = iconMap[icon];
  return <Icon {...props} />;
}
