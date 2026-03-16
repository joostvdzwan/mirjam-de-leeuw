"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease, duration } from "@/lib/motion";

interface JourneyLineProps {
  className?: string;
}

export default function JourneyLine({ className = "" }: JourneyLineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      className={`absolute left-6 top-0 bottom-0 w-px overflow-visible md:left-8 ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="100%"
        stroke="currentColor"
        strokeWidth="1"
        className="text-sage/20"
        initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: shouldReduceMotion ? 0.01 : duration.glacial,
          ease: ease.gentle,
        }}
      />
    </svg>
  );
}
