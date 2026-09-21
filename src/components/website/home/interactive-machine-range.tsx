"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const machineGroups = [
  {
    number: "01",
    title: "Bridge Cutting",
    subtitle: "Primary Processing",
    description:
      "Heavy-duty bridge cutting systems engineered for accurate, continuous stone processing.",
    image:
      "/images/machines/multi-cutter-3.png",
    href: "/machines",
  },
  {
    number: "02",
    title: "Edge Processing",
    subtitle: "Finishing Systems",
    description:
      "Edge-processing platforms designed for controlled finishing and production consistency.",
    image:
      "/images/machines/lpm/lpm-front.jpg",
    href: "/machines",
  },
  {
    number: "03",
    title: "Surface Processing",
    subtitle: "Line Polishing",
    description:
      "Integrated polishing systems built around repeatable finish, throughput and long operating cycles.",
    image:
      "/images/machines/lpm-1.png",
    href: "/machines",
  },
  {
    number: "04",
    title: "Handling & Automation",
    subtitle: "Material Flow",
    description:
      "Supporting handling and automation systems designed to keep material moving through production.",
    image:
      "/images/machines/lpm/lpm-full-line.jpg",
    href: "/machines",
  },
];

export function InteractiveMachineRange() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const visualRef =
    useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeMachine =
    machineGroups[activeIndex];

  useEffect(() => {
    const section =
      sectionRef.current;

    const visual =
      visualRef.current;

    if (!section || !visual) {
      return;
    }

    const ctx = gsap.context(() => {
      const items =
        gsap.utils.toArray<HTMLElement>(
          "[data-machine-item]",
        );

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 52%",
          end: "bottom 52%",

          onEnter: () => {
            setActiveIndex(index);
          },

          onEnterBack: () => {
            setActiveIndex(index);
          },
        });
      });

      gsap.fromTo(
        visual,
        {
          scale: 0.9,
          y: 60,
          opacity: 0.65,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,

          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 25%",
            scrub: 1,
          },
        },
      );

      gsap.to(
        ".machine-range-grid",
        {
          y: -90,

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const visual =
      visualRef.current;

    if (!visual) return;

    gsap.fromTo(
      visual,
      {
        opacity: 0.25,
        scale: 0.94,
        x: 35,
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.75,
        ease: "power3.out",
      },
    );
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        bg-[#0b0c0c]
        text-[#f2f0ea]
        border-t border-white/10
      "
    >
      {/* GRID */}

      <div
        className="
          machine-range-grid
          pointer-events-none
          absolute inset-0
          opacity-30
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <div
        className="
          relative
          mx-auto
          w-full max-w-[1600px]
          px-[5vw]
          py-28
          lg:py-36
        "
      >
        {/* INTRO */}

        <div
          className="
            mb-20
            grid
            gap-10
            lg:grid-cols-[1.35fr_.65fr]
            lg:items-end
          "
        >
          <div>
            <span
              className="
                mb-6 block
                text-[9px]
                font-bold
                uppercase
                tracking-[.17em]
                text-[var(--site-accent)]
              "
            >
              02 / Machine Range
            </span>

            <h2
              className="
                max-w-[950px]
                text-[clamp(54px,6.2vw,108px)]
                font-medium
                leading-[.9]
                tracking-[-.065em]
              "
            >
              Machines built around
              <span
                className="
                  block
                  text-[#747772]
                "
              >
                the way you produce.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[390px]
              text-[12px]
              leading-7
              text-[#8b8e89]
            "
          >
            From primary cutting to surface
            processing and material handling,
            SDP systems are engineered around
            production requirements rather than
            isolated machine functions.
          </p>
        </div>

        {/* RANGE */}

        <div
          className="
            grid
            border-y border-white/10
            lg:grid-cols-[.72fr_1.28fr]
          "
        >
          {/* LEFT / INDEX */}

          <div
            className="
              border-white/10
              lg:border-r
            "
          >
            {machineGroups.map(
              (machine, index) => {
                const active =
                  index === activeIndex;

                return (
                  <article
                    key={machine.number}
                    data-machine-item
                    className="
                      relative
                      min-h-[48vh]
                      border-b border-white/10
                      last:border-b-0

                      flex items-center
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex(index)
                      }
                      className="
                        group
                        relative
                        w-full
                        py-10 pr-8
                        text-left

                        flex items-start
                        gap-6

                        cursor-pointer
                      "
                    >
                      <span
                        className={
                          active
                            ? `
                              mt-2
                              text-[10px]
                              font-bold
                              text-[var(--site-accent)]
                            `
                            : `
                              mt-2
                              text-[10px]
                              font-bold
                              text-white/25
                            `
                        }
                      >
                        {machine.number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <span
                          className="
                            mb-3 block
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[.14em]
                            text-white/30
                          "
                        >
                          {machine.subtitle}
                        </span>

                        <h3
                          className={
                            active
                              ? `
                                text-[clamp(34px,3.3vw,56px)]
                                font-medium
                                leading-[.95]
                                tracking-[-.05em]
                                text-[#f2f0ea]
                                transition-colors
                              `
                              : `
                                text-[clamp(34px,3.3vw,56px)]
                                font-medium
                                leading-[.95]
                                tracking-[-.05em]
                                text-white/25
                                transition-colors
                                group-hover:text-white/50
                              `
                          }
                        >
                          {machine.title}
                        </h3>

                        <p
                          className={
                            active
                              ? `
                                mt-5
                                max-w-[360px]
                                text-[11px]
                                leading-6
                                text-[#8b8e89]
                                opacity-100
                                transition-opacity
                              `
                              : `
                                mt-5
                                max-w-[360px]
                                text-[11px]
                                leading-6
                                text-[#8b8e89]
                                opacity-0
                                transition-opacity
                              `
                          }
                        >
                          {machine.description}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={20}
                        className={
                          active
                            ? `
                              mt-2
                              text-[var(--site-accent)]
                              opacity-100
                              transition-all
                            `
                            : `
                              mt-2
                              text-white/30
                              opacity-0
                              transition-all
                              group-hover:opacity-60
                            `
                        }
                      />
                    </button>
                  </article>
                );
              },
            )}
          </div>

          {/* RIGHT / STICKY VISUAL */}

          <div
            className="
              relative
              min-h-[100vh]
            "
          >
            <div
              className="
                sticky
                top-[82px]
                h-[calc(100vh-82px)]
                min-h-[650px]
                overflow-hidden
              "
            >
              <div
                className="
                  absolute
                  inset-0

                  bg-[radial-gradient(circle_at_50%_46%,rgba(242,201,76,.07),transparent_34%)]
                "
              />

              <div
                className="
                  absolute
                  left-8 top-8
                  z-20
                  flex items-center
                  gap-3
                "
              >
                <span
                  className="
                    text-[9px]
                    font-bold
                    text-[var(--site-accent)]
                  "
                >
                  {activeMachine.number}
                </span>

                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[.14em]
                    text-white/30
                  "
                >
                  {activeMachine.subtitle}
                </span>
              </div>

              <div
                className="
                  absolute
                  right-8 top-8
                  z-20
                  text-right
                "
              >
                <span
                  className="
                    block
                    text-[8px]
                    uppercase
                    tracking-[.14em]
                    text-white/25
                  "
                >
                  SDP / Machine Family
                </span>
              </div>

              {/* ORBIT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2 top-1/2

                  h-[70%]
                  aspect-square
                  -translate-x-1/2
                  -translate-y-1/2

                  rounded-full
                  border border-[var(--site-accent)]/10
                "
              />

              <div
                ref={visualRef}
                className="
                  absolute
                  inset-[10%_5%_16%_5%]

                  will-change-transform
                "
              >
                <Image
                  key={activeMachine.image}
                  src={activeMachine.image}
                  alt={activeMachine.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="
                    object-contain

                    drop-shadow-[0_45px_35px_rgba(0,0,0,.65)]
                  "
                />
              </div>

              {/* BOTTOM META */}

              <div
                className="
                  absolute
                  bottom-7 left-8 right-8
                  z-20

                  flex
                  items-end
                  justify-between
                  gap-8

                  border-t border-white/10
                  pt-5
                "
              >
                <div>
                  <span
                    className="
                      block
                      text-[8px]
                      uppercase
                      tracking-[.14em]
                      text-white/25
                    "
                  >
                    Active System
                  </span>

                  <strong
                    className="
                      mt-2 block
                      text-[22px]
                      font-medium
                      tracking-[-.04em]
                    "
                  >
                    {activeMachine.title}
                  </strong>
                </div>

                <Link
                  href={activeMachine.href}
                  className="
                    inline-flex
                    h-11
                    items-center
                    gap-4

                    border border-white/15
                    px-4

                    text-[10px]
                    font-semibold

                    transition-colors

                    hover:border-white/35
                    hover:bg-white/5
                  "
                >
                  Explore Machines

                  <ArrowUpRight
                    size={15}
                    className="
                      text-[var(--site-accent)]
                    "
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}