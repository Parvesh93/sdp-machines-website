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
      <div className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)] [--site-accent:#1f8fc1] [--site-bg:#07131a] [--site-line:rgba(143,180,200,0.18)] [--site-muted:#8fa6b4] [--site-surface:#0b1720] [--site-text:#f4f8fa]">
        <Header />

        <main>{children}</main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
