/**
 * Custom BlogPostPage — fully ejected and replaced.
 *
 * Features:
 *  - Gradient post title (primary → dark purple)
 *  - Meta row: author avatar, name, date, reading time, tag pills
 *  - Full-width accent gradient divider
 *  - FadeInOnScroll direction="down" on the header
 *  - Post content wrapped in blog-post-content for scoped CSS
 *  - Styled prev/next navigation
 *  - "Enjoyed this post?" CTA card with framer-motion hover
 *  - Author bio card with avatar, links, framer-motion entrance
 *  - ReadingProgressBar is already mounted globally in Root.js
 */

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import { useDateTimeFormat } from "@docusaurus/theme-common/internal";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/plugin-content-blog/client";
import BlogLayout from "@theme/BlogLayout";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import BlogPostPageStructuredData from "@theme/BlogPostPage/StructuredData";
import TOC from "@theme/TOC";
import ContentVisibility from "@theme/ContentVisibility";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInOnScroll } from "@site/src/components/animations";

/* ─── Tag Pill ────────────────────────────────────────────────────── */

function TagPill({ tag }) {
  return (
    <Link
      to={tag.permalink}
      className="
        inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold no-underline
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

/* ─── Author Avatar ───────────────────────────────────────────────── */

function AuthorAvatar({ author, size = 36 }) {
  if (!author) return null;
  return author.imageURL ? (
    <img
      src={author.imageURL}
      alt={author.name}
      width={size}
      height={size}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #CF1259, #DD7596)",
      }}
    >
      {(author.name || "?")[0].toUpperCase()}
    </div>
  );
}

/* ─── Post Header ─────────────────────────────────────────────────── */

function PostHeader() {
  const { metadata } = useBlogPost();
  const { title, date, readingTime, tags, authors } = metadata;
  const primaryAuthor = authors?.[0];

  const dateTimeFormat = useDateTimeFormat({
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const formattedDate = date
    ? dateTimeFormat.format(new Date(date))
    : "";

  return (
    <FadeInOnScroll direction="down">
      <header className="mb-8">
        {/* Title */}
        <h1
          className="font-black leading-tight mb-5"
          style={{
            margin: 0,
            marginBottom: "1.25rem",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            background:
              "linear-gradient(135deg, var(--ifm-color-primary) 0%, #8716f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {primaryAuthor && (
            <div className="flex items-center gap-2">
              <AuthorAvatar author={primaryAuthor} size={32} />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {primaryAuthor.name}
              </span>
            </div>
          )}

          <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">
            |
          </span>

          <time className="text-sm text-gray-400 dark:text-gray-500">
            {formattedDate}
          </time>

          {readingTime != null && (
            <>
              <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">
                |
              </span>
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: "var(--ifm-color-primary)" }}
              >
                {Math.ceil(readingTime)} min read
              </span>
            </>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <TagPill key={tag.permalink} tag={tag} />
              ))}
            </div>
          )}
        </div>

        {/* Accent gradient divider */}
        <div
          className="w-full h-px rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--ifm-color-primary-darkest) 0%, var(--ifm-color-primary) 50%, transparent 100%)",
          }}
        />
      </header>
    </FadeInOnScroll>
  );
}

/* ─── Tags footer row ─────────────────────────────────────────────── */

function PostTagsRow() {
  const { metadata } = useBlogPost();
  const { tags } = metadata;
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-[#DD7596]/20">
      <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Tags:
      </span>
      {tags.map((tag) => (
        <TagPill key={tag.permalink} tag={tag} />
      ))}
    </div>
  );
}

/* ─── CTA card ────────────────────────────────────────────────────── */

function PostCTACard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="
        mt-8 p-6 rounded-2xl
        bg-white dark:bg-[#2d3748]
        border border-[#DD7596]/30
      "
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.55, ease: "easeOut" }}
      whileHover={
        prefersReducedMotion
          ? {}
          : { y: -4, boxShadow: "0 0 32px rgba(221,117,150,0.2)" }
      }
    >
      {/* top accent bar */}
      <div
        className="h-1 w-full rounded-full mb-4"
        style={{
          background:
            "linear-gradient(90deg, #CF1259 0%, #DD7596 60%, #9F7EBE 100%)",
        }}
      />
      <p
        className="text-gray-700 dark:text-gray-300 font-medium mb-4"
        style={{ margin: 0, marginBottom: "1rem" }}
      >
        <span className="font-bold text-gray-900 dark:text-white">
          Enjoyed this post?
        </span>{" "}
        Want more content like this? Check out my other posts.
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
          className="
            inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
            font-bold text-white no-underline
            hover:opacity-90 transition-opacity duration-200
          "
          style={{
            background: "linear-gradient(135deg, #CF1259 0%, #DD7596 100%)",
          }}
        >
          Back to Blog →
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ─── Author Bio Card ─────────────────────────────────────────────── */

