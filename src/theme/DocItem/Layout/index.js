/**
 * Ejected DocItem/Layout — custom course page layout.
 *
 * Intro pages  (path ends in /intro):
 *   Full-width animated hero banner + doc content (markdown h1 hidden)
 *
 * Lesson pages (all others):
 *   Breadcrumb row → gradient h1 → meta row → accent divider → content
 *   → custom prev/next navigation → "enjoying the course?" CTA card
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";
import DocItemContent from "@theme/DocItem/Content";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInOnScroll } from "@site/src/components/animations";

/* ═══════════════════════════════════════════════════════════════
   Course configuration
   ═══════════════════════════════════════════════════════════════ */

const READING_SPEED_WPM = 200;
const COURSE_CONFIG = {
  "/docs/": {
    name: "SQL 101",
    description: "Learn the fundamentals of SQL from scratch.",
    stats: ["Beginner Friendly", "SQL", "Interactive Examples"],
    firstLesson: "/docs/Grade%201/01%20What%20is%20SQL",
    introPath: "/docs/intro",
    icon: "database",
  },
  "/git_101/": {
    name: "Git 101",
    description: "Master version control with Git and GitHub.",
    stats: ["Beginner Friendly", "Git", "Real Workflows"],
    firstLesson: "/git_101/Grade%201/What%20is%20Git",
    introPath: "/git_101/intro",
    icon: "git",
  },
  "/python_101/": {
    name: "Python 101",
    description: "Get started with Python for data and scripting.",
    stats: ["Beginner Friendly", "Python", "Data Focused"],
    firstLesson: "/python_101/intro",
    introPath: "/python_101/intro",
    icon: "python",
  },
};

function getCourseConfig(pathname) {
  if (pathname.startsWith("/docs/")) return COURSE_CONFIG["/docs/"];
  if (pathname.startsWith("/git_101/")) return COURSE_CONFIG["/git_101/"];
  if (pathname.startsWith("/python_101/")) return COURSE_CONFIG["/python_101/"];
  return null;
}

/* ═══════════════════════════════════════════════════════════════
   SVG decorative icons
   ═══════════════════════════════════════════════════════════════ */

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Cylinder layers */}
      <ellipse cx="60" cy="28" rx="44" ry="13" fill="rgba(221,117,150,0.18)" stroke="#DD7596" strokeWidth="2.5" />
      <ellipse cx="60" cy="58" rx="44" ry="13" fill="rgba(221,117,150,0.12)" stroke="#DD7596" strokeWidth="2.5" />
      <ellipse cx="60" cy="88" rx="44" ry="13" fill="rgba(207,18,89,0.15)" stroke="#CF1259" strokeWidth="2.5" />
      {/* Vertical sides */}
      <line x1="16" y1="28" x2="16" y2="88" stroke="#DD7596" strokeWidth="2.5" />
      <line x1="104" y1="28" x2="104" y2="88" stroke="#DD7596" strokeWidth="2.5" />
      {/* Data rows */}
      <line x1="30" y1="48" x2="90" y2="48" stroke="#B7C3F3" strokeWidth="1.5" strokeDasharray="6,4" />
      <line x1="30" y1="54" x2="90" y2="54" stroke="#B7C3F3" strokeWidth="1.5" strokeDasharray="6,4" />
      <line x1="30" y1="78" x2="90" y2="78" stroke="#9F7EBE" strokeWidth="1.5" strokeDasharray="6,4" />
      <line x1="30" y1="84" x2="90" y2="84" stroke="#9F7EBE" strokeWidth="1.5" strokeDasharray="6,4" />
    </svg>
  );
}

function GitIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Main trunk */}
      <line x1="60" y1="15" x2="60" y2="105" stroke="#DD7596" strokeWidth="3" />
      {/* Branch */}
      <path d="M60 38 Q90 38 90 60 Q90 82 60 82" stroke="#8716f1" strokeWidth="2.5" fill="none" />
      {/* Commit nodes */}
      <circle cx="60" cy="20" r="8" fill="rgba(221,117,150,0.2)" stroke="#DD7596" strokeWidth="2.5" />
      <circle cx="60" cy="50" r="8" fill="rgba(207,18,89,0.2)" stroke="#CF1259" strokeWidth="2.5" />
      <circle cx="90" cy="60" r="8" fill="rgba(135,22,241,0.2)" stroke="#8716f1" strokeWidth="2.5" />
      <circle cx="60" cy="82" r="8" fill="rgba(183,195,243,0.2)" stroke="#B7C3F3" strokeWidth="2.5" />
      <circle cx="60" cy="100" r="8" fill="rgba(159,126,190,0.2)" stroke="#9F7EBE" strokeWidth="2.5" />
    </svg>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Code brackets */}
      <path d="M30 22 L12 60 L30 98" stroke="#DD7596" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M90 22 L108 60 L90 98" stroke="#8716f1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Snake body coil */}
      <path
        d="M45 48 Q60 36 75 48 Q90 60 75 72 Q60 84 45 72 Q30 60 45 48"
        stroke="#CF1259"
        strokeWidth="3"
        fill="rgba(207,18,89,0.1)"
      />
      {/* Snake head & eye */}
      <circle cx="79" cy="45" r="6" fill="rgba(221,117,150,0.25)" stroke="#DD7596" strokeWidth="2" />
      <circle cx="81" cy="43" r="2" fill="#DD7596" />
    </svg>
  );
}

function CourseIcon({ type }) {
  if (type === "database") return <DatabaseIcon />;
  if (type === "git") return <GitIcon />;
  if (type === "python") return <PythonIcon />;
  return null;
}

/* ═══════════════════════════════════════════════════════════════
   Custom hooks
   ═══════════════════════════════════════════════════════════════ */

function useReadingTime(contentRef) {
  const [readingTime, setReadingTime] = useState(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const text = contentRef.current.textContent || "";
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    setReadingTime(Math.max(1, Math.ceil(wordCount / READING_SPEED_WPM)));
  }, []); // run once after mount when content is rendered

  return readingTime;
}

function useVisited(permalink) {
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    try {
      setVisited(localStorage.getItem("tfynes_visited_" + permalink) === "true");
    } catch {}

    function handler() {
      try {
        setVisited(localStorage.getItem("tfynes_visited_" + permalink) === "true");
      } catch {}
    }
    window.addEventListener("tfynes_visited", handler);
    return () => window.removeEventListener("tfynes_visited", handler);
  }, [permalink]);

  const markVisited = useCallback(() => {
    try {
      localStorage.setItem("tfynes_visited_" + permalink, "true");
      window.dispatchEvent(new Event("tfynes_visited"));
    } catch {}
    setVisited(true);
  }, [permalink]);

  return [visited, markVisited];
}

function formatTimestamp(timestamp) {
  if (!timestamp) return null;
  try {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════════
   Intro page components
   ═══════════════════════════════════════════════════════════════ */

function CourseHeroBanner({ course, description }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <FadeInOnScroll direction="down">
      <div
        className="blog-hero-bg rounded-2xl p-8 mb-8 relative overflow-hidden"
        role="banner"
      >
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* ── Left content ── */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb chip */}
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 text-white"
              style={{ background: "var(--ifm-color-primary)" }}
            >
              {course.name}
            </span>

            {/* Title */}
            <h1
              className="font-black leading-none mb-4"
              style={{
                margin: "0 0 1rem",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                background:
                  "linear-gradient(135deg, var(--ifm-color-primary) 0%, #8716f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                padding: 0,
                textAlign: "left",
                color: "inherit",
              }}
            >
              {course.name}
            </h1>

            {/* Description */}
            <p
              className="text-gray-600 dark:text-gray-300 text-base mb-6 leading-relaxed"
              style={{ margin: "0 0 1.5rem" }}
            >
              {description || course.description}
            </p>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {course.stats.map((stat) => (
                <span
                  key={stat}
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold
                    bg-white/70 dark:bg-[#2d3748]/70 border border-[#DD7596]/30
                    text-gray-700 dark:text-gray-300"
                >
                  {stat}
                </span>
              ))}
            </div>

            {/* CTA button */}
            <motion.div
              className="inline-block"
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { scale: 1.04, boxShadow: "0 0 24px rgba(221,117,150,0.5)" }
              }
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Link
                to={course.firstLesson}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  font-bold text-white no-underline hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #CF1259 0%, #DD7596 100%)",
                }}
              >
                Start Learning →
              </Link>
            </motion.div>
          </div>

          {/* ── Right: decorative icon ── */}
          <div
            className="w-36 h-36 lg:w-44 lg:h-44 flex-shrink-0 opacity-90"
            aria-hidden="true"
          >
            <CourseIcon type={course.icon} />
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Lesson page components
   ═══════════════════════════════════════════════════════════════ */

