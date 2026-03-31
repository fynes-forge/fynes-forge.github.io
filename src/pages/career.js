import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@site/src/components/animations";
import { GITHUB_USERNAME } from "@site/src/config/dashboardConfig";
import Universe from "@site/src/components/Universe";

const ACCENT = "#DD7596";
const PERIWINKLE = "#B7C3F3";
const PALE_BLUE = "#AED6F1";
const MAGENTA = "#ECDA90";
const CONTACT_EMAIL = "tf.dev@icloud.com";

// ─── Data ──────────────────────────────────────────────────────────────────────

const FILTERS = [
  { id: "all", label: "All" },
  { id: "emis-optum", label: "EMIS / Optum" },
  { id: "data-shed", label: "The Data Shed" },
  { id: "jet-2", label: "Jet2" },
];

const workHistory = [
  {
    id: 1,
    company: "Optum UK (formerly EMIS)",
    role: "Senior Data Engineer",
    period: "March 2024 – Present",
    badge: "Current Role",
    filterGroup: "emis-optum",
    companyColor: ACCENT,
    highlights: [
      "Data models, governance and quality standards",
      "Technical guidance to engineering and analytics teams",
      "Data pipelines using Python, SQL, Spark, Airflow, Starburst",
      "Solutions on AWS and Azure",
      "Mentoring new team members",
    ],
  },
  {
    id: 2,
    company: "Jet2",
    role: "Lead Data Engineer",
    period: "January 2024 – March 2024",
    badge: null,
    filterGroup: "emis-optum",
    companyColor: PERIWINKLE,
    highlights: [
      "Managed team focused on bookings and profit optimisation",
      "Critical data pipeline maintenance",
      "Data models design and implementation",
      "GCP and Snowflake cloud solutions",
    ],
  },
  {
    id: 3,
    company: "EMIS",
    role: "Senior Data Engineer / Data Architect",
    period: "November 2022 – January 2024",
    badge: null,
    filterGroup: "emis-optum",
    companyColor: PERIWINKLE,
    highlights: [
      "Implemented the Data Architecture function across the department",
      "Data governance and quality standards",
      "AWS and Azure data solutions",
      "Mentored junior team members",
    ],
  },
  {
    id: 4,
    company: "EMIS",
    role: "Senior Software Engineer",
    period: "July 2021 – November 2022",
    badge: null,
    filterGroup: "emis-optum",
    companyColor: PERIWINKLE,
    highlights: [
      "Data pipelines using Python, SQL, Spark, Airflow, Starburst",
      "Advised product managers on technical feasibility",
      "24/7/365 major incident support",
    ],
  },
  {
    id: 5,
    company: "EMIS",
    role: "Software Engineer",
    period: "December 2020 – July 2021",
    badge: null,
    filterGroup: "emis-optum",
    companyColor: PERIWINKLE,
    highlights: [
      "Custom analytic reports using SSRS and SSIS",
      "Microsoft SQL Server maintenance (2008R2–2016)",
      "C# application development (WinForms, WPF, ASP.NET)",
    ],
  },
  {
    id: 6,
    company: "EMIS",
    role: "Database Developer",
    period: "November 2019 – December 2020",
    badge: null,
    filterGroup: "emis-optum",
    companyColor: PERIWINKLE,
    highlights: [
      "Automated CI/CD pipelines for the DBA team",
      "Python scripts for environment maintenance",
      "Ad-hoc SQL for data fixing and validation",
    ],
  },
  {
    id: 7,
    company: "The Data Shed",
    role: "Database Administrator",
    period: "May 2019 – November 2019",
    badge: null,
    filterGroup: "data-shed",
    companyColor: PALE_BLUE,
    highlights: [
      "DevOps methodologies advisory",
      "Database performance monitoring and optimisation",
      "Presented to C-level executives at blue chip organisations",
      "Database security and access control",
    ],
  },
  {
    id: 8,
    company: "EMIS",
    role: "Junior DBA",
    period: "May 2018 – May 2019",
    badge: null,
    filterGroup: "emis-optum",
    companyColor: PERIWINKLE,
    highlights: [
      "Performance monitoring across all environments",
      "Python scripts for maintenance",
      "SSRS and SSIS reporting",
    ],
  },
  {
    id: 9,
    company: "EMIS",
    role: "Implementation Specialist → 2nd Line → 1st Line Support",
    period: "June 2014 – May 2018",
    badge: null,
    filterGroup: "emis-optum",
    companyColor: PERIWINKLE,
    highlights: [
      "24/7/365 major incident resolution",
      "Customer liaison across departments",
      "Foundation of EMIS product and data knowledge",
    ],
  },
];

