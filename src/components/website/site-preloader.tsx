// "use client";

// import Image from "next/image";

// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import gsap from "gsap";

// export function SitePreloader() {
//   const loaderRef =
//     useRef<HTMLDivElement>(null);

//   const progressRef =
//     useRef<HTMLDivElement>(null);

//   const logoRef =
//     useRef<HTMLDivElement>(null);

//   const percentageRef =
//     useRef<HTMLSpanElement>(null);

//   const [visible, setVisible] =
//     useState(true);

//   useEffect(() => {
//     const loader =
//       loaderRef.current;

//     const progress =
//       progressRef.current;

//     const logo =
//       logoRef.current;

//     const percentage =
//       percentageRef.current;

//     if (
//       !loader ||
//       !progress ||
//       !logo ||
//       !percentage
//     ) {
//       return;
//     }

//     document.body.style.overflow =
//       "hidden";

//     const state = {
//       value: 0,
//     };

//     const timeline =
//       gsap.timeline({
//         defaults: {
//           ease: "power3.out",
//         },
//       });

//     timeline
//       .fromTo(
//         logo,
//         {
//           opacity: 0,
//           scale: 0.88,
//           y: 20,
//         },
//         {
//           opacity: 1,
//           scale: 1,
//           y: 0,
//           duration: 0.7,
//         },
//       )

//       .to(
//         state,
//         {
//           value: 100,
//           duration: 1.6,

//           ease: "power2.inOut",

//           onUpdate: () => {
//             const value =
//               Math.round(
//                 state.value,
//               );

//             percentage.textContent =
//               String(value).padStart(
//                 2,
//                 "0",
//               );

//             gsap.set(
//               progress,
//               {
//                 scaleX:
//                   value / 100,
//               },
//             );
//           },
//         },
//         0.15,
//       )

//       .to(
//         ".preloader-status",
//         {
//           opacity: 1,
//           duration: 0.4,
//         },
//         0.3,
//       )

//       .to(
//         ".preloader-content",
//         {
//           opacity: 0,
//           y: -18,
//           duration: 0.45,
//         },
//         "+=0.12",
//       )

//       .to(
//         loader,
//         {
//           yPercent: -100,

//           duration: 0.9,

//           ease:
//             "power4.inOut",

//           onComplete: () => {
//             document.body.style.overflow =
//               "";

//             setVisible(false);
//           },
//         },
//       );

//     return () => {
//       timeline.kill();

//       document.body.style.overflow =
//         "";
//     };
//   }, []);

//   if (!visible) {
//     return null;
//   }

//   return (
//     <div
//       ref={loaderRef}
//       className="
//         fixed
//         inset-0
//         z-[99999]
//         overflow-hidden
//         bg-[#090a09]
//         text-[#f2f0ea]
//       "
//     >
//       {/* TECHNICAL GRID */}

//       <div
//         className="
//           pointer-events-none
//           absolute
//           inset-0
//           opacity-30
//         "
//         style={{
//           backgroundImage: `
//             linear-gradient(
//               rgba(255,255,255,.04) 1px,
//               transparent 1px
//             ),
//             linear-gradient(
//               90deg,
//               rgba(255,255,255,.04) 1px,
//               transparent 1px
//             )
//           `,
//           backgroundSize:
//             "70px 70px",
//         }}
//       />

//       {/* SOFT LIGHT */}

//       <div
//         className="
//           pointer-events-none
//           absolute
//           left-1/2
//           top-1/2
//           h-[520px]
//           w-[520px]
//           -translate-x-1/2
//           -translate-y-1/2
//           rounded-full
//           bg-[radial-gradient(circle,rgba(242,201,76,.065),transparent_70%)]
//         "
//       />

//       {/* TOP META */}

//       <div
//         className="
//           absolute
//           left-8
//           right-8
//           top-8
//           flex
//           items-center
//           justify-between
//           text-[8px]
//           font-bold
//           uppercase
//           tracking-[.16em]
//           text-white/25
//           md:left-[5vw]
//           md:right-[5vw]
//         "
//       >
//         <span>
//           SDP Machines
//         </span>

//         <span>
//           Ajmer / India
//         </span>
//       </div>

//       {/* CENTER */}

//       <div
//         className="
//           preloader-content
//           absolute
//           left-1/2
//           top-1/2
//           flex
//           w-[min(520px,82vw)]
//           -translate-x-1/2
//           -translate-y-1/2
//           flex-col
//           items-center
//         "
//       >
//         <div
//           ref={logoRef}
//           className="
//             flex
//             flex-col
//             items-center
//           "
//         >
//           <Image
//             src="/images/brand/sdp-logo-original.png"
//             alt="SDP Machines"
//             width={105}
//             height={90}
//             priority
//             className="
//               h-auto
//               w-[92px]
//               object-contain
//               md:w-[112px]
//             "
//           />

//           <strong
//             className="
//               mt-6
//               text-[13px]
//               font-semibold
//               uppercase
//               tracking-[.18em]
//               text-[#f2f0ea]
//             "
//           >
//             SDP Machines
//           </strong>

