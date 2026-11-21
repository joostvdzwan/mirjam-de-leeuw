"use client";

import { useEffect, useState } from "react";
import { ShareIcon } from "./primitives";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: document.title, url }).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Kopieer de link", url);
    }
  }

  return (
    <button
      className="icon-btn"
      type="button"
      onClick={share}
      aria-label={copied ? "Link gekopieerd" : "Deel dit artikel"}
    >
      <ShareIcon />
      <span role="status" className={copied ? "share-status" : "sr-only"}>
        {copied ? "Link gekopieerd" : ""}
      </span>
    </button>
  );
}
