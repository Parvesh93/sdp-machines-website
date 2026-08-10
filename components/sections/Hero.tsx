import Link from "next/link";

export function Hero() {
  return (
    <section className="hero grid-lines">
      <div className="container heroInner">
        <p className="eyebrow">Stone processing machinery · Ajmer</p>
        <h1 className="display">Built for<br/>the long cut.</h1>
        <div className="heroBottom">
          <p>Heavy-duty engineering, named components and service that stays with the machine.</p>
          <div className="heroActions"><Link href="#machines">Explore machines</Link><Link href="#contact">Get a quote</Link></div>
        </div>
      </div>
      <div className="heroMedia" aria-hidden="true"><div className="heroMarker">CINEMATIC HERO / VFX SLOT</div></div>
    </section>
  );
}
