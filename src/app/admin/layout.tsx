import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "../../../auth";

import { AdminShell } from "@/components/admin/admin-shell";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <AdminShell session={session}>
      {children}
    </AdminShell>
  );
}