function AuthorBioCard() {
  const prefersReducedMotion = useReducedMotion();
  const { metadata } = useBlogPost();
  const { authors } = metadata;

  if (!authors || authors.length === 0) return null;

  return (
    <>
      {authors.map((author) => {
        const githubUrl = author.socials?.github;
        const linkedinUrl = author.socials?.linkedin;

        return (
          <motion.div
            key={author.name}
            className="
              mt-6 p-6 rounded-2xl flex flex-col sm:flex-row gap-5
              bg-white dark:bg-[#2d3748]
              border border-[#DD7596]/25
            "
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.6,
              ease: "easeOut",
              delay: 0.1,
            }}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <AuthorAvatar author={author} size={64} />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <p
                className="font-black text-gray-900 dark:text-white mb-0.5"
                style={{ margin: 0, marginBottom: "0.125rem", fontSize: "1.05rem" }}
              >
                {author.name}
              </p>
              {author.title && (
                <p
                  className="text-sm text-gray-400 dark:text-gray-500 mb-2"
                  style={{ margin: 0, marginBottom: "0.5rem" }}
                >
                  {author.title}
                </p>
              )}
              <p
                className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3"
                style={{ margin: 0, marginBottom: "0.75rem" }}
              >
                Writing about data engineering, pipelines, and the tools that
                make it all work.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold no-underline
                      border border-[#DD7596]/30
                      text-gray-600 dark:text-gray-300
                      hover:bg-[#DD7596]/10 hover:border-[#DD7596]/60
                      transition-colors duration-200
                    "
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold no-underline
                      border border-[#DD7596]/30
                      text-gray-600 dark:text-gray-300
                      hover:bg-[#DD7596]/10 hover:border-[#DD7596]/60
                      transition-colors duration-200
                    "
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

/* ─── Prev / Next navigation ──────────────────────────────────────── */

function PostNavigation() {
  const prefersReducedMotion = useReducedMotion();
  const { metadata } = useBlogPost();
  const { nextItem, prevItem } = metadata;

  if (!nextItem && !prevItem) return null;

  return (
    <nav
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#DD7596]/20"
      aria-label="Blog post navigation"
    >
      {prevItem ? (
        <motion.div
          whileHover={prefersReducedMotion ? {} : { y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Link
            to={prevItem.permalink}
            className="
              flex flex-col p-4 rounded-xl no-underline h-full
              border border-[#DD7596]/25
              bg-white dark:bg-[#2d3748]
              hover:border-[#DD7596]/50
              transition-colors duration-200
            "
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              ← Previous
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">
              {prevItem.title}
            </span>
          </Link>
        </motion.div>
      ) : (
        <div />
      )}

      {nextItem ? (
        <motion.div
          whileHover={prefersReducedMotion ? {} : { y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Link
            to={nextItem.permalink}
            className="
              flex flex-col items-end p-4 rounded-xl no-underline h-full
              border border-[#DD7596]/25
              bg-white dark:bg-[#2d3748]
              hover:border-[#DD7596]/50
              transition-colors duration-200
            "
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Next →
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug text-right">
              {nextItem.title}
            </span>
          </Link>
        </motion.div>
      ) : (
        <div />
      )}
    </nav>
  );
}

/* ─── Post page content ───────────────────────────────────────────── */

function BlogPostPageContent({ sidebar, children }) {
  const { metadata, toc, frontMatter } = useBlogPost();
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;

  return (
    <BlogLayout
      sidebar={sidebar}
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }
    >
      <ContentVisibility metadata={metadata} />

      <article className="max-w-3xl mx-auto">
        <PostHeader />

        {/* Post content */}
        <div className="blog-post-content">{children}</div>

        <PostTagsRow />
        <PostCTACard />
        <AuthorBioCard />
        <PostNavigation />
      </article>
    </BlogLayout>
  );
}

/* ─── Default export ──────────────────────────────────────────────── */

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;

  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
