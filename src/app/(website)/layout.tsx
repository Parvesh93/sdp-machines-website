import type { ReactNode } from "react";

import { Header } from "@/components/website/header";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default function WebsiteLayout({
  children,
}: WebsiteLayoutProps) {
  return (
    <div className="website">
      <Header />

      <main>
        {children}
      </main>
    </div>
  );
}