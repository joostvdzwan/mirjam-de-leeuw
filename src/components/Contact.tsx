import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { duration } from "@/lib/motion";
import content from "@/content/nl.json";

const { contact } = content;

export default function Contact() {
  return (
    <SectionWrapper id="contact" background="sand">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <MotionFadeIn>
          <div>
            <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
              {contact.sectionLabel}
            </p>
            <h2
              id="contact-heading"
              className="display-md display-md-regular mb-6 text-brown"
            >
              {contact.heading}
            </h2>
            <p className="body-lg body-lg-regular mb-4 text-brown-muted">
              {contact.intro}
            </p>
            {"subIntro" in contact && (
              <p className="body-md body-md-regular mb-8 text-brown-muted">
                {(contact as { subIntro: string }).subIntro}
              </p>
            )}

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mt-0.5 shrink-0 text-sage-dark"
                  aria-hidden="true"
                >
                  <path
                    d="M3 5l7 5 7-5M3 5h14v10H3V5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href={`mailto:${contact.email}`}
                  className="body-md body-md-medium text-brown hover:text-sage-dark transition-colors"
                >
                  {contact.email}
                </a>
              </div>
              {"phone" in contact && (
                <div className="flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 shrink-0 text-sage-dark"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 4.5C3 3.672 3.672 3 4.5 3h2.382a1 1 0 01.894.553L9 6l-2 1.5c1.042 2.085 3.415 4.458 5.5 5.5L14 11l2.447 1.224a1 1 0 01.553.894V15.5c0 .828-.672 1.5-1.5 1.5A13 13 0 013 4.5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="body-md body-md-regular text-brown-muted">
                    {(contact as { phone: string }).phone}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mt-0.5 shrink-0 text-sage-dark"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M10 2C6.134 2 3 5.134 3 9c0 5 7 9 7 9s7-4 7-9c0-3.866-3.134-7-7-7z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="body-md body-md-regular text-brown-muted">
                  {contact.formats}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mt-0.5 shrink-0 text-sage-dark"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="body-md body-md-regular text-brown-muted">
                  {contact.kennismaking}
                </span>
              </div>
            </div>

            <MotionFadeIn variant="fadeIn" duration={duration.glacial}>
              <blockquote className="border-l-4 border-sage pl-6 py-2">
                <p className="quote text-brown">{contact.closingQuote}</p>
              </blockquote>
            </MotionFadeIn>
          </div>
        </MotionFadeIn>

        {/* Contact form */}
        <MotionFadeIn variant="fadeUp" delay={0.1}>
          <div className="rounded-2xl border border-brown/5 bg-cream p-5 md:p-8">
            <form
              action="#"
              method="POST"
              className="space-y-6"
              aria-label="Contactformulier"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="label-md label-md-medium mb-2 block text-brown"
                >
                  {contact.form.nameLabel}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder={contact.form.namePlaceholder}
                  required
                  className="body-md w-full rounded-xl border border-brown/10 bg-cream px-4 py-3 text-brown placeholder:text-brown-muted/40 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="label-md label-md-medium mb-2 block text-brown"
                >
                  {contact.form.emailLabel}
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder={contact.form.emailPlaceholder}
                  required
                  className="body-md w-full rounded-xl border border-brown/10 bg-cream px-4 py-3 text-brown placeholder:text-brown-muted/40 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="label-md label-md-medium mb-2 block text-brown"
                >
                  {contact.form.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder={contact.form.messagePlaceholder}
                  required
                  className="body-md w-full resize-none rounded-xl border border-brown/10 bg-cream px-4 py-3 text-brown placeholder:text-brown-muted/40 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>
              <button
                type="submit"
                className="label-md label-md-medium w-full rounded-full bg-sage-dark py-3.5 text-white transition-colors hover:bg-sage"
              >
                {contact.form.submit}
              </button>
            </form>
          </div>
        </MotionFadeIn>
      </div>
    </SectionWrapper>
  );
}
