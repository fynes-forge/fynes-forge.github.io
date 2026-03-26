import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useColorMode } from "@docusaurus/theme-common";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { StaggerContainer, StaggerItem } from "@site/src/components/animations";

/* ─────────────── helpers ─────────────── */

/** Ensure internal `to` paths have a leading slash so they are treated as
 *  absolute routes rather than relative ones (Docusaurus config sometimes
 *  omits the leading slash, e.g. `to: "skills"`). */
function normalizeTo(to) {
  if (!to) return null;
  if (to.startsWith("/") || to.startsWith("http") || to.startsWith("mailto"))
    return to;
  return "/" + to;
}

function isActive(itemHref, pathname) {
  if (!itemHref) return false;
  const clean = itemHref.replace(/\/$/, "");
  const path = pathname.replace(/\/$/, "");
  if (clean === "" || clean === "/") return path === "" || path === "/";
  return path === clean || path.startsWith(clean + "/");
}

/* ─────────────── desktop dropdown ─────────────── */

function DropdownMenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 min-w-[180px] rounded-xl shadow-2xl border border-[#DD7596]/20 bg-white/95 dark:bg-[#2d3748]/95 backdrop-blur-md z-50 py-2 overflow-hidden"
        >
          {items.map((item, i) => {
            const href = normalizeTo(item.to) || item.href || "#";
            const external = !!item.href && !item.to;
            return (
              <Link
                key={i}
                to={external ? undefined : href}
                href={external ? href : undefined}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-[#DD7596] dark:hover:text-[#DD7596] hover:bg-[#DD7596]/10 transition-colors duration-150 no-underline"
              >
                {item.label}
              </Link>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────── desktop nav item ─────────────── */

function NavItem({ item, hoveredId, setHoveredId }) {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef(null);
  const isDropdown = item.type === "dropdown";
  const href = normalizeTo(item.to) || item.href || "#";
  const external = !!item.href && !item.to;
  const active = !isDropdown && isActive(href, location.pathname);

  function openDropdown() {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }
  function closeDropdown() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  }

  if (isDropdown) {
    return (
      <div
        className="relative"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
      >
        <button
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#DD7596] dark:hover:text-[#DD7596] transition-colors duration-200 bg-transparent border-0 cursor-pointer relative"
          onMouseEnter={() => setHoveredId(item.label)}
          onMouseLeave={() => setHoveredId(null)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          {hoveredId === item.label && (
            <motion.span
              layoutId="nav-underline"
              className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#DD7596] rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          {item.label}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <DropdownMenu items={item.items || []} isOpen={dropdownOpen} />
      </div>
    );
  }

  return (
    <Link
      to={external ? undefined : href}
      href={external ? href : undefined}
      className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 no-underline ${
        active
          ? "text-[#DD7596]"
          : "text-gray-700 dark:text-gray-200 hover:text-[#DD7596] dark:hover:text-[#DD7596]"
      }`}
      onMouseEnter={() => setHoveredId(item.label)}
      onMouseLeave={() => setHoveredId(null)}
    >
      {(hoveredId === item.label || active) && (
        <motion.span
          layoutId="nav-underline"
          className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#DD7596] rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      {item.label}
    </Link>
  );
}

/* ─────────────── mobile menu overlay ─────────────── */

function MobileMenu({ isOpen, onClose, items }) {
  const location = useLocation();

  // close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{
              background: "linear-gradient(135deg, #1C2329 0%, #404E5C 60%, #2A343F 100%)",
            }}
          >
            {/* close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="bg-white/20 border-0 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                <HamburgerIcon isOpen={true} />
              </button>
            </div>

            {/* nav links */}
            <div className="flex-1 flex flex-col justify-center px-8">
              <StaggerContainer className="space-y-2">
                {items.map((item, i) => {
                  if (item.type === "dropdown") {
                    return (
                      <React.Fragment key={i}>
                        <StaggerItem>
                          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1 mt-4">
                            {item.label}
                          </p>
                        </StaggerItem>
                        {(item.items || []).map((sub, j) => {
                          const href = normalizeTo(sub.to) || sub.href || "#";
                          const external = !!sub.href && !sub.to;
                          return (
                            <StaggerItem key={j}>
                              <Link
                                to={external ? undefined : href}
                                href={external ? href : undefined}
                                onClick={onClose}
                                className="block text-white text-xl font-bold py-1 no-underline hover:text-white/80 transition-colors"
                              >
                                {sub.label}
                              </Link>
                            </StaggerItem>
                          );
                        })}
                      </React.Fragment>
                    );
                  }
                  const href = normalizeTo(item.to) || item.href || "#";
                  const external = !!item.href && !item.to;
                  return (
                    <StaggerItem key={i}>
                      <Link
                        to={external ? undefined : href}
                        href={external ? href : undefined}
                        onClick={onClose}
                        className="block text-white text-2xl font-bold py-2 no-underline hover:text-white/80 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>

            {/* footer brand */}
            <div className="p-8">
              <p className="text-white/40 text-sm font-semibold">Fynes Forge</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────── hamburger icon ─────────────── */

function HamburgerIcon({ isOpen }) {
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0 : 0.25;

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <motion.line
        x1="3" y1="6" x2="19" y2="6"
        animate={isOpen ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
        style={{ originX: "11px", originY: "6px" }}
        transition={{ duration }}
      />
      <motion.line
        x1="3" y1="11" x2="19" y2="11"
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        style={{ originX: "11px", originY: "11px" }}
        transition={{ duration }}
      />
      <motion.line
        x1="3" y1="16" x2="19" y2="16"
        animate={isOpen ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
        style={{ originX: "11px", originY: "16px" }}
        transition={{ duration }}
      />
    </svg>
  );
}

/* ─────────────── color mode toggle ─────────────── */

function ColorModeToggle() {
  const { colorMode, setColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      onClick={() => setColorMode(isDark ? "light" : "dark")}
      aria-label="Toggle color mode"
      className="w-9 h-9 rounded-full flex items-center justify-center border border-[#DD7596]/30 bg-transparent cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#DD7596] dark:hover:text-[#DD7596] transition-colors duration-200"
    >
      <motion.div
        key={colorMode}
        initial={prefersReducedMotion ? {} : { rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06L6.166 6.166z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}

/* ─────────────── main Navbar ─────────────── */

export default function Navbar() {
  const { navbar } = useThemeConfig();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 60], [64, 52]);
  const blurAmount = useTransform(scrollY, [0, 60], [8, 20]);
  const blurStyle = useMotionTemplate`blur(${blurAmount}px)`;

  const items = (navbar?.items || []).filter((i) => i.position !== "right");

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.nav
        style={
          prefersReducedMotion
            ? {}
            : { height: navHeight }
        }
        className="navbar fixed top-0 left-0 right-0 z-30 border-b border-[#DD7596]/20"
        aria-label="Main navigation"
      >
        {/* frosted glass bg layer */}
        <motion.div
          className="absolute inset-0 bg-white/90 dark:bg-[#404E5C]/90"
          style={prefersReducedMotion ? {} : { backdropFilter: blurStyle }}
        />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="no-underline flex items-center gap-2 flex-shrink-0"
            aria-label="Fynes Forge home"
          >
            <span
              className="text-xl font-extrabold tracking-tight"
              style={{
    background: "linear-gradient(90deg, #ECDA90 0%, #B7C3F3 50%, #ECDA90 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Cinzel', serif",
                fontWeight: 900,
                letterSpacing: "0.18em",
              }}
            >
              FYNES FORGE
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {items.map((item, i) => (
              <NavItem
                key={i}
                item={item}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
            <div className="ml-3">
              <ColorModeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-3">
            <ColorModeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-transparent border border-[#DD7596]/30 cursor-pointer text-gray-700 dark:text-gray-200"
            >
              <HamburgerIcon isOpen={false} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* spacer to prevent content under navbar */}
      <div className="h-16" aria-hidden="true" />

      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMenu}
        items={items}
      />
    </>
  );
}
