"use client";

import Link from "next/link";
import {
  Menu,
  Search,
  X,
  ArrowUpRight,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import { Logo } from "./logo";

const navigation = [
  {
    label: "Machines",
    href: "/machines",
  },
  {
    label: "Installations",
    href: "/installations",
  },
  {
    label: "Service & Support",
    href: "/service-support",
  },
  {
    label: "About",
    href: "/about",
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(
        window.scrollY > 30,
      );
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  return (
    <>
      <header
        className={
          scrolled
            ? "site-header site-header-scrolled"
            : "site-header"
        }
      >
        <div className="site-header-inner">
          <Logo />

          <nav
            className="site-nav"
            aria-label="Main navigation"
          >
            {navigation.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="site-nav-link"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="site-header-actions">
            <button
              type="button"
              className="site-search-button"
              aria-label="Search"
            >
              <Search size={17} />
            </button>

            <Link
              href="/contact"
              className="site-quote-button"
            >
              <span>
                Get a Quote
              </span>

              <ArrowUpRight
                size={16}
              />
            </Link>

            <button
              type="button"
              className="site-menu-button"
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              onClick={() =>
                setMenuOpen(
                  (current) =>
                    !current,
                )
              }
            >
              {menuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={
          menuOpen
            ? "mobile-menu mobile-menu-open"
            : "mobile-menu"
        }
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-label">
            Navigation
          </div>

          <nav>
            {navigation.map(
              (item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="mobile-nav-link"
                >
                  <span>
                    0{index + 1}
                  </span>

                  <strong>
                    {item.label}
                  </strong>

                  <ArrowUpRight
                    size={20}
                  />
                </Link>
              ),
            )}

            <Link
              href="/contact"
              onClick={() =>
                setMenuOpen(false)
              }
              className="mobile-nav-link"
            >
              <span>05</span>

              <strong>
                Contact
              </strong>

              <ArrowUpRight
                size={20}
              />
            </Link>
          </nav>

          <div className="mobile-menu-footer">
            <p>
              Precision engineering for
              natural stone processing.
            </p>

            <Link
              href="/contact"
              onClick={() =>
                setMenuOpen(false)
              }
              className="site-quote-button"
            >
              Request a Quote
              <ArrowUpRight
                size={16}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}