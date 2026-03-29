import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import content from "@/content/nl.json";
import { duration } from "@/lib/motion";
import mirjamPhoto from "@/assets/mirjam-2.jpg";

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

          {"credentials" in aboutMe && (
            <MotionFadeIn variant="fadeIn" delay={0.25} duration={duration.slow}>
              <div className="mt-8 space-y-1">
                {(aboutMe as { credentials: string[] }).credentials.map((c, i) => (
                  <p key={i} className="body-sm body-sm-medium text-sage-dark">
                    {c}
                  </p>
                ))}
              </div>
            </MotionFadeIn>
          )}

          <MotionFadeIn variant="fadeIn" delay={0.3} duration={duration.slow}>
            <blockquote className="mt-10 border-l-4 border-sage pl-6 py-2">
              <p className="quote text-brown">{aboutMe.quote}</p>
            </blockquote>
          </MotionFadeIn>
        </div>

        <MotionFadeIn
          variant="scaleIn"
          duration={duration.slow}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl">
            <Image
              src={mirjamPhoto}
              alt={aboutMe.imageAlt}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 448px"
              placeholder="blur"
              quality={85}
            />
          </div>
        </MotionFadeIn>
      </div>
    </SectionWrapper>
  );
}
