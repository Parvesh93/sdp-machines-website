"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Menu,
  Search,
  X,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import { Logo } from "./logo";

const navigation = [
  { label: "Machines", href: "/machines" },
  { label: "Installations", href: "/installations" },
  { label: "Service & Support", href: "/service-support" },
  { label: "About", href: "/about" },
];

const quoteButtonClass =
  "inline-flex h-[42px] items-center justify-center gap-5 bg-[var(--site-accent)] px-4 text-[11px] font-bold tracking-[0.01em] text-[#0a0b0a] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffd867]";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b px-[34px] transition-[background-color,border-color,backdrop-filter] duration-300 max-[650px]:px-[18px] ${
          scrolled
            ? "border-white/[0.09] bg-[#0b0c0c]/80 backdrop-blur-[18px]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[88px] w-full max-w-[1600px] items-center justify-between">
          <Logo />

          <nav
            className="hidden items-center gap-[34px] min-[951px]:flex"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[12px] font-medium text-white/70 transition-colors duration-200 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-[var(--site-accent)] after:transition-[width] after:duration-200 after:content-[''] hover:text-white hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="hidden h-[42px] w-[42px] cursor-pointer place-items-center border border-white/15 bg-transparent text-white transition-colors duration-200 hover:bg-white hover:text-[#111] min-[951px]:grid"
              aria-label="Search"
            >
              <Search size={17} />
            </button>

            <Link
              href="/contact"
              className={`${quoteButtonClass} hidden min-[651px]:inline-flex`}
            >
              <span>Get a Quote</span>
              <ArrowUpRight size={16} />
            </Link>

            <button
              type="button"
              className="grid h-[42px] w-[42px] cursor-pointer place-items-center border border-white/15 bg-transparent text-white min-[951px]:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[90] bg-[#0b0c0c] transition-[opacity,visibility,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] min-[951px]:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex min-h-screen flex-col px-7 pb-8 pt-[125px]">
          <div className="border-b border-white/10 pb-3.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#666]">
            Navigation
          </div>

          <nav>
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="grid min-h-[76px] grid-cols-[42px_1fr_auto] items-center border-b border-white/10 text-white"
              >
                <span className="text-[9px] text-[#686a66]">
                  0{index + 1}
                </span>

                <strong className="text-[clamp(21px,7vw,30px)] font-medium tracking-[-0.04em]">
                  {item.label}
                </strong>

                <ArrowUpRight size={20} />
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="grid min-h-[76px] grid-cols-[42px_1fr_auto] items-center border-b border-white/10 text-white"
            >
              <span className="text-[9px] text-[#686a66]">05</span>
              <strong className="text-[clamp(21px,7vw,30px)] font-medium tracking-[-0.04em]">
                Contact
              </strong>
              <ArrowUpRight size={20} />
            </Link>
          </nav>

          <div className="mt-auto flex items-end justify-between gap-8 pt-8 max-[650px]:flex-col max-[650px]:items-stretch">
            <p className="max-w-[260px] text-[11px] leading-[1.6] text-[#777]">
              Precision engineering for natural stone processing.
            </p>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={`${quoteButtonClass} max-[650px]:w-full`}
            >
              Request a Quote
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
