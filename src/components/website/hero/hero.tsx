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
  useState,
} from "react";

import gsap from "gsap";

// Temporary stock footage from Pexels.
// Replace with final SDP machine footage when supplied by the client.
const stockHeroVideo =
  "https://www.pexels.com/download/video/28239367/";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoFailed, setVideoFailed] =
    useState(false);

  const heroVideoUrl =
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL ??
    stockHeroVideo;

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
          y: 14,
          duration: 0.65,
        })
        .from(
          ".hero-heading-line",
          {
            opacity: 0,
            y: 54,
            duration: 0.95,
            stagger: 0.1,
          },
          "-=0.25",
        )
        .from(
          ".hero-action",
          {
            opacity: 0,
            y: 18,
            duration: 0.65,
          },
          "-=0.45",
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            y: 10,
            duration: 0.5,
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
      className="relative grid min-h-svh place-items-center overflow-hidden bg-[#111111] text-white"
    >
      <div className="absolute inset-0">
        {!videoFailed ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/installations/installation-01.jpeg"
            onError={() => setVideoFailed(true)}
            aria-label="Industrial machine operating in a factory"
          >
            <source
              src={heroVideoUrl}
              type="video/mp4"
            />
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

        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] items-center justify-center px-[5vw] py-[130px] max-[650px]:px-[18px]">
        <div className="mx-auto max-w-[1180px] text-center">
          <span className="hero-kicker mb-7 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.19em] text-white/60 before:h-px before:w-7 before:bg-[var(--site-accent)] before:content-[''] after:h-px after:w-7 after:bg-[var(--site-accent)] after:content-['']">
            SDP Machines / Ajmer, India
          </span>

          <h1 className="m-0 text-[clamp(62px,9.3vw,154px)] font-medium leading-[0.82] tracking-[-0.078em]">
            <span className="hero-heading-line block">
              Built in Ajmer.
            </span>
            <span className="hero-heading-line block text-white/72">
              Engineered to run.
            </span>
          </h1>

          <div className="hero-action mt-9 flex justify-center">
            <Link
              href="/machines"
              className="group inline-flex h-[50px] items-center justify-center gap-7 border border-white/30 bg-black/15 px-5 text-[10px] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition duration-200 hover:border-[var(--site-accent)] hover:bg-[var(--site-accent)]"
            >
              Explore machines
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/45">
        <span>Scroll</span>
        <ArrowDown
          size={14}
          className="text-[var(--site-accent)]"
        />
      </div>
    </section>
  );
}
