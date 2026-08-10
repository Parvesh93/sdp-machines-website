"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/config/admin-navigation";

function isRouteActive(
  pathname: string,
  href: string,
) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname.startsWith(href);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      className="admin-nav"
      aria-label="Admin navigation"
    >
      {adminNavigation.map((item) => {
        const active = isRouteActive(
          pathname,
          item.href,
        );

        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active
                ? "admin-nav-link admin-nav-link-active"
                : "admin-nav-link"
            }
          >
            <span>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}