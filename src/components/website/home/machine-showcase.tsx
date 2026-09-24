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

const machines = [
  {
    number: "01",
    title: "Multi Cutters",
    eyebrow: "Automatic Bridge-Type",
    description:
      "High-output multi-blade cutting systems engineered for granite production.",
    image: "/images/machines/multi-cutter.jpg",
    href: "/machines/multi-cutters",
  },
  {
    number: "02",
    title: "Line Polishing",
    eyebrow: "Surface Processing",
    description:
      "Continuous polishing lines built for consistent finish and dependable throughput.",
    image: "/images/machines/lpm.jpg",
    href: "/machines/line-polishing",
  },
  {
    number: "03",
    title: "Thin Wire",
    eyebrow: "Precision Cutting",
    description:
      "Controlled wire-cutting systems for accurate processing and efficient material use.",
    image: "/images/machines/thin-wire.jpg",
    href: "/machines/thin-wire",
  },
  {
    number: "04",
    title: "Handling & Cranes",
    eyebrow: "Material Handling",
    description:
      "Gantry and EOT handling systems designed around safer, more efficient stone movement.",
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
      const chapters =
        gsap.utils.toArray<HTMLElement>(
          ".machine-scroll-chapter",
        );

      const imagePanels =
        gsap.utils.toArray<HTMLElement>(
          ".machine-image-panel",
        );

      // Desktop: the image column stays sticky. Every incoming image is
      // physically tied to scroll position, so stopping/reversing the
      // scroll immediately stops/reverses the image transition.
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        imagePanels.forEach((panel, index) => {
          gsap.set(panel, {
            clipPath:
              index === 0
                ? "inset(0% 0% 0% 0%)"
                : "inset(100% 0% 0% 0%)",
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
          const imageIndex = chapterIndex + 1;
          const incoming = imagePanels[imageIndex];

          if (!incoming) return;

          gsap.fromTo(
            incoming,
            {
              clipPath: "inset(100% 0% 0% 0%)",
            },
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
        const copy =
          chapter.querySelector(
            ".machine-scroll-copy",
          );

        if (!copy) return;

        gsap.fromTo(
          copy,
          {
            opacity: 0.32,
            y: 54,
          },
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

      return () => {
        media.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 -mt-[38svh] bg-[#f2f0ea] text-[#171817] shadow-[0_-42px_90px_rgba(0,0,0,0.34)] max-[700px]:-mt-[18svh]"
    >
      <div className="pointer-events-none absolute -top-12 left-[8%] right-[8%] h-12 rounded-[50%] bg-black/25 blur-[30px]" />
      <div className="relative z-[1] mx-auto w-full max-w-[1600px] px-[5vw] pb-14 pt-[110px] max-[650px]:px-[18px] max-[650px]:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <span className="mb-5 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
              02 / Machine Range
            </span>

            <h2 className="m-0 max-w-[1000px] text-[clamp(52px,6.8vw,112px)] font-medium leading-[0.88] tracking-[-0.07em]">
              Machines for
              <span className="block text-[#9a9992]">
                continuous production.
              </span>
            </h2>
          </div>

          <p className="m-0 max-w-[380px] text-[12px] leading-[1.8] text-[#686a63] lg:justify-self-end">
            Scroll through SDP&apos;s four primary machine lines. Each image
            changes as the corresponding production system comes into focus.
          </p>
        </div>
      </div>

      <div className="relative z-[1] border-t border-[#c9c8c1]">
        <div className="mx-auto grid w-full max-w-[1600px] lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative hidden h-full border-r border-[#c9c8c1] lg:block">
            <div className="sticky top-0 h-svh overflow-hidden bg-[#171817]">
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
                <div className="absolute left-7 top-[110px] flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.14em] text-white/55">
                  <span className="h-2 w-2 bg-[var(--site-accent)]" />
                  Machine system
                </div>

                <div className="absolute bottom-8 left-7 right-7 flex items-end justify-between border-t border-white/25 pt-4 text-white">
                  <div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55">
                      {machines[activeIndex].eyebrow}
                    </span>

                    <strong className="mt-2 block text-[clamp(30px,3.5vw,54px)] font-medium tracking-[-0.05em]">
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
                className="machine-scroll-chapter flex min-h-[82vh] items-center border-b border-[#c9c8c1] px-[5vw] py-16 last:border-b-0 max-[650px]:min-h-0 max-[650px]:px-[18px] max-[650px]:py-14"
              >
                <div className="machine-scroll-copy w-full">
                  <div className="relative mb-8 aspect-[4/3] overflow-hidden bg-[#171817] lg:hidden">
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

                  <div className="flex items-center justify-between border-b border-[#c9c8c1] pb-4">
                    <span className="text-[10px] font-semibold tabular-nums text-[var(--site-accent)]">
                      {machine.number}
                    </span>

                    <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#77776f]">
                      {machine.eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-10 text-[clamp(48px,5.3vw,88px)] font-medium leading-[0.9] tracking-[-0.065em]">
                    {machine.title}
                  </h3>

                  <p className="mt-7 max-w-[430px] text-[12px] leading-[1.8] text-[#696b65]">
                    {machine.description}
                  </p>

                  <Link
                    href={machine.href}
                    className="group mt-9 inline-flex items-center gap-4 text-[10px] font-semibold"
                  >
                    Explore machine
                    <ArrowUpRight
                      size={17}
                      className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>

                  <div className="mt-12 h-px w-16 bg-[var(--site-accent)]" />

                  <span className="mt-4 block text-[8px] uppercase tracking-[0.13em] text-[#999890]">
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
