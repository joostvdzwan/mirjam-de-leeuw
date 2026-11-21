"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { type BookingResult, sendBooking } from "@/app/actions/booking";
import content from "@/content/nl.json";

const { contact } = content;

type Field = "naam" | "email" | "toestemming";
type Values = { naam: string; email: string; zin: string; toestemming: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Same copy as the booking dialog in Kantlijn. */
const ERRORS: Record<Field, string> = {
  naam: "Vul je naam in, dan weet ik hoe ik je mag aanspreken.",
  email: "Dit e-mailadres lijkt niet te kloppen.",
  toestemming: "Zonder jouw toestemming kan ik geen contact opnemen.",
};

function validate(v: Values): Field[] {
  const invalid: Field[] = [];
  if (!v.naam.trim()) invalid.push("naam");
  if (!EMAIL_RE.test(v.email.trim())) invalid.push("email");
  if (!v.toestemming) invalid.push("toestemming");
  return invalid;
}

const inputClass =
  "body-md w-full rounded-xl border bg-cream px-4 py-3 text-brown placeholder:text-brown-muted/60 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20";

export default function ContactForm({ replyTime, crisisLine }: { replyTime: string; crisisLine: string }) {
  const pathname = usePathname();
  const [values, setValues] = useState<Values>({ naam: "", email: "", zin: "", toestemming: false });
  const [invalid, setInvalid] = useState<Field[]>([]);
  const [failure, setFailure] = useState<Exclude<BookingResult, { ok: true }>["error"] | null>(null);
  const [sent, setSent] = useState<{ firstName: string; email: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  function set<K extends keyof Values>(field: K, value: Values[K]) {
    setValues((v) => ({ ...v, [field]: value }));
    if (invalid.includes(field as Field)) setInvalid((list) => list.filter((f) => f !== field));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validate(values);
    setInvalid(errors);
    setFailure(null);
    if (errors.length) {
      document.getElementById(`contact-${errors[0]}`)?.focus();
      return;
    }
    startTransition(async () => {
      const result = await sendBooking({
        mode: "kennismaking",
        naam: values.naam.trim(),
        email: values.email.trim(),
        zin: values.zin.trim(),
        toestemming: true,
        website: honeypotRef.current?.value ?? "",
        page: pathname,
      });
      if (!result.ok) {
        setFailure(result.error);
        return;
      }
      setSent({ firstName: values.naam.trim().split(/\s+/)[0] ?? "", email: values.email.trim() });
    });
  }

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  const err = (field: Field) => (invalid.includes(field) ? ERRORS[field] : null);
  const describedBy = (field: Field) => (invalid.includes(field) ? `contact-${field}-error` : undefined);
  const border = (field: Field) => (invalid.includes(field) ? "border-[#9A3B20]" : "border-brown/10");

  if (sent) {
    return (
      <div className="space-y-4" role="status">
        <h3 ref={doneRef} tabIndex={-1} className="heading-lg heading-lg-medium text-brown focus:outline-none">
          Dank je{sent.firstName ? `, ${sent.firstName}` : ""}. Je bericht is binnen.
        </h3>
        <p className="body-md body-md-regular text-brown-muted">
          Ik mail je binnen {replyTime} op <strong className="font-medium text-brown">{sent.email}</strong> een
          paar momenten voor een gratis kennismaking van 20 à 30 minuten.
        </p>
        <p className="body-sm body-sm-regular text-brown-muted">{crisisLine}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contactformulier" noValidate>
      <div>
        <label htmlFor="contact-naam" className="label-md label-md-medium mb-2 block text-brown">
          {contact.form.nameLabel}
        </label>
        <input
          type="text"
          id="contact-naam"
          autoComplete="name"
          value={values.naam}
          onChange={(e) => set("naam", e.target.value)}
          placeholder={contact.form.namePlaceholder}
          aria-invalid={invalid.includes("naam")}
          aria-describedby={describedBy("naam")}
          className={`${inputClass} ${border("naam")}`}
        />
        {err("naam") && (
          <p id="contact-naam-error" className="body-sm body-sm-regular mt-2 text-[#9A3B20]">
            {err("naam")}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-email" className="label-md label-md-medium mb-2 block text-brown">
          {contact.form.emailLabel}
        </label>
        <input
          type="email"
          id="contact-email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder={contact.form.emailPlaceholder}
          aria-invalid={invalid.includes("email")}
          aria-describedby={describedBy("email")}
          className={`${inputClass} ${border("email")}`}
        />
        {err("email") && (
          <p id="contact-email-error" className="body-sm body-sm-regular mt-2 text-[#9A3B20]">
            {err("email")}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className="label-md label-md-medium mb-2 block text-brown">
          {contact.form.messageLabel} <span className="font-normal text-brown-muted">(mag leeg blijven)</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          maxLength={1500}
          value={values.zin}
          onChange={(e) => set("zin", e.target.value)}
          placeholder={contact.form.messagePlaceholder}
          aria-describedby="contact-message-hint"
          className={`${inputClass} resize-none border-brown/10`}
        />
        <p id="contact-message-hint" className="body-sm body-sm-regular mt-2 text-brown-muted">
          Je hoeft hier geen details over je gezondheid te delen; dat bespreken we liever in het gesprek.
        </p>
      </div>

      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" ref={honeypotRef} tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        <label className="body-sm body-sm-regular flex cursor-pointer items-start gap-3 text-brown">
          <input
            type="checkbox"
            id="contact-toestemming"
            checked={values.toestemming}
            onChange={(e) => set("toestemming", e.target.checked)}
            aria-invalid={invalid.includes("toestemming")}
            aria-describedby={describedBy("toestemming")}
            className="mt-0.5 h-5 w-5 shrink-0 accent-sage-dark"
          />
          <span>
            Mirjam mag mijn gegevens gebruiken om contact met me op te nemen. Ze bewaart ze niet langer dan nodig.{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-sage-dark">
              Privacyverklaring
            </Link>
          </span>
        </label>
        {err("toestemming") && (
          <p id="contact-toestemming-error" className="body-sm body-sm-regular mt-2 text-[#9A3B20]">
            {err("toestemming")}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="label-md label-md-medium w-full rounded-full bg-sage-dark py-3.5 text-white transition-colors hover:bg-sage disabled:cursor-progress disabled:opacity-70"
      >
        {pending ? "Versturen…" : contact.form.submit}
      </button>
      {failure && (
        <p role="alert" className="body-sm body-sm-regular text-[#9A3B20]">
          {failure === "rate"
            ? "Je hebt net al een bericht gestuurd. Probeer het over een kwartier opnieuw."
            : `Versturen lukte niet. Probeer het later opnieuw, of mail me op ${contact.email}.`}
        </p>
      )}
    </form>
  );
}
