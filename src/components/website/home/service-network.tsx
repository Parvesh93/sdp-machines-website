"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serviceCentres = [
  {
    name: "Kishangarh",
    x: 33,
    y: 36,
  },
  {
    name: "Hosur",
    x: 45,
    y: 77,
  },
  {
    name: "Krishnagiri",
    x: 43,
    y: 72,
  },
  {
    name: "Ongole",
    x: 56,
    y: 64,
  },
  {
    name: "Karimnagar",
    x: 50,
    y: 55,
  },
];

const stats = [
  {
    value: "1,000+",
    label: "Installations",
  },
  {
    value: "400+",
    label: "Workforce",
  },
  {
    value: "5",
    label: "Service Centres",
  },
];

export function ServiceNetwork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-network-stat",
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
          },
        },
      );

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
            start: "top 68%",
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
          duration: 1.3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
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
      className="
        relative
        overflow-hidden
        bg-[#e9e8e2]
        px-[5vw]
        py-28
        text-[#171817]
        lg:py-36
      "
    >
      <div className="mx-auto w-full max-w-[1600px]">
        {/* HEADING */}

        <div
          className="
            mb-16
            grid
            gap-10
            lg:grid-cols-[1.4fr_.6fr]
            lg:items-end
          "
        >
          <div>
            <span
              className="
                mb-6
                block
                text-[9px]
                font-bold
                uppercase
                tracking-[.17em]
                text-[#77766f]
              "
            >
              03 / India Service Network
            </span>

            <h2
              className="
                max-w-[980px]
                text-[clamp(54px,6.4vw,108px)]
                font-medium
                leading-[.88]
                tracking-[-.068em]
              "
            >
              Built in Ajmer.
              <span className="block text-[#999890]">
                Supported across India.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[380px]
              text-[12px]
              leading-7
              text-[#666860]
            "
          >
            SDP combines manufacturing depth
            with regional service support across
            key stone-processing clusters.
          </p>
        </div>

        {/* CONTENT */}

        <div
          className="
            grid
            overflow-hidden
            border
            border-[#c6c5be]
            lg:grid-cols-[.42fr_1.58fr]
          "
        >
          {/* STATS */}

          <div
            className="
              grid
              border-[#c6c5be]
              lg:border-r
            "
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="
                  service-network-stat

                  min-h-[185px]

                  flex
                  flex-col
                  justify-between

                  border-b
                  border-[#c6c5be]

                  p-7

                  last:border-b-0

                  lg:min-h-[210px]
                "
              >
                <strong
                  className="
                    text-[clamp(56px,5.5vw,88px)]
                    font-medium
                    leading-none
                    tracking-[-.065em]
                  "
                >
                  {stat.value}
                </strong>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[.12em]
                    text-[#77776f]
                  "
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* MAP */}

          <div
            className="
              relative
              min-h-[640px]
              overflow-hidden
              bg-[#121312]
            "
          >
            {/* GRID */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-35
              "
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(255,255,255,.055) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(255,255,255,.055) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: "55px 55px",
              }}
            />

            {/* ACCENT GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[520px]
                w-[520px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[radial-gradient(circle,rgba(242,201,76,.08),transparent_68%)]
              "
            />

            {/* MAP */}

            <div className="absolute inset-[7%]">
              <svg
                viewBox="0 0 100 100"
                aria-label="SDP service network across India"
                className="h-full w-full"
              >
                <path
                  d="
                    M45 7
                    L55 12
                    L61 20
                    L67 28
                    L64 36
                    L68 43
                    L65 51
                    L61 58
                    L60 67
                    L55 78
                    L50 92
                    L45 81
                    L40 70
                    L36 60
                    L30 52
                    L28 44
                    L31 35
                    L29 27
                    L35 19
                    L39 12
                    Z
                  "
                  fill="rgba(255,255,255,.025)"
                  stroke="rgba(255,255,255,.22)"
                  strokeWidth="0.6"
                />

                {serviceCentres.map(
                  (centre, index) => (
                    <g
                      key={centre.name}
                      className="service-map-marker"
                    >
                      <circle
                        cx={centre.x}
                        cy={centre.y}
                        r="1.7"
                        fill="transparent"
                        stroke="var(--site-accent)"
                        strokeWidth="0.55"
                      />

                      <circle
                        cx={centre.x}
                        cy={centre.y}
                        r="0.55"
                        fill="var(--site-accent)"
                      />

                      <text
                        x={
                          centre.x +
                          (index % 2 === 0
                            ? 3
                            : -3)
                        }
                        y={centre.y - 2}
                        textAnchor={
                          index % 2 === 0
                            ? "start"
                            : "end"
                        }
                        fill="#b7b8b3"
                        fontSize="2.2"
                      >
                        {centre.name}
                      </text>
                    </g>
                  ),
                )}

                <path
                  className="service-map-line"
                  pathLength="1"
                  d="
                    M33 36
                    L50 55
                    L56 64
                    L43 72
                    L45 77
                  "
                  fill="none"
                  stroke="rgba(242,201,76,.38)"
                  strokeWidth="0.35"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                />
              </svg>
            </div>

            {/* MAP META */}

            <div
              className="
                absolute
                bottom-7
                left-7
                z-10
              "
            >
              <span
                className="
                  block
                  text-[8px]
                  uppercase
                  tracking-[.13em]
                  text-[#646762]
                "
              >
                Regional support network
              </span>

              <strong
                className="
                  mt-2
                  block
                  text-[24px]
                  font-medium
                  tracking-[-.04em]
                  text-[#f2f0ea]
                "
              >
                5 service centres
              </strong>
            </div>

            {/* RIGHT LABEL */}

            <div
              className="
                absolute
                right-7
                top-7
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
                SDP / India
              </span>

              <span
                className="
                  mt-1
                  block
                  text-[9px]
                  text-white/40
                "
              >
                Service beyond warranty
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}