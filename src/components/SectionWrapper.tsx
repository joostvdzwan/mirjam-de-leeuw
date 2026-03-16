interface SectionWrapperProps {
  id: string;
  headingId?: string;
  children: React.ReactNode;
  className?: string;
  background?: "cream" | "sand";
}

export default function SectionWrapper({
  id,
  headingId,
  children,
  className = "",
  background = "cream",
}: SectionWrapperProps) {
  const bg = background === "sand" ? "bg-sand" : "bg-cream";

  return (
    <section
      id={id}
      className={`${bg} py-20 md:py-28 ${className}`}
      aria-labelledby={headingId ?? `${id}-heading`}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