//           <span
//             className="
//               preloader-status
//               mt-3
//               text-[8px]
//               font-bold
//               uppercase
//               tracking-[.16em]
//               text-white/30
//               opacity-0
//             "
//           >
//             Engineering systems loading
//           </span>
//         </div>

//         {/* PROGRESS */}

//         <div
//           className="
//             mt-12
//             w-full
//           "
//         >
//           <div
//             className="
//               flex
//               items-end
//               justify-between
//               border-b
//               border-white/10
//               pb-3
//             "
//           >
//             <span
//               className="
//                 text-[8px]
//                 font-bold
//                 uppercase
//                 tracking-[.14em]
//                 text-white/25
//               "
//             >
//               Loading
//             </span>

//             <div
//               className="
//                 flex
//                 items-start
//                 text-[var(--site-accent)]
//               "
//             >
//               <span
//                 ref={percentageRef}
//                 className="
//                   text-[30px]
//                   font-medium
//                   leading-none
//                   tracking-[-.05em]
//                 "
//               >
//                 00
//               </span>

//               <span
//                 className="
//                   ml-1
//                   mt-1
//                   text-[9px]
//                 "
//               >
//                 %
//               </span>
//             </div>
//           </div>

//           <div
//             className="
//               relative
//               mt-3
//               h-px
//               w-full
//               overflow-hidden
//               bg-white/10
//             "
//           >
//             <div
//               ref={progressRef}
//               className="
//                 absolute
//                 inset-y-0
//                 left-0
//                 w-full
//                 origin-left
//                 scale-x-0
//                 bg-[var(--site-accent)]
//               "
//             />
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM */}

//       <div
//         className="
//           absolute
//           bottom-8
//           left-8
//           right-8
//           flex
//           items-center
//           justify-between
//           text-[7px]
//           font-bold
//           uppercase
//           tracking-[.14em]
//           text-white/20
//           md:left-[5vw]
//           md:right-[5vw]
//         "
//       >
//         <span>
//           Stone Processing Technology
//         </span>

