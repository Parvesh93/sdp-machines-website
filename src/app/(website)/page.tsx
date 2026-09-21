import {
  Hero,
} from "@/components/website/hero/hero";

import {
  EngineeringTransition,
} from "@/components/website/home/engineering-transition";

import {
  MachineShowcase,
} from "@/components/website/home/machine-showcase";

import {
  InstallationsPreview,
} from "@/components/website/home/installations-preview";

import {
  EngineeringSystem3D,
} from "@/components/website/home/engineering-system-3d";

import {
  MachineDepthReveal,
} from "@/components/website/home/machine-depth-reveal";

import {
  InteractiveMachineRange,
} from "@/components/website/home/interactive-machine-range";

import {
  ServiceNetwork,
} from "@/components/website/home/service-network";

import {
  Testimonials,
} from "@/components/website/home/testimonials";


export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <InteractiveMachineRange /> */}
       <MachineDepthReveal />
      <MachineShowcase />
      <ServiceNetwork />
      <InstallationsPreview />

      <Testimonials />

      <section
        style={{
          minHeight: "100vh",
          background: "#111211",
        }}
      />
    </>
  );
}