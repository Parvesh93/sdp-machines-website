"use client";

import Link from "next/link";
import { ArrowUpRight, Boxes, Settings, Wrench } from "lucide-react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serviceBackground =
  "https://images.pexels.com/photos/37668423/pexels-photo-37668423/free-photo-of-engineer-inspecting-machinery-in-industrial-setting.jpeg?auto=compress&cs=tinysrgb&w=2000";

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
      gsap.fromTo(
        ".service-preview-copy",
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
          },
        },
      );

      gsap.fromTo(
        ".service-preview-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
          },
        },
      );

      gsap.fromTo(
        ".service-fixed-bg",
        { backgroundPosition: "50% 42%" },
        {
          backgroundPosition: "50% 58%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#07131a] px-[5vw] py-[120px] text-[#f4f8fa] max-[650px]:px-[18px] max-[650px]:py-20"
    >
      <div
        className="service-fixed-bg absolute inset-0 -z-30 scale-[1.04] bg-cover bg-center [background-attachment:fixed] max-[1023px]:[background-attachment:scroll]"
        style={{ backgroundImage: `url("${serviceBackground}")` }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 -z-20 bg-[#06131b]/84"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,17,25,0.95)_0%,rgba(4,17,25,0.82)_48%,rgba(4,17,25,0.68)_100%)]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 -z-[5] opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <div className="service-preview-copy grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <span className="mb-6 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
              04 / Service & Support
            </span>

            <h2 className="m-0 max-w-[980px] text-[clamp(52px,6vw,102px)] font-medium leading-[0.9] tracking-[-0.065em]">
              Support beyond
              <span className="block text-[#9bb0bd]/62">machine delivery.</span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="m-0 max-w-[420px] text-[12px] leading-7 text-[#c4d3dc]/72">
              From installation and commissioning to maintenance and spare parts,
              our team supports customers through the working life of their equipment.
            </p>

            <Link
              href="/service-support"
              className="group mt-7 inline-flex items-center gap-4 text-[10px] font-semibold text-white"
            >
              Explore Service & Support
              <ArrowUpRight
                size={17}
                className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid border-y border-[#9bb7c7]/22 bg-[#07131a]/18 backdrop-blur-[2px] md:grid-cols-3">
          {supportItems.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className="service-preview-card group relative flex min-h-[220px] flex-col justify-between overflow-hidden border-b border-[#9bb7c7]/22 bg-[#07131a]/16 p-7 transition-[background-color,transform,backdrop-filter] duration-300 hover:-translate-y-1 hover:bg-[#0d1d27]/72 hover:backdrop-blur-sm last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="flex items-center justify-between">
                <Icon
                  size={22}
                  className="text-[var(--site-accent)] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                />
                <span className="text-[9px] tabular-nums text-[#9fb5c1]/55">
                  0{index + 1}
                </span>
              </div>

              <strong className="max-w-[260px] text-[clamp(22px,2.2vw,32px)] font-medium leading-[1.05] tracking-[-0.04em]">
                {label}
              </strong>

              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--site-accent)] transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
