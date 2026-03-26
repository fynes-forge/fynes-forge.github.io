import React, { useState, useEffect, useMemo } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ─────────────── helpers ─────────────── */

function isActiveItem(href, pathname) {
  if (!href) return false;
  const clean = href.replace(/\/$/, "");
  const path = pathname.replace(/\/$/, "");
  return path === clean || path === href;
}

function getCourseNameFromPath(pathname) {
  if (pathname.startsWith("/docs/")) return "SQL 101";
  if (pathname.startsWith("/git_101/")) return "Git 101";
  if (pathname.startsWith("/python_101/")) return "Python 101";
  if (pathname.startsWith("/projects/")) return "Projects";
  return null;
}

function countTotalLinks(items) {
  return items.reduce((acc, item) => {
    if (item.type === "link" || item.type === "doc") return acc + 1;
    if (item.type === "category") return acc + countTotalLinks(item.items || []);
    return acc;
  }, 0);
}

function countVisitedLinks(items) {
  return items.reduce((acc, item) => {
    if (item.type === "link" || item.type === "doc") {
      const href = item.href || item.to || "";
      try {
        return acc + (localStorage.getItem("tfynes_visited_" + href) === "true" ? 1 : 0);
      } catch {
        return acc;
      }
    }
    if (item.type === "category") return acc + countVisitedLinks(item.items || []);
    return acc;
  }, 0);
}

/* ─────────────── CourseHeader ─────────────── */

function CourseHeader({ sidebar }) {
  const location = useLocation();
  const courseName = getCourseNameFromPath(location.pathname);
  const [visitedCount, setVisitedCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const totalCount = useMemo(() => countTotalLinks(sidebar), [sidebar]);

  useEffect(() => {
    function update() {
      try {
        setVisitedCount(countVisitedLinks(sidebar));
      } catch {}
    }
    update();
    window.addEventListener("tfynes_visited", update);
    return () => window.removeEventListener("tfynes_visited", update);
  }, [sidebar]);

  if (!courseName) return null;

  const progress = totalCount > 0 ? (visitedCount / totalCount) * 100 : 0;

  return (
    <div className="px-3 pt-3 pb-2 border-b border-[#DD7596]/15 mb-1">
      <span
        className="text-xs font-bold uppercase tracking-wider"
        style={{ color: "var(--ifm-color-primary)" }}
      >
        {courseName}
      </span>
      {/* Progress bar */}
      <div className="mt-2 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--ifm-color-primary)" }}
          initial={{ width: 0 }}
          animate={{ width: progress + "%" }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: "easeOut" }
          }
        />
      </div>
      <p
        className="text-[11px] text-gray-400 dark:text-gray-500 mt-1"
        style={{ margin: "0.25rem 0 0" }}
      >
        {visitedCount} / {totalCount} lessons
      </p>
    </div>
  );
}

/* ─────────────── SidebarLink — a single doc/link item ─────────────── */

function SidebarLink({ item, depth = 0 }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const href = item.href || item.to || "#";
  const active = isActiveItem(href, location.pathname);
  const [isVisited, setIsVisited] = useState(false);

  useEffect(() => {
    function update() {
      try {
        setIsVisited(localStorage.getItem("tfynes_visited_" + href) === "true");
      } catch {}
    }
    update();
    window.addEventListener("tfynes_visited", update);
    return () => window.removeEventListener("tfynes_visited", update);
  }, [href]);

  return (
    <motion.div
      whileHover={
        prefersReducedMotion || active
          ? {}
          : { x: 4, transition: { type: "spring", stiffness: 400, damping: 25 } }
      }
    >
      <Link
        to={href}
        className={
          "block rounded-lg px-3 py-1.5 text-sm no-underline transition-colors duration-150 " +
          (depth > 0 ? "ml-3 " : "") +
          (active
            ? "bg-[#DD7596]/20 text-[#CF1259] dark:text-[#DD7596] font-bold"
            : "text-gray-600 dark:text-gray-300 hover:text-[#DD7596] dark:hover:text-[#DD7596]")
        }
        aria-current={active ? "page" : undefined}
      >
        {active && (
          <motion.span
            layoutId="sidebar-active-pill"
            className="absolute inset-0 rounded-lg bg-[#DD7596]/20"
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          />
        )}
        <span className="relative z-10 flex items-center justify-between gap-1">
          <span className="truncate">{item.label}</span>
          {isVisited && !active && (
            <span
              className="text-xs flex-shrink-0"
              style={{ color: "var(--ifm-color-primary)" }}
              aria-label="Visited"
            >
              ✓
            </span>
          )}
        </span>
      </Link>
    </motion.div>
  );
}

