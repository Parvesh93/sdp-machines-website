"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serviceCentres = [
  {
    name: "Ajmer HQ",
    x: 36,
    y: 36,
    tier: "head-office",
  },
  {
    name: "Abu Road",
    x: 29,
    y: 45,
    tier: "service",
  },
  {
    name: "Karimnagar",
    x: 51,
    y: 57,
    tier: "service",
  },
  {
    name: "Prakasam",
    x: 55,
    y: 66,
    tier: "service",
  },
  {
    name: "Krishnagiri",
    x: 45,
    y: 78,
    tier: "service",
  },
] as const;

const stats = [
  {
    target: 1000,
    suffix: "+",
    label: "Installations",
  },
  {
    target: 400,
    suffix: "+",
    label: "Workforce",
  },
  {
    target: 5,
    suffix: "",
    label: "Service Centres",
  },
] as const;

export function ServiceNetwork() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      counterRefs.current.forEach((element, index) => {
        if (!element) return;

        const stat = stats[index];
        const counter = { value: 0 };

        gsap.to(counter, {
          value: stat.target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
          onUpdate: () => {
            element.textContent =
              `${Math.round(counter.value).toLocaleString("en-IN")}${stat.suffix}`;
          },
        });
      });

      gsap.fromTo(
        ".service-map-marker",
        {
          opacity: 0,
          scale: 0,
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.14,
          duration: 0.5,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        },
      );

      gsap.fromTo(
        ".service-map-line",
        {
          strokeDashoffset: 1,
        },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#111111] px-[5vw] py-[120px] text-[#f2f0ea] max-[650px]:px-[18px] max-[650px]:py-20"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <span className="mb-6 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
              03 / Proof + Service Reach
            </span>

            <h2 className="m-0 max-w-[1000px] text-[clamp(54px,6.4vw,108px)] font-medium leading-[0.88] tracking-[-0.068em]">
              Proven in production.
              <span className="block text-white/40">
                Supported across India.
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="m-0 max-w-[390px] text-[12px] leading-7 text-white/50">
              Manufacturing in Ajmer backed by regional service offices across
              key stone-processing markets.
            </p>

            <Link
              href="/service-support"
              className="group mt-6 inline-flex items-center gap-4 text-[10px] font-semibold text-white"
            >
              View our service network
              <ArrowUpRight
                size={17}
                className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>

        <div className="grid border border-white/15 lg:grid-cols-[.58fr_1.42fr]">
          <div className="border-white/15 lg:border-r">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="grid min-h-[150px] grid-cols-[minmax(0,1fr)_auto] items-end gap-6 border-b border-white/15 p-7 last:border-b-0 lg:min-h-[175px]"
              >
                <strong
                  ref={(element) => {
                    counterRefs.current[index] = element;
                  }}
                  className="text-[clamp(58px,6vw,96px)] font-medium leading-[0.8] tracking-[-0.07em] tabular-nums"
                >
                  0{stat.suffix}
                </strong>

                <span className="pb-1 text-right text-[9px] uppercase tracking-[0.12em] text-white/45">
                  {stat.label}
                </span>
              </div>
            ))}

            <div className="grid min-h-[150px] grid-cols-[minmax(0,1fr)_auto] items-end gap-6 p-7 lg:min-h-[175px]">
              <strong className="text-[clamp(48px,5vw,82px)] font-medium leading-[0.85] tracking-[-0.06em] tabular-nums">
                1995
              </strong>

              <span className="pb-1 text-right text-[9px] uppercase tracking-[0.12em] text-white/45">
                Engineering Since
              </span>
            </div>
          </div>

          <div className="relative min-h-[650px] overflow-hidden bg-[#181818] max-[650px]:min-h-[500px]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />

            <div className="absolute inset-[7%]">
              <svg
                viewBox="0 0 100 100"
                aria-label="SDP service network across India"
                className="h-full w-full"
              >
                <path
                  d="M45 7 L55 12 L61 20 L67 28 L64 36 L68 43 L65 51 L61 58 L60 67 L55 78 L50 92 L45 81 L40 70 L36 60 L30 52 L28 44 L31 35 L29 27 L35 19 L39 12 Z"
                  fill="rgba(255,255,255,.02)"
                  stroke="rgba(255,255,255,.28)"
                  strokeWidth="0.6"
                />

                <path
                  className="service-map-line"
                  pathLength="1"
                  d="M36 36 L29 45 M36 36 L51 57 L55 66 L45 78"
                  fill="none"
                  stroke="rgba(243,107,33,.48)"
                  strokeWidth="0.35"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                />

                {serviceCentres.map((centre, index) => {
                  const isHeadOffice = centre.tier === "head-office";

                  return (
                    <g
                      key={centre.name}
                      className="service-map-marker"
                    >
                      <circle
                        cx={centre.x}
                        cy={centre.y}
                        r={isHeadOffice ? "2.1" : "1.6"}
                        fill="transparent"
                        stroke="var(--site-accent)"
                        strokeWidth={isHeadOffice ? "0.7" : "0.5"}
                      />

                      <circle
                        cx={centre.x}
                        cy={centre.y}
                        r={isHeadOffice ? "0.72" : "0.5"}
                        fill="var(--site-accent)"
                      />

                      <text
                        x={centre.x + (index % 2 === 0 ? 3 : -3)}
                        y={centre.y - 2}
                        textAnchor={index % 2 === 0 ? "start" : "end"}
                        fill="#c7c6bf"
                        fontSize="2.15"
                      >
                        {centre.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="absolute bottom-7 left-7 z-10 flex flex-wrap gap-x-7 gap-y-3 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/40">
              <span className="inline-flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[var(--site-accent)]" />
                Head Office
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="h-2 w-2 rounded-full border border-[var(--site-accent)]" />
                Sales & Service Office
              </span>
            </div>

            <div className="absolute right-7 top-7 text-right">
              <span className="block text-[8px] uppercase tracking-[0.14em] text-white/25">
                SDP / India
              </span>
              <span className="mt-1 block text-[9px] text-white/40">
                Service beyond warranty
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
