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
    <div className="min-h-screen bg-[#f4f4f2] text-[#161616] md:grid md:grid-cols-[260px_minmax(0,1fr)]">
      <AdminSidebar session={session} />

      <div className="min-w-0 md:col-start-2">
        <AdminTopbar
          userName={session?.user?.name}
        />

        <main className="w-full max-w-[1500px] px-[18px] pb-[60px] pt-7 md:px-8 md:pb-20 md:pt-[42px] xl:px-[42px]">
          {children}
        </main>
      </div>
    </div>
  );
}
