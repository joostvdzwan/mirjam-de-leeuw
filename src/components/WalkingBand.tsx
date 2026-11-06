"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import MotionFadeIn from "./motion/MotionFadeIn";
import content from "@/content/nl.json";
import { duration } from "@/lib/motion";
import walkingPhoto from "@/assets/mirjam-wandelcoaching.jpg";

const { walkingBand } = content;

export default function WalkingBand() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <figure ref={ref} className="relative bg-brown">
      <div className="relative aspect-4/3 overflow-hidden lg:aspect-21/9 lg:max-h-180 lg:w-full">
        {/* Taller than the frame so the parallax shift never reveals an edge */}
        <motion.div
          className="absolute inset-x-0 -top-[8%] -bottom-[8%]"
          style={shouldReduceMotion ? undefined : { y }}
        >
          <Image
            src={walkingPhoto}
            alt={walkingBand.imageAlt}
            fill
            className="photo-warm object-cover object-[52%_40%] lg:object-[50%_15%]"
            sizes="100vw"
            placeholder="blur"
            quality={78}
          />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-t from-brown via-brown/15 to-transparent lg:bg-linear-to-tl lg:from-brown/75 lg:via-brown/10" />
      </div>

      {/* The couple sits left of centre, so from lg the caption takes the open grass bottom-right; below lg it sits under the photo */}
      <figcaption className="lg:absolute lg:inset-x-0 lg:bottom-0">
        <div className="mx-auto max-w-6xl px-6 pt-4 pb-12 md:pb-16 lg:flex lg:justify-end lg:pt-0">
          <MotionFadeIn duration={duration.slow}>
            <p className="heading-sm heading-sm-medium mb-3 text-cream/80">
              {walkingBand.label}
            </p>
            <blockquote>
              <p className="display-md display-md-regular max-w-sm text-balance text-cream">
                {walkingBand.quote}
              </p>
            </blockquote>
          </MotionFadeIn>
        </div>
      </figcaption>
    </figure>
  );
}
