import type { ReactNode } from "react";

import { Header } from "@/components/website/header";
import { SiteFooter } from "@/components/website/site-footer";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default function WebsiteLayout({
  children,
}: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)] [--site-accent:#f2c94c] [--site-bg:#0b0c0c] [--site-line:rgba(255,255,255,0.12)] [--site-muted:#989a96] [--site-surface:#121313] [--site-text:#f2f0ea]">
      <Header />

      <main>{children}</main>

      <SiteFooter />
    </div>
  );
}