const KEY_SKILLS = [
  { label: "Python", color: ACCENT },
  { label: "SQL", color: PERIWINKLE },
  { label: "Spark", color: MAGENTA },
  { label: "Airflow", color: PALE_BLUE },
  { label: "Snowflake", color: PERIWINKLE },
  { label: "AWS", color: MAGENTA },
  { label: "Azure", color: ACCENT },
  { label: "dbt", color: PALE_BLUE },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Counts from 0 to `end` using an eased animation when the element enters view. */
function CountUp({ end, duration = 1800 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }
    let rafId;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * end));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, end, duration, prefersReducedMotion]);

  return <span ref={ref}>{count}</span>;
}

/** Pulsing centre-line dot that animates when the parent card is hovered. */
function CenterDot({ entry, isHovered, prefersReducedMotion }) {
  return (
    <motion.div
      className="w-4 h-4 rounded-full z-10 relative flex-shrink-0"
      style={{
        background: entry.badge === "Current Role" ? ACCENT : PERIWINKLE,
      }}
      animate={
        isHovered && !prefersReducedMotion
          ? {
              scale: [1, 1.45, 1],
              boxShadow: [
                `0 0 0px ${ACCENT}00`,
                `0 0 14px ${ACCENT}99`,
                `0 0 0px ${ACCENT}00`,
              ],
            }
          : { scale: 1 }
      }
      transition={
        isHovered && !prefersReducedMotion
          ? { duration: 0.7, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }
      }
    />
  );
}

