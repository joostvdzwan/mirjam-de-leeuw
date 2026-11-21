export default function Loading() {
  return (
    <main
      id="main-content"
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-cream"
    >
      <span className="sr-only">Laden…</span>
      <div className="flex items-center gap-3">
        <span
          className="h-2 w-2 animate-pulse rounded-full bg-sage"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="h-2 w-2 animate-pulse rounded-full bg-sage"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-2 w-2 animate-pulse rounded-full bg-sage"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </main>
  );
}
