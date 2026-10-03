import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string;
  children?: ReactNode;
};

/** Dark hero band used at the top of inner pages. */
export function PageHero({ eyebrow, title, lead, image, children }: Props) {
  return (
    <section className="blueprint relative overflow-hidden bg-ink pt-[4.5rem] text-white">
      {image && (
        <>
          <Image src={image} alt="" fill preload sizes="100vw" className="object-cover opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        </>
      )}
      <div className="container-x relative py-20 sm:py-24 lg:py-28">
        <p className="eyebrow text-brand">{eyebrow}</p>
        <h1 className="display mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
