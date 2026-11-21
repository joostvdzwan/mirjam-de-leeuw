"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { type BookingResult, sendBooking } from "@/app/actions/booking";
import FitBubbles from "./FitBubbles";
import { CloseIcon, type BookingMode } from "./primitives";

type Values = { naam: string; email: string; zin: string; toestemming: boolean };
type Field = keyof Values;
type Sent = { mode: BookingMode; line: string; firstName: string; email: string };

const EMPTY: Values = { naam: "", email: "", zin: "", toestemming: false };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FRONT_SEGMENTS = new Set(["", "psych-k", "mijn-verhaal"]);

const ERRORS: Record<Field, Record<BookingMode, string>> = {
  naam: {
    kennismaking: "Vul je naam in, dan weet ik hoe ik je mag aanspreken.",
    vraag: "",
  },
  email: {
    kennismaking: "Dit e-mailadres lijkt niet te kloppen.",
    vraag: "Dit e-mailadres lijkt niet te kloppen. Je mag het ook leeg laten.",
  },
  zin: { kennismaking: "", vraag: "Schrijf je vraag op. Eén zin is genoeg." },
  toestemming: {
    kennismaking: "Zonder jouw toestemming kan ik geen contact opnemen.",
    vraag: "Zonder jouw toestemming kan ik je vraag niet gebruiken.",
  },
};

function validate(mode: BookingMode, v: Values): Field[] {
  const invalid: Field[] = [];
  if (mode === "kennismaking" && !v.naam.trim()) invalid.push("naam");
  if (mode === "vraag" && !v.zin.trim()) invalid.push("zin");
  const email = v.email.trim();
  if (mode === "kennismaking" ? !EMAIL_RE.test(email) : email !== "" && !EMAIL_RE.test(email)) invalid.push("email");
  if (!v.toestemming) invalid.push("toestemming");
  return invalid;
}

function Signature() {
  return (
    <div className="signature">
      <Image className="avatar" src="/kantlijn/mirjam-gezicht.jpg" alt="" width={26} height={26} sizes="26px" />
      Mirjam de Leeuw
    </div>
  );
}

