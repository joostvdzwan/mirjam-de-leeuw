import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import JourneyLine from "./motion/JourneyLine";
import { stagger } from "@/lib/motion";
import content from "@/content/nl.json";

const { approach } = content;

export default function Approach() {
  return (
    <SectionWrapper id="werkwijze" background="sand">
      <MotionFadeIn className="text-center mb-16">
        <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
          {approach.sectionLabel}
        </p>
        <h2
          id="werkwijze-heading"
          className="display-md display-md-regular mb-4 text-brown"
        >
          {approach.heading}
        </h2>
        <p className="body-lg body-lg-regular mx-auto max-w-2xl text-brown-muted">
          {approach.intro}
        </p>
      </MotionFadeIn>

      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <JourneyLine />

          <StaggerContainer
            className="space-y-12"
            stagger={stagger.relaxed}
          >
            {approach.steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="relative flex gap-6 md:gap-8">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-dark text-white md:h-16 md:w-16">
                    <span className="heading-md heading-md-medium md:heading-lg">
                      {step.number}
                    </span>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <h3 className="heading-lg heading-lg-medium mb-2 text-brown">
                      {step.title}
                    </h3>
                    <p className="body-md body-md-regular text-brown-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </SectionWrapper>
  );
}
