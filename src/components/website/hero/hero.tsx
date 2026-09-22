"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";
import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import { HeroMachineVisual } from "./hero-machine-visual";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".home-hero-eyebrow", {
          opacity: 0,
          y: 14,
          duration: 0.7,
        })
        .from(
          ".home-hero h1 > *",
          {
            opacity: 0,
            y: 70,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .from(
          ".home-hero-bottom-copy",
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
          },
          "-=0.55",
        )
        .from(
          ".hero-machine-image-wrap",
          {
            opacity: 0,
            scale: 0.84,
            x: 80,
            duration: 1.35,
          },
          "-=0.8",
        )
        .from(
          ".hero-machine-ring",
          {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            stagger: 0.12,
          },
          "-=1",
        )
        .from(
          ".hero-callout",
          {
            opacity: 0,
            x: 25,
            duration: 0.6,
            stagger: 0.18,
          },
          "-=0.5",
        )
        .from(
          ".home-hero-scroll, .home-hero-number",
          {
            opacity: 0,
            y: 10,
            duration: 0.5,
          },
          "-=0.2",
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-hero relative grid min-h-svh grid-cols-[minmax(0,0.95fr)_minmax(520px,1.05fr)] items-center overflow-hidden bg-[#0b0c0c] px-[5vw] pb-[52px] pt-[155px] max-[1180px]:grid-cols-[minmax(0,0.85fr)_minmax(460px,1.15fr)] max-[950px]:block max-[950px]:px-6 max-[950px]:pb-[90px] max-[950px]:pt-[130px] max-[650px]:px-[18px] max-[650px]:pb-[85px] max-[650px]:pt-[115px]"
    >
      <div className="home-hero-grid pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,transparent_3%,black_28%,black_100%)]" />

      <div className="home-hero-glow pointer-events-none absolute right-[4%] top-[17%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(216,255,62,0.08),rgba(216,255,62,0.018)_40%,transparent_70%)] blur-[15px]" />

      <div className="home-hero-copy relative z-[4] self-end pb-20 max-[950px]:pb-0">
        <span className="home-hero-eyebrow mb-[30px] inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)] before:h-px before:w-[30px] before:bg-[var(--site-accent)] before:content-[''] max-[650px]:mb-5">
          Stone Processing Machines / Ajmer, India
        </span>

        <h1 className="m-0 max-w-[820px] text-[clamp(72px,7.25vw,132px)] font-medium leading-[0.83] tracking-[-0.075em] max-[1180px]:text-[clamp(64px,7vw,100px)] max-[950px]:max-w-[720px] max-[650px]:text-[clamp(54px,17vw,86px)] max-[650px]:leading-[0.86]">
          <span className="block text-[#f2f0ea]">
            Built in Ajmer.
          </span>

          <span className="block text-[#747772]">
            Engineered
          </span>

          <span className="block text-[#f2f0ea]">
            to run.
          </span>
        </h1>

        <div className="home-hero-bottom-copy ml-auto mt-11 grid grid-cols-[1.5fr_0.7fr] items-end gap-10 max-[950px]:mt-7 max-[950px]:w-full max-[950px]:max-w-[500px] max-[650px]:grid-cols-1 max-[650px]:gap-4">
          <p className="m-0 text-[12px] leading-[1.75] text-[#949792]">
            Stone processing machines engineered for continuous production, precision and dependable long-term performance.
          </p>

          <div className="mt-6 flex items-stretch gap-3">
            <Link
              href="/machines"
              className="inline-flex h-[54px] min-w-[150px] items-center justify-between gap-6 bg-[var(--site-accent)] px-5 text-[12px] font-bold leading-none text-[#090a09] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffd867]"
            >
              Explore Machines
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-[54px] min-w-[118px] items-center justify-center border border-white/20 bg-transparent px-5 text-[12px] font-bold leading-none text-[#f2f0ea] transition-colors duration-200 hover:border-white/35 hover:bg-white/[0.05]"
            >
              Get a Quote
            </Link>
          </div>

          <div className="border-l border-white/15 pl-[18px] max-[650px]:hidden">
            <strong className="block text-[12px] text-white">
              Since 1995
            </strong>
            <span className="mt-1 block text-[9px] text-[#70736f]">
              Ajmer, Rajasthan
            </span>
          </div>
        </div>
      </div>

      <div className="home-hero-visual relative z-[3] h-[min(72vh,760px)] min-h-[600px] max-[950px]:mt-[-50px] max-[950px]:h-[520px] max-[950px]:min-h-0 max-[650px]:mt-[-10px] max-[650px]:h-[390px]">
        <HeroMachineVisual />

        <div className="hero-callout absolute left-[5%] top-[24%] z-[5] grid w-[220px] grid-cols-[28px_1fr] gap-[9px] border border-white/10 bg-[#101110]/70 p-3 backdrop-blur-[10px] max-[950px]:top-[30%] max-[650px]:left-0 max-[650px]:top-[23%] max-[650px]:w-[170px]">
          <i className="absolute right-full top-1/2 h-px w-12 bg-[rgba(216,255,62,0.6)]" />
          <span className="text-[9px] tabular-nums text-[var(--site-accent)]">
            01
          </span>
          <div>
            <strong className="block text-[10px] text-[#f2f2ee]">
              Heavy-duty structure
            </strong>
            <small className="mt-1 block text-[8px] leading-[1.45] text-[#81847f]">
              Engineered for continuous industrial cycles
            </small>
          </div>
        </div>

        <div className="hero-callout absolute bottom-[28%] right-0 z-[5] grid w-[220px] grid-cols-[28px_1fr] gap-[9px] border border-white/10 bg-[#101110]/70 p-3 backdrop-blur-[10px] max-[650px]:hidden">
          <i className="absolute left-full top-1/2 h-px w-12 bg-[rgba(216,255,62,0.6)]" />
          <span className="text-[9px] tabular-nums text-[var(--site-accent)]">
            02
          </span>
          <div>
            <strong className="block text-[10px] text-[#f2f2ee]">
              Precision control
            </strong>
            <small className="mt-1 block text-[8px] leading-[1.45] text-[#81847f]">
              Built around production repeatability
            </small>
          </div>
        </div>

        <div className="absolute right-[2%] top-[12%] flex flex-col items-end text-[8px] leading-[1.6] tracking-[0.12em] text-[#646763] max-[650px]:hidden">
          <span>26.4499° N</span>
          <span>74.6399° E</span>
        </div>
      </div>

      <div className="home-hero-scroll absolute bottom-[42px] left-[5vw] z-[5] flex items-center gap-2.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#6d706b] max-[650px]:bottom-[30px] max-[650px]:left-[18px]">
        <span>Scroll to explore</span>
        <ArrowDown size={15} className="text-[var(--site-accent)]" />
      </div>

      <div className="home-hero-number absolute bottom-10 right-[5vw] z-[5] flex flex-col items-end max-[650px]:bottom-[30px] max-[650px]:right-[18px]">
        <strong className="text-[18px] font-medium text-[var(--site-accent)]">
          01
        </strong>
        <span className="mt-[3px] text-[7px] uppercase tracking-[0.16em] text-[#676a66]">
          SDP / Engineering
        </span>
      </div>
    </section>
  );
}
