"use client";

import { useEffect, useRef } from "react";

/**
 * A wrapped message keeps its full max-width in CSS, leaving a gap on the right.
 * Like a real chat app, shrink each bubble to its longest line. Without JS the bubbles stay as they are.
 */
export default function FitBubbles() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const thread = ref.current?.parentElement;
    if (!thread) return;
    const bubbles = [...thread.querySelectorAll<HTMLElement>("[data-msg]")];

    const fit = () => {
      for (const el of bubbles) {
        el.style.width = "";
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter((r) => r.width > 1);
        if (new Set(rects.map((r) => Math.round(r.top))).size < 2) continue;
        const text = Math.max(...rects.map((r) => r.right)) - Math.min(...rects.map((r) => r.left));
        const cs = getComputedStyle(el);
        const chrome =
          cs.boxSizing === "border-box"
            ? parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)
            : 0;
        el.style.width = `${Math.ceil(text + chrome)}px`;
      }
    };

    let lastWidth = 0;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === lastWidth) return;
      lastWidth = entry.contentRect.width;
      fit();
    });
    document.fonts?.ready.then(fit);
    observer.observe(thread);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} hidden />;
}
