/**
 * Custom BlogListPage — fully ejected and replaced.
 *
 * Features:
 *  - Hero banner with animated gradient mesh background
 *  - First post rendered as a large featured card (full-width, two-col on desktop)
 *  - Remaining posts in a responsive 2–3 col grid
 *  - framer-motion whileHover lift on every card
 *  - StaggerContainer / StaggerItem entrance animation
 *  - Tag pills, reading time badge, accent top bar per card
 *  - Styled pagination chevrons with framer-motion scale
 */

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import BlogListPageStructuredData from "@theme/BlogListPage/StructuredData";
import { motion, useReducedMotion } from "framer-motion";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@site/src/components/animations";

/* ─── Decorative SVG (featured post right panel) ─────────────────── */

function DecorativeSVG() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ maxHeight: "260px" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="blogGrd1" cx="40%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#DD7596" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#CF1259" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blogGrd2" cx="70%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#B7C3F3" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9F7EBE" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blogGrd3" cx="60%" cy="70%" r="45%">
          <stop offset="0%" stopColor="#ECDA90" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#83AFDF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background blobs */}
      <ellipse cx="180" cy="140" rx="140" ry="110" fill="url(#blogGrd1)" />
      <ellipse cx="300" cy="90" rx="100" ry="80" fill="url(#blogGrd2)" />
      <ellipse cx="240" cy="220" rx="80" ry="60" fill="url(#blogGrd3)" />

      {/* Grid lines */}
      {[60, 100, 140, 180, 220, 260].map((y) => (
        <line
          key={y}
          x1="20"
          y1={y}
          x2="380"
          y2={y}
          stroke="#DD7596"
          strokeWidth="0.6"
          strokeOpacity="0.2"
        />
      ))}
      {[60, 120, 180, 240, 300, 360].map((x) => (
        <line
          key={x}
          x1={x}
          y1="20"
          x2={x}
          y2="280"
          stroke="#B7C3F3"
          strokeWidth="0.5"
          strokeOpacity="0.15"
        />
      ))}

      {/* Nodes */}
      <circle cx="80" cy="80" r="9" fill="#DD7596" fillOpacity="0.85" />
      <circle cx="200" cy="55" r="13" fill="#CF1259" fillOpacity="0.9" />
      <circle cx="330" cy="100" r="8" fill="#B7C3F3" fillOpacity="0.8" />
      <circle cx="140" cy="170" r="7" fill="#ECDA90" fillOpacity="0.75" />
      <circle cx="290" cy="185" r="11" fill="#9F7EBE" fillOpacity="0.75" />
      <circle cx="95" cy="235" r="8" fill="#83AFDF" fillOpacity="0.7" />
      <circle cx="260" cy="250" r="9" fill="#DD7596" fillOpacity="0.65" />
      <circle cx="370" cy="200" r="6" fill="#ECDA90" fillOpacity="0.6" />

      {/* Connections */}
      <line
        x1="80" y1="80" x2="200" y2="55"
        stroke="#DD7596" strokeWidth="1.8" strokeOpacity="0.5"
      />
      <line
        x1="200" y1="55" x2="330" y2="100"
        stroke="#B7C3F3" strokeWidth="1.8" strokeOpacity="0.5"
      />
      <line
        x1="140" y1="170" x2="290" y2="185"
        stroke="#9F7EBE" strokeWidth="1.8" strokeOpacity="0.5"
      />
      <line
        x1="80" y1="80" x2="140" y2="170"
        stroke="#ECDA90" strokeWidth="1.2" strokeOpacity="0.4"
      />
      <line
        x1="330" y1="100" x2="290" y2="185"
        stroke="#B7C3F3" strokeWidth="1.2" strokeOpacity="0.4"
      />
      <line
        x1="95" y1="235" x2="260" y2="250"
        stroke="#83AFDF" strokeWidth="1.8" strokeOpacity="0.5"
      />
      <line
        x1="290" y1="185" x2="370" y2="200"
        stroke="#9F7EBE" strokeWidth="1" strokeOpacity="0.35"
      />

      {/* Code symbols */}
      <text
        x="28" y="130"
        fontFamily="monospace"
        fontSize="26"
        fill="#DD7596"
        fillOpacity="0.45"
      >
        {"{"}
      </text>
      <text
        x="348" y="210"
        fontFamily="monospace"
        fontSize="26"
        fill="#B7C3F3"
        fillOpacity="0.45"
      >
        {"}"}
      </text>
      <text
        x="155" y="285"
        fontFamily="monospace"
        fontSize="17"
        fill="#ECDA90"
        fillOpacity="0.4"
      >
        {"</>"}
      </text>
      <text
        x="310" y="60"
        fontFamily="monospace"
        fontSize="13"
        fill="#9F7EBE"
        fillOpacity="0.4"
      >
        {"[]"}
      </text>
    </svg>
  );
}

