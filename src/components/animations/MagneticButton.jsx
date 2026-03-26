import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * MagneticButton — wraps a CTA button (or any element) in a framer-motion
 * div that scales up slightly on hover and scales down on tap, creating a
 * tactile "magnetic" feel.  A glow effect is applied via the `shadow-accent`
 * Tailwind utility on hover (defined in tailwind.config.js).
 *
 * Props:
 *   className — additional class names applied to the motion wrapper
 */
export default function MagneticButton({ children, className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