/* ─────────────── SidebarCategory — collapsible category ─────────────── */

function SidebarCategory({ item, depth = 0 }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  // auto-open if any child is active
  const hasActiveChild = (items = []) =>
    items.some((child) => {
      if (child.type === "link" || child.type === "doc") {
        return isActiveItem(child.href || child.to || "", location.pathname);
      }
      if (child.type === "category") return hasActiveChild(child.items);
      return false;
    });

  const [open, setOpen] = useState(() => hasActiveChild(item.items));

  return (
    <div className={depth > 0 ? "ml-3" : ""}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-transparent border-0 cursor-pointer text-left group"
        aria-expanded={open}
      >
        {/* accent bar + label */}
        <span className="flex items-center gap-2 min-w-0">
          {depth === 0 && (
            <span className="w-0.5 h-4 rounded-full bg-[#DD7596] flex-shrink-0" />
          )}
          <span
            className={
              "text-xs font-bold uppercase tracking-widest truncate " +
              (depth === 0
                ? "text-gray-800 dark:text-gray-100"
                : "text-gray-600 dark:text-gray-300")
            }
          >
            {item.label}
          </span>
        </span>
        <motion.svg
          animate={{ rotate: open ? 90 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-gray-400 flex-shrink-0"
        >
          <path d="M9 18l6-6-6-6" />
        </motion.svg>
      </button>

      {/* Subtle divider below top-level category heading (only when expanded) */}
      {depth === 0 && open && (
        <div className="mx-3 mb-1 h-px bg-[#DD7596]/10" />
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="mt-1 space-y-0.5">
              <SidebarItems items={item.items || []} depth={depth + 1} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────── SidebarItems — renders a list of items ─────────────── */

function SidebarItems({ items, depth = 0 }) {
  return (
    <>
      {items.map((item, i) => {
        if (item.type === "category") {
          return <SidebarCategory key={i} item={item} depth={depth} />;
        }
        if (item.type === "link" || item.type === "doc") {
          return <SidebarLink key={i} item={item} depth={depth} />;
        }
        if (item.type === "html") {
          return (
            <div
              key={i}
              className="px-3 py-1"
              dangerouslySetInnerHTML={{ __html: item.value }}
            />
          );
        }
        return null;
      })}
    </>
  );
}

/* ─────────────── DocSidebar — main export ─────────────── */

/**
 * Custom DocSidebar — a floating detached card panel with course progress.
 *
 * Props (passed by Docusaurus):
 *   sidebar   — array of sidebar items
 *   path      — current page path
 *   onCollapse — callback to collapse sidebar (mobile)
 *   isHidden  — whether to hide the sidebar
 */
export default function DocSidebar({ sidebar, path, onCollapse, isHidden }) {
  const prefersReducedMotion = useReducedMotion();

  if (isHidden) return null;

  return (
    <motion.aside
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.45, ease: "easeOut" }}
      className="w-full px-3 pt-[72px] pb-4 self-start"
      aria-label="Documentation sidebar"
    >
      <div className="rounded-2xl shadow-2xl border border-[#DD7596]/25 bg-white/95 dark:bg-[#2d3748]/95 backdrop-blur-sm overflow-hidden">
        {/* top accent line */}
        <div
          className="h-0.5 w-full"
          style={{
            background: "linear-gradient(90deg, #CF1259 0%, #DD7596 50%, #9F7EBE 100%)",
          }}
        />

        {/* Course header with progress */}
        <CourseHeader sidebar={sidebar} />

        <nav className="p-3 space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-thin">
          <SidebarItems items={sidebar} depth={0} />
        </nav>
      </div>
    </motion.aside>
  );
}
