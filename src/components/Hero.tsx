"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import content from "@/content/nl.json";
import { ease, duration, stagger, fadeUp, fadeIn } from "@/lib/motion";
import mirjamHero from "@/assets/mirjam-portret-hero.jpg";
import Logo from "./Logo";

const { hero } = content;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const titleLines = Array.isArray(hero.title) ? hero.title : [hero.title];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.45,
      },
    },
  };

  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger.tight * 1.5,
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
    <section className="relative bg-cream pt-20">
      {/* Background with slow breathe animation */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-linear-to-br from-sage-light/10 via-cream to-sand/40 hero-breathe-bg" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-cream to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-12 pb-20 md:pt-20 lg:pb-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7 lg:pb-20">
            <motion.p
              className="heading-sm heading-sm-medium mb-5 text-sage-dark"
              variants={gentleFadeIn(0)}
              initial="hidden"
              animate="visible"
            >
              {hero.subtitle}
            </motion.p>

            {/* Title - line by line, word by word */}
            <motion.h1
              className="display-lg display-lg-regular mb-8 text-balance text-brown"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {titleLines.map((line, lineIdx) => (
                <motion.span
                  key={lineIdx}
                  className="block"
                  variants={lineVariants}
                >
                  {line.split(" ").map((word, wordIdx) => (
                    <Fragment key={`${lineIdx}-${wordIdx}`}>
                      <motion.span
                        variants={wordVariants}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>{" "}
                    </Fragment>
                  ))}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="body-lg body-lg-regular mb-10 max-w-xl text-brown-muted"
              variants={gentleFadeIn(1.2)}
              initial="hidden"
              animate="visible"
            >
              {hero.intro}
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: shouldReduceMotion ? 0 : 1.6,
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
                href="#werkwijze"
                className="label-md label-md-medium inline-flex items-center justify-center rounded-full border-2 border-sage-dark px-8 py-3.5 text-sage-dark transition-colors hover:bg-sage-dark/10"
                variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: ease.enter }}
              >
                {hero.ctaSecondary}
              </motion.a>
            </motion.div>
          </div>

          {/* From lg the portrait hangs over the edge into the next section */}
          <motion.div
            className="relative max-w-sm sm:max-w-md lg:col-span-5 lg:-mb-24 lg:max-w-none lg:self-end"
            variants={gentleFadeUp(0.5)}
            initial="hidden"
            animate="visible"
          >
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-sage/50"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src={mirjamHero}
                alt={hero.imageAlt}
                className="photo-warm aspect-4/5 w-full h-auto object-cover object-top"
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, 448px"
                placeholder="blur"
                quality={85}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
