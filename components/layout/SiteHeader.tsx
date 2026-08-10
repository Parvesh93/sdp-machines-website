import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <Link href="/" className="brand" aria-label="SDP Machines home">SDP</Link>
      <nav aria-label="Primary navigation">
        {site.nav.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="quote" href="#contact">Get a Quote</Link>
    </header>
  );
}