function CourseBreadcrumbs({ course, title }) {
  return (
    <nav
      className="flex flex-wrap items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-4"
      aria-label="Breadcrumb"
    >
      <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700/60">
        Courses
      </span>
      <span className="text-gray-300 dark:text-gray-600">›</span>
      <Link
        to={course.introPath}
        className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700/60
          hover:text-[#DD7596] no-underline transition-colors duration-150"
      >
        {course.name}
      </Link>
      <span className="text-gray-300 dark:text-gray-600">›</span>
      <span
        className="px-2 py-0.5 rounded-full font-medium"
        style={{
          background: "rgba(221,117,150,0.12)",
          color: "var(--ifm-color-primary)",
        }}
      >
        {title}
      </span>
    </nav>
  );
}

function MarkCompleteButton({ permalink }) {
  const [visited, markVisited] = useVisited(permalink);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      onClick={markVisited}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      disabled={visited}
      className={
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold " +
        "border transition-colors duration-200 cursor-pointer " +
        (visited
          ? "border-[#DD7596]/50 text-[#DD7596] bg-[#DD7596]/10"
          : "border-[#DD7596]/30 text-gray-600 dark:text-gray-300 hover:border-[#DD7596]/60 hover:text-[#DD7596] bg-transparent")
      }
      style={{ fontFamily: "inherit" }}
      aria-label={visited ? "Lesson completed" : "Mark as complete"}
    >
      {visited ? "Completed ✓" : "Mark Complete ✓"}
    </motion.button>
  );
}

function LessonMetaRow({ readingTime, lastUpdatedAt, lastUpdatedBy, permalink }) {
  const formattedDate = formatTimestamp(lastUpdatedAt);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      {readingTime != null && (
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: "var(--ifm-color-primary)" }}
        >
          {readingTime} min read
        </span>
      )}

      {formattedDate && (
        <>
          <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">|</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Updated {formattedDate}
            {lastUpdatedBy && ` by ${lastUpdatedBy}`}
          </span>
        </>
      )}

      <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">|</span>
      <MarkCompleteButton permalink={permalink} />
    </div>
  );
}

