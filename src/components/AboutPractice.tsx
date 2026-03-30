import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import content from "@/content/nl.json";

const { aboutPractice } = content;

export default function AboutPractice() {
  return (
    <SectionWrapper id="over-de-praktijk" background="sand">
      <MotionFadeIn>
        {aboutPractice.sectionLabel !== aboutPractice.heading && (
          <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
            {aboutPractice.sectionLabel}
          </p>
        )}
        <h2
          id="over-de-praktijk-heading"
          className="display-md display-md-regular mb-8 text-brown"
        >
          {aboutPractice.heading}
        </h2>
      </MotionFadeIn>

      <StaggerContainer className="mb-16 max-w-3xl space-y-6">
        {aboutPractice.paragraphs.map((p, i) => (
          <StaggerItem key={i}>
            <p className="body-lg body-lg-regular text-brown-muted">{p}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <MotionFadeIn className="mb-16">
        <h3 className="heading-lg heading-lg-medium mb-8 text-brown">
          {aboutPractice.formats.heading}
        </h3>
        <StaggerContainer className="grid gap-6 md:grid-cols-2">
          {aboutPractice.formats.items.map((item) => (
            <StaggerItem key={item.title} variant="scaleIn">
              <div className="rounded-2xl border border-brown/5 bg-cream p-5 md:p-8">
                <h4 className="heading-md heading-md-medium mb-3 text-brown">
                  {item.title}
                </h4>
                <p className="body-md body-md-regular text-brown-muted">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </MotionFadeIn>

      <MotionFadeIn variant="fadeIn" delay={0.1}>
        <div className="rounded-2xl border border-blush/30 bg-cream p-5 md:p-8 max-w-3xl">
          <h3 className="heading-md heading-md-medium mb-3 text-brown">
            {aboutPractice.disclaimer.heading}
          </h3>
          <p className="body-md body-md-regular text-brown-muted">
            {aboutPractice.disclaimer.text}
          </p>
        </div>
      </MotionFadeIn>
    </SectionWrapper>
  );
}
