import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@site/src/components/animations";
import { PIPELINES } from "../../data/pipelines/index";
import styles from "./pipelines.module.css";

export default function PipelinesGallery() {
  return (
    <Layout
      title="Data Pipeline Architectures"
      description="Interactive visualizations of real-world data engineering patterns"
    >
      <main>
        {/* ── Hero banner with animated gradient mesh ── */}
        <div className={`${styles.heroBanner} blog-hero-bg`}>
          <FadeInOnScroll direction="down" delay={0}>
            <div className="text-center">
              <h1 className={styles.heroTitle}>
                Data Pipeline Architectures
              </h1>
              <p className={styles.heroSubtitle}>
                Interactive visualizations of real-world data engineering patterns
              </p>
              <div className={styles.accentDivider} />

              {/* ── Stat row ── */}
              <FadeInOnScroll direction="up" delay={200}>
                <div className={styles.statRow}>
                  <span className={styles.statPill}>{PIPELINES.length} Pipelines</span>
                  <span className={styles.statDot}>·</span>
                  <span className={styles.statPill}>Interactive</span>
                  <span className={styles.statDot}>·</span>
                  <span className={styles.statPill}>Real-world Patterns</span>
                </div>
              </FadeInOnScroll>
            </div>
          </FadeInOnScroll>
        </div>

        {/* ── Pipeline Cards ── */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className={styles.cardGrid}>
            {PIPELINES.map((pipeline, index) => (
              <FadeInOnScroll key={pipeline.id} direction="up" delay={index * 80}>
                <PipelineCard pipeline={pipeline} />
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

function PipelineCard({ pipeline }: { pipeline: (typeof PIPELINES)[0] }) {
  const isAdvanced = pipeline.complexity === "Advanced";
  const complexityBg = isAdvanced
    ? "rgba(207,18,89,0.12)"
    : "rgba(217,119,6,0.12)";
  const complexityColor = isAdvanced ? "#dc2626" : "#d97706";

  return (
    <Link to={pipeline.route} className={styles.cardLink}>
      <motion.div
        className={styles.card}
        style={{ "--accent-color": pipeline.accentColor } as React.CSSProperties}
        whileHover={{ y: -6, boxShadow: `0 16px 48px ${pipeline.accentColor}33` }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Header row: emoji badge + title/description + complexity badge */}
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleGroup}>
            <span className={styles.cardEmoji}>{pipeline.emoji}</span>
            <div>
              <h2
                className={styles.cardTitle}
                style={{
                  background: `linear-gradient(135deg, ${pipeline.accentColor}, #8716f1)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {pipeline.title}
              </h2>
              <p className={styles.cardDescription}>{pipeline.shortDescription}</p>
            </div>
          </div>
          <span
            className={styles.complexityBadge}
            style={{
              color: complexityColor,
              background: complexityBg,
              border: `1px solid ${complexityColor}55`,
            }}
          >
            {pipeline.complexity}
          </span>
        </div>

        {/* Tech stack chips */}
        <div className={styles.techStack}>
          {pipeline.techStack.map((tech) => (
            <span key={tech} className={styles.techChip}>
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <motion.span
            className={styles.ctaText}
            whileHover="hover"
            initial="rest"
          >
            View Pipeline{" "}
            <motion.span
              variants={{ rest: { x: 0 }, hover: { x: 4 } }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}

