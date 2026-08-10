"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Machine } from "@/types/machine";
import { MachineStage } from "@/components/three/MachineStage";

gsap.registerPlugin(ScrollTrigger);

export function MachineStory({ machine }: { machine: Machine }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=2200",
        pin: ".machineStoryPin",
        scrub: true,
        onUpdate: (self) => setActive(Math.min(machine.chapters.length - 1, Math.floor(self.progress * machine.chapters.length)))
      });
    }, root);
    return () => ctx.revert();
  }, [machine.chapters.length]);

  const chapter = machine.chapters[active];
  return (
    <section ref={root} className="machineStory">
      <div className="machineStoryPin">
        <div className="machineCopy">
          <span className="eyebrow">Engineering chapter {chapter.stat}</span>
          <h2>{chapter.title}</h2>
          <p>{chapter.body}</p>
        </div>
        <MachineStage />
        <div className="storyProgress">{machine.chapters.map((c, i) => <span key={c.id} className={i === active ? "active" : ""}>{String(i + 1).padStart(2, "0")}</span>)}</div>
      </div>
    </section>
  );
}