/* ─── Date formatting helper ──────────────────────────────────────── */

function formatPostDate(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/* ─── Tag Pill ────────────────────────────────────────────────────── */

function TagPill({ tag }) {
  return (
    <Link
      to={tag.permalink}
      className="
        inline-block px-2 py-0.5 rounded-full text-xs font-semibold no-underline
        bg-[#B7C3F3] text-[#404E5C]
        dark:bg-[#B7C3F3]/20 dark:text-[#B7C3F3]
        hover:bg-[#DD7596] hover:text-white
        dark:hover:bg-[#DD7596]/40 dark:hover:text-white
        transition-colors duration-200
      "
    >
      {tag.label}
    </Link>
  );
}

/* ─── ReadingTimeBadge ────────────────────────────────────────────── */

function ReadingTimeBadge({ minutes }) {
  if (!minutes) return null;
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: "var(--ifm-color-primary)" }}
    >
      {Math.ceil(minutes)} min read
    </span>
  );
}

/* ─── PostCard (regular grid card) ───────────────────────────────── */

function PostCard({ post }) {
  const prefersReducedMotion = useReducedMotion();
  const { metadata } = post.content;
  const { title, permalink, date, readingTime, tags, description } = metadata;
  const formattedDate = formatPostDate(date);

  return (
    <motion.div
      className="relative h-full"
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -6,
              boxShadow: "0 0 32px rgba(221,117,150,0.25)",
            }
      }
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <div
        className="
          flex flex-col h-full overflow-hidden rounded-2xl
          bg-white dark:bg-[#2d3748]
          border border-[#DD7596]/20 hover:border-[#DD7596]/50
          transition-colors duration-300
        "
      >
        {/* accent top bar */}
        <div
          className="h-1 w-full flex-shrink-0"
          style={{
            background:
              "linear-gradient(90deg, #CF1259 0%, #DD7596 100%)",
          }}
        />

        <div className="flex flex-col flex-1 p-5">
          <div className="mb-3">
            <ReadingTimeBadge minutes={readingTime} />
          </div>

          {/* Title — stretched link covers the whole card */}
          <h2
            className="font-bold leading-snug mb-2"
            style={{ margin: 0, marginBottom: "0.5rem", fontSize: "1.05rem" }}
          >
            <Link
              to={permalink}
              className="blog-card-stretched-link"
            >
              {title}
            </Link>
          </h2>

          {/* Date */}
          <time className="block text-xs text-gray-400 dark:text-gray-500 mb-3">
            {formattedDate}
          </time>

          {/* Description */}
          {description && (
            <p
              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 flex-1"
              style={{
                margin: 0,
                marginBottom: "0.75rem",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </p>
          )}

          {/* Tags — positioned above the stretched link */}
          {tags.length > 0 && (
            <div className="relative mt-auto pt-2" style={{ zIndex: 2 }}>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <TagPill key={tag.permalink} tag={tag} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FeaturedPost ────────────────────────────────────────────────── */

function FeaturedPost({ post }) {
  const prefersReducedMotion = useReducedMotion();
  const { metadata } = post.content;
  const { title, permalink, date, readingTime, tags, description } = metadata;
  const formattedDate = formatPostDate(date);

  return (
    <motion.div
      className="
        overflow-hidden rounded-2xl
        bg-white dark:bg-[#2d3748]
        border border-[#DD7596]/20 hover:border-[#DD7596]/50
        transition-colors duration-300
      "
      whileHover={
        prefersReducedMotion
          ? {}
          : { y: -4, boxShadow: "0 0 48px rgba(221,117,150,0.2)" }
      }
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* accent top bar */}
      <div
        className="h-1.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, #CF1259 0%, #DD7596 50%, #9F7EBE 100%)",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: metadata */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            {/* Featured badge */}
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider mb-4"
              style={{ backgroundColor: "#CF1259" }}
            >
              Featured
            </span>

            {/* Title */}
            <h2
              className="font-black leading-tight mb-3"
              style={{
                margin: 0,
                marginBottom: "0.75rem",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                background:
                  "linear-gradient(135deg, var(--ifm-color-primary), var(--ifm-color-primary-darkest))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </h2>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <time className="text-sm text-gray-400 dark:text-gray-500">
                {formattedDate}
              </time>
              <ReadingTimeBadge minutes={readingTime} />
            </div>

            {/* Description */}
            {description && (
              <p
                className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5"
                style={{ margin: 0, marginBottom: "1.25rem" }}
              >
                {description}
              </p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {tags.map((tag) => (
                  <TagPill key={tag.permalink} tag={tag} />
                ))}
              </div>
            )}
          </div>

          {/* CTA button */}
          <div>
            <motion.div
              className="inline-block"
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.04,
                      boxShadow: "0 0 24px rgba(221,117,150,0.5)",
                    }
              }
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Link
                to={permalink}
                className="
                  inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  font-bold text-white no-underline
                  hover:opacity-90 transition-opacity duration-200
                "
                style={{
                  background:
                    "linear-gradient(135deg, #CF1259 0%, #DD7596 100%)",
                }}
              >
                Read Post →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right: decorative graphic */}
        <div
          className="
            relative min-h-[220px] lg:min-h-0
            flex items-center justify-center
            overflow-hidden p-8
          "
          style={{
            background:
              "linear-gradient(135deg, rgba(221,117,150,0.06) 0%, rgba(159,126,190,0.08) 100%)",
          }}
        >
          <DecorativeSVG />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Hero Banner ─────────────────────────────────────────────────── */

function HeroBanner() {
  return (
    <FadeInOnScroll direction="down">
      <div
        className="relative w-full overflow-hidden rounded-2xl mb-12 blog-hero-bg"
        style={{ minHeight: "260px" }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-16">
          <h1
            className="font-black leading-tight"
            style={{
              margin: 0,
              marginBottom: "1rem",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              background:
                "linear-gradient(135deg, var(--ifm-color-primary), var(--ifm-color-primary-darkest))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            The Blog
          </h1>
          <p
            className="text-base lg:text-lg max-w-xl leading-relaxed text-gray-500 dark:text-gray-400"
            style={{ margin: 0 }}
          >
            Thoughts on data engineering, software, and the occasional rabbit
            hole.
          </p>
        </div>

        {/* decorative blobs */}
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            top: "-40%",
            left: "-10%",
            width: "55%",
            paddingBottom: "55%",
            background: "radial-gradient(circle, #DD7596 0%, transparent 70%)",
            opacity: 0.18,
          }}
        />
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            bottom: "-50%",
            right: "-5%",
            width: "50%",
            paddingBottom: "50%",
            background: "radial-gradient(circle, #9F7EBE 0%, transparent 70%)",
            opacity: 0.14,
          }}
        />
        <div
          className="absolute rounded-full blur-2xl pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "35%",
            paddingBottom: "35%",
            background: "radial-gradient(circle, #B7C3F3 0%, transparent 70%)",
            opacity: 0.1,
          }}
        />
      </div>
    </FadeInOnScroll>
  );
}

/* ─── Custom Pagination ───────────────────────────────────────────── */

function BlogPagination({ metadata }) {
  const prefersReducedMotion = useReducedMotion();
  const { previousPage, nextPage } = metadata;
  if (!previousPage && !nextPage) return null;

  return (
    <nav
      className="flex items-center justify-between mt-12 pt-8 border-t border-[#DD7596]/20"
      aria-label="Blog list page navigation"
    >
      <div>
        {previousPage && (
          <motion.div
            className="inline-block"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            <Link
              to={previousPage}
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                font-semibold no-underline
                border border-[#DD7596]/30
                text-gray-700 dark:text-gray-300
                hover:bg-[#DD7596]/10 hover:border-[#DD7596]/60
                transition-colors duration-200
              "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15,18 9,12 15,6" />
              </svg>
              Newer posts
            </Link>
          </motion.div>
        )}
      </div>

      <div>
        {nextPage && (
          <motion.div
            className="inline-block"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            <Link
              to={nextPage}
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                font-semibold no-underline
                border border-[#DD7596]/30
                text-gray-700 dark:text-gray-300
                hover:bg-[#DD7596]/10 hover:border-[#DD7596]/60
                transition-colors duration-200
              "
            >
              Older posts
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

/* ─── SEO Metadata ────────────────────────────────────────────────── */

function BlogListPageMetadata({ metadata }) {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === "/";
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

/* ─── Main content ────────────────────────────────────────────────── */

function BlogListPageContent({ metadata, items, sidebar }) {
  const [featured, ...rest] = items;

  return (
    <BlogLayout sidebar={sidebar}>
      <HeroBanner />

      {/* Featured post */}
      {featured && (
        <FadeInOnScroll>
          <FeaturedPost post={featured} />
        </FadeInOnScroll>
      )}

      {/* Remaining posts grid */}
      {rest.length > 0 && (
        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
          staggerDelay={0.08}
        >
          {rest.map((post) => (
            <StaggerItem
              key={post.content.metadata.permalink}
              className="h-full"
            >
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      <BlogPagination metadata={metadata} />
    </BlogLayout>
  );
}

/* ─── Default export ──────────────────────────────────────────────── */

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
