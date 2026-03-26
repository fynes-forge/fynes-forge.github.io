import React from "react";
import ReadingProgressBar from "@site/src/components/animations/ReadingProgressBar";

/**
 * Root — Docusaurus theme component that wraps the entire application.
 * We use it to mount the ReadingProgressBar so it is available on every page;
 * the bar itself only renders on /blog and /docs paths.
 */
export default function Root({ children }) {
  return (
    <>
      <ReadingProgressBar />
      {children}
    </>
  );
}
