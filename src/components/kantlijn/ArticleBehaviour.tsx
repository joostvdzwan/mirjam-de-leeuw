"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * One decision per article visit, so React's dev double-mount reuses it instead of
 * re-reading the "seen" flag it just wrote. A real unmount clears it on the next tick.
 */
let visit: { slug: string; first: boolean; softNav: boolean } | null = null;
let hasMounted = false;
let resetVisit: ReturnType<typeof setTimeout> | undefined;

const isDocumentLoad = () => {
  const entry = performance.getEntriesByType("navigation")[0];
  return !entry || new URL(entry.name).pathname === window.location.pathname;
};

const seenKey = (slug: string) => `kl-seen-${slug}`;

function decideVisit(slug: string) {
  const root = document.documentElement;
  // The inline script may already have run, on a document load or a soft navigation.
  let first = root.classList.contains("first-visit");
  try {
    if (!first) first = !sessionStorage.getItem(seenKey(slug));
    sessionStorage.setItem(seenKey(slug), "1");
  } catch {}
  return { slug, first, softNav: hasMounted || !isDocumentLoad() };
}

/** Inline, so the class is on <html> before the bubble paints. Content is visible without it. */
export function FirstVisitScript({ slug }: { slug: string }) {
  const code = `try{var k=${JSON.stringify(seenKey(slug))};if(!sessionStorage.getItem(k)){document.documentElement.classList.add("first-visit");sessionStorage.setItem(k,"1")}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

const clamp = (n: number) => Math.max(0, Math.min(1, n));

export default function ArticleBehaviour({ slug }: { slug: string }) {
  // First-visit motion and focus management on client-side navigation.
  useLayoutEffect(() => {
    const root = document.documentElement;
    clearTimeout(resetVisit);
    if (visit?.slug !== slug) visit = decideVisit(slug);
    root.classList.toggle("first-visit", visit.first);
    if (visit.softNav) document.querySelector<HTMLElement>(".article-title")?.focus({ preventScroll: true });
    hasMounted = true;
    return () => {
      root.classList.remove("first-visit");
      resetVisit = setTimeout(() => (visit = null));
    };
  }, [slug]);

  // Reading progress and the table-of-contents rail.
  useEffect(() => {
    const body = document.querySelector<HTMLElement>(".article-body");
    if (!body) return;
    const bars = document.querySelectorAll<HTMLElement>("[data-progressbar]");
    const headings = Array.from(body.querySelectorAll<HTMLElement>(":scope > h2"));
    const faq = body.querySelector<HTMLElement>(".faq");
    const tocItems = Array.from(document.querySelectorAll<HTMLElement>(".toc-rail li"));
    const sections = faq ? [...headings, faq] : headings;
    let frame = 0;

    function update() {
      frame = 0;
      if (!body) return;
      const r = body.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      const total = r.height - mid;
      const p = total > 0 ? Math.round(clamp((mid - r.top) / total) * 100) : 0;
      document.body.style.setProperty("--progress", `${p}%`);
      bars.forEach((b) => b.setAttribute("aria-valuenow", String(p)));

      const reading = window.innerHeight * 0.4;
      const tops = sections.map((el) => el.getBoundingClientRect().top);
      tops.push(r.bottom);
      tocItems.forEach((li, i) => {
        const start = tops[i];
        const end = tops[i + 1] ?? start;
        const state = start > reading ? "ahead" : end > reading ? "current" : "read";
        const fill = state === "read" ? 1 : state === "current" ? clamp((reading - start) / (end - start || 1)) : 0;
        li.dataset.state = state;
        li.style.setProperty("--toc-fill", fill.toFixed(3));
        if (state === "current") li.querySelector("a")?.setAttribute("aria-current", "location");
        else li.querySelector("a")?.removeAttribute("aria-current");
      });
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(body);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.body.style.removeProperty("--progress");
    };
  }, [slug]);

  // Margin rules draw themselves as the note scrolls into view.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const root = document.documentElement;
    const notes = document.querySelectorAll<HTMLElement>(".margin-note");
    if (!notes.length) return;
    root.classList.add("kl-draw");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-drawn");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.4 }
    );
    notes.forEach((n) => io.observe(n));
    return () => {
      io.disconnect();
      root.classList.remove("kl-draw");
    };
  }, [slug]);

  return null;
}
