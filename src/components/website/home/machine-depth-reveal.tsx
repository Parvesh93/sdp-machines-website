"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const calloutBase =
  "depth-callout absolute z-20 grid w-[230px] grid-cols-[27px_1fr] gap-2.5 border border-white/10 bg-[rgba(10,11,10,0.72)] px-[15px] py-[13px] opacity-0 backdrop-blur-[12px] max-[650px]:w-[175px]";

export function MachineDepthReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const machineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const machine = machineRef.current;

    if (!section || !machine) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      tl.fromTo(
        machine,
        {
          scale: 0.42,
          y: 90,
          rotateX: 6,
          rotateY: -5,
          filter: "blur(5px)",
          opacity: 0.35,
        },
        {
          scale: 0.8,
          y: 20,
          rotateX: 2,
          rotateY: -2,
          filter: "blur(1px)",
          opacity: 0.75,
          duration: 1,
          ease: "none",
        },
      );

      tl.to(
        machine,
        {
          scale: 1.08,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.1,
          ease: "none",
        },
        0.8,
      );

      tl.fromTo(
        ".depth-word-one",
        { opacity: 0, x: -160 },
        { opacity: 1, x: 0, duration: 0.7 },
        0.55,
      );

      tl.to(
        ".depth-word-one",
        { opacity: 0.09, x: 80, duration: 0.8 },
        1.45,
      );

      tl.fromTo(
        ".depth-callout-one",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.45 },
        1.25,
      );

      tl.fromTo(
        ".depth-word-two",
        { opacity: 0, x: 170 },
        { opacity: 1, x: 0, duration: 0.75 },
        1.7,
      );

      tl.to(
        machine,
        {
          x: 120,
          scale: 1.18,
          rotateY: 2.5,
          duration: 0.9,
          ease: "none",
        },
        1.7,
      );

      tl.fromTo(
        ".depth-callout-two",
        { opacity: 0, x: 45 },
        { opacity: 1, x: 0, duration: 0.45 },
        1.95,
      );

      tl.to(
        ".machine-depth-grid-back",
        {
          y: -80,
          scale: 1.12,
          duration: 1.3,
          ease: "none",
        },
        1,
      );

      tl.to(
        ".machine-depth-grid-front",
        {
          y: -160,
          scale: 1.3,
          duration: 1.3,
          ease: "none",
        },
        1,
      );

      tl.fromTo(
        ".depth-word-three",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 0.7 },
        2.5,
      );

      tl.to(
        machine,
        {
          x: -70,
          scale: 1.28,
          rotateY: -2,
          duration: 0.9,
          ease: "none",
        },
        2.5,
      );

      tl.fromTo(
        ".depth-callout-three",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.45 },
        2.7,
      );

      tl.to(
        [
          ".depth-callout-one",
          ".depth-callout-two",
          ".depth-callout-three",
        ],
        {
          opacity: 0,
          duration: 0.35,
        },
        3.25,
      );

      tl.to(
        ".depth-word-three",
        {
          opacity: 0.08,
          y: -40,
          duration: 0.5,
        },
        3.3,
      );

      tl.to(
        machine,
        {
          scale: 0.72,
          y: -120,
          opacity: 0.3,
          duration: 0.9,
          ease: "none",
        },
        3.45,
      );

      tl.fromTo(
        ".machine-depth-exit-copy",
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 0.65 },
        3.55,
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[420vh] bg-[#090a09] max-[650px]:h-[360vh]"
    >
      <div className="sticky top-0 h-screen min-h-[680px] overflow-hidden bg-[radial-gradient(circle_at_55%_50%,rgba(216,255,62,0.04),transparent_32%),#090a09] text-[#f2f0ea] [perspective:1500px] max-[650px]:min-h-[620px]">
        <div className="machine-depth-grid-back pointer-events-none absolute -inset-[20%] opacity-30 will-change-transform [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:85px_85px]" />

        <div className="machine-depth-grid-front pointer-events-none absolute -inset-[20%] opacity-[0.14] will-change-transform [background-image:linear-gradient(rgba(216,255,62,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(216,255,62,0.1)_1px,transparent_1px)] [background-size:150px_150px] [mask-image:radial-gradient(circle_at_55%_50%,black,transparent_70%)]" />

        <div className="absolute left-[5vw] right-[5vw] top-[115px] z-30 flex justify-between text-[8px] font-bold uppercase tracking-[0.15em] text-[#646762] max-[650px]:left-[18px] max-[650px]:right-[18px] max-[650px]:top-[92px]">
          <span>02 / Engineering Depth</span>
          <span className="max-[650px]:hidden">
            Scroll to move through the machine
          </span>
        </div>

        <div className="depth-word-one pointer-events-none absolute left-[4vw] top-[23%] z-[1] whitespace-nowrap text-[clamp(110px,15vw,290px)] font-semibold leading-[0.75] tracking-[-0.075em] text-white/[0.055] max-[950px]:text-[clamp(90px,19vw,180px)] max-[650px]:left-[18px] max-[650px]:text-[clamp(74px,23vw,120px)]">
          PRECISION
        </div>

        <div className="depth-word-two pointer-events-none absolute right-[2vw] top-[42%] z-[1] whitespace-nowrap text-[clamp(110px,15vw,290px)] font-semibold leading-[0.75] tracking-[-0.075em] text-white/[0.055] max-[950px]:text-[clamp(90px,19vw,180px)] max-[650px]:right-[18px] max-[650px]:text-[clamp(74px,23vw,120px)]">
          CONTROL
        </div>

        <div className="depth-word-three pointer-events-none absolute bottom-[8%] left-[4vw] z-[1] whitespace-nowrap text-[clamp(110px,15vw,290px)] font-semibold leading-[0.75] tracking-[-0.075em] text-white/[0.055] max-[950px]:text-[clamp(90px,19vw,180px)] max-[650px]:left-[18px] max-[650px]:text-[clamp(74px,23vw,120px)]">
          PRODUCTION
        </div>

        <div
          ref={machineRef}
          className="absolute bottom-[11%] left-[37%] right-[4%] top-[17%] z-10 origin-center [transform-style:preserve-3d] [will-change:transform,opacity,filter] max-[950px]:bottom-[16%] max-[950px]:left-[20%] max-[950px]:right-[-8%] max-[950px]:top-[24%] max-[650px]:bottom-[21%] max-[650px]:left-[-16%] max-[650px]:right-[-28%]"
        >
          <Image
            src="/images/machines/multi-cutter-2.png"
            alt="SDP stone processing machine"
            fill
            sizes="70vw"
            className="object-contain [filter:contrast(1.03)_saturate(0.92)_drop-shadow(0_45px_35px_rgba(0,0,0,0.7))]"
            priority
          />
        </div>

        <div className={`${calloutBase} depth-callout-one left-[7%] top-[39%] max-[650px]:left-[18px] max-[650px]:top-[52%]`}>
          <span className="text-[8px] font-bold text-[var(--site-accent)]">01</span>
          <div>
            <strong className="block text-[10px] text-[#f2f0ea]">Structural rigidity</strong>
            <small className="mt-1 block text-[8px] leading-[1.5] text-[#737671]">
              Designed to stay stable through continuous production cycles.
            </small>
          </div>
        </div>

        <div className={`${calloutBase} depth-callout-two right-[4%] top-[33%] max-[650px]:right-[18px] max-[650px]:top-[63%]`}>
          <span className="text-[8px] font-bold text-[var(--site-accent)]">02</span>
          <div>
            <strong className="block text-[10px] text-[#f2f0ea]">Controlled motion</strong>
            <small className="mt-1 block text-[8px] leading-[1.5] text-[#737671]">
              Movement designed around repeatability and production accuracy.
            </small>
          </div>
        </div>

        <div className={`${calloutBase} depth-callout-three bottom-[15%] left-[19%] max-[650px]:hidden`}>
          <span className="text-[8px] font-bold text-[var(--site-accent)]">03</span>
          <div>
            <strong className="block text-[10px] text-[#f2f0ea]">Production architecture</strong>
            <small className="mt-1 block text-[8px] leading-[1.5] text-[#737671]">
              Machine systems engineered to work as one production platform.
            </small>
          </div>
        </div>

        <div className="machine-depth-exit-copy absolute left-[5vw] top-1/2 z-40 w-[min(900px,62vw)] -translate-y-1/2 opacity-0 max-[650px]:left-[18px] max-[650px]:w-[calc(100%-36px)]">
          <span className="mb-[25px] block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
            One engineering philosophy
          </span>

          <h2 className="m-0 text-[clamp(60px,7vw,118px)] font-medium leading-[0.88] tracking-[-0.07em] max-[650px]:text-[clamp(48px,14vw,72px)]">
            Built for
            <span className="block text-[#70736e]">
              continuous production.
            </span>
          </h2>
        </div>

        <div className="absolute bottom-9 right-[5vw] z-30 flex items-center gap-2 text-[7px] tracking-[0.12em] text-[#555853] max-[650px]:bottom-[25px] max-[650px]:right-[18px]">
          <span>Z</span>
          <i className="h-px w-[50px] bg-white/15" />
          <span>DEPTH</span>
        </div>
      </div>
    </section>
  );
}
