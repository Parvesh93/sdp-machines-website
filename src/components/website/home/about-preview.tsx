"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  "Cutting",
  "Polishing",
  "Handling",
  "Resin-line equipment",
];

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-copy",
        { opacity: 0, y: 34 },
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

      gsap.fromTo(
        ".about-capability",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-capabilities",
            start: "top 82%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f4f7fa] px-[5vw] py-[120px] text-[#0b1720] max-[650px]:px-[18px] max-[650px]:py-20"
    >
      <div className="about-copy mx-auto grid w-full max-w-[1600px] gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <div>
          <span className="mb-6 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
            03 / About SDP Machines
          </span>

          <h2 className="max-w-[900px] text-[clamp(50px,5.8vw,96px)] font-medium leading-[0.9] tracking-[-0.065em]">
            Engineering and manufacturing
            <span className="block text-[#8fa6b4]">from Ajmer.</span>
          </h2>
        </div>

        <div className="lg:justify-self-end">
          <p className="max-w-[470px] text-[12px] leading-7 text-[#5f7480]">
            SDP Machines designs and manufactures stone processing equipment in
            Ajmer, Rajasthan. Our range covers cutting, polishing, handling and
            resin-line equipment for stone processing operations.
          </p>

          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-4 text-[10px] font-semibold text-[#0b1720]"
          >
            About SDP Machines
            <ArrowUpRight
              size={17}
              className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>

      <div className="about-capabilities mx-auto mt-12 grid w-full max-w-[1600px] grid-cols-2 border-y border-[#ccd7de] lg:mt-16 lg:grid-cols-4">
        {capabilities.map((item, index) => (
          <div
            key={item}
            className="about-capability group relative flex min-h-[118px] flex-col justify-between overflow-hidden border-b border-[#ccd7de] p-4 transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-white odd:border-r odd:border-[#ccd7de] lg:min-h-[150px] lg:border-b-0 lg:p-6 lg:odd:border-r lg:even:border-r lg:last:border-r-0"
          >
            <span className="text-[9px] tabular-nums text-[var(--site-accent)]">
              0{index + 1}
            </span>

            <strong className="relative z-10 text-[17px] font-medium tracking-[-0.035em] sm:text-[18px] lg:text-[20px]">
              {item}
            </strong>

            <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--site-accent)] transition-transform duration-300 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
