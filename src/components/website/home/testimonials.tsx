"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
        ".testimonial-editorial-heading",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        ".testimonial-editorial-quote",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
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
        y: -20,
        duration: 0.25,
        ease: "power2.in",
      })
      .call(() => {
        setActiveIndex(index);
      })
      .fromTo(
        quote,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
      );
  }

  function previous() {
    changeTestimonial(
      activeIndex === 0
        ? testimonials.length - 1
        : activeIndex - 1,
    );
  }

  function next() {
    changeTestimonial(
      (activeIndex + 1) % testimonials.length,
    );
  }

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#e9e8e2]
        px-[5vw]
        py-28
        text-[#171817]
        lg:py-36
      "
    >
      <div className="mx-auto w-full max-w-[1600px]">
        {/* HEADER */}

        <div
          className="
            testimonial-editorial-heading
            mb-20
            grid
            gap-10
            lg:grid-cols-[1.4fr_.6fr]
            lg:items-end
          "
        >
          <div>
            <span
              className="
                mb-6
                block
                text-[9px]
                font-bold
                uppercase
                tracking-[.17em]
                text-[#77766f]
              "
            >
              05 / Customer Voices
            </span>

            <h2
              className="
                max-w-[1000px]
                text-[clamp(54px,6.4vw,108px)]
                font-medium
                leading-[.89]
                tracking-[-.068em]
              "
            >
              What matters
              <span className="block text-[#999890]">
                after the machine starts.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[390px]
              text-[12px]
              leading-7
              text-[#666860]
            "
          >
            Industrial machinery is judged over
            production cycles, not presentation
            slides. Customer experience becomes the
            real measure of engineering.
          </p>
        </div>

        {/* MAIN QUOTE AREA */}

        <div
          className="
            grid
            border-y
            border-[#c7c6bf]
            lg:grid-cols-[.32fr_1.68fr]
          "
        >
          {/* INDEX */}

          <div
            className="
              flex
              min-h-[520px]
              flex-col
              justify-between
              border-[#c7c6bf]
              py-8
              pr-8
              lg:border-r
              lg:py-10
            "
          >
            <div>
              <span
                className="
                  block
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[.15em]
                  text-[#999890]
                "
              >
                Customer / Experience
              </span>

              <strong
                className="
                  mt-5
                  block
                  text-[clamp(70px,8vw,130px)]
                  font-medium
                  leading-none
                  tracking-[-.075em]
                "
              >
                {active.number}
              </strong>
            </div>

            <div>
              <span
                className="
                  block
                  text-[9px]
                  uppercase
                  tracking-[.14em]
                  text-[#9b9a92]
                "
              >
                Location
              </span>

              <strong
                className="
                  mt-2
                  block
                  text-[22px]
                  font-medium
                  tracking-[-.04em]
                "
              >
                {active.location}
              </strong>
            </div>
          </div>

          {/* QUOTE */}

          <div
            ref={quoteRef}
            className="
              testimonial-editorial-quote
              flex
              min-h-[520px]
              flex-col
              justify-between
              py-8
              pl-0
              lg:py-10
              lg:pl-12
            "
          >
            <blockquote
              className="
                max-w-[1050px]
                text-[clamp(34px,4.2vw,70px)]
                font-medium
                leading-[1.03]
                tracking-[-.05em]
                text-[#242522]
              "
            >
              “{active.quote}”
            </blockquote>

            <div
              className="
                mt-16
                flex
                flex-col
                gap-6
                border-t
                border-[#c7c6bf]
                pt-6
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <span
                  className="
                    block
                    text-[9px]
                    uppercase
                    tracking-[.14em]
                    text-[#999890]
                  "
                >
                  Customer
                </span>

                <strong
                  className="
                    mt-2
                    block
                    text-[14px]
                    font-semibold
                  "
                >
                  {active.company}
                </strong>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous testimonial"
                  className="
                    grid
                    h-11
                    w-11
                    place-items-center
                    border
                    border-[#bab9b1]
                    transition
                    hover:bg-[#d7d6cf]
                  "
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="
                    grid
                    h-11
                    w-11
                    place-items-center
                    bg-[var(--site-accent)]
                    text-[#111]
                    transition-transform
                    hover:-translate-y-0.5
                  "
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LOCATION NAVIGATION */}

        <div
          className="
            mt-10
            grid
            border-t
            border-[#c7c6bf]
            sm:grid-cols-3
          "
        >
          {testimonials.map((item, index) => {
            const activeItem =
              index === activeIndex;

            return (
              <button
                key={item.number}
                type="button"
                onClick={() =>
                  changeTestimonial(index)
                }
                className="
                  group
                  flex
                  min-h-[110px]
                  items-end
                  justify-between
                  gap-5
                  border-b
                  border-[#c7c6bf]
                  py-5
                  text-left
                  transition
                  sm:border-r
                  sm:px-5
                  sm:last:border-r-0
                "
              >
                <div>
                  <span
                    className={
                      activeItem
                        ? `
                          block
                          text-[9px]
                          font-bold
                          text-[var(--site-accent)]
                        `
                        : `
                          block
                          text-[9px]
                          font-bold
                          text-[#a09f97]
                        `
                    }
                  >
                    {item.number}
                  </span>

                  <strong
                    className={
                      activeItem
                        ? `
                          mt-3
                          block
                          text-[22px]
                          font-medium
                          tracking-[-.04em]
                          text-[#171817]
                        `
                        : `
                          mt-3
                          block
                          text-[22px]
                          font-medium
                          tracking-[-.04em]
                          text-[#999890]
                          transition-colors
                          group-hover:text-[#55564f]
                        `
                    }
                  >
                    {item.location}
                  </strong>
                </div>

                <span
                  className={
                    activeItem
                      ? `
                        h-2
                        w-2
                        rounded-full
                        bg-[var(--site-accent)]
                      `
                      : `
                        h-2
                        w-2
                        rounded-full
                        bg-[#bdbcB5]
                      `
                  }
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}