import {
  Envelope,
  HandWaving,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import ContactForm from "./ContactForm";
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
                <Envelope
                  size={20}
                  className="mt-0.5 shrink-0 text-sage-dark"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${contact.email}`}
                  className="body-md body-md-medium text-brown hover:text-sage-dark transition-colors"
                >
                  {contact.email}
                </a>
              </div>
              {"phone" in contact && (contact as { phone: string }).phone && (
                <div className="flex items-start gap-3">
                  <Phone
                    size={20}
                    className="mt-0.5 shrink-0 text-sage-dark"
                    aria-hidden="true"
                  />
                  <span className="body-md body-md-regular text-brown-muted">
                    {(contact as { phone: string }).phone}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-0.5 shrink-0 text-sage-dark"
                  aria-hidden="true"
                />
                <span className="body-md body-md-regular text-brown-muted">
                  {contact.formats}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <HandWaving
                  size={20}
                  className="mt-0.5 shrink-0 text-sage-dark"
                  aria-hidden="true"
                />
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
            <ContactForm />
          </div>
        </MotionFadeIn>
      </div>
    </SectionWrapper>
  );
}
