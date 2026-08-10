import type { Machine } from "@/types/machine";

export const machines: Machine[] = [
  {
    slug: "automatic-bridge-multi-cutters",
    name: "Automatic Bridge-Type Multi Cutters",
    family: "multi-cutter",
    eyebrow: "Granite cutting",
    summary: "Flagship bridge-type multi-cutter family for production-led granite processing.",
    image: "/images/machines/multi-cutter.jpg",
    modelNames: ["JUMBO-10", "SJ-14", "SJ-14 Plus", "SJ-21", "PILOT-2500"],
    proof: "Model-specific engineering data will be populated from SDP's approved spec tables.",
    chapters: [
      { id: "frame", title: "Built around the cutting load", body: "The 3D chapter system is ready for assembly-level CAD once supplied by SDP engineering.", stat: "01" },
      { id: "drive", title: "Power where production needs it", body: "Motor, blade-gang and feed callouts can be attached to named GLB nodes.", stat: "02" },
      { id: "control", title: "Production visible at the HMI", body: "Control and automation features become scroll chapters rather than a generic feature grid.", stat: "03" }
    ]
  },
  {
    slug: "granite-line-polishing",
    name: "Granite Line Polishing",
    family: "line-polishing",
    eyebrow: "Surface finishing",
    summary: "Continuous polishing architecture with the polishing-head array as the visual focus.",
    image: "/images/machines/lpm.jpg",
    modelNames: ["LPM family"],
    proof: "Client spec data is still required before launch, as flagged in the brief.",
    chapters: [
      { id: "heads", title: "The polishing head array", body: "Exploded-view motion will foreground the head system for this family.", stat: "01" },
      { id: "bed", title: "Stable movement through the line", body: "Bed, transport and alignment assemblies can be isolated and highlighted.", stat: "02" }
    ]
  },
  {
    slug: "thin-wire",
    name: "Thin Wire",
    family: "thin-wire",
    eyebrow: "Precision cutting",
    summary: "Thin-wire machine storytelling centered on wire path, tension and cutting control.",
    image: "/images/machines/thin-wire.jpg",
    modelNames: ["TCW-2200", "TCW-RETRO"],
    proof: "Current source assets include both thin-wire models and a TCW-2200 brochure.",
    chapters: [
      { id: "wire", title: "Tension becomes the story", body: "This family gets a distinct 3D treatment, not a reskin of the multi-cutter scene.", stat: "01" },
      { id: "control", title: "Controlled movement", body: "Scroll progress can drive wire-path emphasis, camera movement and engineering annotations.", stat: "02" }
    ]
  },
  {
    slug: "handling-cranes",
    name: "Gantry & EOT Handling Cranes",
    family: "handling",
    eyebrow: "Material handling",
    summary: "Plant handling systems presented as part of a complete stone-processing setup.",
    image: "/images/machines/gantry.jpg",
    modelNames: ["Gantry", "EOT"],
    proof: "The brief allows both crane types to share a page with model tabs.",
    chapters: [
      { id: "span", title: "Designed around plant movement", body: "The foundation supports a lighter interaction treatment for secondary machine lines.", stat: "01" }
    ]
  }
];

export const machineBySlug = Object.fromEntries(machines.map((machine) => [machine.slug, machine]));
