import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import content from "@/content/nl.json";

const { availability } = content;

export default function Availability() {
  return (
    <SectionWrapper id="beschikbaarheid" background="sand">
      <MotionFadeIn variant="fadeIn">
        <div className="text-center mb-12">
          <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
            {availability.sectionLabel}
          </p>
          <h2
            id="beschikbaarheid-heading"
            className="display-md display-md-regular text-brown"
          >
            {availability.heading}
          </h2>
        </div>

        <div className="mx-auto max-w-xl">
          <div className="space-y-4">
            {availability.slots.map((slot) => (
              <div
                key={`${slot.day}-${slot.format}`}
                className="flex items-center justify-between rounded-xl border border-brown/5 bg-cream px-6 py-5"
              >
                <div>
                  <p className="body-md body-md-semibold text-brown">
                    {slot.day}
                  </p>
                  <p className="body-sm body-sm-regular text-brown-muted">
                    {slot.time}
                  </p>
                </div>
                <span className="label-sm label-sm-medium rounded-full bg-sage/10 px-4 py-1.5 text-sage-dark">
                  {slot.format}
                </span>
              </div>
            ))}
          </div>
        </div>
      </MotionFadeIn>
    </SectionWrapper>
  );
}
