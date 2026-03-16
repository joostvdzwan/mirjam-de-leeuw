import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import content from "@/content/nl.json";
import { duration } from "@/lib/motion";

const { aboutMe } = content;

export default function AboutMe() {
  return (
    <SectionWrapper id="over-mij" background="cream">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <MotionFadeIn>
            <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
              {aboutMe.sectionLabel}
            </p>
            <h2
              id="over-mij-heading"
              className="display-md display-md-regular mb-8 text-brown"
            >
              {aboutMe.heading}
            </h2>
          </MotionFadeIn>

          <StaggerContainer className="space-y-5">
            {aboutMe.paragraphs.map((p, i) => (
              <StaggerItem key={i}>
                <p className="body-md body-md-regular text-brown-muted">{p}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <MotionFadeIn variant="fadeIn" delay={0.3} duration={duration.slow}>
            <blockquote className="mt-10 border-l-4 border-sage pl-6 py-2">
              <p className="quote text-brown">{aboutMe.quote}</p>
            </blockquote>
          </MotionFadeIn>
        </div>

        {/* Photo placeholder */}
        <MotionFadeIn
          variant="scaleIn"
          duration={duration.slow}
          className="flex items-center justify-center"
        >
          <div
            className="aspect-3/4 w-full max-w-md rounded-2xl bg-linear-to-br from-sage-light/20 via-sand to-blush/15"
            role="img"
            aria-label={aboutMe.imageAlt}
          >
            <div className="flex h-full items-center justify-center">
              <span className="body-sm body-sm-regular text-brown-muted/50">
                Foto
              </span>
            </div>
          </div>
        </MotionFadeIn>
      </div>
    </SectionWrapper>
  );
}
