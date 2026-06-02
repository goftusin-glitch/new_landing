import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 120 },
  left: { x: -130, y: 50 },
  right: { x: 130, y: 50 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Entrance direction — controls the tilt + slide axis. */
  from?: Direction;
  /** Render as a specific tag (e.g. "section", "article"). */
  as?: "div" | "section" | "article" | "li";
}

/**
 * Scroll-triggered 3D reveal. Content rises out of the page on a perspective
 * tilt, settling flat as it enters the viewport. Plays once per element.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  const { x, y } = offset[from];

  return (
    <MotionTag
      className={className}
      style={{ transformPerspective: 900, transformOrigin: "center bottom" }}
      initial={{
        opacity: 0,
        x,
        y,
        rotateX: from === "up" ? 45 : 18,
        rotateY: from === "left" ? -38 : from === "right" ? 38 : 0,
        scale: 0.85,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
