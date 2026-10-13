import { Hero } from "@/components/website/hero/hero";
import { AboutPreview } from "@/components/website/home/about-preview";
import { HomeFinalCta } from "@/components/website/home/home-final-cta";
import { InstallationsPreview } from "@/components/website/home/installations-preview";
import { MachineShowcase } from "@/components/website/home/machine-showcase";
import { ServiceNetwork } from "@/components/website/home/service-network";
import { Testimonials } from "@/components/website/home/testimonials";

// Homepage follows the approved SDP content sitemap.
export default function HomePage() {
  return (
    <>
      <Hero />
      <MachineShowcase />
      <AboutPreview />
      <ServiceNetwork />
      <InstallationsPreview />
      <Testimonials />
      <HomeFinalCta />
    </>
  );
}
