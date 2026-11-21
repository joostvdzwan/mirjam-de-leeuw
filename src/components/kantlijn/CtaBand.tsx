import Image from "next/image";
import { OpenBooking } from "./primitives";

export function CtaBand({ line, accent, text }: { line: string; accent: string; text: string }) {
  return (
    <section className="cta-band" aria-label="Kennismaken">
      <div className="cta-band__photo">
        <Image
          className="cta-band__img"
          src="/kantlijn/mirjam-wandeling.jpg"
          alt="Mirjam wandelt in gesprek met een cliënt"
          fill
          sizes="(min-width: 760px) 580px, 100vw"
        />
      </div>
      <div className="cta-band__inner">
        <p className="cta-band__line">
          {line} <em>{accent}</em>
        </p>
        <p className="cta-band__text">{text}</p>
        <OpenBooking className="btn btn--sage">Plan een kennismaking</OpenBooking>
      </div>
    </section>
  );
}
