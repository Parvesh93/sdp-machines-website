"use client";

import Link from "next/link";
import { ArrowUpRight, Boxes, Settings, Wrench } from "lucide-react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serviceBackground =
  "https://images.pexels.com/photos/37668423/pexels-photo-37668423/free-photo-of-engineer-inspecting-machinery-in-industrial-setting.jpeg?auto=compress&cs=tinysrgb&w=2200";

const supportItems = [
  { icon: Settings, label: "Installation & Commissioning" },
  { icon: Wrench, label: "Maintenance Support" },
  { icon: Boxes, label: "Spare Parts" },
];

export function ServiceNetwork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".service-parallax-bg",
          {
            yPercent: -7,
            scale: 1.12,
          },
          {
            yPercent: 7,
            scale: 1.03,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        gsap.fromTo(
          ".service-scroll-copy",
          {
            y: 18,
            opacity: 0.72,
          },
          {
            y: -18,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          ".service-preview-card",
          {
            y: 54,
            opacity: 0.35,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 35%",
              end: "bottom 70%",
              scrub: 1,
            },
          },
        );
      });

      media.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".service-preview-copy",
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
            },
          },
        );

        gsap.fromTo(
          ".service-preview-card",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          },
        );
      });

      return () => media.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate bg-[#07131a] text-[#f4f8fa] lg:h-[175svh]"
    >
      <div className="relative overflow-hidden px-[5vw] py-[100px] max-[650px]:px-[18px] max-[650px]:py-20 lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:py-0">
        <div
          className="service-parallax-bg absolute -inset-[10%] -z-30 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url("${serviceBackground}")` }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 -z-20 bg-[#06131b]/68"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,17,25,0.96)_0%,rgba(4,17,25,0.78)_46%,rgba(4,17,25,0.48)_100%)]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 -z-[5] opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]"
          aria-hidden="true"
        />

        <div className="service-scroll-copy relative mx-auto w-full max-w-[1600px]">
          <div className="service-preview-copy grid gap-10 lg:grid-cols-[1.24fr_.76fr] lg:items-end">
            <div>
              <span className="mb-5 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
                04 / Service & Support
              </span>

              <h2 className="m-0 max-w-[920px] text-[clamp(50px,5.7vw,94px)] font-medium leading-[0.9] tracking-[-0.064em]">
                Support beyond
                <span className="block text-[#a8bac5]/66">machine delivery.</span>
              </h2>
            </div>

            <div className="lg:justify-self-end">
              <p className="m-0 max-w-[420px] text-[12px] leading-7 text-[#d4e0e6]/72">
                From installation and commissioning to maintenance and spare parts,
                our team supports customers through the working life of their equipment.
              </p>

              <Link
                href="/service-support"
                className="group mt-6 inline-flex items-center gap-4 text-[10px] font-semibold text-white"
              >
                Explore Service & Support
                <ArrowUpRight
                  size={17}
                  className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid border-y border-[#b9ced9]/24 bg-[#07131a]/28 backdrop-blur-[3px] md:grid-cols-3">
            {supportItems.map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className="service-preview-card group relative flex min-h-[190px] flex-col justify-between overflow-hidden border-b border-[#b9ced9]/24 bg-[#07131a]/18 p-7 transition-[background-color,transform,backdrop-filter] duration-300 hover:-translate-y-1 hover:bg-[#0d1d27]/78 hover:backdrop-blur-md last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={22}
                    className="text-[var(--site-accent)] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                  />
                  <span className="text-[9px] tabular-nums text-[#adc1cc]/55">
                    0{index + 1}
                  </span>
                </div>

                <strong className="max-w-[280px] text-[clamp(22px,2.05vw,30px)] font-medium leading-[1.05] tracking-[-0.04em]">
                  {label}
                </strong>

                <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--site-accent)] transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>

          <div className="mt-5 hidden items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.13em] text-[#aac0cc]/55 lg:flex">
            <span className="h-px w-10 bg-[var(--site-accent)]" />
            Scroll to move through service support
          </div>
        </div>
      </div>
    </section>
  );
}
