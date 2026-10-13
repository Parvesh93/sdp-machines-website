import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Machines", href: "/machines" },
  { label: "Installations", href: "/installations" },
  { label: "Service & Support", href: "/service-support" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#8fb4c8]/18 bg-[#061018] px-[5vw] pb-8 pt-12 text-[#f4f8fa] max-[650px]:px-[18px] max-[650px]:pt-10">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid gap-10 border-b border-[#8fb4c8]/18 pb-10 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/images/brand/sdp-logo-original.png"
              alt="SDP Machines"
              width={70}
              height={62}
              className="h-auto w-[58px] object-contain"
            />

            <div>
              <strong className="block text-[13px] font-semibold tracking-[-0.02em]">
                SDP MACHINES
              </strong>

              <span className="mt-1 block text-[7px] font-semibold uppercase tracking-[0.14em] text-[#8fa6b4]/60">
                Stone Processing Machines
              </span>
            </div>
          </div>

          <nav
            className="flex flex-wrap gap-x-8 gap-y-4 md:justify-center"
            aria-label="Footer navigation"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-medium text-[#a9beca]/70 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-[8px] uppercase tracking-[0.14em] text-[#8fa6b4]/45 md:text-right">
            Ajmer, Rajasthan / India
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-[8px] uppercase tracking-[0.12em] text-[#8fa6b4]/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} SDP Machines</span>
          <span>Stone processing machinery / Ajmer, India</span>
        </div>
      </div>
    </footer>
  );
}
