"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import content from "@/content/nl.json";
import { ease, duration, stagger, fadeUp } from "@/lib/motion";

const { nav } = content;

const sectionIds = nav.links.map((link) => link.href.replace("#", ""));

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-20% 0px -75% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled
          ? "rgba(250, 247, 242, 0.9)"
          : "rgba(250, 247, 242, 0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderBottomColor: scrolled
          ? "rgba(59, 50, 41, 0.05)"
          : "rgba(59, 50, 41, 0)",
      }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.3,
        ease: ease.gentle,
      }}
      style={{ borderBottomWidth: "1px", borderBottomStyle: "solid" }}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Hoofdnavigatie"
      >
        <a
          href="#"
          className="heading-md heading-md-semibold text-brown hover:text-sage-dark transition-colors"
          onClick={handleNavClick}
        >
          Praktijk De Leeuw
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {nav.links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`label-md label-md-medium relative py-1 transition-colors ${
                  isActive
                    ? "text-sage-dark"
                    : "text-brown-muted hover:text-brown"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage-dark"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}
          <motion.a
            href="#contact"
            className="label-md label-md-medium rounded-full bg-sage-dark px-5 py-2.5 text-white transition-colors hover:bg-sage"
            whileHover={{ scale: 1.02, boxShadow: "0 4px 16px rgba(94, 107, 82, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: ease.gentle }}
          >
            {nav.cta}
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Menu sluiten" : "Menu openen"}
        >
          <div className="flex w-6 flex-col gap-1.5">
            <motion.span
              className="block h-0.5 w-full bg-brown origin-center"
              animate={
                mobileMenuOpen
                  ? { rotate: 45, y: 8 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: ease.gentle }}
            />
            <motion.span
              className="block h-0.5 w-full bg-brown"
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-full bg-brown origin-center"
              animate={
                mobileMenuOpen
                  ? { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: ease.gentle }}
            />
          </div>
        </button>

        {/* Mobile overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-cream lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.3,
                ease: ease.gentle,
              }}
              aria-hidden={!mobileMenuOpen}
            >
              <motion.div
                className="flex h-full flex-col items-center justify-center gap-8"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: shouldReduceMotion ? 0 : stagger.relaxed,
                      delayChildren: shouldReduceMotion ? 0 : 0.15,
                    },
                  },
                }}
              >
                {nav.links.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`display-sm display-sm-regular transition-colors ${
                      activeSection === link.href.replace("#", "")
                        ? "text-sage-dark"
                        : "text-brown-muted hover:text-brown"
                    }`}
                    aria-current={
                      activeSection === link.href.replace("#", "")
                        ? "true"
                        : undefined
                    }
                    onClick={handleNavClick}
                    variants={
                      shouldReduceMotion
                        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                        : fadeUp
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : duration.fast,
                      ease: ease.enter,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  className="label-md label-md-medium mt-4 rounded-full bg-sage-dark px-8 py-3 text-white transition-colors hover:bg-sage"
                  onClick={handleNavClick}
                  variants={
                    shouldReduceMotion
                      ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                      : fadeUp
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : duration.fast,
                    ease: ease.enter,
                  }}
                >
                  {nav.cta}
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
