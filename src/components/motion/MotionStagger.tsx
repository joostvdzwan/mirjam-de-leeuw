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
  stagger as staggerTokens,
} from "@/lib/motion";
import type { ReactNode } from "react";

const variantMap = { fadeUp, fadeIn, scaleIn, slideLeft };

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  stagger = staggerTokens.normal,
  className,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        staggerChildren: shouldReduceMotion ? 0 : stagger,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  variant?: keyof typeof variantMap;
  duration?: number;
  className?: string;
}

export function StaggerItem({
  children,
  variant = "fadeUp",
  duration = dur.normal,
  className,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedFadeIn : variantMap[variant];

  return (
    <motion.div
      variants={variants}
      transition={{
        duration: shouldReduceMotion ? 0.01 : duration,
        ease: ease.enter,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
