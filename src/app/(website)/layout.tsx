import type { ReactNode } from "react";

import { SiteHeader } from "@/components/website/site-header";
import { SiteFooter } from "@/components/website/site-footer";
import { WhatsAppButton } from "@/components/website/whatsapp-button";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default function WebsiteLayout({
  children,
}: WebsiteLayoutProps) {
  return (
    <>
      <SiteHeader />

      <main>{children}</main>

      <SiteFooter />

      <WhatsAppButton />
    </>
  );
}