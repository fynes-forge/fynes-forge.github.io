/**
 * Custom BlogTagsPostsPage — fully ejected and replaced.
 *
 * Features:
 *  - Hero banner: "Posts tagged: [tag]" in gradient text
 *  - Same PostCard grid as BlogListPage
 *  - Styled pagination chevrons matching BlogListPage
 *  - "View All Tags" link
 */

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import { useBlogTagsPostsPageTitle } from "@docusaurus/theme-common/internal";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import { motion, useReducedMotion } from "framer-motion";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@site/src/components/animations";

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

/* ─── PostCard (reused from BlogListPage) ────────────────────────── */

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
          : { y: -6, boxShadow: "0 0 32px rgba(221,117,150,0.25)" }
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
            background: "linear-gradient(90deg, #CF1259 0%, #DD7596 100%)",
          }}
        />

        <div className="flex flex-col flex-1 p-5">
          <div className="mb-3">
            <ReadingTimeBadge minutes={readingTime} />
          </div>

          {/* Title — stretched link */}
          <h2
            className="font-bold leading-snug mb-2"
            style={{
              margin: 0,
              marginBottom: "0.5rem",
              fontSize: "1.05rem",
            }}
          >
            <Link to={permalink} className="blog-card-stretched-link">
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

          {/* Tags — above stretched link */}
          {tags.length > 0 && (
            <div className="relative mt-auto pt-2" style={{ zIndex: 2 }}>
              <div className="flex flex-wrap gap-1">
                {tags.map((t) => (
                  <TagPill key={t.permalink} tag={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Tag Hero Banner ─────────────────────────────────────────────── */

function TagHeroBanner({ tag }) {
  return (
    <FadeInOnScroll direction="down">
      <div
        className="relative overflow-hidden rounded-2xl mb-10 blog-hero-bg"
        style={{ minHeight: "200px" }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-12">
          {/* "Posts tagged:" label */}
          <p
            className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3"
            style={{ margin: 0, marginBottom: "0.75rem" }}
          >
            Posts tagged:
          </p>

          {/* Tag name */}
          <h1
            className="font-black leading-tight"
            style={{
              margin: 0,
              marginBottom: "1rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              background:
                "linear-gradient(135deg, var(--ifm-color-primary), var(--ifm-color-primary-darkest))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {tag.label}
          </h1>

          {/* Tag description */}
          {tag.description && (
            <p
              className="text-sm max-w-lg text-gray-500 dark:text-gray-400 mb-4"
              style={{ margin: 0, marginBottom: "1rem" }}
            >
              {tag.description}
            </p>
          )}

          {/* View all tags link */}
          <Link
            to={tag.allTagsPath}
            className="
              inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold no-underline
              border border-[#DD7596]/35
              text-gray-600 dark:text-gray-300
              hover:bg-[#DD7596]/10 hover:border-[#DD7596]/60
              transition-colors duration-200
            "
          >
            ← View All Tags
          </Link>
        </div>

        {/* decorative blobs */}
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            top: "-50%",
            left: "-5%",
            width: "45%",
            paddingBottom: "45%",
            background: "radial-gradient(circle, #DD7596 0%, transparent 70%)",
            opacity: 0.15,
          }}
        />
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            bottom: "-50%",
            right: "-5%",
            width: "40%",
            paddingBottom: "40%",
            background: "radial-gradient(circle, #B7C3F3 0%, transparent 70%)",
            opacity: 0.12,
          }}
        />
      </div>
    </FadeInOnScroll>
  );
}

/* ─── Pagination ──────────────────────────────────────────────────── */

function BlogPagination({ listMetadata }) {
  const prefersReducedMotion = useReducedMotion();
  if (!listMetadata) return null;
  const { previousPage, nextPage } = listMetadata;
  if (!previousPage && !nextPage) return null;

  return (
    <nav
      className="flex items-center justify-between mt-12 pt-8 border-t border-[#DD7596]/20"
      aria-label="Blog tag page navigation"
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

/* ─── Page metadata ───────────────────────────────────────────────── */

function BlogTagsPostsPageMetadata({ tag }) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} description={tag.description} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

/* ─── Page content ────────────────────────────────────────────────── */

function BlogTagsPostsPageContent({ tag, items, sidebar, listMetadata }) {
  return (
    <BlogLayout sidebar={sidebar}>
      <TagHeroBanner tag={tag} />

      {/* Post grid */}
      {items.length > 0 ? (
        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          staggerDelay={0.08}
        >
          {items.map((post) => (
            <StaggerItem
              key={post.content.metadata.permalink}
              className="h-full"
            >
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <p className="text-center text-gray-400 dark:text-gray-500 py-12">
          No posts found for this tag.
        </p>
      )}

      <BlogPagination listMetadata={listMetadata} />
    </BlogLayout>
  );
}

/* ─── Default export ──────────────────────────────────────────────── */

export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage
      )}
    >
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
