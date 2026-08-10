import Link from "next/link";

const navigation = [
  {
    label: "Machines",
    href: "/machines",
  },
  {
    label: "Service & Support",
    href: "/service-support",
  },
  {
    label: "Installations",
    href: "/installations",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function SiteHeader() {
  return (
    <header>
      <Link href="/">
        SDP Machines
      </Link>

      <nav>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link href="/contact">
        Get a Quote
      </Link>
    </header>
  );
}