export default function BookingDialog({
  replyTime,
  safety,
  fallbackEmail,
}: {
  replyTime: string;
  safety: string;
  fallbackEmail: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const doneTitleRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<BookingMode>("kennismaking");
  const [values, setValues] = useState<Values>(EMPTY);
  const [invalid, setInvalid] = useState<Field[]>([]);
  const [failure, setFailure] = useState<Exclude<BookingResult, { ok: true }>["error"] | null>(null);
  const [sent, setSent] = useState<Sent | null>(null);
  const [pending, startTransition] = useTransition();

  const pathname = usePathname();
  const onArticle = !FRONT_SEGMENTS.has(pathname.replace(/^\/blog\/?/, "").split("/")[0] ?? "");

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const trigger = (e.target as Element | null)?.closest<HTMLElement>("[data-open-booking]");
      const dialog = dialogRef.current;
      if (!trigger || !dialog) return;
      e.preventDefault();
      openerRef.current = trigger;
      setMode(trigger.dataset.openBooking === "vraag" ? "vraag" : "kennismaking");
      setInvalid([]);
      setFailure(null);
      if (!dialog.open) dialog.showModal();
      requestAnimationFrame(() => (doneTitleRef.current ?? titleRef.current)?.focus());
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function close() {
    dialogRef.current?.close();
  }

  function finish() {
    setValues(EMPTY);
    setSent(null);
    formRef.current?.reset();
    close();
  }

  function set<K extends Field>(field: K, value: Values[K]) {
    setValues((v) => ({ ...v, [field]: value }));
    if (invalid.includes(field)) setInvalid((list) => list.filter((f) => f !== field));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validate(mode, values);
    setInvalid(errors);
    setFailure(null);
    if (errors.length) {
      document.getElementById(`kl-${errors[0]}`)?.focus();
      return;
    }
    startTransition(async () => {
      const result = await sendBooking({
        mode,
        naam: mode === "kennismaking" ? values.naam.trim() : "",
        email: values.email.trim(),
        zin: values.zin.trim(),
        toestemming: values.toestemming,
        website: honeypotRef.current?.value ?? "",
        page: pathname,
      });
      if (!result.ok) {
        setFailure(result.error);
        return;
      }
      setSent({
        mode,
        line: values.zin.trim() || "Ik wil graag kennismaken.",
        firstName: values.naam.trim().split(/\s+/)[0] ?? "",
        email: values.email.trim(),
      });
      requestAnimationFrame(() => doneTitleRef.current?.focus());
    });
  }

  const isQuestion = mode === "vraag";
  const err = (field: Field) => (invalid.includes(field) ? ERRORS[field][mode] : null);
  const describedBy = (field: Field, hint?: string) =>
    [hint, invalid.includes(field) ? `kl-${field}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <dialog
      ref={dialogRef}
      className="booking"
      aria-labelledby={sent ? "kl-done-title" : "kl-booking-title"}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onClose={() => openerRef.current?.focus()}
    >
      <div className="booking__inner">
        <div className="booking__top">
          <p className="booking__brand" aria-hidden="true">
            Kantlijn
          </p>
          <button className="icon-btn" type="button" onClick={close} aria-label="Sluiten">
            <CloseIcon />
          </button>
        </div>

        {sent ? (
          <div className="booking__done">
            <h2 className="sr-only" id="kl-done-title" tabIndex={-1} ref={doneTitleRef}>
              Verstuurd
            </h2>
            <div className="thread">
              <p className="thread__stamp">{sent.mode === "vraag" ? "Jouw vraag" : "Jouw eerste zin"}</p>
              <p className="msg msg--out msg--solo" data-msg>
                {sent.line}
              </p>
              <p className="thread__receipt thread__receipt--solo">Afgeleverd</p>
              <FitBubbles />
            </div>
            <div className="reply" role="status">
              <p className="reply__text">
                {sent.mode === "vraag"
                  ? "Dank je. Ik lees je vraag zelf. Komt hij vaker terug, dan schrijf ik er een notitie over."
                  : `Dank je${sent.firstName ? `, ${sent.firstName}` : ""}. Ik mail je binnen ${replyTime} een paar momenten om uit te kiezen.`}
              </p>
              <Signature />
            </div>
            {sent.mode === "kennismaking" ? (
              <div>
                <p className="next-steps__title">Wat gebeurt er nu?</p>
                <ol className="next-steps">
                  <li>
                    <span>Je krijgt een mail van mij op {sent.email}.</span>
                  </li>
                  <li>
                    <span>Je kiest een moment dat jou past.</span>
                  </li>
                  <li>
                    <span>We praten 30 minuten, gratis en vrijblijvend.</span>
                  </li>
                </ol>
              </div>
            ) : (
              sent.email && <p className="field__hint">Ik laat het je weten op {sent.email} als de notitie er is.</p>
            )}
            <button className="btn btn--outline btn--block" type="button" onClick={finish}>
              {onArticle ? "Terug naar het artikel" : "Terug naar Kantlijn"}
            </button>
          </div>
        ) : (
          <form ref={formRef} noValidate onSubmit={onSubmit}>
            <div className="booking__head">
              <h2 className="booking__title" id="kl-booking-title" tabIndex={-1} ref={titleRef}>
                {isQuestion ? (
                  <>
                    Stel je <em>vraag</em>
                  </>
                ) : (
                  <>
                    Plan een <em>kennismaking</em>
                  </>
                )}
              </h2>
              <p className="booking__intro">
                {isQuestion
                  ? "Welke vraag zou jij hier willen lezen? Ik lees ze allemaal zelf, en over de vragen die vaak terugkomen schrijf ik een notitie."
                  : `Laat je naam en e-mailadres achter. Ik mail je binnen ${replyTime} een paar momenten voor een gratis gesprek van 30 minuten.`}
              </p>
              <Signature />
            </div>

            {isQuestion ? (
              <div className="field">
                <label htmlFor="kl-zin">Jouw vraag</label>
                <textarea
                  id="kl-zin"
                  rows={3}
                  value={values.zin}
                  onChange={(e) => set("zin", e.target.value)}
                  placeholder="Hoe weet ik of coaching bij mij past?"
                  aria-invalid={invalid.includes("zin")}
                  aria-describedby={describedBy("zin", "kl-zin-hint")}
                  maxLength={1500}
                />
                {err("zin") && (
                  <p className="field__error" id="kl-zin-error">
                    {err("zin")}
                  </p>
                )}
                <p className="field__hint" id="kl-zin-hint">
                  Je hoeft hier geen details over je gezondheid te delen. Een algemene vraag is genoeg.
                </p>
              </div>
            ) : (
              <div className="field">
                <label htmlFor="kl-naam">Naam</label>
                <input
                  id="kl-naam"
                  autoComplete="name"
                  value={values.naam}
                  onChange={(e) => set("naam", e.target.value)}
                  aria-invalid={invalid.includes("naam")}
                  aria-describedby={describedBy("naam")}
                  maxLength={120}
                />
                {err("naam") && (
                  <p className="field__error" id="kl-naam-error">
                    {err("naam")}
                  </p>
                )}
              </div>
            )}

            <div className="field">
              <label htmlFor="kl-email">
                E-mailadres{isQuestion && <span> (mag leeg blijven)</span>}
              </label>
              <input
                id="kl-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={invalid.includes("email")}
                aria-describedby={describedBy("email", isQuestion ? "kl-email-hint" : undefined)}
                maxLength={200}
              />
              {err("email") && (
                <p className="field__error" id="kl-email-error">
                  {err("email")}
                </p>
              )}
              {isQuestion && (
                <p className="field__hint" id="kl-email-hint">
                  Dan laat ik je weten wanneer de notitie er is.
                </p>
              )}
            </div>

            {!isQuestion && (
              <div className="field">
                <label htmlFor="kl-zin">
                  Wat is jouw eerste zin? <span>(mag leeg blijven)</span>
                </label>
                <textarea
                  id="kl-zin"
                  rows={3}
                  value={values.zin}
                  onChange={(e) => set("zin", e.target.value)}
                  placeholder="Ik weet niet goed waar ik moet beginnen…"
                  aria-describedby="kl-zin-hint"
                  maxLength={1500}
                />
                <p className="field__hint" id="kl-zin-hint">
                  Eén zin is genoeg. Je hoeft hier geen details over je gezondheid te delen; dat bespreken we liever in
                  het gesprek.
                </p>
              </div>
            )}

            <div className="booking__trap" aria-hidden="true">
              <label htmlFor="kl-website">Website</label>
              <input id="kl-website" ref={honeypotRef} tabIndex={-1} autoComplete="off" defaultValue="" />
            </div>

            <label className="consent">
              <input
                type="checkbox"
                id="kl-toestemming"
                checked={values.toestemming}
                onChange={(e) => set("toestemming", e.target.checked)}
                aria-invalid={invalid.includes("toestemming")}
                aria-describedby={describedBy("toestemming")}
              />
              <span>
                {isQuestion
                  ? "Mirjam mag mijn vraag (en mijn e-mailadres, als ik dat invul) gebruiken voor Kantlijn. Ze bewaart het niet langer dan nodig. "
                  : "Mirjam mag mijn gegevens gebruiken om contact met me op te nemen. Ze bewaart ze niet langer dan nodig. "}
                <Link href="/privacy">Privacyverklaring</Link>
              </span>
            </label>
            {err("toestemming") && (
              <p className="field__error" id="kl-toestemming-error">
                {err("toestemming")}
              </p>
            )}

            <button className="btn btn--sage btn--block" type="submit" disabled={pending}>
              {pending ? "Versturen…" : "Verstuur"}
            </button>
            {failure && (
              <p className="field__error" role="alert">
                {failure === "rate"
                  ? "Je hebt net al een bericht gestuurd. Probeer het over een kwartier opnieuw."
                  : `Versturen lukte niet. Probeer het later opnieuw, of mail me op ${fallbackEmail}.`}
              </p>
            )}
            <p className="booking__safety">{safety}</p>
          </form>
        )}
      </div>
    </dialog>
  );
}
