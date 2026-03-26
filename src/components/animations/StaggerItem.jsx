import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * StaggerItem — a child component intended to be used inside <StaggerContainer>.
 * It receives the stagger timing from the parent container variants and
 * animates from opacity 0 + slight vertical offset to its natural position.
 *
 * Props:
 *   className — additional class names applied to the wrapper
 */
export default function StaggerItem({ children, className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
