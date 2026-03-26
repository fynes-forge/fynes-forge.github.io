import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const directionOffset = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

/**
 * FadeInOnScroll — wraps children in a framer-motion element that fades
 * (and optionally slides) into view once the element enters the viewport.
 *
 * Props:
 *   delay     — milliseconds before the animation starts (default: 0)
 *   direction — "up" | "down" | "left" | "right" (default: "up")
 *   className — additional class names applied to the wrapper div
 */
export default function FadeInOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const slideOffset = directionOffset[direction] ?? directionOffset.up;

  const variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, ...slideOffset },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: prefersReducedMotion ? 0.1 : 0.6,
        delay: delay / 1000,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
