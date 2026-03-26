/**
 * Mermaid theme override — wraps the original Mermaid component
 * with FadeInOnScroll for scroll-triggered entrance animation.
 * The card container styling is handled via custom.css.
 */
import React from "react";
import OriginalMermaid from "@theme-original/Mermaid";
import { FadeInOnScroll } from "@site/src/components/animations";

export default function Mermaid(props) {
  return (
    <FadeInOnScroll direction="up">
      <OriginalMermaid {...props} />
    </FadeInOnScroll>
  );
}