/** Individual timeline card with hover lift + accent border glow. */
function WorkCard({ entry, isHovered }) {
  return (
    <motion.div
      className="rounded-xl p-5 h-full border bg-white dark:bg-gray-800"
      style={{
        borderColor: isHovered
          ? `${entry.companyColor}60`
          : "rgba(128,128,128,0.18)",
        boxShadow: isHovered ? `0 8px 32px ${entry.companyColor}22` : undefined,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
          <h3
            className="text-lg font-bold leading-tight m-0"
            style={{
              color: "var(--ifm-heading-color)",
              textAlign: "left",
              padding: 0,
            }}
          >
            {entry.role}
          </h3>
          {entry.badge && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
              style={{
                background: `${ACCENT}20`,
                color: ACCENT,
                border: `1px solid ${ACCENT}50`,
              }}
            >
              {entry.badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
            style={{
              background: `${entry.companyColor}20`,
              color: entry.companyColor,
              border: `1px solid ${entry.companyColor}40`,
            }}
          >
            {entry.company}
          </span>
          <span className="text-xs" style={{ opacity: 0.6 }}>
            {entry.period}
          </span>
        </div>
      </div>

      {/* Highlights */}
      <ul className="space-y-1.5 m-0 p-0 list-none">
        {entry.highlights.map((h, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm"
            style={{ opacity: 0.8 }}
          >
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: entry.companyColor }}
            />
            {h}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function Career() {
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const filtered =
    filter === "all"
      ? workHistory
      : workHistory.filter((e) => e.filterGroup === filter);

  return (
    <Layout
      title="Career"
      description="Tom Fynes – Career Journey & Work History"
    >
      <main>
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Universe visualisation */}
            <FadeInOnScroll direction="up" delay={0}>
              <div className="mb-10">
                <Universe />
              </div>
            </FadeInOnScroll>

            <div className="text-center">
              {/* Gradient title */}
              <FadeInOnScroll direction="up" delay={200}>
                <h1
                  className="text-5xl md:text-6xl font-extrabold mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, ${PERIWINKLE} 50%, ${PALE_BLUE} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    padding: 0,
                  }}
                >
                  Career Journey
                </h1>
              </FadeInOnScroll>

              <FadeInOnScroll direction="up" delay={350}>
                <p className="text-xl mb-10" style={{ opacity: 0.7 }}>
                  8+ years turning data into decisions
                </p>
              </FadeInOnScroll>

              {/* Animated stat counters */}
              <FadeInOnScroll direction="up" delay={500}>
                <div className="flex justify-center gap-10 md:gap-20 flex-wrap">
                  {[
                    { end: 8, plus: true, label: "Years Experience" },
                    { end: 4, plus: false, label: "Companies" },
                    { end: 10, plus: true, label: "Technologies" },
                  ].map(({ end, plus, label }) => (
                    <div key={label} className="text-center min-w-20">
                      <div
                        className="text-4xl md:text-5xl font-extrabold"
                        style={{ color: ACCENT }}
                      >
                        <CountUp end={end} />
                        {plus && "+"}
                      </div>
                      <div className="text-sm mt-1" style={{ opacity: 0.6 }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* ── Work History ─────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <FadeInOnScroll direction="up" delay={0}>
              <div className="text-center mb-10">
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-3"
                  style={{
                    color: "var(--ifm-heading-color)",
                    padding: 0,
                    textAlign: "center",
                  }}
                >
                  Work History
                </h2>
                <div
                  className="w-16 h-1 rounded-full mx-auto"
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT}, ${PERIWINKLE})`,
                  }}
                />
              </div>
            </FadeInOnScroll>

            {/* Filter bar */}
            <FadeInOnScroll direction="up" delay={100}>
              <div className="flex justify-center gap-2 flex-wrap mb-12">
                {FILTERS.map((f) => (
                  <motion.button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer border"
                    style={{
                      background:
                        filter === f.id ? `${ACCENT}20` : "transparent",
                      color:
                        filter === f.id ? ACCENT : "var(--ifm-font-color-base)",
                      borderColor:
                        filter === f.id
                          ? `${ACCENT}60`
                          : "rgba(128,128,128,0.3)",
                      outline: "none",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    {f.label}
                  </motion.button>
                ))}
              </div>
            </FadeInOnScroll>

            {/* Vertical centre-line timeline */}
            <div className="relative">
              {/* Centre line — desktop only */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
                style={{
                  background: `linear-gradient(180deg, transparent, ${ACCENT}30 20%, ${PERIWINKLE}30 80%, transparent)`,
                }}
              />

              <AnimatePresence mode="popLayout">
                {filtered.map((entry, i) => {
                  const isLeft = i % 2 === 0;
                  const direction = isLeft ? "left" : "right";
                  const isHovered = hoveredCard === entry.id;

                  return (
                    <motion.div
                      key={entry.id}
                      layout
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.25 }}
                      className="mb-10"
                      onMouseEnter={() => setHoveredCard(entry.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className={`flex flex-col md:items-start gap-4 md:gap-0 ${
                          isLeft ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Card */}
                        <FadeInOnScroll
                          direction={direction}
                          delay={i * 50}
                          className="w-full md:w-[46%]"
                        >
                          <WorkCard entry={entry} isHovered={isHovered} />
                        </FadeInOnScroll>

                        {/* Centre dot — desktop only */}
                        <div className="hidden md:flex w-[8%] justify-center items-start pt-7">
                          <CenterDot
                            entry={entry}
                            isHovered={isHovered}
                            prefersReducedMotion={prefersReducedMotion}
                          />
                        </div>

                        {/* Spacer */}
                        <div className="hidden md:block w-[46%]" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Skills Teaser ─────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <FadeInOnScroll direction="up" delay={0}>
              <div className="text-center mb-10">
                <h2
                  className="text-3xl md:text-4xl font-extrabold mb-3"
                  style={{
                    color: "var(--ifm-heading-color)",
                    padding: 0,
                    textAlign: "center",
                  }}
                >
                  Tech Snapshot
                </h2>
                <p
                  className="text-base max-w-lg mx-auto"
                  style={{ opacity: 0.6 }}
                >
                  A quick glimpse of the core technologies in my toolkit.
                </p>
              </div>
            </FadeInOnScroll>

            {/* Skill pills */}
            <StaggerContainer className="flex flex-wrap justify-center gap-3 mb-10">
              {KEY_SKILLS.map((skill) => (
                <StaggerItem key={skill.label}>
                  <motion.span
                    className="inline-block px-5 py-2 rounded-full text-sm font-semibold cursor-default"
                    style={{
                      background: `${skill.color}15`,
                      color: skill.color,
                      border: `1px solid ${skill.color}40`,
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: 1.08,
                            background: `${skill.color}28`,
                            boxShadow: `0 0 16px ${skill.color}32`,
                          }
                    }
                    transition={{ duration: 0.15 }}
                  >
                    {skill.label}
                  </motion.span>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* CTA card */}
            <FadeInOnScroll direction="up" delay={200}>
              <motion.div
                className="rounded-2xl p-8 text-center"
                style={{
                  background: `${ACCENT}08`,
                  border: `1px solid ${ACCENT}35`,
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -6,
                        boxShadow: `0 0 36px ${ACCENT}28`,
                        borderColor: `${ACCENT}70`,
                      }
                }
                transition={{ duration: 0.2 }}
              >
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{
                    color: "var(--ifm-heading-color)",
                    textAlign: "center",
                    padding: 0,
                  }}
                >
                  Want the full picture?
                </h3>
                <p className="text-base mb-6" style={{ opacity: 0.6 }}>
                  Explore my complete tech stack and skill breakdown.
                </p>
                <Link
                  to="/skills"
                  className="inline-block px-6 py-3 rounded-xl text-sm font-semibold no-underline"
                  style={{ background: ACCENT, color: "#fff" }}
                >
                  View Skills Page →
                </Link>
              </motion.div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ── Summary Callout ───────────────────────────────────────────── */}
        <section className="py-16 px-4 pb-24">
          <div className="max-w-3xl mx-auto">
            <FadeInOnScroll direction="up" delay={0}>
              <div
                className="rounded-2xl p-8 md:p-10 text-center"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}10, ${PERIWINKLE}10)`,
                  border: `1px solid ${ACCENT}30`,
                  boxShadow: `0 0 48px ${ACCENT}12`,
                }}
              >
                <p
                  className="text-lg md:text-xl font-semibold leading-relaxed mb-6"
                  style={{
                    color: "var(--ifm-font-color-base)",
                    opacity: 0.9,
                  }}
                >
                  Results-driven Data Engineer with{" "}
                  <span style={{ color: ACCENT }}>8+ years</span> of experience
                  building robust data pipelines and architectures across{" "}
                  <span style={{ color: PERIWINKLE }}>AWS</span>,{" "}
                  <span style={{ color: PALE_BLUE }}>Azure</span>, and{" "}
                  <span style={{ color: MAGENTA }}>GCP</span>.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                  <motion.a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-block px-6 py-3 rounded-xl text-sm font-semibold no-underline"
                    style={{ background: ACCENT, color: "#fff" }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : { scale: 1.05, boxShadow: `0 0 20px ${ACCENT}50` }
                    }
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    Get In Touch
                  </motion.a>

                  <motion.a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-xl text-sm font-semibold no-underline border"
                    style={{
                      color: PERIWINKLE,
                      borderColor: `${PERIWINKLE}50`,
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: 1.05,
                            borderColor: PERIWINKLE,
                            boxShadow: `0 0 16px ${PERIWINKLE}32`,
                          }
                    }
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    GitHub Profile →
                  </motion.a>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>
      </main>
    </Layout>
  );
}
