import Link from "next/link";
import content from "@/content/nl.json";
import { type PageSlug, getPage, pagePath } from "@/lib/content-pages";
import Logo from "./Logo";

const { footer, footerLinks } = content;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brown/5 bg-cream py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center max-md:flex-col max-md:items-center gap-8 max-md:gap-6">
            <Logo className="w-40 text-sage" />
            <div className="max-md:text-center">
              <p className="heading-md heading-md-medium text-brown">
                {footer.practiceName}
              </p>
              <p className="body-sm body-sm-regular text-brown-muted max-md:mt-2">
                {footer.tagline} — {footer.location}
              </p>
            </div>
          </div>
          <a
            href={`mailto:${footer.email}`}
            className="body-sm body-sm-medium text-sage-dark hover:text-sage transition-colors max-md:mt-8"
          >
            {footer.email}
          </a>
        </div>

        <hr className="my-8 border-brown/5" />

        <nav
          aria-label="Meer over de praktijk"
          className="mb-8 flex flex-col items-center gap-4 text-center md:items-start md:text-left"
        >
          {footerLinks.map((group) => (
            <div
              key={group.heading}
              className="flex flex-col items-center gap-2 md:flex-row md:gap-4"
            >
              <p className="body-xs body-xs-medium text-brown">{group.heading}</p>
              {group.links.map((slug) => (
                <Link
                  key={slug}
                  href={pagePath(slug as PageSlug)}
                  className="body-xs body-xs-regular text-brown-muted hover:text-sage-dark transition-colors"
                >
                  {getPage(slug as PageSlug).label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="space-y-4 text-center md:text-left">
          <p className="body-xs body-xs-regular text-brown-muted">
            {footer.disclaimer}
          </p>
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <Link
              href="/privacy"
              className="body-xs body-xs-regular text-brown-muted hover:text-sage-dark transition-colors"
            >
              Privacyverklaring
            </Link>
            <span className="hidden text-brown-muted md:inline" aria-hidden="true">
              ·
            </span>
            <Link
              href="/algemene-voorwaarden"
              className="body-xs body-xs-regular text-brown-muted hover:text-sage-dark transition-colors"
            >
              Algemene voorwaarden
            </Link>
            <span className="hidden text-brown-muted md:inline" aria-hidden="true">
              ·
            </span>
            <p className="body-xs body-xs-regular text-brown-muted">
              {footer.copyright.replace("{year}", String(year))}
            </p>
            <span className="hidden text-brown-muted md:inline" aria-hidden="true">
              ·
            </span>
            <p className="body-xs body-xs-regular text-brown-muted/70">
              {footer.poweredBy.label}{" "}
              <a
                href={footer.poweredBy.url}
                target="_blank"
                rel="noopener"
                className="hover:text-sage-dark transition-colors"
              >
                {footer.poweredBy.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