//         <span>
//           SDP / 2026
//         </span>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function SitePreloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const topShutterRef = useRef<HTMLDivElement>(null);
  const bottomShutterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const loader = loaderRef.current;
    const topShutter = topShutterRef.current;
    const bottomShutter = bottomShutterRef.current;
    const progress = progressRef.current;
    const percentage = percentageRef.current;

    if (
      !loader ||
      !topShutter ||
      !bottomShutter ||
      !progress ||
      !percentage
    ) {
      return;
    }

    document.body.style.overflow = "hidden";

    const state = {
      value: 0,
    };

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.fromTo(
      ".preloader-logo",
      {
        opacity: 0,
        y: 18,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
      },
    )

      .fromTo(
        ".preloader-machine-path",
        {
          strokeDashoffset: 1,
        },
        {
          strokeDashoffset: 0,
          duration: 1.15,
          stagger: 0.08,
          ease: "power2.inOut",
        },
        0.35,
      )

      .fromTo(
        ".preloader-system-row",
        {
          opacity: 0,
          x: -10,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.35,
        },
        0.55,
      )

      .to(
        state,
        {
          value: 100,
          duration: 1.75,
          ease: "power2.inOut",

          onUpdate: () => {
            const value = Math.round(state.value);

            percentage.textContent = String(
              value,
            ).padStart(2, "0");

            gsap.set(progress, {
              scaleX: value / 100,
            });
          },
        },
        0.55,
      )

      .fromTo(
        ".preloader-system-ok",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.25,
        },
        0.9,
      )

      .fromTo(
        ".preloader-ready",
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        2.05,
      )

      .to(
        ".preloader-content",
        {
          opacity: 0,
          scale: 0.97,
          duration: 0.35,
        },
        2.45,
      )

      .to(
        topShutter,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        2.55,
      )

      .to(
        bottomShutter,
        {
          yPercent: 100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        2.55,
      )

      .to(
        loader,
        {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            document.body.style.overflow = "";
            setVisible(false);
          },
        },
        3.25,
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="
        fixed inset-0 z-[99999]
        overflow-hidden
        bg-[#090a09]
        text-[#f2f0ea]
      "
    >
      {/* SHUTTERS */}

      <div
        ref={topShutterRef}
        className="
          absolute left-0 right-0 top-0
          h-1/2
          bg-[#090a09]
        "
      />

      <div
        ref={bottomShutterRef}
        className="
          absolute bottom-0 left-0 right-0
          h-1/2
          bg-[#090a09]
        "
      />

      {/* GRID */}

      <div
        className="
          pointer-events-none
          absolute inset-0 z-[2]
          opacity-25
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.04) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* TOP META */}

      <div
        className="
          absolute left-[5vw] right-[5vw] top-8 z-20
          flex items-center justify-between
          text-[8px] font-bold uppercase
          tracking-[.16em] text-white/25
        "
      >
        <span>
          SDP Machines
        </span>

        <span>
          Ajmer / India
        </span>
      </div>

      {/* MAIN CONTENT */}

      <div
        className="
          preloader-content
          absolute left-1/2 top-1/2 z-20
          w-[min(760px,88vw)]
          -translate-x-1/2 -translate-y-1/2
        "
      >
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[.72fr_1.28fr]
            lg:items-center
          "
        >
          {/* LEFT */}

          <div className="preloader-logo">
            <Image
              src="/images/brand/sdp-logo-original.png"
              alt="SDP Machines"
              width={105}
              height={90}
              priority
              className="h-auto w-[95px] object-contain"
            />

            <span
              className="
                mt-6 block
                text-[8px] font-bold uppercase
                tracking-[.16em]
                text-white/30
              "
            >
              Initializing engineering system
            </span>

            <strong
              className="
                mt-3 block
                text-[28px] font-medium
                leading-none
                tracking-[-.04em]
              "
            >
              SDP Machines
            </strong>
          </div>

          {/* RIGHT / MACHINE LINEWORK */}

          <div
            className="
              relative
              min-h-[280px]
              border border-white/10
              bg-white/[.015]
              p-6
            "
          >
            <svg
              viewBox="0 0 520 260"
              className="h-full w-full"
              aria-hidden="true"
            >
              <g
                fill="none"
                stroke="rgba(255,255,255,.28)"
                strokeWidth="1"
              >
                <path
                  className="preloader-machine-path"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  d="
                    M55 205
                    L55 62
                    L95 40
                    L425 40
                    L465 62
                    L465 205
                  "
                />

                <path
                  className="preloader-machine-path"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  d="
                    M95 40
                    L95 202
                    M425 40
                    L425 202
                  "
                />

                <path
                  className="preloader-machine-path"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  d="
                    M95 85
                    L425 85
                  "
                />

                <path
                  className="preloader-machine-path"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  d="
                    M150 86
                    L150 170
                    L370 170
                    L370 86
                  "
                />

                <path
                  className="preloader-machine-path"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  d="
                    M210 86
                    L210 145
                    M260 86
                    L260 145
                    M310 86
                    L310 145
                  "
                />

                <path
                  className="preloader-machine-path"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  d="
                    M130 202
                    L390 202
                  "
                />
              </g>

              <circle
                cx="260"
                cy="145"
                r="20"
                fill="none"
                stroke="var(--site-accent)"
                strokeWidth="1"
                opacity=".6"
              />

              <circle
                cx="260"
                cy="145"
                r="4"
                fill="var(--site-accent)"
              />
            </svg>

            <div
              className="
                absolute bottom-4 left-4
                text-[7px] font-bold uppercase
                tracking-[.14em] text-white/20
              "
            >
              System schematic / initialization
            </div>
          </div>
        </div>

        {/* SYSTEM CHECKS */}

        <div
          className="
            mt-8 grid gap-3
            border-t border-white/10
            pt-6
            sm:grid-cols-4
          "
        >
          {[
            "Structure",
            "Motion",
            "Control",
            "Production",
          ].map((label) => (
            <div
              key={label}
              className="
                preloader-system-row
                flex items-center justify-between
                border border-white/10
                px-3 py-2
              "
            >
              <span
                className="
                  text-[7px] font-bold uppercase
                  tracking-[.13em] text-white/30
                "
              >
                {label}
              </span>

              <span
                className="
                  preloader-system-ok
                  text-[7px] font-bold uppercase
                  tracking-[.12em]
                  text-[var(--site-accent)]
                  opacity-0
                "
              >
                OK
              </span>
            </div>
          ))}
        </div>

        {/* PROGRESS */}

        <div className="mt-7">
          <div
            className="
              flex items-end justify-between
              border-b border-white/10
              pb-3
            "
          >
            <span
              className="
                text-[8px] font-bold uppercase
                tracking-[.14em] text-white/25
              "
            >
              System Load
            </span>

            <div className="flex items-start text-[var(--site-accent)]">
              <span
                ref={percentageRef}
                className="
                  text-[34px]
                  font-medium
                  leading-none
                  tracking-[-.05em]
                "
              >
                00
              </span>

              <span className="ml-1 mt-1 text-[9px]">
                %
              </span>
            </div>
          </div>

          <div
            className="
              relative mt-3
              h-px w-full
              overflow-hidden
              bg-white/10
            "
          >
            <div
              ref={progressRef}
              className="
                absolute inset-y-0 left-0
                w-full origin-left scale-x-0
                bg-[var(--site-accent)]
              "
            />
          </div>
        </div>

        {/* READY */}

        <div
          className="
            preloader-ready
            mt-4
            text-center
            text-[8px]
            font-bold uppercase
            tracking-[.16em]
            text-[var(--site-accent)]
            opacity-0
          "
        >
          System Ready
        </div>
      </div>

      {/* BOTTOM META */}

      <div
        className="
          absolute bottom-8 left-[5vw] right-[5vw] z-20
          flex items-center justify-between
          text-[7px] font-bold uppercase
          tracking-[.14em] text-white/20
        "
      >
        <span>
          Stone Processing Technology
        </span>

        <span>
          SDP / 2026
        </span>
      </div>
    </div>
  );
}