"use client";

import { motion, useReducedMotion } from "framer-motion";
import content from "@/content/nl.json";
import { ease, duration, stagger, fadeUp, fadeIn } from "@/lib/motion";

const { hero } = content;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const words = hero.title.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger.lazy,
      },
    },
  };

  const wordVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration.slow,
        ease: ease.enter,
      },
    },
  };

  const gentleFadeUp = (delay: number) => ({
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration.normal,
        delay: shouldReduceMotion ? 0 : delay,
        ease: ease.enter,
      },
    },
  });

  const gentleFadeIn = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration.normal,
        delay: shouldReduceMotion ? 0 : delay,
        ease: ease.exhale,
      },
    },
  });

  return (
    <section className="relative flex min-h-dvh items-center bg-cream pt-20">
      {/* Background with slow breathe animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-linear-to-br from-sage-light/10 via-cream to-sand/40 hero-breathe-bg"
          role="img"
          aria-label={hero.imageAlt}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-cream to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Subtitle */}
          <motion.p
            className="heading-sm heading-sm-medium mb-4 text-sage-dark"
            variants={gentleFadeIn(0)}
            initial="hidden"
            animate="visible"
          >
            {hero.subtitle}
          </motion.p>

          {/* Title - word by word */}
          <motion.h1
            className="display-lg display-lg-regular mb-6 text-brown"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="mr-[0.3em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="quote mb-8 text-brown-muted"
            variants={gentleFadeUp(1.2)}
            initial="hidden"
            animate="visible"
          >
            {hero.tagline}
          </motion.p>

          {/* Opening line */}
          <motion.p
            className="body-lg body-lg-regular mb-10 max-w-xl text-brown-muted"
            variants={gentleFadeIn(1.6)}
            initial="hidden"
            animate="visible"
          >
            {hero.intro}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: shouldReduceMotion ? 0 : 2.0,
                  staggerChildren: shouldReduceMotion ? 0 : stagger.normal,
                },
              },
            }}
          >
            <motion.a
              href="#contact"
              className="label-md label-md-medium inline-flex items-center justify-center rounded-full bg-sage-dark px-8 py-3.5 text-white transition-colors hover:bg-sage"
              variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: duration.fast, ease: ease.enter }}
            >
              {hero.ctaPrimary}
            </motion.a>
            <motion.a
              href="#tarieven"
              className="label-md label-md-medium inline-flex items-center justify-center rounded-full border-2 border-sage-dark px-8 py-3.5 text-sage-dark transition-colors hover:bg-sage-dark hover:text-white"
              variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: duration.fast, ease: ease.enter }}
            >
              {hero.ctaSecondary}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
