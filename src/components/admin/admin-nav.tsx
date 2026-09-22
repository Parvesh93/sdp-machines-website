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
      className="flex flex-1 gap-1 overflow-x-auto p-3 md:block md:overflow-y-auto md:px-3 md:py-[18px]"
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
            className={`relative flex min-h-[42px] shrink-0 items-center rounded-md px-3 text-[14px] transition-colors duration-150 md:mb-[3px] ${
              active
                ? "bg-white/[0.08] text-white before:absolute before:bottom-[9px] before:left-0 before:top-[9px] before:w-0.5 before:bg-[#f36b21] before:content-['']"
                : "text-[#a9a9a9] hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
