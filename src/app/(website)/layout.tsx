import type { ReactNode } from "react";

import { Header } from "@/components/website/header";
import { SiteFooter } from "@/components/website/site-footer";
import { SmoothScroll } from "@/components/website/smooth-scroll";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default function WebsiteLayout({
  children,
}: WebsiteLayoutProps) {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)] [--site-accent:#f36b21] [--site-bg:#111111] [--site-line:rgba(255,255,255,0.12)] [--site-muted:#8b8b84] [--site-surface:#181818] [--site-text:#f2f0ea]">
        <Header />

        <main>{children}</main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
