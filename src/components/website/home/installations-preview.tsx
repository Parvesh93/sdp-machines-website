"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function InstallationsPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".installation-heading",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        ".installation-image",
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".installation-detail-panel",
        { opacity: 0, x: 32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".installation-proof",
            start: "top 74%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 overflow-hidden bg-[#f4f7fa] shadow-[0_-40px_90px_rgba(0,0,0,0.28)] px-[5vw] pb-[150px] pt-[130px] text-[#0b1720] max-[950px]:px-6 max-[950px]:py-[100px] max-[650px]:px-[18px] max-[650px]:py-20"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="installation-heading mb-[70px] grid grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)] items-end gap-20 max-[950px]:grid-cols-1 max-[950px]:gap-7">
          <div>
            <span className="mb-[25px] block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
              05 / Installations
            </span>

            <h2 className="m-0 max-w-[980px] text-[clamp(54px,6.5vw,110px)] font-medium leading-[0.88] tracking-[-0.068em] max-[650px]:text-[clamp(48px,14vw,72px)]">
              Our machines
              <span className="block text-[#8fa6b4]">at work.</span>
            </h2>
          </div>

          <div className="pb-2.5">
            <p className="mb-6 max-w-[400px] text-[12px] leading-[1.75] text-[#5f7480]">
              See selected SDP machines installed in stone processing facilities.
              Explore machines, locations and project details as they are approved for publication.
            </p>

            <Link
              href="/installations"
              className="group inline-flex items-center gap-[15px] text-[10px] font-semibold text-[#0b1720]"
            >
              View Installations
              <ArrowUpRight
                size={17}
                className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </Link>
          </div>
        </div>

        <div className="installation-proof grid gap-px bg-[#ccd7de] lg:grid-cols-[1.45fr_.55fr]">
          <div className="group relative min-h-[650px] overflow-hidden bg-[#0b1720] max-[950px]:min-h-[520px] max-[650px]:min-h-[420px]">
            <Image
              src="/images/installations/installation-01.jpeg"
              alt="SDP machine installed at a stone processing facility"
              fill
              sizes="(max-width: 900px) 100vw, 70vw"
              className="installation-image object-cover [filter:saturate(0.82)_contrast(1.04)] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />

            <div className="absolute inset-0 bg-black/28 transition-colors duration-500 group-hover:bg-black/20" />

            <div className="absolute bottom-7 left-[30px] z-[2] max-[650px]:bottom-[18px] max-[650px]:left-[18px]">
              <span className="mb-[7px] block text-[8px] uppercase tracking-[0.13em] text-white/55">
                Installation Preview
              </span>

              <strong className="block max-w-[620px] text-[clamp(28px,3.2vw,46px)] font-medium tracking-[-0.04em] text-white">
                Stone processing equipment in working environments.
              </strong>
            </div>
          </div>

          <div className="installation-detail-panel flex flex-col justify-between bg-[#0b1720] p-8 text-[#f4f8fa]">
            <div>
              <span className="text-[8px] uppercase tracking-[0.14em] text-[#8fa6b4]/55">
                Project Details
              </span>

              <p className="mt-6 max-w-[320px] text-[12px] leading-7 text-[#a9beca]/70">
                Machine model, location, installation year and approved photographs
                will be shown as each project is cleared for publication.
              </p>
            </div>

            <Link
              href="/installations"
              className="group mt-12 inline-flex items-center justify-between border-t border-[#8fb4c8]/20 pt-6 text-[10px] font-semibold"
            >
              Explore Installations
              <ArrowUpRight
                size={18}
                className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
