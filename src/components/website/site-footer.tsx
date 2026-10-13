import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "Machines", href: "/machines" },
  { label: "Installations", href: "/installations" },
  { label: "Service & Support", href: "/service-support" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#090a09] px-[5vw] pb-8 pt-20 text-[#f2f0ea] max-[650px]:px-[18px] max-[650px]:pt-16">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/brand/sdp-logo-original.png"
                alt="SDP Machines"
                width={70}
                height={62}
                className="h-auto w-[62px] object-contain"
              />
              <div>
                <strong className="block text-[14px] font-semibold tracking-[-0.02em]">
                  SDP MACHINES
                </strong>
                <span className="mt-1 block text-[7px] font-semibold uppercase tracking-[0.14em] text-white/35">
                  Stone Processing Machines
                </span>
              </div>
            </div>

            <h2 className="mt-10 max-w-[900px] text-[clamp(46px,5.5vw,92px)] font-medium leading-[0.9] tracking-[-0.065em]">
              Engineered in Ajmer.
              <span className="block text-[#6f726d]">
                Built for production.
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-[360px] text-[11px] leading-[1.8] text-white/45">
              Stone processing machinery engineered for dependable production,
              precision and long-term support.
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex h-[50px] items-center gap-8 bg-[var(--site-accent)] px-5 text-[11px] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#dc5d19]"
            >
              Request a Quote
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/10 py-10 md:grid-cols-[1fr_auto] md:items-end">
          <nav className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Footer navigation">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-medium text-white/50 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-[8px] uppercase tracking-[0.14em] text-white/25 md:text-right">
            Ajmer, Rajasthan / India
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-[8px] uppercase tracking-[0.12em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} SDP Machines</span>
          <span>Precision engineering / Since 1995</span>
        </div>
      </div>
    </footer>
  );
}
