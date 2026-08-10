import Link from "next/link";

type AdminTopbarProps = {
  userName?: string | null;
};

export function AdminTopbar({
  userName,
}: AdminTopbarProps) {
  return (
    <header className="admin-topbar">
      <div>
        <span className="admin-topbar-label">
          SDP Machines Administration
        </span>

        {userName ? (
          <span className="admin-topbar-user">
            {userName}
          </span>
        ) : null}
      </div>

      <div className="admin-topbar-actions">
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="admin-view-site"
        >
          View website
        </Link>
      </div>
    </header>
  );
}