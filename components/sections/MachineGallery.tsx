import Image from "next/image";
import Link from "next/link";
import { machines } from "@/content/machines";

export function MachineGallery() {
  return (
    <section id="machines" className="section machineSection">
      <div className="container">
        <div className="sectionIntro"><p className="eyebrow">Machine lines</p><h2>Start with what needs to run.</h2></div>
        <div className="machineGrid">
          {machines.map((machine, index) => (
            <Link href={`/machines/${machine.slug}`} className="machineCard" key={machine.slug}>
              <div className="machineImage"><Image src={machine.image} alt={machine.name} fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <div className="machineMeta"><span>0{index + 1}</span><div><p>{machine.eyebrow}</p><h3>{machine.name}</h3><small>{machine.summary}</small></div></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
