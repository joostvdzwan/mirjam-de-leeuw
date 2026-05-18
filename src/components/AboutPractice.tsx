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
        <StaggerContainer className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {aboutPractice.formats.items.map((item, idx) => {
            const isFeatured = idx === 0;
            const meta = item as {
              title: string;
              description: string;
              label?: string;
              forYou?: string;
              logo?: string;
              logoAlt?: string;
            };
            return (
              <StaggerItem
                key={item.title}
                variant="scaleIn"
                className={`h-full ${
                  isFeatured ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div
                  className={`group flex h-full flex-col rounded-2xl border bg-cream p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isFeatured
                      ? "border-sage/25 hover:border-sage/50"
                      : "border-brown/5 hover:border-sage/30"
                  }`}
                >
                  {meta.label && (
                    <span className="label-sm label-sm-medium mb-3 uppercase tracking-[0.12em] text-sage-dark">
                      {meta.label}
                    </span>
                  )}
                  <h4
                    className={`mb-3 text-brown ${
                      isFeatured
                        ? "heading-lg heading-lg-medium"
                        : "heading-md heading-md-medium"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="body-md body-md-regular text-brown-muted">
                    {item.description}
                  </p>
                  {meta.logo && (
                    <div
                      role="img"
                      aria-label={meta.logoAlt ?? meta.title}
                      className="mt-6 size-96 max-md:size-72 bg-sage opacity-80"
                      style={{
                        WebkitMaskImage: `url(${meta.logo})`,
                        maskImage: `url(${meta.logo})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        WebkitMaskPosition: "left center",
                        maskPosition: "left center",
                      }}
                    />
                  )}
                  {meta.forYou && (
                    <div className="mt-auto pt-6">
                      <div className="border-t border-brown/10 pt-5">
                        <p className="label-sm label-sm-medium mb-1.5 uppercase tracking-[0.12em] text-sage-dark">
                          Voor jou als
                        </p>
                        <p className="body-sm body-sm-regular text-brown-muted">
                          {meta.forYou}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </MotionFadeIn>

      <MotionFadeIn variant="fadeIn" delay={0.1}>
        <div className="max-w-3xl border-l-2 border-sage/40 pl-5 py-1">
          <p className="body-md body-md-regular text-brown-muted">
            <span className="body-md-medium text-brown">
              {aboutPractice.disclaimer.heading}
            </span>{" "}
            {aboutPractice.disclaimer.text}
          </p>
        </div>
      </MotionFadeIn>
    </SectionWrapper>
  );
}
