import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import content from "@/content/nl.json";

const { pricing } = content;

export default function Pricing() {
  return (
    <SectionWrapper id="tarieven" background="cream">
      <MotionFadeIn className="text-center mb-12">
        <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
          {pricing.sectionLabel}
        </p>
        <h2
          id="tarieven-heading"
          className="display-md display-md-regular text-brown"
        >
          {pricing.heading}
        </h2>
      </MotionFadeIn>

      <StaggerContainer className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
        {pricing.cards.map((card) => (
          <StaggerItem key={card.title} className="h-full">
            <div
              className={`relative rounded-2xl p-8 h-full flex flex-col ${
                card.highlighted
                  ? "border-2 border-sage bg-sand shadow-lg"
                  : "border border-brown/5 bg-sand"
              }`}
            >
              {card.badge && (
                <span className="label-sm label-sm-medium absolute -top-3 left-8 rounded-full bg-sage-dark px-4 py-1 text-white">
                  {card.badge}
                </span>
              )}
              <h3 className="heading-lg heading-lg-medium mb-1 text-brown">
                {card.title}
              </h3>
              <p className="body-sm body-sm-regular mb-6 text-brown-muted">
                {card.subtitle}
              </p>
              <div className="mb-6">
                <span className="display-sm display-sm-semibold text-brown">
                  {card.price}
                </span>
                <span className="body-sm body-sm-regular ml-2 text-brown-muted">
                  {card.unit}
                </span>
              </div>
              <p className="body-md body-md-regular mb-8 text-brown-muted grow">
                {card.description}
              </p>
              <a
                href="#contact"
                className={`label-md label-md-medium block w-full rounded-full py-3 text-center transition-colors ${
                  card.highlighted
                    ? "bg-sage-dark text-white hover:bg-sage"
                    : "border-2 border-sage-dark text-sage-dark hover:bg-sage-dark hover:text-white"
                }`}
              >
                {card.cta}
              </a>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Bundles */}
      <MotionFadeIn className="mx-auto mt-12 max-w-3xl" variant="fadeIn">
        <h3 className="heading-md heading-md-medium mb-6 text-center text-brown">
          {pricing.bundles.heading}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {pricing.bundles.items.map((bundle) => (
            <div
              key={bundle.title}
              className="flex items-center justify-between rounded-xl border border-brown/5 bg-sand px-6 py-4"
            >
              <span className="body-md body-md-medium text-brown">
                {bundle.title}
              </span>
              <span className="heading-md heading-md-semibold text-sage-dark">
                {bundle.price}
              </span>
            </div>
          ))}
        </div>
        <p className="body-sm body-sm-regular mt-6 text-center text-brown-muted">
          {pricing.note}
        </p>
      </MotionFadeIn>
    </SectionWrapper>
  );
}
