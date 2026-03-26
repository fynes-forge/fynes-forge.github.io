import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useLocation } from "@docusaurus/router";

/**
 * ReadingProgressBar — a fixed top bar that tracks the user's scroll
 * position and fills left-to-right as they read.  Only rendered on
 * pages whose pathname begins with "/blog" or "/docs".
 *
 * Uses framer-motion's useScroll + useSpring for a smooth eased fill.
 * Respects the user's prefers-reduced-motion preference.
 */
export default function ReadingProgressBar() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 100,
    damping: prefersReducedMotion ? 100 : 30,
    restDelta: 0.001,
  });

  const isBlogOrDocs =
    location.pathname.startsWith("/blog") ||
    location.pathname.startsWith("/docs") ||
    location.pathname.startsWith("/git_101") ||
    location.pathname.startsWith("/python_101");

  if (!isBlogOrDocs) return null;

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        backgroundColor: "var(--ifm-color-primary)",
        zIndex: 9999,
      }}
    />
  );
}
