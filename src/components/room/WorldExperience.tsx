"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteConfig } from "@/lib/sites";
import Room from "./Room";
import EnterScreen from "./EnterScreen";
import PersistentNav from "./PersistentNav";
import ContentPanel, { getPanelContent } from "./ContentPanel";
import StreamComingSoon from "../StreamComingSoon";
import { usePrefersReducedMotion } from "./useReducedMotion";
import { useWebglSupport } from "./useWebglSupport";

export default function WorldExperience({
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
  const [entered, setEntered] = useState(false);
  const [target, setTarget] = useState("wide");
  const reducedMotion = usePrefersReducedMotion();
  const webglSupported = useWebglSupport();
  const { theme } = site;

  // Fall back to the static hero+about page for reduced-motion visitors or
  // browsers/devices that can't run WebGL — the 3D world is an enhancement,
  // never the only way to reach the content. Also the loading state while
  // we determine support, so nobody sees a flash of the wrong experience.
  if (webglSupported === null) {
    return <div style={{ background: theme.bg, minHeight: "100vh" }} />;
  }
  if (reducedMotion || !webglSupported) {
    return (
      <StreamComingSoon
        site={site}
        logoSrc={logoSrc}
        roles={roles}
        aboutParagraphs={aboutParagraphs}
        streamTags={streamTags}
      />
    );
  }

  const content = getPanelContent(target, site.socials, theme.accent, streamTags);

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={
        {
          background: "#0a0910",
          "--site-text": theme.text,
          "--site-text-muted": theme.textMuted,
        } as React.CSSProperties
      }
    >
      <AnimatePresence>
        {!entered && (
          <EnterScreen
            displayName={site.displayName ?? site.name}
            logoSrc={logoSrc}
            accent={theme.accent}
            onEnter={() => setEntered(true)}
          />
        )}
      </AnimatePresence>

      <Canvas camera={{ position: [2.2, 1.6, 1.8], fov: 50 }} shadows dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Room accent={theme.accent} active={target} onSelect={setTarget} />
        </Suspense>
        <fog attach="fog" args={["#0a0910", 4, 9]} />
      </Canvas>

      {entered && (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pointer-events-auto self-center font-[family-name:var(--font-display)] text-sm sm:text-base"
            style={{ color: theme.accent, opacity: 0.85 }}
          >
            {site.displayName ?? site.name}
          </motion.div>

          <ContentPanel target={target} content={content} onClose={() => setTarget("wide")} />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center"
          >
            <PersistentNav active={target} accent={theme.accent} onSelect={setTarget} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
