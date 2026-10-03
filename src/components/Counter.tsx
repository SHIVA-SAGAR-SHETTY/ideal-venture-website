"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = { to: number; suffix?: string; locale: string; compact?: boolean };

/** Shows a number, counting up from 0 when scrolled into view. */
export function Counter({ to, suffix = "", locale, compact = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  // Server-render the final figure so it's correct without JavaScript; the count-up
  // starts from zero once the stat scrolls into view.
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  const fmt = new Intl.NumberFormat(locale, {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  });

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {fmt.format(compact ? value : Math.round(value))}
      {suffix}
    </span>
  );
}
