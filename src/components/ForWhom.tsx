import {
  PersonSimpleWalk,
  Student,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import { stagger } from "@/lib/motion";
import content from "@/content/nl.json";

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
      <MotionFadeIn className="text-left md:text-center mb-12">
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
          <p className="body-lg body-lg-regular mx-auto max-w-2xl text-brown-muted">
            {(forWhom as { intro: string }).intro}
          </p>
        )}
      </MotionFadeIn>

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
