"use client";

const NAV_ITEMS: { key: string; label: string }[] = [
  { key: "monitor", label: "Stream" },
  { key: "pc", label: "Videos" },
  { key: "poster", label: "About" },
  { key: "door", label: "Discord" },
  { key: "phone", label: "Socials" },
];

/**
 * Small always-visible nav — the accessible fallback so a visitor never has
 * to hunt the 3D scene for content. Also just works as the primary nav for
 * reduced-motion/no-WebGL visitors.
 */
export default function PersistentNav({
  active,
  accent,
  onSelect,
}: {
  active: string;
  accent: string;
  onSelect: (target: string) => void;
}) {
  return (
    <nav className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 rounded-full border px-3 py-2 backdrop-blur-md" style={{ borderColor: "var(--site-text-muted)", background: "rgba(10,9,16,0.6)" }}>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          onClick={() => onSelect(active === item.key ? "wide" : item.key)}
          className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors"
          style={{
            background: active === item.key ? accent : "transparent",
            color: active === item.key ? "#0a0910" : "var(--site-text)",
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
