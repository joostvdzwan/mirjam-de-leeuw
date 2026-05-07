import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden — Coachingpraktijk De Leeuw",
  description:
    "Algemene voorwaarden van Coachingpraktijk De Leeuw voor coaching en gezinsbegeleiding.",
  alternates: { canonical: "/algemene-voorwaarden" },
};

const lastUpdated = "6 mei 2026";

export default function AlgemeneVoorwaardenPage() {
  return (
    <main id="main-content" className="bg-cream py-20 md:py-28">
      <article className="mx-auto max-w-3xl px-6">
        <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
          Juridisch
        </p>
        <h1 className="display-md display-md-regular mb-2 text-brown">
          Algemene voorwaarden
        </h1>
        <p className="heading-md heading-md-medium mb-1 text-brown">
          Coachingpraktijk De Leeuw
        </p>
        <p className="body-sm body-sm-regular mb-12 text-brown-muted">
          Laatst bijgewerkt: {lastUpdated}
        </p>

        <div className="space-y-10 text-brown">
          {/* Artikel 1 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              1. Definities
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              In deze algemene voorwaarden wordt verstaan onder:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>
                <strong className="text-brown">Praktijk:</strong>{" "}
                Coachingpraktijk De Leeuw, gevestigd aan de PJ Blokstraat 10 in
                Leiden.
              </li>
              <li>
                <strong className="text-brown">Coach:</strong> Mirjam de Leeuw,
                kinder- en jeugdpsycholoog en SKJ-geregistreerd professional.
              </li>
              <li>
                <strong className="text-brown">Cliënt:</strong> de persoon die
                coaching ontvangt of aanvraagt.
              </li>
              <li>
                <strong className="text-brown">Jongere:</strong> een cliënt van
                16 of 17 jaar.
              </li>
              <li>
                <strong className="text-brown">Opdrachtgever:</strong> de
                persoon die de opdracht geeft of betaalt. Dit kan de cliënt zelf
                zijn, een ouder, verzorger of andere betrokkene.
              </li>
              <li>
                <strong className="text-brown">Traject:</strong> één of meerdere
                coachinggesprekken, online of wandelend.
              </li>
              <li>
                <strong className="text-brown">Gesprek:</strong> een
                afzonderlijke coachingsessie, online of wandelend.
              </li>
              <li>
                <strong className="text-brown">Cliëntadministratie:</strong> de
                beperkte administratieve gegevens die nodig zijn voor contact,
                planning, facturatie en praktijkvoering.
              </li>
              <li>
                <strong className="text-brown">Werknotities:</strong> korte
                aantekeningen die de coach eventueel maakt om de coaching
                zorgvuldig te kunnen uitvoeren.
              </li>
            </ul>
          </section>

          {/* Artikel 2 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              2. Toepasselijkheid
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Deze algemene voorwaarden zijn van toepassing op alle diensten,
              gesprekken, trajecten, offertes, afspraken en overeenkomsten van
              Coachingpraktijk De Leeuw.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Door een afspraak te maken of een traject te starten, gaat de
              cliënt of opdrachtgever akkoord met deze algemene voorwaarden.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Afwijkingen zijn alleen geldig wanneer deze schriftelijk zijn
              afgesproken.
            </p>
          </section>

          {/* Artikel 3 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              3. Gegevens van de praktijk
            </h2>
            <ul className="body-md body-md-regular space-y-1 text-brown-muted">
              <li>Praktijknaam: Coachingpraktijk De Leeuw</li>
              <li>Eigenaar: Mirjam de Leeuw</li>
              <li>Vestigingsadres: PJ Blokstraat 10, Leiden</li>
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
          </section>

          {/* Artikel 4 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              4. Aanbod van de praktijk
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw biedt laagdrempelige coaching en
              gezinsbegeleiding aan jongeren vanaf 16 jaar, ouders en
              volwassenen.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              De begeleiding kan onder andere gaan over:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>overprikkeling, spanning of balans;</li>
              <li>opvoedvragen;</li>
              <li>gezinsdynamiek;</li>
              <li>terugkerende patronen;</li>
              <li>vragen rondom gedrag of ontwikkeling;</li>
              <li>
                onzekerheid, stress of vastlopen in een levensfase;
              </li>
              <li>
                behoefte aan inzicht, overzicht en praktische stappen.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Gesprekken vinden online of wandelend plaats, in of rondom Leiden.
            </p>
          </section>

          {/* Artikel 5 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              5. Coaching, geen diagnostiek, behandeling of crisisinterventie
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              De diensten van Coachingpraktijk De Leeuw bestaan uit coaching en
              gezinsbegeleiding.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              De praktijk biedt geen:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>diagnostiek;</li>
              <li>psychologische behandeling binnen de GGZ;</li>
              <li>medische of psychiatrische zorg;</li>
              <li>crisisinterventie;</li>
              <li>spoedhulp;</li>
              <li>
                behandeling die wordt vergoed vanuit de zorgverzekering.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 mb-3 text-brown-muted">
              Coaching is bedoeld voor reflectie, inzicht, bewustwording,
              praktische handvatten en het verkennen van patronen of keuzes.
              Coaching is geen vervanging voor medische, psychologische of
              psychiatrische zorg.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Bij ernstige klachten, acute onveiligheid, crisis, suïcidale
              gedachten of psychiatrische problematiek is coaching niet passend.
              Neem in dat geval contact op met de huisarts, huisartsenpost,
              crisisdienst, 113 Zelfmoordpreventie of andere passende
              hulpverlening.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Als tijdens de kennismaking of het traject blijkt dat coaching
              onvoldoende passend is, kan de coach adviseren om andere hulp te
              zoeken of het traject beëindigen.
            </p>
          </section>

          {/* Artikel 6 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              6. Geen EPD, medisch dossier of behandeldossier
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Omdat Coachingpraktijk De Leeuw coaching aanbiedt en geen
              diagnostiek, GGZ-behandeling of medische zorg, werkt de praktijk
              niet met een elektronisch patiëntendossier, medisch dossier of
              behandeldossier.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              De coach houdt wel een beperkte cliëntadministratie bij. Dit kan
              bijvoorbeeld bestaan uit contactgegevens, afspraakgegevens,
              facturen en betaalgegevens.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Waar nodig kan de coach korte werknotities maken. Deze zijn
              bedoeld om de coaching zorgvuldig te kunnen uitvoeren, bijvoorbeeld
              om gemaakte afspraken, aandachtspunten of vervolgstappen te
              onthouden. Er wordt niet meer vastgelegd dan nodig is voor het
              coachingstraject en de normale praktijkvoering.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Voor de verwerking, beveiliging en bewaartermijnen van
              persoonsgegevens geldt de{" "}
              <Link
                href="/privacy"
                className="text-sage-dark underline-offset-4 hover:underline"
              >
                privacyverklaring
              </Link>{" "}
              van Coachingpraktijk De Leeuw.
            </p>
          </section>

          {/* Artikel 7 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              7. Jongeren van 16 en 17 jaar
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw begeleidt jongeren vanaf 16 jaar. Bij
              jongeren van 16 en 17 jaar wordt bij de start van het traject
              zorgvuldig afgestemd:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>wie de opdrachtgever is;</li>
              <li>wie toestemming geeft voor het traject;</li>
              <li>wie de factuur ontvangt;</li>
              <li>
                of en hoe ouder(s) of verzorger(s) betrokken worden;
              </li>
              <li>
                welke informatie met ouder(s) of verzorger(s) gedeeld mag
                worden;
              </li>
              <li>
                welke informatie vertrouwelijk blijft tussen jongere en coach.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 mb-3 text-brown-muted">
              De privacy en vertrouwelijkheid van de jongere worden zoveel
              mogelijk gerespecteerd. Tegelijkertijd kan het nodig zijn om
              ouder(s), verzorger(s) of passende hulpverlening te betrekken
              wanneer er zorgen zijn over veiligheid, ernstige problematiek of
              acute risico&apos;s.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Wanneer de begeleiding van een jongere buiten de mogelijkheden van
              coaching valt, kan de coach adviseren om contact op te nemen met de
              huisarts, het wijkteam, jeugdteam, de GGZ of andere passende
              hulpverlening.
            </p>
          </section>

          {/* Artikel 8 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              8. Kennismakingsgesprek
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Een telefonische kennismaking van 20 à 30 minuten is kosteloos en
              vrijblijvend. Tijdens de kennismaking wordt besproken:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>wat de hulpvraag is;</li>
              <li>of coaching passend lijkt;</li>
              <li>
                welke vorm van begeleiding mogelijk aansluit;
              </li>
              <li>
                praktische zaken zoals locatie, online afspraak, kosten en
                planning.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Na de kennismaking zijn beide partijen vrij om wel of niet te
              starten.
            </p>
          </section>

          {/* Artikel 9 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              9. Totstandkoming van de overeenkomst
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Een overeenkomst komt tot stand wanneer:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>
                de cliënt of opdrachtgever akkoord gaat met een afspraak of
                traject;
              </li>
              <li>
                en de coach deze afspraak bevestigt per e-mail, telefonisch of
                schriftelijk.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              Bij jongeren van 16 en 17 jaar kan vooraf worden afgestemd of een
              ouder of verzorger als opdrachtgever optreedt of toestemming
              geeft.
            </p>
          </section>

          {/* Artikel 10 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              10. Verantwoordelijkheid van de cliënt
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coaching is een gezamenlijk proces. De cliënt blijft zelf
              verantwoordelijk voor keuzes, beslissingen en acties buiten de
              gesprekken.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              De coach begeleidt, denkt mee, stelt vragen en biedt inzicht en
              praktische handvatten, maar geeft geen garanties op specifieke
              resultaten.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              De cliënt of opdrachtgever is verantwoordelijk voor het delen van
              informatie die relevant kan zijn voor de begeleiding, zoals
              bestaande hulpverlening, ernstige klachten, medicatie, onveiligheid
              of andere omstandigheden die van invloed kunnen zijn op het
              traject.
            </p>
          </section>

          {/* Artikel 11 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              11. Tarieven
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              De actuele tarieven staan op de website. Op dit moment gelden de
              volgende tarieven:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>online gesprek van 60 minuten: €110 per sessie;</li>
              <li>
                wandelgesprek van 60–90 minuten: €125 per sessie;
              </li>
              <li>bundel van 5 online gesprekken: €525;</li>
              <li>bundel van 5 wandelgesprekken: €600.</li>
            </ul>
            <p className="body-md body-md-regular mt-3 mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw neemt in 2026 deel aan de
              kleineondernemersregeling. Daarom wordt er geen btw in rekening
              gebracht.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Op facturen wordt vermeld: &ldquo;Factuur vrijgesteld van
              omzetbelasting op grond van artikel 25 Wet OB.&rdquo;
            </p>
          </section>

          {/* Artikel 12 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              12. Facturatie en betaling
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Na het gesprek ontvangt de cliënt of opdrachtgever een factuur via
              Moneybird. Betaling dient te gebeuren binnen 14 dagen na
              factuurdatum, tenzij anders schriftelijk is afgesproken.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Bij niet-tijdige betaling kan de praktijk een
              betalingsherinnering sturen. Wanneer betaling uitblijft, mogen
              wettelijke rente en redelijke incassokosten in rekening worden
              gebracht.
            </p>
          </section>

          {/* Artikel 13 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              13. Annuleren of verplaatsen
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Een afspraak kan kosteloos worden geannuleerd of verplaatst tot 24
              uur voor aanvang van het gesprek.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Bij annulering binnen 24 uur of bij niet verschijnen mag het
              volledige tarief van het gesprek in rekening worden gebracht.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Bij ziekte, overmacht of bijzondere omstandigheden kan in overleg
              worden afgeweken van deze annuleringsregeling.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Wanneer de coach zelf een afspraak moet annuleren, wordt zo snel
              mogelijk een nieuwe afspraak gepland. In dat geval worden geen
              kosten in rekening gebracht voor de geannuleerde afspraak.
            </p>
          </section>

          {/* Artikel 14 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              14. Wandelcoaching
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Bij wandelcoaching vindt het gesprek buiten plaats, in of rondom
              Leiden. De cliënt is zelf verantwoordelijk voor passende kleding,
              schoenen en fysieke belastbaarheid. Wandelcoaching vindt plaats op
              een rustig tempo en is geen sportieve activiteit.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Bij slecht weer kan in overleg worden gekozen voor:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>verplaatsen van de afspraak;</li>
              <li>een online gesprek;</li>
              <li>doorgaan met aangepaste route of duur.</li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              De coach is niet aansprakelijk voor schade, letsel of verlies van
              eigendommen tijdens wandelcoaching, tenzij sprake is van opzet of
              grove nalatigheid.
            </p>
          </section>

          {/* Artikel 15 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              15. Online coaching
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Online gesprekken vinden plaats via Microsoft Teams of een ander
              vooraf afgesproken digitaal platform. De cliënt zorgt zelf voor:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>een goed werkende internetverbinding;</li>
              <li>
                een rustige en veilige plek om vrij te kunnen praten;
              </li>
              <li>voldoende privacy tijdens het gesprek.</li>
            </ul>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              De coach is niet verantwoordelijk voor technische problemen aan de
              kant van de cliënt. Wanneer een online gesprek door technische
              problemen niet goed kan plaatsvinden, zoeken partijen samen naar
              een redelijke oplossing.
            </p>
          </section>

          {/* Artikel 16 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              16. Vertrouwelijkheid
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Alles wat tijdens gesprekken wordt besproken, wordt vertrouwelijk
              behandeld. Informatie wordt niet gedeeld met derden zonder
              toestemming van de cliënt, behalve wanneer:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>er sprake is van acute of ernstige onveiligheid;</li>
              <li>
                er zorgen zijn over de veiligheid van een kind of andere
                betrokkene;
              </li>
              <li>
                de wet of professionele verantwoordelijkheid dit vraagt;
              </li>
              <li>dit nodig is voor facturatie of administratie;</li>
              <li>
                gegevens geanonimiseerd worden besproken voor intervisie,
                supervisie of professionele reflectie.
              </li>
            </ul>
            <p className="body-md body-md-regular mt-3 mb-3 text-brown-muted">
              Bij trajecten met jongeren, ouders of gezinnen wordt vooraf zo
              duidelijk mogelijk besproken welke informatie met wie gedeeld mag
              worden.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              De vertrouwelijkheid geldt ook voor eventuele werknotities die de
              coach maakt. Deze worden niet gedeeld met derden, tenzij sprake is
              van toestemming, een wettelijke verplichting of een zwaarwegende
              reden in verband met veiligheid of professionele
              verantwoordelijkheid.
            </p>
          </section>

          {/* Artikel 17 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              17. Cliëntadministratie en werknotities
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw houdt een beperkte cliëntadministratie
              bij voor contact, planning, facturatie en normale praktijkvoering.
              Daarnaast kan de coach korte werknotities maken over de
              begeleiding. Deze werknotities zijn bedoeld als geheugensteun voor
              de coach en om de coaching zorgvuldig te kunnen uitvoeren.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Werknotities kunnen bijvoorbeeld betrekking hebben op:
            </p>
            <ul className="body-md body-md-regular list-disc space-y-2 pl-6 text-brown-muted">
              <li>de hulpvraag;</li>
              <li>gemaakte afspraken;</li>
              <li>aandachtspunten uit gesprekken;</li>
              <li>doelen of vervolgstappen;</li>
              <li>evaluatie of afronding van het traject.</li>
            </ul>
            <p className="body-md body-md-regular mt-3 mb-3 text-brown-muted">
              Er wordt geen medisch dossier, behandeldossier of EPD bijgehouden.
              Er worden geen diagnoses gesteld of behandelplannen opgesteld.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Voor de verwerking van persoonsgegevens, bewaartermijnen en
              privacyrechten geldt de{" "}
              <Link
                href="/privacy"
                className="text-sage-dark underline-offset-4 hover:underline"
              >
                privacyverklaring
              </Link>{" "}
              van Coachingpraktijk De Leeuw.
            </p>
          </section>

          {/* Artikel 18 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              18. SKJ-registratie en professioneel handelen
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Mirjam de Leeuw is SKJ-geregistreerd. Zij werkt zorgvuldig en
              binnen de grenzen van haar professionele deskundigheid.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Wanneer een vraag buiten de mogelijkheden van coaching valt, kan
              zij adviseren om contact op te nemen met de huisarts, GGZ,
              wijkteam, jeugdteam of andere passende hulpverlening.
            </p>
          </section>

          {/* Artikel 19 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              19. Klachten
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw vindt het belangrijk dat cliënten zich
              zorgvuldig, respectvol en professioneel behandeld voelen. Ben je
              ergens ontevreden over, dan vraag ik je dit bij voorkeur eerst
              rechtstreeks met mij te bespreken. Vaak kan een klacht, zorg of
              misverstand in een gesprek worden opgehelderd of opgelost.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Een klacht kan ook schriftelijk worden ingediend via{" "}
              <a
                href="mailto:mirjam@deleeuw.nl"
                className="text-sage-dark underline-offset-4 hover:underline"
              >
                mirjam@deleeuw.nl
              </a>
              . Ik bevestig de ontvangst van de klacht en reageer inhoudelijk
              binnen 14 dagen. Samen kijken we naar een passende oplossing.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw biedt particuliere coaching en
              gezinsbegeleiding. Er wordt geen diagnostiek, GGZ-behandeling,
              medische zorg of crisisinterventie geboden.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Voor zover een klacht betrekking heeft op mijn beroepsmatig
              handelen als SKJ-geregistreerde professional, kan het in sommige
              gevallen mogelijk zijn om een klacht in te dienen bij SKJ.
              SKJ-tuchtrecht is bedoeld voor toetsing van professioneel handelen
              en is geen algemene klachtenregeling voor praktische, financiële of
              organisatorische geschillen.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Indien op enig moment blijkt dat de dienstverlening van
              Coachingpraktijk De Leeuw onder de Wkkgz en/of Jeugdwet valt, zal
              de praktijk zorgdragen voor aansluiting bij een passende wettelijke
              klachtenregeling.
            </p>
          </section>

          {/* Artikel 20 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              20. Aansprakelijkheid
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw voert de werkzaamheden naar beste
              inzicht en vermogen uit.
            </p>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              De praktijk is niet aansprakelijk voor directe of indirecte schade
              die voortvloeit uit beslissingen die de cliënt neemt naar
              aanleiding van coaching, tenzij sprake is van opzet of grove
              nalatigheid.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              De aansprakelijkheid van de praktijk is beperkt tot het bedrag dat
              voor het betreffende gesprek of traject is betaald, tenzij de wet
              anders bepaalt.
            </p>
          </section>

          {/* Artikel 21 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              21. Overmacht
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Bij overmacht hoeft de praktijk haar verplichtingen tijdelijk niet
              na te komen. Onder overmacht vallen onder andere ziekte,
              familieomstandigheden, technische storingen, extreme
              weersomstandigheden of andere omstandigheden buiten de invloed van
              de praktijk.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              In dat geval wordt samen gezocht naar een passende oplossing,
              zoals verplaatsing van de afspraak.
            </p>
          </section>

          {/* Artikel 22 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              22. Intellectueel eigendom
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Alle materialen, oefeningen, teksten en documenten die door
              Coachingpraktijk De Leeuw worden verstrekt, blijven eigendom van
              de praktijk, tenzij anders afgesproken.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              De cliënt mag deze materialen gebruiken voor eigen persoonlijk
              gebruik. Het is niet toegestaan om materialen zonder toestemming te
              kopiëren, verspreiden, publiceren of commercieel te gebruiken.
            </p>
          </section>

          {/* Artikel 23 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              23. Wijziging van de voorwaarden
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Coachingpraktijk De Leeuw mag deze algemene voorwaarden wijzigen.
              De meest actuele versie staat op de website.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Voor lopende trajecten gelden de voorwaarden waarmee de cliënt of
              opdrachtgever akkoord is gegaan, tenzij partijen samen anders
              afspreken.
            </p>
          </section>

          {/* Artikel 24 */}
          <section>
            <h2 className="heading-lg heading-lg-medium mb-3">
              24. Toepasselijk recht
            </h2>
            <p className="body-md body-md-regular mb-3 text-brown-muted">
              Op alle overeenkomsten met Coachingpraktijk De Leeuw is Nederlands
              recht van toepassing.
            </p>
            <p className="body-md body-md-regular text-brown-muted">
              Geschillen worden bij voorkeur eerst in onderling overleg opgelost.
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
