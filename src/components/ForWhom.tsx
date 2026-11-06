import {
  PersonSimpleWalk,
  Student,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import { duration, stagger } from "@/lib/motion";
import content from "@/content/nl.json";
import conversationPhoto from "@/assets/mirjam-gesprek-jongere.jpg";

const { forWhom } = content;

const groupIcons: Record<string, Icon> = {
  Jongeren: Student,
  Gezin: UsersThree,
  Volwassenen: PersonSimpleWalk,
};

function GroupIcon({ label }: { label: string }) {
  const IconComponent = groupIcons[label] ?? PersonSimpleWalk;
  return <IconComponent size={40} aria-hidden="true" />;
}

export default function ForWhom() {
  return (
    <SectionWrapper id="voor-wie" background="sand">
      <div className="mb-16 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <MotionFadeIn className="lg:order-last lg:col-span-5">
          <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
            {forWhom.sectionLabel}
          </p>
          <h2
            id="voor-wie-heading"
            className="display-md display-md-regular mb-4 text-brown"
          >
            {forWhom.heading}
          </h2>
          {"intro" in forWhom && (
            <p className="body-lg body-lg-regular max-w-xl text-brown-muted">
              {(forWhom as { intro: string }).intro}
            </p>
          )}
        </MotionFadeIn>

        {/* Bleeds past the content column to the left viewport edge, mirroring the photo in "Over mij" */}
        <MotionFadeIn
          variant="scaleIn"
          duration={duration.slow}
          className="-ml-6 lg:col-span-7 lg:ml-[calc(-1*max(1.5rem,(100vw-72rem)/2+1.5rem))]"
        >
          <div className="overflow-hidden rounded-r-3xl">
            <Image
              src={conversationPhoto}
              alt={forWhom.imageAlt}
              className="photo-warm aspect-4/3 w-full object-cover object-[40%_50%] lg:aspect-16/10"
              sizes="(min-width: 1024px) 60vw, 100vw"
              placeholder="blur"
              quality={80}
            />
          </div>
        </MotionFadeIn>
      </div>

      <StaggerContainer
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        stagger={stagger.relaxed}
      >
        {forWhom.groups.map((group) => (
          <StaggerItem key={group.title} variant="scaleIn">
            <div className="h-full rounded-2xl border border-brown/5 bg-cream p-5 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
