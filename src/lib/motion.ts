import type { Variants } from "framer-motion";

export const ease = {
  gentle: [0.25, 0.1, 0.25, 1.0] as const,
  exhale: [0.16, 1, 0.3, 1] as const,
  enter: [0.0, 0.0, 0.2, 1] as const,
};

export const duration = {
  fast: 0.5,
  normal: 0.8,
  slow: 1.2,
  glacial: 1.8,
};

export const stagger = {
  tight: 0.06,
  normal: 0.1,
  relaxed: 0.15,
  lazy: 0.25,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1 },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export const reducedFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
