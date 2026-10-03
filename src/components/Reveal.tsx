import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Seconds. Only used with `onLoad` (scroll-driven reveals are staggered by position). */
  delay?: number;
  /** Animate on page load instead of on scroll — use for above-the-fold content. */
  onLoad?: boolean;
  className?: string;
  as?: "div" | "li" | "section" | "span";
};

/**
 * Fade-up reveal done purely in CSS (see `.reveal` in globals.css), so content is
 * visible without JavaScript and never waits on hydration.
 */
export function Reveal({ children, delay = 0, onLoad = false, className = "", as: Tag = "div" }: Props) {
  const style = onLoad && delay ? ({ animationDelay: `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag className={`${onLoad ? "reveal-load" : "reveal"} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
