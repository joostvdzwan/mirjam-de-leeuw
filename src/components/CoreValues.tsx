import {
  CheckCircle,
  HandHeart,
  Leaf,
  Lightbulb,
  TreeStructure,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import content from "@/content/nl.json";

const { coreValues } = content;

const valueIcons: Record<string, Icon> = {
  "Rust & Ruimte": Leaf,
  Inzicht: Lightbulb,
  Praktisch: CheckCircle,
  Systeemgericht: TreeStructure,
  Verbinding: HandHeart,
};

function ValueIcon({ title }: { title: string }) {
  const IconComponent = valueIcons[title] ?? HandHeart;
  return <IconComponent size={36} aria-hidden="true" />;
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
