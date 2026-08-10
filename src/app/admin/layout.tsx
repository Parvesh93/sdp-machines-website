import type { ReactNode } from "react";

import { auth } from "../../../auth";

import { AdminShell } from "@/components/admin/admin-shell";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const session = await auth();

  return (
    <AdminShell session={session}>
      {children}
    </AdminShell>
  );
}