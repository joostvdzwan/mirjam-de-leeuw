import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import content from "@/content/nl.json";

const { coreValues } = content;

function ValueIcon({ title }: { title: string }) {
  switch (title) {
    case "Rust & Ruimte":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14 14-6.268 14-14S25.732 4 18 4z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 18h12M18 12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "Inzicht":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 24v6M14 32h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "Praktisch":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M8 20l6 6L28 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Systeemgericht":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="26" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="26" cy="26" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 14v4M14 24l-2-2M22 24l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M18 6C13 6 9 10.5 9 15c0 7 9 15 9 15s9-8 9-15c0-4.5-4-9-9-9z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

export default function CoreValues() {
  return (
    <SectionWrapper id="kernwaarden" background="cream">
      <MotionFadeIn className="text-center mb-12">
        <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
          {coreValues.sectionLabel}
        </p>
        <h2
          id="kernwaarden-heading"
          className="display-md display-md-regular text-brown"
        >
          {coreValues.heading}
        </h2>
      </MotionFadeIn>

      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {coreValues.values.map((value) => (
          <StaggerItem key={value.title} variant="scaleIn">
            <div className="text-center px-4 py-6">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-sage/10 p-4 text-sage-dark">
                <ValueIcon title={value.title} />
              </div>
              <h3 className="heading-md heading-md-medium mb-2 text-brown">
                {value.title}
              </h3>
              <p className="body-sm body-sm-regular text-brown-muted">
                {value.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
