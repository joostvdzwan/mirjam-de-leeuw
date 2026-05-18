import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacyverklaring — Coachingpraktijk De Leeuw",
  description:
    "Hoe Coachingpraktijk De Leeuw omgaat met persoonsgegevens, conform de AVG/GDPR.",
  alternates: { canonical: "/privacy" },
};

const lastUpdated = "Mei 2026";

export default function PrivacyPage() {
  return (
    <main id="main-content" className="bg-cream py-20 md:py-28">
      <article className="mx-auto max-w-3xl px-6">
        <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
          Privacy
        </p>
        <h1 className="display-md display-md-regular mb-2 text-brown">
          Privacyverklaring
        </h1>
        <p className="heading-md heading-md-medium mb-1 text-brown">
          Coachingpraktijk De Leeuw
        </p>
        <p className="body-sm body-sm-regular mb-12 text-brown-muted">
          Laatst bijgewerkt: {lastUpdated}
        </p>

        <div className="space-y-10 text-brown">
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              1. Wie ben ik?
            </h2>
            <p className="body-md body-md-regular mb-4 text-brown-muted">
              Coachingpraktijk De Leeuw is een praktijk voor coaching en
              gezinsbegeleiding, gevestigd in Leiden. De praktijk wordt gevoerd
              door Mirjam de Leeuw, kinder- en jeugdpsycholoog en
              SKJ-geregistreerd professional.
            </p>
            <ul className="body-md body-md-regular space-y-1 text-brown-muted">
              <li>Praktijknaam: Coachingpraktijk De Leeuw</li>
              <li>Eigenaar: Mirjam de Leeuw</li>
              <li>Vestigingsadres: Leiden</li>
              <li>
                E-mail:{" "}
                <a
                  href="mailto:mirjam@deleeuw.nl"
                  className="text-sage-dark underline-offset-4 hover:underline"
                >
                  mirjam@deleeuw.nl
                </a>
              </li>
              <li>KvK-nummer: 88297187</li>
              <li>SKJ-registratie: 130005177</li>
              <li>
                Btw-status: vrijgesteld van btw via de
                kleineondernemersregeling, KOR
              </li>
            </ul>
            <p className="body-md body-md-regular mt-4 text-brown-muted">
              Coachingpraktijk De Leeuw is verantwoordelijk voor de verwerking
              van persoonsgegevens zoals beschreven in deze privacyverklaring.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              2. Voor wie geldt deze privacyverklaring?
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Deze privacyverklaring geldt voor iedereen die:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>de website bezoekt;</li>
              <li>contact opneemt via e-mail of het contactformulier;</li>
              <li>een kennismakingsgesprek aanvraagt;</li>
              <li>een coachingstraject volgt;</li>
              <li>
                als ouder, verzorger of betrokkene betrokken is bij een
                coachingstraject.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Coachingpraktijk De Leeuw richt zich op jongeren vanaf 16 jaar,
              ouders en volwassenen.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              3. Welke persoonsgegevens verwerk ik?
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Ik verwerk de volgende categorieën persoonsgegevens:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>naam en achternaam;</li>
              <li>e-mailadres;</li>
              <li>telefoonnummer, als je dit zelf verstrekt;</li>
              <li>
                adresgegevens, wanneer dit nodig is voor facturatie;
              </li>
              <li>geboortedatum of leeftijd;</li>
              <li>
                gegevens van ouder(s), verzorger(s) of andere betrokkenen,
                wanneer dit relevant is;
              </li>
              <li>
                informatie die je deelt via e-mail, telefonisch, via het
                contactformulier of tijdens gesprekken;
              </li>
              <li>
                informatie over je hulpvraag, situatie, gezin, werk, school,
                relaties, belasting, stress, ontwikkeling of welzijn;
              </li>
              <li>
                afspraken over doelen, aandachtspunten of vervolgstappen;
              </li>
              <li>factuur- en betaalgegevens.</li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Tijdens coaching kunnen gevoelige persoonsgegevens naar voren
              komen, bijvoorbeeld over gezondheid, psychisch welzijn,
              gezinssituatie, ontwikkeling of relaties. Ik verwerk deze gegevens
              alleen wanneer jij ze zelf verstrekt en voor zover ze relevant zijn
              voor de coaching.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              4. Geen EPD of behandeldossier
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Omdat ik coaching aanbied en geen diagnostiek, GGZ-behandeling of
              medische zorg, werk ik niet met een elektronisch patiëntendossier,
              medisch dossier of behandeldossier.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Ik houd wel een beperkte cliëntadministratie bij (contactgegevens,
              afspraken, facturen) en kan korte werknotities maken om de coaching
              zorgvuldig te kunnen uitvoeren. Bewaartermijnen staan in artikel 11.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              5. Waarom verwerk ik persoonsgegevens?
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Ik verwerk persoonsgegevens voor de volgende doelen:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>om contact met je op te nemen;</li>
              <li>om een kennismakingsgesprek te plannen;</li>
              <li>
                om te beoordelen of mijn aanbod passend is bij jouw vraag;
              </li>
              <li>
                om coaching of gezinsbegeleiding zorgvuldig uit te voeren;
              </li>
              <li>om afspraken te plannen en te bevestigen;</li>
              <li>om facturen te sturen en betalingen te verwerken;</li>
              <li>om mijn financiële administratie bij te houden;</li>
              <li>
                om te voldoen aan wettelijke, fiscale en beroepsmatige
                verplichtingen;
              </li>
              <li>om de website veilig en goed werkend te houden.</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              6. Op welke grondslag verwerk ik persoonsgegevens?
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Ik verwerk persoonsgegevens op basis van één of meer van de
              volgende grondslagen:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>
                uitvoering van een overeenkomst, wanneer je een coachingstraject
                start of een afspraak maakt;
              </li>
              <li>
                toestemming, bijvoorbeeld wanneer je zelf gegevens verstrekt via
                e-mail, contactformulier of tijdens gesprekken;
              </li>
              <li>
                wettelijke verplichting, bijvoorbeeld voor de financiële
                administratie;
              </li>
              <li>
                gerechtvaardigd belang, bijvoorbeeld voor normale
                praktijkvoering, beveiliging, planning, communicatie en beperkte
                werknotities;
              </li>
              <li>
                professionele verantwoordelijkheid, voor zover gegevens nodig
                zijn om zorgvuldig en verantwoord te kunnen werken binnen mijn
                rol als coach en SKJ-geregistreerd professional.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Je mag toestemming altijd intrekken. Het intrekken van toestemming
              heeft geen terugwerkende kracht.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              7. Jongeren van 16 en 17 jaar
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw begeleidt jongeren vanaf 16 jaar. Bij
              jongeren van 16 en 17 jaar wordt zorgvuldig afgestemd wie
              betrokken is bij het traject. Dit kan de jongere zelf zijn, maar
              ook een ouder of verzorger. Bij de start van het traject wordt
              besproken:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>wie de opdrachtgever is;</li>
              <li>wie de factuur ontvangt;</li>
              <li>
                of en hoe ouder(s) of verzorger(s) betrokken worden;
              </li>
              <li>welke informatie wel of niet wordt gedeeld;</li>
              <li>wat de jongere zelf vertrouwelijk wil bespreken;</li>
              <li>
                wanneer veiligheid of professionele verantwoordelijkheid vraagt
                om informatie te delen.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Vertrouwen en privacy van de jongere zijn belangrijk. Informatie
              uit gesprekken wordt daarom niet zonder reden gedeeld met
              ouder(s), verzorger(s) of derden.
            </p>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Wanneer er zorgen zijn over veiligheid, ernstige problematiek of
              acute risico&apos;s, kan het nodig zijn om informatie te delen of
              passende hulp in te schakelen. Dit wordt, waar mogelijk, eerst met
              de jongere besproken.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              8. Coaching, geen behandeling of crisisinterventie
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw biedt coaching en gezinsbegeleiding. Dit
              is geen diagnostiek, geen GGZ-behandeling, geen medische zorg en
              geen crisisinterventie.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Bij ernstige psychische klachten, acute onveiligheid,
              suïcidaliteit, psychiatrische problematiek of crisis is coaching
              niet passend. In dat geval adviseer ik contact op te nemen met de
              huisarts, huisartsenpost, crisisdienst, 113 Zelfmoordpreventie of
              andere passende hulpverlening.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Als tijdens de kennismaking of het traject blijkt dat coaching
              onvoldoende passend is, kan ik adviseren om andere hulp te zoeken
              of het traject beëindigen.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              9. Met wie deel ik persoonsgegevens?
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Ik deel persoonsgegevens niet met derden, tenzij dat nodig is voor
              de uitvoering van mijn werk, administratie, wettelijke
              verplichtingen of veiligheid. Voor mijn praktijkvoering maak ik
              onder andere gebruik van:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>e-mail voor communicatie;</li>
              <li>Microsoft Teams voor online gesprekken;</li>
              <li>Moneybird voor facturatie en administratie;</li>
              <li>hosting- en websitediensten voor de website;</li>
              <li>eventueel een boekhouder of administratieve ondersteuning.</li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Met partijen die namens mij persoonsgegevens verwerken, sluit ik
              waar nodig een verwerkersovereenkomst. Wanneer een uitzondering op
              de vertrouwelijkheid geldt, staat dit beschreven in artikel 8.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              10. Website, cookies en analytics
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              De website kan gebruikmaken van privacyvriendelijke
              bezoekersstatistieken om inzicht te krijgen in het gebruik en
              functioneren van de website.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              De website gebruikt geen trackingcookies voor
              marketingdoeleinden, tenzij dit uitdrukkelijk anders wordt
              vermeld.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              11. Hoe lang bewaar ik gegevens?
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Ik bewaar persoonsgegevens niet langer dan nodig is voor het doel
              waarvoor ze zijn verzameld. In grote lijnen hanteer ik de volgende
              bewaartermijnen:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>
                contactaanvragen die niet tot een traject leiden: maximaal 12
                maanden;
              </li>
              <li>
                gegevens rondom kennismaking en planning: maximaal 12 maanden,
                tenzij een traject start;
              </li>
              <li>
                korte werknotities rondom coachingstrajecten: maximaal 2 jaar na
                afronding van het traject, tenzij er een reden is om ze eerder te
                verwijderen of langer te bewaren;
              </li>
              <li>
                financiële administratie, facturen en betaalgegevens: 7 jaar,
                vanwege de fiscale bewaarplicht;
              </li>
              <li>
                e-mailcorrespondentie: zolang als nodig is voor communicatie,
                administratie of professionele verantwoording.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Na afloop van de bewaartermijn worden gegevens verwijderd of
              geanonimiseerd.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              12. Beveiliging
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Ik neem passende technische en organisatorische maatregelen om
              persoonsgegevens te beschermen tegen verlies, misbruik, onbevoegde
              toegang, wijziging en openbaarmaking. Voorbeelden hiervan zijn:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>beveiligde toegang tot apparaten en accounts;</li>
              <li>
                gebruik van wachtwoorden en waar mogelijk tweestapsverificatie;
              </li>
              <li>
                zorgvuldige omgang met cliëntadministratie en werknotities;
              </li>
              <li>beperking van toegang tot gegevens;</li>
              <li>gebruik van betrouwbare digitale diensten;</li>
              <li>geen onnodige opslag van persoonsgegevens.</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              13. Jouw privacyrechten
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Je hebt volgens de privacywetgeving verschillende rechten. Je kunt
              mij vragen om:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>inzage in je persoonsgegevens;</li>
              <li>correctie van onjuiste gegevens;</li>
              <li>verwijdering van gegevens;</li>
              <li>beperking van de verwerking;</li>
              <li>overdracht van gegevens;</li>
              <li>bezwaar tegen verwerking;</li>
              <li>intrekking van eerder gegeven toestemming.</li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Stuur je verzoek naar{" "}
              <a
                href="mailto:mirjam@deleeuw.nl"
                className="text-sage-dark underline-offset-4 hover:underline"
              >
                mirjam@deleeuw.nl
              </a>
              . Ik reageer zo snel mogelijk, uiterlijk binnen één maand.
            </p>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Soms kan ik een verzoek niet volledig uitvoeren, bijvoorbeeld
              wanneer ik gegevens nog moet bewaren vanwege een wettelijke
              verplichting, professionele verantwoordelijkheid of de rechten van
              anderen. Voor jongeren van 16 en 17 jaar geldt aanvullend wat in
              artikel 7 is beschreven.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              14. Klacht over privacy
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Als je vragen of klachten hebt over hoe ik met persoonsgegevens
              omga, neem dan eerst contact met mij op via{" "}
              <a
                href="mailto:mirjam@deleeuw.nl"
                className="text-sage-dark underline-offset-4 hover:underline"
              >
                mirjam@deleeuw.nl
              </a>
              .
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Je hebt daarnaast het recht om een klacht in te dienen bij de
              Autoriteit Persoonsgegevens.
            </p>
          </section>

          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              15. Wijzigingen
            </h2>
            <p className="body-md body-md-regular text-brown-muted">
              Deze privacyverklaring kan worden aangepast wanneer mijn werkwijze,
              de website of wetgeving verandert. De meest actuele versie staat
              altijd op de website.
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
