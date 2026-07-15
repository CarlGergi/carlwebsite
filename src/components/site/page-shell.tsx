"use client";

import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { SiteCursor } from "@/components/ui/site-cursor";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SiteBackground } from "@/components/site/site-background";
import { SiteNav } from "@/components/site/site-nav";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-x-clip">
        <SiteBackground />
        {/* Site-wide ember floor — faint golden dust drifting along the
            bottom of the viewport on every screen (desktop only) */}
        <video
          className="screen-media pointer-events-none fixed inset-x-0 bottom-0 z-0 hidden h-[36vh] w-full object-cover opacity-[0.13] mix-blend-screen md:block motion-reduce:hidden"
          style={{
            maskImage: "linear-gradient(to top, black 15%, transparent 88%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 15%, transparent 88%)",
          }}
          src="/dust.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <SiteCursor />
        <div className="relative z-10">
          <ScrollProgress />
          <SiteNav />
          <div className="pt-14">{children}</div>
          <Footer />
        </div>
      </main>
    </MotionConfig>
  );
}
