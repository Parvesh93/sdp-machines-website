"use client";

import {
  ArrowDown,
} from "lucide-react";

import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import {
  HeroMachineVisual,
} from "./hero-machine-visual";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const ctx =
      gsap.context(() => {
        const timeline =
          gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          });

        timeline
          .from(
            ".home-hero-eyebrow",
            {
              opacity: 0,
              y: 14,
              duration: 0.7,
            },
          )

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
      className="home-hero"
    >
      <div className="home-hero-grid" />

      <div className="home-hero-glow" />

      <div className="home-hero-copy">
        <span className="home-hero-eyebrow">
          Stone Processing Machines / Ajmer, India
        </span>

        <h1>
          <span className="hero-line hero-line-light">
            Built in Ajmer.
          </span>

          <span className="hero-line hero-line-muted">
            Engineered
          </span>

          <span className="hero-line hero-line-light">
            to run.
          </span>
        </h1>

        <div className="home-hero-bottom-copy">
          <p>
            Stone processing machines engineered for continuous production, precision and dependable long-term performance.
          </p>

          <div className="home-hero-actions">
  <Link
    href="/machines"
    className="site-quote-button"
  >
    Explore Machines

    <ArrowUpRight size={16} />
  </Link>

  <Link
    href="/contact"
    className="hero-secondary-button"
  >
    Get a Quote
  </Link>
</div>

          <div className="home-hero-proof">
            <strong>
              Since 1995
            </strong>

            <span>
              Ajmer, Rajasthan
            </span>
          </div>
        </div>
      </div>

      <div className="home-hero-visual">
        <HeroMachineVisual />

        <div className="hero-callout hero-callout-one">
          <span>
            01
          </span>

          <div>
            <strong>
              Heavy-duty structure
            </strong>

            <small>
              Engineered for continuous
              industrial cycles
            </small>
          </div>
        </div>

        <div className="hero-callout hero-callout-two">
          <span>
            02
          </span>

          <div>
            <strong>
              Precision control
            </strong>

            <small>
              Built around production
              repeatability
            </small>
          </div>
        </div>

        <div className="hero-coordinate">
          <span>
            26.4499° N
          </span>

          <span>
            74.6399° E
          </span>
        </div>
      </div>

      <div className="home-hero-scroll">
        <span>
          Scroll to explore
        </span>

        <ArrowDown size={15} />
      </div>

      <div className="home-hero-number">
        <strong>
          01
        </strong>

        <span>
          SDP / Engineering
        </span>
      </div>
    </section>
  );
}