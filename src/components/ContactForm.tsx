"use client";

import type { FormEvent } from "react";
import content from "@/content/nl.json";

const { contact } = content;

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = name
      ? `Contactaanvraag van ${name}`
      : "Contactaanvraag via website";
    const bodyLines = [
      name ? `Naam: ${name}` : null,
      email ? `E-mail: ${email}` : null,
      "",
      message,
    ].filter((line) => line !== null);

    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="Contactformulier"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="label-md label-md-medium mb-2 block text-brown"
        >
          {contact.form.nameLabel}
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          placeholder={contact.form.namePlaceholder}
          required
          className="body-md w-full rounded-xl border border-brown/10 bg-cream px-4 py-3 text-brown placeholder:text-brown-muted/40 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="label-md label-md-medium mb-2 block text-brown"
        >
          {contact.form.emailLabel}
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          placeholder={contact.form.emailPlaceholder}
          required
          className="body-md w-full rounded-xl border border-brown/10 bg-cream px-4 py-3 text-brown placeholder:text-brown-muted/40 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="label-md label-md-medium mb-2 block text-brown"
        >
          {contact.form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={contact.form.messagePlaceholder}
          required
          className="body-md w-full resize-none rounded-xl border border-brown/10 bg-cream px-4 py-3 text-brown placeholder:text-brown-muted/40 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
        />
      </div>
      <button
        type="submit"
        className="label-md label-md-medium w-full rounded-full bg-sage-dark py-3.5 text-white transition-colors hover:bg-sage"
      >
        {contact.form.submit}
      </button>
    </form>
  );
}
