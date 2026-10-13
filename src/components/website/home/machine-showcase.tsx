"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const machines = [
  {
    number: "01",
    title: "Multi Blade Block Cutters",
    eyebrow: "Granite Cutting",
    description:
      "For granite block cutting across different production requirements.",
    image: "/images/machines/multi-cutter.jpg",
    href: "/machines/automatic-bridge-multi-cutters",
  },
  {
    number: "02",
    title: "Line Polishing Machines",
    eyebrow: "Stone Finishing",
    description:
      "For the finishing stage of stone processing.",
    image: "/images/machines/lpm.jpg",
    href: "/machines/granite-line-polishing",
  },
  {
    number: "03",
    title: "Thin Cut Multi Wire",
    eyebrow: "Marble Cutting",
    description:
      "For thin-slab marble cutting.",
    image: "/images/machines/thin-wire.jpg",
    href: "/machines/thin-cut-multi-wire",
  },
  {
    number: "04",
    title: "Gantry & EOT Cranes",
    eyebrow: "Material Handling",
    description:
      "For handling heavy loads across the plant.",
    image: "/images/machines/gantry.jpg",
    href: "/machines/handling-cranes",
  },
];

export function MachineShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>(".machine-scroll-chapter");
      const imagePanels = gsap.utils.toArray<HTMLElement>(".machine-image-panel");
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        imagePanels.forEach((panel, index) => {
          gsap.set(panel, {
            clipPath:
              index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          });
        });

        chapters.forEach((chapter, index) => {
          ScrollTrigger.create({
            trigger: chapter,
            start: "top 52%",
            end: "bottom 52%",
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          });
        });

        chapters.slice(1).forEach((chapter, chapterIndex) => {
          const incoming = imagePanels[chapterIndex + 1];
          if (!incoming) return;

          gsap.fromTo(
            incoming,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });

      chapters.forEach((chapter) => {
        const copy = chapter.querySelector(".machine-scroll-copy");
        if (!copy) return;

        gsap.fromTo(
          copy,
          { opacity: 0.32, y: 54 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 84%",
              end: "top 50%",
              scrub: true,
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
      className="relative z-30 -mt-[38svh] bg-[#f4f7fa] text-[#0b1720] shadow-[0_-42px_90px_rgba(0,0,0,0.34)] max-[700px]:-mt-[18svh]"
    >
      <div className="pointer-events-none absolute -top-12 left-[8%] right-[8%] h-12 rounded-[50%] bg-black/25 blur-[30px]" />
      <div className="relative z-[1] mx-auto w-full max-w-[1600px] px-[5vw] py-[62px] max-[650px]:px-[18px] max-[650px]:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <span className="mb-4 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)] before:h-px before:w-7 before:bg-[var(--site-accent)] before:content-['']">
              02 / Machine Range
            </span>

            <h2 className="m-0 max-w-[860px] text-[clamp(42px,4.9vw,76px)] font-medium leading-[0.94] tracking-[-0.055em]">
              Find the right machine
              <span className="ml-[0.18em] text-[#8fa6b4] max-[700px]:ml-0 max-[700px]:block">
                for your plant.
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="m-0 max-w-[340px] text-[11px] leading-[1.7] text-[#5f7480]">
              Cutting, polishing, thin-slab processing and material handling for stone processing operations.
            </p>

            <div className="mt-5 flex items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.13em] text-[#7f96a4]">
              <span className="h-[6px] w-[6px] bg-[var(--site-accent)]" />
              Scroll to explore
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[1] border-t border-[#ccd7de]">
        <div className="mx-auto grid w-full max-w-[1600px] lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative hidden h-full border-r border-[#ccd7de] lg:block">
            <div className="sticky top-0 h-svh overflow-hidden bg-[#0b1720]">
              {machines.map((machine, index) => (
                <div
                  key={machine.image}
                  className="machine-image-panel absolute inset-0 overflow-hidden [will-change:clip-path]"
                  style={{ zIndex: index + 1 }}
                >
                  <Image
                    src={machine.image}
                    alt={machine.title}
                    fill
                    sizes="58vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/18" />
                </div>
              ))}

              <div className="pointer-events-none absolute inset-0 z-20">
                <div className="absolute left-7 top-[110px] flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.14em] text-[#d2e0e7]/65">
                  <span className="h-2 w-2 bg-[var(--site-accent)]" />
                  Machine system
                </div>

                <div className="absolute bottom-8 left-7 right-7 flex items-end justify-between border-t border-[#b8cfdb]/30 pt-4 text-white">
                  <div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#d2e0e7]/65">
                      {machines[activeIndex].eyebrow}
                    </span>
                    <strong className="mt-2 block max-w-[560px] text-[clamp(28px,3.2vw,50px)] font-medium tracking-[-0.05em]">
                      {machines[activeIndex].title}
                    </strong>
                  </div>

                  <span className="text-[14px] tabular-nums text-[var(--site-accent)]">
                    {machines[activeIndex].number}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {machines.map((machine, index) => (
              <article
                key={machine.number}
                className="machine-scroll-chapter flex min-h-[82vh] items-center border-b border-[#ccd7de] px-[5vw] py-16 last:border-b-0 max-[650px]:min-h-0 max-[650px]:px-[18px] max-[650px]:py-14"
              >
                <div className="machine-scroll-copy w-full">
                  <div className="relative mb-8 aspect-[4/3] overflow-hidden bg-[#0b1720] lg:hidden">
                    <Image
                      src={machine.image}
                      alt={machine.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <span className="absolute bottom-4 right-4 text-[11px] font-semibold tabular-nums text-[var(--site-accent)]">
                      {machine.number}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#ccd7de] pb-4">
                    <span className="text-[10px] font-semibold tabular-nums text-[var(--site-accent)]">
                      {machine.number}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#6e8796]">
                      {machine.eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-10 max-w-[720px] text-[clamp(42px,4.8vw,78px)] font-medium leading-[0.92] tracking-[-0.06em]">
                    {machine.title}
                  </h3>

                  <p className="mt-7 max-w-[430px] text-[12px] leading-[1.8] text-[#5f7480]">
                    {machine.description}
                  </p>

                  <Link
                    href={machine.href}
                    className="group mt-9 inline-flex items-center gap-4 text-[10px] font-semibold"
                  >
                    View Machine Details
                    <ArrowUpRight
                      size={17}
                      className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>

                  <div className="mt-12 h-px w-16 bg-[var(--site-accent)]" />
                  <span className="mt-4 block text-[8px] uppercase tracking-[0.13em] text-[#8fa6b4]">
                    0{index + 1} / 04
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
