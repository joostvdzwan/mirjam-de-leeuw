"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-cream px-6 py-20"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="heading-sm heading-sm-medium mb-4 text-sage-dark">
          Er ging iets mis
        </p>
        <h1 className="display-md display-md-regular mb-6 text-brown">
          Even adem halen
        </h1>
        <p className="body-lg body-lg-regular mb-10 text-brown-muted">
          Er is een onverwachte fout opgetreden. Probeer het opnieuw, of neem
          contact op via{" "}
          <a
            href="mailto:mirjam@deleeuw.nl"
            className="text-sage-dark underline-offset-4 hover:underline"
          >
            mirjam@deleeuw.nl
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="label-md label-md-medium inline-block rounded-full bg-sage-dark px-6 py-3 text-white transition-colors hover:bg-sage"
        >
          Probeer opnieuw
        </button>
      </div>
    </main>
  );
}
