"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const dirs = {
  up:    { y: 10, x: 0 },
  left:  { x: 10, y: 0 },
  right: { x: -10, y: 0 },
  none:  { x: 0,  y: 0 },
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const shouldAnimate = isInView && reducedMotion === false;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={shouldAnimate
        ? { opacity: [0.92, 1], x: [dirs[direction].x, 0], y: [dirs[direction].y, 0] }
        : { opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: shouldAnimate ? 0.4 : 0,
        delay: shouldAnimate ? Math.min(Math.max(delay, 0), 0.15) : 0,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}
