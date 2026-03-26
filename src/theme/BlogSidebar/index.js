/**
 * Custom BlogSidebar — fully ejected and replaced.
 *
 * Styled to match the existing floating card DocSidebar.
 * Features:
 *  - rounded-2xl floating card with accent border
 *  - "Recent Posts" title with accent left bar
 *  - framer-motion left-slide on hover per link
 *  - Active post highlighted with accent pill
 *  - Fade-in on mount
 */

import React from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useWindowSize } from "@docusaurus/theme-common";
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from "@docusaurus/plugin-content-blog/client";
import { NavbarSecondaryMenuFiller } from "@docusaurus/theme-common";
import { motion, useReducedMotion } from "framer-motion";

/* ─── Single sidebar link ─────────────────────────────────────────── */

function SidebarPostLink({ item }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const active =
    location.pathname.replace(/\/$/, "") ===
    item.permalink.replace(/\/$/, "");

  return (
    <motion.div
      whileHover={
        prefersReducedMotion || active
          ? {}
          : {
              x: 4,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }
      }
    >
      <Link
        to={item.permalink}
        className={`
          block rounded-lg px-3 py-1.5 text-sm no-underline
          transition-colors duration-150
          ${
            active
              ? "bg-[#DD7596]/20 text-[#CF1259] dark:text-[#DD7596] font-semibold"
              : "text-gray-600 dark:text-gray-300 hover:text-[#DD7596] dark:hover:text-[#DD7596]"
          }
        `}
        aria-current={active ? "page" : undefined}
      >
        <span className="block leading-snug">{item.title}</span>
      </Link>
    </motion.div>
  );
}

/* ─── Desktop sidebar — rendered as col col--3 in the row layout ──── */

function BlogSidebarDesktop({ sidebar }) {
  const prefersReducedMotion = useReducedMotion();
  const items = useVisibleBlogSidebarItems(sidebar.items);

  return (
    <motion.aside
      className="col col--3"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.1 : 0.45,
        ease: "easeOut",
      }}
      aria-label="Blog recent posts"
    >
      <div
        className="sticky rounded-2xl shadow-2xl overflow-hidden border border-[#DD7596]/25 bg-white/95 dark:bg-[#2d3748]/95 backdrop-blur-sm"
        style={{ top: "calc(var(--ifm-navbar-height) + 1rem)" }}
      >
        {/* top accent line */}
        <div
          className="h-0.5 w-full"
          style={{
            background:
              "linear-gradient(90deg, #CF1259 0%, #DD7596 50%, #9F7EBE 100%)",
          }}
        />

        <div className="p-4">
          {/* Section title */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#DD7596]/15">
            <span className="w-0.5 h-4 rounded-full bg-[#DD7596] flex-shrink-0" />
            <h3
              className="text-xs font-black uppercase tracking-widest text-gray-800 dark:text-gray-100"
              style={{ margin: 0 }}
            >
              {sidebar.title || "Recent Posts"}
            </h3>
          </div>

          {/* Post links */}
          <nav className="space-y-0.5">
            {items.map((item) => (
              <SidebarPostLink key={item.permalink} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </motion.aside>
  );
}

/* ─── Mobile sidebar — fills into the navbar secondary menu ──────── */

function BlogSidebarMobileSecondaryMenu({ sidebar }) {
  const items = useVisibleBlogSidebarItems(sidebar.items);

  return (
    <BlogSidebarItemList
      items={items}
      ulClassName="menu__list"
      liClassName="menu__list-item"
      linkClassName="menu__link"
      linkActiveClassName="menu__link--active"
    />
  );
}

function BlogSidebarMobile({ sidebar }) {
  return (
    <NavbarSecondaryMenuFiller
      component={BlogSidebarMobileSecondaryMenu}
      props={{ sidebar }}
    />
  );
}

/* ─── Default export ──────────────────────────────────────────────── */

export default function BlogSidebar({ sidebar }) {
  const windowSize = useWindowSize();

  if (!sidebar?.items?.length) return null;

  // Don't render on mobile — it goes into the navbar drawer instead
  if (windowSize === "mobile") {
    return <BlogSidebarMobile sidebar={sidebar} />;
  }

  return <BlogSidebarDesktop sidebar={sidebar} />;
}

