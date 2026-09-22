import Link from "next/link";
import type { Session } from "next-auth";

import { AdminNav } from "@/components/admin/admin-nav";
import { LogoutButton } from "@/components/admin/logout-button";

type AdminSidebarProps = {
  session: Session | null;
};

export function AdminSidebar({
  session,
}: AdminSidebarProps) {
  const userName =
    session?.user?.name ??
    "Administrator";

  const userRole =
    session?.user?.role ??
    "EDITOR";

  const initials = userName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="flex w-full flex-col border-r border-white/[0.08] bg-[#111111] text-[#f5f5f1] md:fixed md:inset-y-0 md:left-0 md:w-[260px]">
      <Link
        href="/admin"
        className="flex min-h-[88px] items-center gap-3 border-b border-white/[0.08] p-5 text-inherit"
      >
        <div className="grid h-[42px] w-[42px] place-items-center bg-[#f36b21] text-[12px] font-extrabold tracking-[0.04em] text-[#111111]">
          SDP
        </div>

        <div>
          <strong className="block text-[14px] leading-[1.2]">
            SDP Machines
          </strong>

          <span className="mt-[3px] block text-[11px] uppercase tracking-[0.14em] text-[#8f8f8f]">
            Content Management
          </span>
        </div>
      </Link>

      <AdminNav />

      <div className="border-t border-white/[0.08] p-4">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#292929] text-[13px] font-bold text-white">
            {initials}
          </div>

          <div className="min-w-0">
            <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[12px]">
              {userName}
            </strong>

            <span className="mt-0.5 block text-[10px] text-[#777777]">
              {userRole}
            </span>
          </div>
        </div>

        <LogoutButton />
      </div>
    </aside>
  );
}
