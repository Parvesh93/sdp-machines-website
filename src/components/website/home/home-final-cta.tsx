"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomeFinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".home-cta-copy",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );

      gsap.to(".home-cta-grid", {
        backgroundPosition: "72px 72px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0b1720] px-[5vw] py-[120px] text-[#f4f8fa] max-[650px]:px-[18px] max-[650px]:py-20"
    >
      <div className="home-cta-grid pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="home-cta-copy relative mx-auto w-full max-w-[1600px]">
        <span className="mb-7 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
          06 / Start a Conversation
        </span>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h2 className="max-w-[980px] text-[clamp(52px,6.2vw,106px)] font-medium leading-[0.9] tracking-[-0.067em]">
            Planning a new line or
            <span className="block text-[#8fa6b4]">
              upgrading an existing one?
            </span>
          </h2>

          <div className="lg:justify-self-end">
            <p className="max-w-[440px] text-[12px] leading-7 text-[#a9beca]/70">
              Tell us which machine you are considering and our team will help
              you take the next step.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex h-[50px] items-center gap-7 bg-[var(--site-accent)] px-5 text-[10px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#147aa5]"
              >
                Request a Quote
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex h-[50px] items-center gap-4 border border-[#8fb4c8]/30 px-5 text-[10px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-1 hover:border-[var(--site-accent)] hover:bg-white/[0.03]"
              >
                <MessageCircle
                  size={16}
                  className="text-[var(--site-accent)] transition-transform duration-300 group-hover:scale-110"
                />
                WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
