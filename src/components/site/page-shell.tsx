"use client";

import { ReactNode } from "react";
import { Footer } from "@/components/site/footer";
import { SiteBackground } from "@/components/site/site-background";
import { SiteNav } from "@/components/site/site-nav";
import { CustomCursor } from "@/components/ui/custom-cursor";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <CustomCursor />
      <main className="relative min-h-screen">
        <SiteBackground />
        <div className="relative z-10">
          <SiteNav />
          <div className="pt-20">{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
}
