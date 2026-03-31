import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ACCENT = "#DD7596";
const PERIWINKLE = "#B7C3F3";
const PALE_BLUE = "#AED6F1";

/**
 * Career milestone nodes evenly spaced along the CatmullRom path.
 * Points derived from a Catmull-Rom spline through the 6 positions.
 */
const milestones = [
  {
    id: 1,
    x: 80,
    y: 390,
    role: "First Line Support",
    company: "EMIS",
    period: "2014",
    isCurrent: false,
    r: 8,
  },
  {
    id: 2,
    x: 230,
    y: 320,
    role: "Junior DBA",
    company: "EMIS",
    period: "2018",
    isCurrent: false,
    r: 8,
  },
  {
    id: 3,
    x: 390,
    y: 248,
    role: "Database Administrator",
    company: "The Data Shed",
    period: "2019",
    isCurrent: false,
    r: 8,
  },
  {
    id: 4,
    x: 535,
    y: 178,
    role: "Software Engineer → Senior Data Engineer",
    company: "EMIS",
    period: "2020–2022",
    isCurrent: false,
    r: 8,
  },
  {
    id: 5,
    x: 680,
    y: 118,
    role: "Senior Data Engineer / Data Architect",
    company: "EMIS",
    period: "2022–2024",
    isCurrent: false,
    r: 8,
  },
  {
    id: 6,
    x: 770,
    y: 86,
    role: "Lead Data Engineer ",
    company: "Jet2",
    period: "2024–2024",
    isCurrent: false,
    r: 8,
  },
  {
    id: 6,
    x: 820,
    y: 68,
    role: "Senior Data Engineer",
    company: "Optum UK",
    period: "March 2024 – Present",
    isCurrent: true,
    r: 13,
  },
];

/**
 * Catmull-Rom spline approximated as a sequence of cubic Bézier segments
 * through the 6 milestone positions.
 */
const CURVE_PATH =
  "M 80,390 C 133,367 177,343 230,320 " +
  "C 292,296 341,268 390,248 " +
  "C 440,224 487,198 535,178 " +
  "C 583,156 632,130 680,118 " +
  "C 728,100 773,82 820,68";

/** Extracts the start year from a period string like "March 2024 – Present" → "2024". */
function extractStartYear(period) {
  const parts = period.split("–")[0].trim().split(" ");
  return parts[parts.length - 1];
}

/** Static star field — pre-defined to keep SSR safe (no Math.random on server). */
const STARS = [
  { cx: 45, cy: 30, r: 1.2, d: 0.0 },
  { cx: 120, cy: 75, r: 0.8, d: 0.5 },
  { cx: 195, cy: 18, r: 1.0, d: 1.2 },
  { cx: 310, cy: 58, r: 0.7, d: 0.3 },
  { cx: 450, cy: 14, r: 1.1, d: 1.8 },
  { cx: 560, cy: 48, r: 0.9, d: 0.8 },
  { cx: 650, cy: 22, r: 1.0, d: 2.1 },
  { cx: 740, cy: 42, r: 0.8, d: 0.1 },
  { cx: 845, cy: 18, r: 1.1, d: 1.5 },
  { cx: 890, cy: 65, r: 0.7, d: 0.9 },
  { cx: 58, cy: 148, r: 0.8, d: 2.3 },
  { cx: 148, cy: 195, r: 1.0, d: 0.6 },
  { cx: 280, cy: 165, r: 0.9, d: 1.1 },
  { cx: 420, cy: 128, r: 0.7, d: 2.7 },
  { cx: 600, cy: 150, r: 1.1, d: 0.4 },
  { cx: 760, cy: 162, r: 0.8, d: 1.9 },
  { cx: 30, cy: 275, r: 0.7, d: 0.7 },
  { cx: 165, cy: 425, r: 0.9, d: 1.6 },
  { cx: 350, cy: 440, r: 0.8, d: 2.4 },
  { cx: 495, cy: 410, r: 0.7, d: 0.2 },
  { cx: 715, cy: 345, r: 0.9, d: 1.3 },
  { cx: 855, cy: 298, r: 0.8, d: 2.0 },
  { cx: 100, cy: 368, r: 0.6, d: 1.7 },
  { cx: 448, cy: 358, r: 0.7, d: 0.8 },
  { cx: 788, cy: 248, r: 0.8, d: 2.5 },
  { cx: 918, cy: 158, r: 0.6, d: 1.0 },
  { cx: 328, cy: 98, r: 0.7, d: 2.2 },
  { cx: 708, cy: 82, r: 0.8, d: 0.3 },
];

/**
 * Universe — an SVG-based career journey visualisation.
 *
 * Renders a glowing CatmullRom-like path through six career milestones,
 * with twinkling stars, animated node reveal, and a hover tooltip panel.
 * The current role (Optum UK) is accented, enlarged and pulses continuously.
 *
 * Respects `prefers-reduced-motion` via framer-motion's `useReducedMotion`.
 */
