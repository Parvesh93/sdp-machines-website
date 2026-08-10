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
    <aside className="admin-sidebar">
      <Link
        href="/admin"
        className="admin-sidebar-header"
      >
        <div className="admin-brand-mark">
          SDP
        </div>

        <div>
          <strong className="admin-brand-title">
            SDP Machines
          </strong>

          <span className="admin-brand-subtitle">
            Content Management
          </span>
        </div>
      </Link>

      <AdminNav />

      <div className="admin-sidebar-footer">
        <div className="admin-user">
          <div className="admin-user-avatar">
            {initials}
          </div>

          <div className="admin-user-info">
            <strong>
              {userName}
            </strong>

            <span>
              {userRole}
            </span>
          </div>
        </div>

        <LogoutButton />
      </div>
    </aside>
  );
}