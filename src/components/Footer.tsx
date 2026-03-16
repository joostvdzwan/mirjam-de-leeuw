import content from "@/content/nl.json";

const { footer } = content;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brown/5 bg-cream py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="heading-md heading-md-medium text-brown">
              {footer.practiceName}
            </p>
            <p className="body-sm body-sm-regular text-brown-muted">
              {footer.tagline} — {footer.location}
            </p>
          </div>
          <a
            href={`mailto:${footer.email}`}
            className="body-sm body-sm-medium text-sage-dark hover:text-sage transition-colors"
          >
            {footer.email}
          </a>
        </div>

        <hr className="my-8 border-brown/5" />

        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <p className="body-xs body-xs-regular text-brown-muted">
            {footer.disclaimer}
          </p>
          <p className="body-xs body-xs-regular text-brown-muted">
            {footer.copyright.replace("{year}", String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}
