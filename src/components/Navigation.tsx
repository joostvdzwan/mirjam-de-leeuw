"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import content from "@/content/nl.json";
import { ease, duration, stagger, fadeUp } from "@/lib/motion";
const { nav } = content;

const sectionIds = nav.links
  .filter((link) => link.href.startsWith("#"))
  .map((link) => link.href.slice(1));

const kantlijnLabel = "font-[family-name:var(--font-heading)] italic";
const MotionLink = motion.create(Link);

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const solid = scrolled || isBlog;
  const homeHref = isHome ? "#" : "/";

  const toLink = (href: string) => (href.startsWith("#") && !isHome ? `/${href}` : href);
  const isActive = (href: string) =>
    href.startsWith("#") ? isHome && activeSection === href.slice(1) : pathname === href;
  const currentType = (href: string) =>
    href.startsWith("#") ? "true" : ("page" as const);

  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome]);

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

  // On blog pages the button opens the booking dialog; the link is the fallback without JS.
  const ctaProps = isBlog
    ? { href: "/#contact", "data-open-booking": "kennismaking" }
    : { href: toLink("#contact") };

  const mobileItem = {
    variants: shouldReduceMotion
      ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
      : fadeUp,
    transition: {
      duration: shouldReduceMotion ? 0.01 : duration.fast,
      ease: ease.enter,
    },
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={false}
        animate={{
          backgroundColor: solid
            ? isBlog
              ? "rgba(250, 247, 242, 1)"
              : "rgba(250, 247, 242, 0.9)"
            : "rgba(250, 247, 242, 0)",
          backdropFilter: solid && !isBlog ? "blur(12px)" : "blur(0px)",
          borderBottomColor: solid
            ? isBlog
              ? "rgba(59, 50, 41, 0.12)"
              : "rgba(59, 50, 41, 0.05)"
            : "rgba(59, 50, 41, 0)",
        }}
        transition={{
          duration: shouldReduceMotion ? 0.01 : 0.3,
          ease: ease.gentle,
        }}
        style={{
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          viewTransitionName: "site-header",
        }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
          aria-label="Hoofdnavigatie"
        >
          <a
            href={homeHref}
            className="heading-md heading-md-semibold text-brown hover:text-sage-dark transition-colors"
            onClick={handleNavClick}
          >
            Coachingpraktijk De Leeuw
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 whitespace-nowrap lg:flex">
            {nav.links.map((link) => {
              const active = isActive(link.href);
              const Anchor = link.href.startsWith("#") ? "a" : Link;
              return (
                <Anchor
                  key={link.href}
                  href={toLink(link.href)}
                  className={`label-md label-md-medium relative py-1 transition-colors ${active
                      ? "text-sage-dark"
                      : "text-brown-muted hover:text-brown"
                    }`}
                  aria-current={active ? currentType(link.href) : undefined}
                >
                  {link.label}
                  {active && (
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
                </Anchor>
              );
            })}
            <Link
              href={nav.blog.href}
              className={`relative py-1 text-[17px] leading-none transition-colors ${kantlijnLabel} ${isBlog
                  ? "text-sage-dark"
                  : "text-brown-muted hover:text-brown"
                }`}
              aria-current={isBlog ? "page" : undefined}
            >
              {nav.blog.label}
              {isBlog && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sage-dark"
                />
              )}
            </Link>
            <motion.a
              {...ctaProps}
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
            <div className="flex w-6 flex-col gap-[7px]">
              <motion.span
                className="block h-0.5 w-full bg-brown origin-center"
                animate={
                  mobileMenuOpen
                    ? { rotate: 45, y: 4.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: ease.gentle }}
              />
              <motion.span
                className="block h-0.5 w-full bg-brown origin-center"
                animate={
                  mobileMenuOpen
                    ? { rotate: -45, y: -4.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: ease.gentle }}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay — outside header to avoid transform breaking fixed positioning */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.3,
              ease: ease.gentle,
            }}
            aria-hidden={!mobileMenuOpen}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="heading-md heading-md-semibold text-brown">
                Coachingpraktijk De Leeuw
              </span>
              <button
                className="flex h-10 w-10 items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Menu sluiten"
              >
                <div className="flex w-6 flex-col gap-1.5">
                  <span className="block h-0.5 w-full bg-brown origin-center rotate-45 translate-y-[4px]" />
                  <span className="block h-0.5 w-full bg-brown origin-center -rotate-45 -translate-y-[4px]" />
                </div>
              </button>
            </div>
            <motion.div
              className="flex h-[calc(100%-60px)] flex-col items-center justify-center gap-8 -mt-20"
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
              {nav.links.map((link) => {
                const active = isActive(link.href);
                const Anchor = link.href.startsWith("#") ? motion.a : MotionLink;
                return (
                  <Anchor
                    key={link.href}
                    href={toLink(link.href)}
                    className={`display-sm display-sm-regular transition-colors ${active
                        ? "text-sage-dark"
                        : "text-brown-muted hover:text-brown"
                      }`}
                    aria-current={active ? currentType(link.href) : undefined}
                    onClick={handleNavClick}
                    {...mobileItem}
                  >
                    {link.label}
                  </Anchor>
                );
              })}
              <MotionLink
                href={nav.blog.href}
                className={`display-sm display-sm-regular transition-colors ${kantlijnLabel} ${isBlog
                    ? "text-sage-dark"
                    : "text-brown-muted hover:text-brown"
                  }`}
                aria-current={isBlog ? "page" : undefined}
                onClick={handleNavClick}
                {...mobileItem}
              >
                {nav.blog.label}
              </MotionLink>
              <motion.a
                {...ctaProps}
                className="label-md label-md-medium mt-4 rounded-full bg-sage-dark px-8 py-3 text-white transition-colors hover:bg-sage"
                onClick={handleNavClick}
                {...mobileItem}
              >
                {nav.cta}
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
