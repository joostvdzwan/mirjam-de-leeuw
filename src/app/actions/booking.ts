"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import content from "@/content/nl.json";
import { isProductionDeploy } from "@/lib/kantlijn/schema";

export type BookingInput = {
  mode: "kennismaking" | "vraag";
  naam: string;
  email: string;
  zin: string;
  toestemming: boolean;
  /** Honeypot: hidden from people, filled in by bots. */
  website: string;
  page: string;
};

export type BookingResult = { ok: true } | { ok: false; error: "invalid" | "rate" | "send" };

const email = z.email().max(200);

const inputSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("kennismaking"),
    naam: z.string().trim().min(1).max(120),
    email,
    zin: z.string().trim().max(1500),
    toestemming: z.literal(true),
    page: z.string().max(200),
  }),
  z.object({
    mode: z.literal("vraag"),
    naam: z.string().trim().max(120),
    email: z.union([z.literal(""), email]),
    zin: z.string().trim().min(1).max(1500),
    toestemming: z.literal(true),
    page: z.string().max(200),
  }),
]);

/**
 * Best-effort limit per IP. It lives in memory per server instance, which is enough
 * against casual abuse together with the honeypot; use a shared store for more.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 4;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  hits.set(ip, [...recent, now]);
  if (hits.size > 5000) hits.clear();
  return false;
}

export async function sendBooking(raw: BookingInput): Promise<BookingResult> {
  if (raw.website) return { ok: true };

  const parsed = inputSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const input = parsed.data;

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { ok: false, error: "rate" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (isProductionDeploy()) {
      console.error("Booking: RESEND_API_KEY is not set");
      return { ok: false, error: "send" };
    }
    console.info(`Booking: no RESEND_API_KEY, ${input.mode} not sent (preview/dev)`);
    return { ok: true };
  }

  const isQuestion = input.mode === "vraag";
  const fromBlog = input.page.startsWith("/blog");
  const where = fromBlog ? "Kantlijn" : "de website";
  const subject = isQuestion
    ? "Nieuwe vraag via Kantlijn"
    : `Kennismaking via ${where}: ${input.naam}`;
  const details = [
    input.naam ? `Naam: ${input.naam}` : null,
    input.email ? `E-mail: ${input.email}` : null,
    `Pagina: ${input.page}`,
  ].filter((line): line is string => line !== null);
  const text = [
    isQuestion ? "Een lezer stelde een vraag via Kantlijn." : `Iemand wil kennismaken via ${where}.`,
    "",
    ...details,
    "",
    isQuestion ? "Vraag:" : fromBlog ? "Eerste zin:" : "Bericht:",
    input.zin || "(leeg gelaten)",
    "",
    "De bezoeker gaf toestemming om contact op te nemen. Dit bericht is nergens anders opgeslagen.",
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.KANTLIJN_MAIL_FROM ?? "Kantlijn <kantlijn@deleeuw.nl>",
      to: process.env.KANTLIJN_MAIL_TO ?? content.contact.email,
      replyTo: input.email || undefined,
      subject,
      text,
    });
    if (error) {
      console.error(`Booking: Resend refused the message (${error.name})`);
      return { ok: false, error: "send" };
    }
    return { ok: true };
  } catch (e) {
    console.error(`Booking: sending failed (${e instanceof Error ? e.name : "unknown"})`);
    return { ok: false, error: "send" };
  }
}
