"use client";

import Image from "next/image";
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

const heroVideoUrl =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

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
        .from(".hero-kicker", {
          opacity: 0,
          y: 16,
          duration: 0.65,
        })
        .from(
          ".hero-heading-line",
          {
            opacity: 0,
            y: 58,
            duration: 0.9,
            stagger: 0.1,
          },
          "-=0.25",
        )
        .from(
          ".hero-support",
          {
            opacity: 0,
            y: 22,
            duration: 0.7,
          },
          "-=0.45",
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 18,
            duration: 0.65,
          },
          "-=0.45",
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            duration: 0.55,
          },
          "-=0.25",
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden bg-[#111111] text-white"
    >
      <div className="absolute inset-0">
        {heroVideoUrl ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/installations/installation-01.jpeg"
            aria-label="SDP Machines operating in a stone processing plant"
          >
            <source src={heroVideoUrl} />
          </video>
        ) : (
          <Image
            src="/images/installations/installation-01.jpeg"
            alt="SDP machine operating in a stone processing facility"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] flex-col justify-end px-[5vw] pb-[62px] pt-[150px] max-[650px]:px-[18px] max-[650px]:pb-[38px]">
        <div className="max-w-[1120px]">
          <span className="hero-kicker mb-7 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/70 before:h-px before:w-8 before:bg-[var(--site-accent)] before:content-['']">
            Stone Processing Machinery / Ajmer, India
          </span>

          <h1 className="m-0 text-[clamp(66px,8.6vw,150px)] font-medium leading-[0.82] tracking-[-0.075em]">
            <span className="hero-heading-line block">
              Built in Ajmer.
            </span>
            <span className="hero-heading-line block text-white/70">
              Engineered to run.
            </span>
          </h1>
        </div>

        <div className="mt-10 grid max-w-[1100px] grid-cols-[minmax(0,1fr)_auto] items-end gap-12 border-t border-white/25 pt-6 max-[760px]:grid-cols-1 max-[760px]:gap-7">
          <div className="hero-support max-w-[560px]">
            <p className="m-0 text-[13px] leading-[1.75] text-white/75">
              Heavy-duty cutting, polishing and material-handling systems built
              for continuous production and supported for the life of the machine.
            </p>

            <div className="hero-meta mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/45">
              <span>Since 1995</span>
              <span>1,000+ installations</span>
              <span>5 service centres</span>
            </div>
          </div>

          <div className="hero-actions flex flex-wrap gap-2.5">
            <Link
              href="/machines"
              className="inline-flex h-[52px] items-center justify-center gap-7 bg-[var(--site-accent)] px-5 text-[11px] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#dc5d19]"
            >
              Explore Machines
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-[52px] items-center justify-center border border-white/30 bg-black/10 px-5 text-[11px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#111111]"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.13em] text-white/40">
          <span className="inline-flex items-center gap-2">
            Scroll to explore
            <ArrowDown size={14} className="text-[var(--site-accent)]" />
          </span>

          <span className="max-[650px]:hidden">
            Real machines / Real production
          </span>
        </div>
      </div>
    </section>
  );
}
