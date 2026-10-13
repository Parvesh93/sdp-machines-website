"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

export function SitePreloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const loader = loaderRef.current;
    const progress = progressRef.current;

    if (!loader || !progress) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
      },
    });

    tl.fromTo(
      ".simple-preloader-logo",
      { opacity: 0, y: 10, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35 },
    )
      .fromTo(
        progress,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.65, ease: "power2.inOut" },
        0.15,
      )
      .to(
        ".simple-preloader-content",
        { opacity: 0, y: -6, duration: 0.22 },
        0.78,
      )
      .to(loader, { opacity: 0, duration: 0.22 }, 0.88);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] grid place-items-center bg-[#061018] text-[#f4f8fa]"
    >
      <div className="simple-preloader-content flex w-[min(250px,72vw)] flex-col items-center">
        <div className="simple-preloader-logo flex flex-col items-center">
          <Image
            src="/images/brand/sdp-logo-original.png"
            alt="SDP Machines"
            width={72}
            height={64}
            priority
            className="h-auto w-[64px] object-contain"
          />

          <strong className="mt-4 text-[13px] font-semibold tracking-[-0.02em]">
            SDP MACHINES
          </strong>

          <span className="mt-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-[#8fa6b4]/55">
            Stone Processing Machines
          </span>
        </div>

        <div className="mt-6 h-px w-full overflow-hidden bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-[var(--site-accent)]"
          />
        </div>
      </div>
    </div>
  );
}