function LessonNavigation({ previous, next }) {
  const prefersReducedMotion = useReducedMotion();

  if (!previous && !next) return null;

  return (
    <nav
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-6 border-t border-[#DD7596]/20"
      aria-label="Lesson navigation"
    >
      {previous ? (
        <motion.div
          whileHover={prefersReducedMotion ? {} : { y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Link
            to={previous.permalink}
            className="flex flex-col p-4 rounded-xl no-underline h-full
              border border-[#DD7596]/25 bg-white dark:bg-[#2d3748]
              hover:border-[#DD7596]/50 transition-colors duration-200"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              ← Previous
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">
              {previous.title}
            </span>
          </Link>
        </motion.div>
      ) : (
        <div />
      )}

      {next ? (
        <motion.div
          whileHover={prefersReducedMotion ? {} : { y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Link
            to={next.permalink}
            className="flex flex-col items-end p-4 rounded-xl no-underline h-full
              border border-[#DD7596]/25 bg-white dark:bg-[#2d3748]
              hover:border-[#DD7596]/50 transition-colors duration-200"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Next →
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug text-right">
              {next.title}
            </span>
          </Link>
        </motion.div>
      ) : (
        <div />
      )}
    </nav>
  );
}

function LessonCTACard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="mt-8 p-6 rounded-2xl bg-white dark:bg-[#2d3748] border border-[#DD7596]/30"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.55, ease: "easeOut" }}
      whileHover={
        prefersReducedMotion ? {} : { y: -4, boxShadow: "0 0 32px rgba(221,117,150,0.2)" }
      }
    >
      {/* top accent bar */}
      <div
        className="h-1 w-full rounded-full mb-4"
        style={{
          background: "linear-gradient(90deg, #CF1259 0%, #DD7596 60%, #9F7EBE 100%)",
        }}
      />
      <p
        className="text-gray-700 dark:text-gray-300 font-medium mb-4"
        style={{ margin: "0 0 1rem" }}
      >
        <span className="font-bold text-gray-900 dark:text-white">
          Enjoying the course?
        </span>{" "}
        Found this useful? Check out the blog for more deep dives on data
        engineering and software.
      </p>
      <motion.div
        className="inline-block"
        whileHover={
          prefersReducedMotion
            ? {}
            : { scale: 1.04, boxShadow: "0 0 20px rgba(221,117,150,0.4)" }
        }
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
            font-bold text-white no-underline hover:opacity-90 transition-opacity duration-200"
          style={{
            background: "linear-gradient(135deg, #CF1259 0%, #DD7596 100%)",
          }}
        >
          Visit the Blog →
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Page-level layouts
   ═══════════════════════════════════════════════════════════════ */

function IntroPageLayout({ metadata, frontMatter, children }) {
  const location = useLocation();
  const course = getCourseConfig(location.pathname);

  const hideTOC =
    !!(frontMatter.hide_table_of_contents) ||
    (metadata.toc != null ? metadata.toc.length === 0 : false);

  return (
    <div className="row">
      <div className={clsx("col", !hideTOC && "col--9")}>
        <DocVersionBanner />
        <div>
          {course && (
            <CourseHeroBanner
              course={course}
              description={frontMatter.description || metadata.description}
            />
          )}
          {/* Markdown content (markdown h1 hidden via CSS) */}
          <div className="course-intro-content">
            <DocItemTOCMobile />
            <DocItemContent>{children}</DocItemContent>
          </div>
        </div>
      </div>
      {!hideTOC && (
        <div className="col col--3">
          <DocItemTOCDesktop />
        </div>
      )}
    </div>
  );
}

function LessonPageLayout({ metadata, frontMatter, toc, children }) {
  const location = useLocation();
  const course = getCourseConfig(location.pathname);
  const contentRef = useRef(null);
  const readingTime = useReadingTime(contentRef);

  const hideTOC =
    !!(frontMatter.hide_table_of_contents) || toc.length === 0;

  return (
    <div className="row">
      <div className={clsx("col", !hideTOC && "col--9")}>
        <DocVersionBanner />
        <div>
          <article>
            {/* Breadcrumbs */}
            {course && (
              <CourseBreadcrumbs course={course} title={metadata.title} />
            )}

            {/* Gradient lesson title (markdown h1 hidden via CSS) */}
            <h1
              className="font-black leading-tight"
              style={{
                margin: "0 0 0.75rem",
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                background:
                  "linear-gradient(135deg, var(--ifm-color-primary) 0%, #8716f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                padding: 0,
                textAlign: "left",
                color: "inherit",
              }}
            >
              {metadata.title}
            </h1>

            {/* Meta row */}
            <LessonMetaRow
              readingTime={readingTime}
              lastUpdatedAt={metadata.lastUpdatedAt}
              lastUpdatedBy={metadata.lastUpdatedBy}
              permalink={metadata.permalink}
            />

            {/* Accent gradient divider */}
            <div
              className="w-full h-px rounded-full mb-6"
              style={{
                background:
                  "linear-gradient(90deg, var(--ifm-color-primary-darkest) 0%, var(--ifm-color-primary) 50%, transparent 100%)",
              }}
            />

            <DocItemTOCMobile />

            {/* Lesson content (markdown h1 hidden via CSS) */}
            <div className="lesson-doc-content max-w-3xl" ref={contentRef}>
              <DocItemContent>{children}</DocItemContent>
            </div>
          </article>

          {/* Custom prev/next nav */}
          <LessonNavigation
            previous={metadata.previous}
            next={metadata.next}
          />

          {/* CTA card */}
          <LessonCTACard />
        </div>
      </div>

      {!hideTOC && (
        <div className="col col--3">
          <DocItemTOCDesktop />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Default export
   ═══════════════════════════════════════════════════════════════ */

export default function DocItemLayout({ children }) {
  const { metadata, frontMatter, toc } = useDoc();
  const location = useLocation();

  // Detect intro page: path ends in /intro (with or without trailing slash)
  const cleanPath = location.pathname.replace(/\/$/, "");
  const isIntroPage = cleanPath.endsWith("/intro");

  if (isIntroPage) {
    return (
      <IntroPageLayout metadata={metadata} frontMatter={frontMatter}>
        {children}
      </IntroPageLayout>
    );
  }

  return (
    <LessonPageLayout metadata={metadata} frontMatter={frontMatter} toc={toc}>
      {children}
    </LessonPageLayout>
  );
}
