"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const machines = [
  {
    number: "01",
    title: "Multi Cutters",
    subtitle: "Automatic Bridge-Type",
    description:
      "Heavy-duty multi-blade cutting systems engineered for high-output stone processing.",
    image: "/images/machines/multi-cutter-3.png",
    href: "/machines/multi-cutters",
  },
  {
    number: "02",
    title: "Line Polishing",
    subtitle: "Surface Processing Systems",
    description:
      "Continuous polishing technology designed for consistent surface finish and production efficiency.",
    image: "/images/machines/lpm-1.png",
    href: "/machines/line-polishing",
  },
  {
    number: "03",
    title: "Thin Wire",
    subtitle: "Precision Cutting Systems",
    description:
      "Precision wire cutting solutions developed for controlled, accurate stone processing.",
    image: "/images/machines/thin-wire-1.png",
    href: "/machines/thin-wire",
  },
  {
    number: "04",
    title: "Handling & Cranes",
    subtitle: "Material Handling",
    description:
      "Industrial handling systems engineered around safer and more efficient stone movement.",
    image: "/images/machines/gantry.jpg",
    href: "/machines/handling-cranes",
  },
];

export function MachineShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMachine = machines[activeIndex];

  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#111210] px-[5vw] pb-[140px] pt-[130px] text-[#f2f0ea] max-[950px]:px-6 max-[950px]:py-[100px] max-[650px]:px-[18px] max-[650px]:py-20">
      <div className="mx-auto mb-20 grid w-full max-w-[1600px] grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)] items-end gap-20 max-[950px]:mb-[55px] max-[950px]:grid-cols-1 max-[950px]:gap-[30px]">
        <div>
          <span className="mb-[25px] block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
            02 / Machine Range
          </span>

          <h2 className="m-0 max-w-[900px] text-[clamp(52px,6.2vw,105px)] font-medium leading-[0.9] tracking-[-0.065em] max-[650px]:text-[clamp(48px,14vw,72px)]">
            Machines built around
            <span className="block text-[#71746f]">
              the way you produce.
            </span>
          </h2>
        </div>

        <p className="mb-2 max-w-[360px] text-[12px] leading-[1.75] text-[#8c8f8a]">
          From primary cutting to surface finishing and material handling,
          SDP systems are engineered around the demands of continuous stone
          production.
        </p>
      </div>

      <div className="mx-auto grid min-h-[650px] w-full max-w-[1600px] grid-cols-[minmax(360px,0.75fr)_minmax(0,1.25fr)] border-y border-white/10 max-[950px]:grid-cols-1">
        <div className="relative z-[3] border-r border-white/10 max-[950px]:border-r-0">
          {machines.map((machine, index) => {
            const active = index === activeIndex;

            return (
              <button
                key={machine.number}
                type="button"
                className={`group relative grid min-h-[150px] w-full grid-cols-[48px_1fr_auto] items-center gap-3 border-0 border-b border-white/10 bg-transparent px-7 py-6 text-left text-white transition-[background-color,padding] duration-300 last:border-b-0 max-[950px]:min-h-[105px] max-[650px]:grid-cols-[32px_1fr_auto] max-[650px]:px-[14px] max-[650px]:py-[18px] ${
                  active
                    ? "pl-9 bg-white/[0.035] before:h-full max-[650px]:pl-[18px]"
                    : "before:h-0 hover:pl-9 hover:bg-white/[0.035] max-[650px]:hover:pl-[18px]"
                } before:absolute before:left-0 before:top-0 before:w-0.5 before:bg-[var(--site-accent)] before:transition-[height] before:duration-300 before:content-['']`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span className="text-[9px] tabular-nums text-[#646762]">
                  {machine.number}
                </span>

                <span className="flex flex-col gap-[7px]">
                  <small className="text-[8px] uppercase tracking-[0.1em] text-[#747772]">
                    {machine.subtitle}
                  </small>

                  <strong
                    className={`text-[clamp(21px,2vw,31px)] font-medium tracking-[-0.04em] transition-colors duration-200 max-[650px]:text-[21px] ${
                      active ? "text-[#f2f0ea]" : "text-[#858883]"
                    }`}
                  >
                    {machine.title}
                  </strong>
                </span>

                <ArrowUpRight
                  size={20}
                  className={`transition-[opacity,transform,color] duration-200 ${
                    active
                      ? "translate-x-0 translate-y-0 text-[var(--site-accent)] opacity-100"
                      : "-translate-x-[5px] translate-y-[5px] text-[#5c5f5a] opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[650px] overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(216,255,62,0.05),transparent_34%),#0d0e0d] max-[950px]:min-h-[560px] max-[950px]:border-t max-[950px]:border-white/10 max-[650px]:min-h-[440px]">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:60px_60px]" />

          <span className="absolute right-8 top-7 text-[clamp(90px,10vw,170px)] font-medium leading-none tracking-[-0.07em] text-white/[0.06] max-[650px]:right-[18px] max-[650px]:top-[18px]">
            {activeMachine.number}
          </span>

          <div
            className="absolute bottom-[17%] left-[5%] right-[5%] top-[8%] animate-[machineStageEnter_600ms_cubic-bezier(0.16,1,0.3,1)_both] max-[650px]:bottom-[25%] max-[650px]:left-[2%] max-[650px]:right-[2%] max-[650px]:top-[4%]"
            key={activeMachine.image}
          >
            <Image
              src={activeMachine.image}
              alt={activeMachine.title}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              className="object-contain drop-shadow-[0_35px_30px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="absolute bottom-[26px] left-8 right-8 z-[4] flex items-end justify-between gap-[30px] border-t border-white/10 pt-5 max-[650px]:bottom-[18px] max-[650px]:left-[18px] max-[650px]:right-[18px] max-[650px]:flex-col max-[650px]:items-start max-[650px]:gap-3">
            <p className="m-0 max-w-[420px] text-[10px] leading-[1.65] text-[#81847f]">
              {activeMachine.description}
            </p>

            <Link
              href={activeMachine.href}
              className="group inline-flex shrink-0 items-center gap-[15px] text-[10px] font-semibold text-[#f2f0ea]"
            >
              Explore machine
              <ArrowUpRight
                size={17}
                className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
