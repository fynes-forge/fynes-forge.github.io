import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * StaggerContainer — a framer-motion wrapper that animates its children in
 * one-by-one (staggered) when the container enters the viewport.
 *
 * Pair child elements with <StaggerItem> to get the per-item animation.
 *
 * Props:
 *   staggerDelay — seconds between each child animation (default: 0.1)
 *   className    — additional class names applied to the wrapper
 */
export default function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
