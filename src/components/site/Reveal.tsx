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
  delay?: number;
  from?: Direction;
  as?: "div" | "section" | "article" | "li";
  /** Framer Motion viewport margin. "0px" triggers as soon as element enters view. */
  viewportMargin?: string;
}

export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
  viewportMargin = "-90px",
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
      viewport={{ once: true, margin: viewportMargin }}
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