export default function Universe() {
  const [hovered, setHovered] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #060614 0%, #0c0b24 50%, #170a2a 100%)",
        minHeight: 280,
      }}
    >
      {/* Radial accent glow near current role */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 88% 15%, rgba(221,117,150,0.10) 0%, transparent 55%)",
        }}
      />

      <svg
        viewBox="0 0 950 460"
        className="w-full"
        style={{ display: "block" }}
        aria-label="Career journey timeline from 2014 to present"
        role="img"
      >
        <defs>
          <filter id="uni-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="uni-glow-strong"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="uni-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={PERIWINKLE} stopOpacity="0.25" />
            <stop offset="65%" stopColor={PALE_BLUE} stopOpacity="0.55" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="uni-current-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Stars ────────────────────────────────────────────────── */}
        {STARS.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="white"
            initial={{ opacity: 0.2 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.3 }
                : { opacity: [0.2, 0.6, 0.2] }
            }
            transition={{
              duration: 2.5 + (i % 4) * 0.8,
              repeat: Infinity,
              delay: s.d,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* ── Career path (CatmullRom-like cubic Bézier) ───────────── */}
        <motion.path
          d={CURVE_PATH}
          fill="none"
          stroke="url(#uni-path-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1300"
          initial={{ strokeDashoffset: prefersReducedMotion ? 0 : 1300 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 2.5,
            ease: "easeInOut",
            delay: prefersReducedMotion ? 0 : 0.3,
          }}
          filter="url(#uni-glow)"
        />

        {/* ── Milestone nodes ──────────────────────────────────────── */}
        {milestones.map((m, i) => (
          <g
            key={m.id}
            onMouseEnter={() => setHovered(m)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(m)}
            onBlur={() => setHovered(null)}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-label={`${m.role} at ${m.company}, ${m.period}`}
          >
            {/* Ambient radial glow — current role only */}
            {m.isCurrent && (
              <circle
                cx={m.x}
                cy={m.y}
                r={m.r + 28}
                fill="url(#uni-current-glow)"
              />
            )}

            {/* Pulsing ring — current role only */}
            {m.isCurrent && !prefersReducedMotion && (
              <motion.circle
                cx={m.x}
                cy={m.y}
                r={m.r + 10}
                fill="none"
                stroke={ACCENT}
                strokeWidth="1"
                animate={{
                  r: [m.r + 10, m.r + 22, m.r + 10],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {/* Hover ring */}
            {hovered?.id === m.id && (
              <motion.circle
                cx={m.x}
                cy={m.y}
                r={m.r + 7}
                fill="none"
                stroke={m.isCurrent ? ACCENT : PERIWINKLE}
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.2 }}
              />
            )}

            {/* Node circle */}
            <motion.circle
              cx={m.x}
              cy={m.y}
              r={m.r}
              fill={m.isCurrent ? ACCENT : "#0d1a2e"}
              stroke={m.isCurrent ? ACCENT : PERIWINKLE}
              strokeWidth={m.isCurrent ? 2.5 : 1.5}
              filter={m.isCurrent ? "url(#uni-glow-strong)" : "url(#uni-glow)"}
              initial={{
                scale: prefersReducedMotion ? 1 : 0,
                opacity: prefersReducedMotion ? 1 : 0,
              }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.8 + i * 0.28,
                duration: 0.45,
                type: "spring",
                stiffness: 240,
                damping: 18,
              }}
              style={{ transformOrigin: `${m.x}px ${m.y}px` }}
            />

            {/* Inner accent dot — non-current nodes */}
            {!m.isCurrent && (
              <motion.circle
                cx={m.x}
                cy={m.y}
                r={2.5}
                fill={PERIWINKLE}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 1.05 + i * 0.28,
                }}
              />
            )}

            {/* Year label below node */}
            <motion.text
              x={m.x}
              y={m.y + m.r + 18}
              textAnchor="middle"
              fill={m.isCurrent ? ACCENT : PERIWINKLE}
              fontSize={m.isCurrent ? "12" : "10"}
              fontWeight={m.isCurrent ? "600" : "400"}
              fontFamily="Inter, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 1.1 + i * 0.28,
              }}
            >
              {extractStartYear(m.period)}
            </motion.text>

            {/* Company label above current role node */}
            {m.isCurrent && (
              <motion.text
                x={m.x}
                y={m.y - m.r - 12}
                textAnchor="middle"
                fill={ACCENT}
                fontSize="11"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ delay: prefersReducedMotion ? 0 : 2.6 }}
              >
                {m.company} ✦
              </motion.text>
            )}
          </g>
        ))}
      </svg>

      {/* ── Tooltip overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.id}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-3 rounded-xl text-sm pointer-events-none z-10"
            style={{
              background: "rgba(4, 4, 18, 0.95)",
              border: `1px solid ${hovered.isCurrent ? ACCENT : PERIWINKLE}45`,
              boxShadow: hovered.isCurrent
                ? `0 0 24px ${ACCENT}30`
                : `0 0 14px ${PERIWINKLE}18`,
              maxWidth: 300,
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
          >
            <p
              className="font-semibold text-sm leading-tight m-0"
              style={{ color: hovered.isCurrent ? ACCENT : PERIWINKLE }}
            >
              {hovered.role}
            </p>
            <p className="mt-1 text-sm m-0" style={{ color: "#a0aec0" }}>
              {hovered.company}
            </p>
            <p className="mt-1 text-xs m-0" style={{ color: "#718096" }}>
              {hovered.period}
            </p>
            {hovered.isCurrent && (
              <span
                className="inline-flex items-center gap-1 mt-2 text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: `${ACCENT}20`,
                  color: ACCENT,
                  border: `1px solid ${ACCENT}40`,
                }}
              >
                ✦ Current Role
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Component label */}
      <div
        className="absolute top-3 left-4 text-xs font-medium"
        style={{ color: `${PERIWINKLE}60` }}
      >
        Career Journey
      </div>
    </div>
  );
}
