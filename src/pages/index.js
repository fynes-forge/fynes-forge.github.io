import React, { Suspense, useEffect, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import AboutMe from "@site/src/components/About";
import { Typewriter } from "react-simple-typewriter";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@site/src/components/animations";
import styles from "./index.module.css";

const Universe = React.lazy(() => import("@site/src/components/Universe"));

// ── Count-up stat helper ─────────────────────────────────────────────
function CountUp({ end, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? end : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplay(end);
      return;
    }
    let frame;
    const startTime = performance.now();
    const duration = 1400;

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.floor(progress * end));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(end);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ── Bouncing scroll indicator ────────────────────────────────────────
function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      style={{ opacity }}
      className="flex flex-col items-center gap-1 cursor-pointer"
      onClick={() =>
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
      }
    >
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown
          className="w-6 h-6"
          style={{ color: "rgba(255,255,255,0.5)" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Hero section ────────────────────────────────────────────────────
export function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header
      className={`relative flex items-center justify-center overflow-hidden ${styles.heroBg}`}
      style={{ minHeight: "100vh" }}
    >
      {/* SVG grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Radial accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(221,117,150,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 gap-8">
        {/* Profile photo with conic ring + glow */}
        <FadeInOnScroll direction="down" delay={0}>
          <div className={styles.profileGlow}>
            <div className={styles.conicRing}>
              <div
                className="rounded-full overflow-hidden bg-[#0f0f1a]"
                style={{ padding: 2 }}
              >
                <img
                  src="img/profile.jpg"
                  alt="Avatar"
                  loading="lazy"
                  className="rounded-full"
                  style={{ width: 160, height: 160, display: "block" }}
                />
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Name */}
        <FadeInOnScroll direction="up" delay={150}>
          <h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #DD7596 0%, #B7C3F3 60%, #AED6F1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {siteConfig.title}
          </h1>
        </FadeInOnScroll>

        {/* Typewriter */}
        <FadeInOnScroll direction="up" delay={300}>
          <p
            className="text-xl md:text-2xl font-semibold h-8"
            style={{ color: "#DD7596" }}
          >
            <Typewriter
              words={["Software Engineer", "Coffee lover", "Data Enthusiast"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </p>
        </FadeInOnScroll>

        {/* CTA buttons */}
        <FadeInOnScroll direction="up" delay={450}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/career"
              className="px-7 py-3 rounded-xl font-bold text-white text-base inline-block"
              style={{
                background: "#DD7596",
                boxShadow: "0 0 20px rgba(221,117,150,0.35)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 32px rgba(221,117,150,0.65)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              View My Work
            </motion.a>

            <motion.a
              href="mailto:contact@fynesforge.dev"
              className="px-7 py-3 rounded-xl font-bold text-base inline-block"
              style={{
                color: "#DD7596",
                border: "2px solid rgba(221,117,150,0.6)",
                background: "transparent",
              }}
              whileHover={{
                scale: 1.05,
                borderColor: "#DD7596",
                boxShadow: "0 0 20px rgba(221,117,150,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </FadeInOnScroll>

        {/* Scroll indicator */}
        <FadeInOnScroll direction="up" delay={600}>
          <ScrollIndicator />
        </FadeInOnScroll>
      </div>
    </header>
  );
}

// ── Quick stats bar ─────────────────────────────────────────────────
function QuickStatsBar() {
  const stats = [
    { value: 8, suffix: "+", label: "Years Experience" },
    { value: 10, suffix: "+", label: "Technologies" },
    { value: 4, suffix: "", label: "Companies" },
  ];

  return (
    <FadeInOnScroll direction="up" delay={0}>
      <div
        className="w-full py-8"
        style={{
          background: "rgba(10,8,20,0.85)",
          borderTop: "1px solid rgba(221,117,150,0.15)",
          borderBottom: "1px solid rgba(221,117,150,0.15)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-around gap-6">
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="text-center">
                <p
                  className="text-4xl font-extrabold"
                  style={{ color: "#DD7596" }}
                >
                  <CountUp end={s.value} suffix={s.suffix} />
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "rgba(183,195,243,0.75)" }}
                >
                  {s.label}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div
                  className="hidden sm:block w-px self-stretch"
                  style={{ background: "rgba(221,117,150,0.2)", minHeight: 40 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </FadeInOnScroll>
  );
}

// ── Universe section ────────────────────────────────────────────────
function UniverseSection() {
  return (
    <FadeInOnScroll direction="up" delay={0}>
      <section
        className="w-full py-16 px-4"
        style={{ background: "rgba(6,6,20,0.95)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-center mb-2 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #DD7596 0%, #B7C3F3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ✦ My Universe
          </h2>
          <p
            className="text-center text-sm mb-8"
            style={{ color: "rgba(183,195,243,0.55)" }}
          >
            Drag · Zoom · Click a planet
          </p>

          <Suspense
            fallback={
              <div
                className="w-full rounded-2xl animate-pulse"
                style={{
                  height: 280,
                  background: "rgba(221,117,150,0.06)",
                  border: "1px solid rgba(221,117,150,0.12)",
                }}
              />
            }
          >
            <Universe />
          </Suspense>
        </div>
      </section>
    </FadeInOnScroll>
  );
}

// ── Featured skills teaser ──────────────────────────────────────────
const FEATURED_SKILLS = [
  "Python",
  "SQL",
  "Spark",
  "Airflow",
  "Snowflake",
  "AWS",
  "Azure",
  "Starburst",
];

function SkillsTeaser() {
  return (
    <section className="w-full py-14 px-4">
      <div
        className="max-w-3xl mx-auto"
        style={{
          borderTop: "1px solid rgba(221,117,150,0.25)",
          borderBottom: "1px solid rgba(221,117,150,0.25)",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <FadeInOnScroll direction="up" delay={0}>
          <h2 className="text-2xl font-bold text-center mb-8">
            Key Technologies
          </h2>
        </FadeInOnScroll>

        <StaggerContainer
          staggerDelay={0.07}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {FEATURED_SKILLS.map((skill) => (
            <StaggerItem key={skill}>
              <motion.span
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: "rgba(221,117,150,0.1)",
                  color: "#DD7596",
                  border: "1px solid rgba(221,117,150,0.3)",
                }}
                whileHover={{
                  background: "rgba(221,117,150,0.2)",
                  borderColor: "#DD7596",
                  scale: 1.06,
                }}
                transition={{ duration: 0.15 }}
              >
                {skill}
              </motion.span>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center">
          <motion.a
            href="/skills"
            className="inline-block px-6 py-2.5 rounded-xl font-semibold text-sm"
            style={{
              color: "#DD7596",
              border: "1px solid rgba(221,117,150,0.4)",
            }}
            whileHover={{
              borderColor: "#DD7596",
              boxShadow: "0 0 16px rgba(221,117,150,0.3)",
              scale: 1.04,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            View Full Skills →
          </motion.a>
        </div>
      </div>
    </section>
  );
}

// ── Final CTA strip ─────────────────────────────────────────────────
function FinalCTA() {
  return (
    <FadeInOnScroll direction="up" delay={0}>
      <section
        className="w-full py-20 px-4 text-center"
        style={{
          background: "rgba(10,8,20,0.9)",
          borderTop: "1px solid rgba(221,117,150,0.15)",
        }}
      >
        <h2
          className="text-3xl md:text-5xl font-extrabold mb-4"
          style={{ color: "#fff" }}
        >
          Let's build something great.
        </h2>
        <p
          className="text-base md:text-lg mb-10 max-w-lg mx-auto"
          style={{ color: "rgba(183,195,243,0.7)" }}
        >
          Open to new opportunities and interesting problems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/career"
            className="px-8 py-3 rounded-xl font-bold text-white text-base inline-block"
            style={{
              background: "#DD7596",
              boxShadow: "0 0 20px rgba(221,117,150,0.3)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 32px rgba(221,117,150,0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            View My Career →
          </motion.a>

          <motion.a
            href="mailto:contact@fynesforge.dev"
            className="px-8 py-3 rounded-xl font-bold text-base inline-block"
            style={{
              color: "#DD7596",
              border: "2px solid rgba(221,117,150,0.6)",
              background: "transparent",
            }}
            whileHover={{
              scale: 1.05,
              borderColor: "#DD7596",
              boxShadow: "0 0 20px rgba(221,117,150,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </section>
    </FadeInOnScroll>
  );
}

// ── Page root ───────────────────────────────────────────────────────
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="Tom F website">
      <HomepageHeader />

      <main>
        {/* b) Quick stats bar */}
        <QuickStatsBar />

        {/* c) About Me */}
        <FadeInOnScroll direction="up" delay={0}>
          <AboutMe />
        </FadeInOnScroll>

        {/* d) Universe */}
        <UniverseSection />

        {/* e) Featured skills teaser */}
        <FadeInOnScroll direction="up" delay={0}>
          <SkillsTeaser />
        </FadeInOnScroll>

        {/* f) Final CTA strip */}
        <FinalCTA />
      </main>
    </Layout>
  );
}
