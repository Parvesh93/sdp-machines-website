import type { ReactNode } from "react";
import type { Session } from "next-auth";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

type AdminShellProps = {
  children: ReactNode;
  session: Session | null;
};

export function AdminShell({
  children,
  session,
}: AdminShellProps) {
  return (
    <div className="admin-shell">
      <AdminSidebar
        session={session}
      />

      <div className="admin-main">
        <AdminTopbar
          userName={
            session?.user?.name
          }
        />

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}