import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacyverklaring — Coachingpraktijk De Leeuw",
  description:
    "Hoe Coachingpraktijk De Leeuw omgaat met persoonsgegevens, conform de AVG/GDPR.",
  alternates: { canonical: "/privacy" },
};

const lastUpdated = "1 mei 2026";

export default function PrivacyPage() {
  return (
    <main id="main-content" className="bg-cream py-20 md:py-28">
      <article className="mx-auto max-w-3xl px-6">
        <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
          Privacy
        </p>
        <h1 className="display-md display-md-regular mb-4 text-brown">
          Privacyverklaring
        </h1>
        <p className="body-sm body-sm-regular mb-12 text-brown-muted">
          Laatst bijgewerkt: {lastUpdated}
        </p>

        <div className="space-y-10 text-brown">
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              Verwerkingsverantwoordelijke
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Coachingpraktijk De Leeuw, gevestigd in Leiden, is
              verantwoordelijk voor de verwerking van persoonsgegevens zoals
              weergegeven in deze privacyverklaring. Voor vragen kun je contact
              opnemen via{" "}
              <a
                href="mailto:mirjam@deleeuw.nl"
                className="text-sage-dark underline-offset-4 hover:underline"
              >
                mirjam@deleeuw.nl
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              Welke gegevens verwerken wij
            </h2>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>Voor- en achternaam</li>
              <li>E-mailadres</li>
              <li>Inhoud van berichten die je via het contactformulier stuurt</li>
              <li>
                Gegevens die je tijdens een coachingstraject deelt, voor zover
                relevant voor de begeleiding
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              Doel en rechtsgrond
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Persoonsgegevens worden verwerkt om contact met je op te nemen,
              een kennismakingsgesprek te plannen en een coachingstraject uit te
              voeren. De rechtsgrond is uitvoering van een overeenkomst en/of
              jouw toestemming.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">Bewaartermijn</h2>
            <p className="body-md body-md-regular text-brown-muted">
              Gegevens worden niet langer bewaard dan strikt nodig is voor de
              doelen waarvoor ze zijn verzameld. Contactgegevens en
              dossiergegevens worden conform de wettelijke bewaarplicht en
              beroepsrichtlijnen bewaard.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">Jouw rechten</h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Je hebt het recht om jouw persoonsgegevens in te zien, te
              corrigeren of te laten verwijderen. Daarnaast heb je het recht om
              je toestemming voor de gegevensverwerking in te trekken of
              bezwaar te maken tegen de verwerking. Je kunt een verzoek hiertoe
              sturen naar{" "}
              <a
                href="mailto:mirjam@deleeuw.nl"
                className="text-sage-dark underline-offset-4 hover:underline"
              >
                mirjam@deleeuw.nl
              </a>
              .
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Je hebt ook het recht een klacht in te dienen bij de Autoriteit
              Persoonsgegevens.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              Cookies en analytics
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Deze website gebruikt Vercel Analytics voor anonieme,
              privacy-vriendelijke bezoekersstatistieken. Er worden geen
              cookies geplaatst en er worden geen persoonsgegevens herleidbaar
              tot individuele bezoekers verwerkt.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">Beveiliging</h2>
            <p className="body-md body-md-regular text-brown-muted">
              Wij nemen passende maatregelen om misbruik, verlies, onbevoegde
              toegang en ongewenste openbaarmaking van persoonsgegevens tegen
              te gaan.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">Contact</h2>
            <p className="body-md body-md-regular text-brown-muted">
              Vragen over deze privacyverklaring of over het gebruik van jouw
              gegevens? Neem gerust contact op via{" "}
              <a
                href="mailto:mirjam@deleeuw.nl"
                className="text-sage-dark underline-offset-4 hover:underline"
              >
                mirjam@deleeuw.nl
              </a>
              .
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
