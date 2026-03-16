import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import { stagger } from "@/lib/motion";
import content from "@/content/nl.json";

const { forWhom } = content;

function GroupIcon({ label }: { label: string }) {
  if (label === "Jongeren") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (label === "Gezin") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="14" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="26" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 32c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 32c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 10l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ForWhom() {
  return (
    <SectionWrapper id="voor-wie" background="sand">
      <MotionFadeIn className="text-center mb-12">
        <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
          {forWhom.sectionLabel}
        </p>
        <h2
          id="voor-wie-heading"
          className="display-md display-md-regular text-brown"
        >
          {forWhom.heading}
        </h2>
      </MotionFadeIn>

      <StaggerContainer
        className="grid gap-8 md:grid-cols-3"
        stagger={stagger.relaxed}
      >
        {forWhom.groups.map((group) => (
          <StaggerItem key={group.title} variant="scaleIn">
            <div className="rounded-2xl border border-brown/5 bg-cream p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 text-sage">
                <GroupIcon label={group.iconLabel} />
              </div>
              <h3 className="heading-lg heading-lg-medium mb-4 text-brown">
                {group.title}
              </h3>
              <p className="body-md body-md-regular text-brown-muted">
                {group.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
