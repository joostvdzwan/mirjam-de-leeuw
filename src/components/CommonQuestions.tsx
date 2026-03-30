import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import { stagger } from "@/lib/motion";
import content from "@/content/nl.json";

const { commonQuestions } = content;

export default function CommonQuestions() {
  return (
    <SectionWrapper id="hulpvragen" background="cream">
      <MotionFadeIn className="text-center mb-12">
        {commonQuestions.sectionLabel !== commonQuestions.heading && (
          <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
            {commonQuestions.sectionLabel}
          </p>
        )}
        <h2
          id="hulpvragen-heading"
          className="display-md display-md-regular mb-4 text-brown"
        >
          {commonQuestions.heading}
        </h2>
        <p className="body-lg body-lg-regular mx-auto max-w-2xl text-brown-muted">
          {commonQuestions.intro}
        </p>
      </MotionFadeIn>

      <div className="mx-auto max-w-3xl">
        <StaggerContainer
          className="flex flex-wrap justify-center gap-3"
          stagger={stagger.tight}
        >
          {commonQuestions.items.map((item) => (
            <StaggerItem key={item} variant="slideLeft">
              <span className="body-md body-md-regular inline-block rounded-full border border-sage/20 bg-sand px-5 py-2.5 text-brown">
                {item}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
}
