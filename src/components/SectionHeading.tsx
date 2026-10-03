import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({ eyebrow, title, lead, tone = "dark", className = "" }: Props) {
  const light = tone === "light";
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className={`eyebrow ${light ? "text-brand" : "text-brand-deep"}`}>{eyebrow}</p>
      <h2 className={`display mt-4 text-4xl sm:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead && <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{lead}</p>}
    </Reveal>
  );
}
