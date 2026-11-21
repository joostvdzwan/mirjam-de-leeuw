import Image from "next/image";
import type { ReactNode } from "react";
import { KANTLIJN } from "@/lib/kantlijn/config";

export function Avatar({ size }: { size: 26 | 28 | 32 | 72 }) {
  return (
    <Image
      className="avatar"
      src="/kantlijn/mirjam-gezicht.jpg"
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
    />
  );
}

export type BookingMode = "kennismaking" | "vraag";

/**
 * Opens the booking dialog (see BookingDialog). Without JavaScript it is a plain
 * link to the contact section of the site.
 */
export function OpenBooking({
  className,
  mode = "kennismaking",
  children,
}: {
  className?: string;
  mode?: BookingMode;
  children: ReactNode;
}) {
  return (
    <a className={className} href={KANTLIJN.contactFallback} data-open-booking={mode}>
      {children}
    </a>
  );
}

export function ChevronDown() {
  return (
    <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 15V3M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </svg>
  );
}
