"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft,
  reducedFadeIn,
  ease,
  duration as dur,
} from "@/lib/motion";
import type { ReactNode } from "react";

const variantMap = { fadeUp, fadeIn, scaleIn, slideLeft };

interface MotionFadeInProps {
  children: ReactNode;
  variant?: keyof typeof variantMap;
  duration?: number;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}

export default function MotionFadeIn({
  children,
  variant = "fadeUp",
  duration = dur.normal,
  delay = 0,
  className,
  as = "div",
}: MotionFadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedFadeIn : variantMap[variant];
  const Component = as === "span" ? motion.span : motion.div;

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: ease.enter,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
