"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    number: "01",
    location: "Kishangarh",
    company: "Stone Processing Unit",
    quote:
      "The real test is not installation day. It is how consistently the machine performs after months of production.",
  },
  {
    number: "02",
    location: "Hosur",
    company: "Granite Processing Plant",
    quote:
      "For us, dependable production matters as much as machine capacity. The system needs to keep running predictably.",
  },
  {
    number: "03",
    location: "Ongole",
    company: "Stone Manufacturer",
    quote:
      "Responsive technical support after installation is a major part of what makes a machinery partner valuable.",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const active = testimonials[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-heading",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".testimonial-panel",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  function changeTestimonial(index: number) {
    if (index === activeIndex) return;

    const quote = quoteRef.current;

    if (!quote) {
      setActiveIndex(index);
      return;
    }

    gsap
      .timeline()
      .to(quote, {
        opacity: 0,
        y: -12,
        duration: 0.2,
        ease: "power2.in",
      })
      .call(() => setActiveIndex(index))
      .fromTo(
        quote,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
      );
  }

  const previous = () =>
    changeTestimonial(
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1,
    );

  const next = () =>
    changeTestimonial((activeIndex + 1) % testimonials.length);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f4f7fa] px-[5vw] py-20 text-[#0b1720] lg:py-24 max-[650px]:px-[18px] max-[650px]:py-14"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="testimonial-heading mb-10 grid gap-6 lg:grid-cols-[1.25fr_.75fr] lg:items-end max-[650px]:mb-6 max-[650px]:gap-3">
          <div>
            <span className="mb-4 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)] max-[650px]:mb-3">
              Customer Voices
            </span>

            <h2 className="max-w-[860px] text-[clamp(42px,5vw,76px)] font-medium leading-[0.92] tracking-[-0.06em] max-[650px]:text-[34px]">
              What matters
              <span className="ml-[0.18em] text-[#8fa6b4] max-[700px]:ml-0 max-[700px]:block">
                after the machine starts.
              </span>
            </h2>
          </div>

          <p className="max-w-[390px] text-[11px] leading-[1.8] text-[#5f7480] lg:justify-self-end max-[650px]:hidden">
            Long-term production and responsive support are what customers
            remember after commissioning.
          </p>
        </div>

        <div className="testimonial-panel overflow-hidden border border-[#ccd7de] bg-white lg:grid lg:grid-cols-[.34fr_1.66fr]">
          <div className="flex min-h-[330px] flex-col justify-between bg-[#0b1720] p-7 text-white lg:min-h-[360px] lg:p-8 max-[650px]:min-h-[138px] max-[650px]:p-5">
            <div className="flex items-start justify-between">
              <Quote size={22} className="text-[var(--site-accent)]" />

              <span className="text-[9px] font-semibold tracking-[0.14em] text-[#8fa6b4]">
                {active.number} / 0{testimonials.length}
              </span>
            </div>

            <div>
              <span className="block text-[8px] uppercase tracking-[0.15em] text-[#8fa6b4]">
                Location
              </span>
              <strong className="mt-2 block text-[28px] font-medium tracking-[-0.045em] max-[650px]:text-[22px]">
                {active.location}
              </strong>

              <span className="mt-5 block max-w-[220px] text-[10px] leading-5 text-[#a9beca]/75 max-[650px]:mt-2">
                {active.company}
              </span>
            </div>
          </div>

          <div
            ref={quoteRef}
            className="flex min-h-[330px] flex-col justify-between p-7 lg:min-h-[360px] lg:p-10 max-[650px]:min-h-0 max-[650px]:p-5"
          >
            <blockquote className="max-w-[980px] text-[clamp(28px,3.2vw,52px)] font-medium leading-[1.06] tracking-[-0.045em] text-[#10212c] max-[650px]:text-[24px]">
              “{active.quote}”
            </blockquote>

            <div className="mt-10 flex flex-col gap-5 border-t border-[#d8e1e6] pt-5 sm:flex-row sm:items-center sm:justify-between max-[650px]:mt-6 max-[650px]:gap-4 max-[650px]:pt-4">
              <div className="flex flex-wrap gap-x-5 gap-y-2 max-[650px]:gap-x-3">
                {testimonials.map((item, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={item.number}
                      type="button"
                      onClick={() => changeTestimonial(index)}
                      className={
                        isActive
                          ? "text-[9px] font-semibold uppercase tracking-[0.12em] text-[#0b1720]"
                          : "text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8fa6b4] transition-colors hover:text-[#506977]"
                      }
                    >
                      <span
                        className={
                          isActive
                            ? "mr-2 inline-block h-[6px] w-[6px] rounded-full bg-[var(--site-accent)] align-middle"
                            : "mr-2 inline-block h-[6px] w-[6px] rounded-full bg-[#c9d6dd] align-middle"
                        }
                      />
                      {item.location}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous testimonial"
                  className="grid h-10 w-10 place-items-center border border-[#c3d0d7] text-[#0b1720] transition hover:bg-[#eef3f6] max-[650px]:h-9 max-[650px]:w-9"
                >
                  <ArrowLeft size={15} />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="grid h-10 w-10 place-items-center bg-[var(--site-accent)] text-white transition hover:-translate-y-0.5 hover:bg-[#147aa5] max-[650px]:h-9 max-[650px]:w-9"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
