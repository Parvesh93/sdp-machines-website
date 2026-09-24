import { Hero } from "@/components/website/hero/hero";
import { InstallationsPreview } from "@/components/website/home/installations-preview";
import { MachineShowcase } from "@/components/website/home/machine-showcase";
import { ServiceNetwork } from "@/components/website/home/service-network";
import { Testimonials } from "@/components/website/home/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MachineShowcase />
      <ServiceNetwork />
      <InstallationsPreview />
      <Testimonials />
    </>
  );
}
