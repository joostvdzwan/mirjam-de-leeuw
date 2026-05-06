import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden — Coachingpraktijk De Leeuw",
  description:
    "Algemene voorwaarden van Coachingpraktijk De Leeuw, coaching en gezinsbegeleiding in Leiden.",
  alternates: { canonical: "/algemene-voorwaarden" },
};

const lastUpdated = "6 mei 2026";

export default function AlgemeneVoorwaardenPage() {
  return (
    <main id="main-content" className="bg-cream py-20 md:py-28">
      <article className="mx-auto max-w-3xl px-6">
        <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
          Voorwaarden
        </p>
        <h1 className="display-md display-md-regular mb-4 text-brown">
          Algemene Voorwaarden
        </h1>
        <p className="body-sm body-sm-regular mb-12 text-brown-muted">
          Laatst bijgewerkt: {lastUpdated}
        </p>

        <div className="space-y-10 text-brown">
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              1. Algemeen
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Deze algemene voorwaarden zijn van toepassing op alle diensten van
              Coachingpraktijk De Leeuw, gevestigd in Leiden, aangeboden door
              Mirjam de Leeuw. Door deel te nemen aan coaching of
              gezinsbegeleiding ga je akkoord met deze voorwaarden.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              2. Dienstverlening
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Coachingpraktijk De Leeuw biedt coaching en gezinsbegeleiding aan
              in de vorm van wandelgesprekken en online gesprekken. De
              begeleiding is geen vervanging voor psychologische behandeling,
              diagnostiek of crisisinterventie. Bij ernstige klachten of acute
              problematiek wordt doorverwezen naar de juiste hulpverlening.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              3. Kennismakingsgesprek
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Het telefonische kennismakingsgesprek is kosteloos en vrijblijvend.
              Tijdens dit gesprek bespreken we of de begeleiding bij je past en
              wat je kunt verwachten.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              4. Tarieven en betaling
            </h2>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>De actuele tarieven staan vermeld op de website.</li>
              <li>
                Na elk gesprek ontvang je een factuur. De betalingstermijn is 14
                dagen na factuurdatum.
              </li>
              <li>
                De dienstverlening is particulier. Er is geen vergoeding via de
                zorgverzekering mogelijk.
              </li>
              <li>
                Tarieven kunnen jaarlijks worden aangepast. Wijzigingen worden
                tijdig gecommuniceerd.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              5. Afspraken en annulering
            </h2>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>
                Afspraken kunnen tot 24 uur van tevoren kosteloos worden
                verzet of geannuleerd.
              </li>
              <li>
                Bij annulering binnen 24 uur wordt het volledige tarief in
                rekening gebracht, tenzij anders overeengekomen.
              </li>
              <li>
                Bij verhindering door de coach wordt zo snel mogelijk een
                alternatief moment aangeboden.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              6. Vertrouwelijkheid
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Alle informatie die je tijdens de begeleiding deelt, wordt
              vertrouwelijk behandeld. Er worden geen gegevens gedeeld met
              derden, tenzij je hier uitdrukkelijk toestemming voor geeft of
              wanneer er sprake is van een wettelijke verplichting.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              7. Aansprakelijkheid
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Coachingpraktijk De Leeuw spant zich in om de begeleiding
              zorgvuldig en naar beste inzicht uit te voeren. De begeleiding is
              een inspanningsverplichting, geen resultaatverplichting.
              Coachingpraktijk De Leeuw is niet aansprakelijk voor directe of
              indirecte schade die voortvloeit uit de begeleiding.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              8. Beëindiging
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Zowel jij als Coachingpraktijk De Leeuw kan de begeleiding op elk
              moment beëindigen. Al gemaakte afspraken worden dan volgens de
              annuleringsvoorwaarden afgehandeld.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              9. Klachten
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Heb je een klacht over de dienstverlening? Neem dan contact op
              via{" "}
              <a
                href="mailto:mirjam@deleeuw.nl"
                className="text-sage-dark underline-offset-4 hover:underline"
              >
                mirjam@deleeuw.nl
              </a>
              . We zoeken samen naar een passende oplossing.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              10. Toepasselijk recht
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Op deze algemene voorwaarden is Nederlands recht van toepassing.
            </p>
          </section>
        </div>

        <div className="mt-16">
          <Link
            href="/"
            className="label-md label-md-medium inline-block rounded-full bg-sage-dark px-6 py-3 text-white transition-colors hover:bg-sage"
          >
            Terug naar home
          </Link>
        </div>
      </article>
    </main>
  );
}
