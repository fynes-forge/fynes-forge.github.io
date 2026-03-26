import React, { useState } from "react";
import Layout from "@theme/Layout";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./skills.module.css";
import { FadeInOnScroll, StaggerContainer, StaggerItem } from "@site/src/components/animations";

const categories = [
  {
    id: "data-engineering",
    title: "Data Engineering",
    emoji: "⚡",
    accentColor: "#DD7596",
    description: "Building scalable pipelines, architectures and cloud infrastructure",
    skills: [
      { label: "Python", img: "img/python.png" },
      { label: "SQL", img: "img/sql.svg" },
      { label: "Spark", img: "img/spark.svg" },
      { label: "Airflow", img: "img/airflow.svg" },
      { label: "Snowflake", img: "img/snowflake.svg" },
      { label: "AWS", img: "img/aws.png" },
      { label: "Azure", img: "img/azure.svg" },
      { label: "GCP", img: "img/gcp.svg" },
      { label: "Data Modeling", img: "img/data-modeling.svg" },
      { label: "Data Governance", img: "img/data-governance.svg" },
      { label: "Data Quality", img: "img/data-quality.svg" },
      { label: "ETL", img: "img/etl.svg" },
      { label: "Data Architecture", img: "img/data-architecture.svg" },
      { label: "CI/CD", img: "img/cicd.svg" },
    ],
  },
  {
    id: "software-development",
    title: "Software Development",
    emoji: "💻",
    accentColor: "#B7C3F3",
    description: "Crafting robust applications with modern development practices",
    skills: [
      { label: "C#", img: "img/csharp.png" },
      { label: ".NET (WinForms, WPF, ASP.NET)", img: "img/dotnet.svg" },
      { label: "GIT", img: "img/Git.png" },
      { label: "Terraform", img: "img/terraform.svg" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    emoji: "🗄️",
    accentColor: "#AED6F1",
    description: "Designing and optimising relational and analytical database systems",
    skills: [
      { label: "Microsoft SQL Server", img: "img/sql_server.png" },
      { label: "Snowflake", img: "img/snowflake.svg" },
      { label: "Trino", img: "img/trino.png" },
      { label: "Postgres", img: "img/postgres.svg" },
      { label: "MySQL", img: "img/mysql.svg" },
    ],
  },
  {
    id: "other",
    title: "Other",
    emoji: "🌟",
    accentColor: "#ECDA90",
    description: "Professional competencies that complement the technical toolkit",
    skills: [
      { label: "Problem-solving", img: "img/problem-solving.svg" },
      { label: "Team Leadership", img: "img/team-leadership.svg" },
      { label: "Communication (Written & Verbal)", img: "img/communication.svg" },
      { label: "Collaboration", img: "img/collaboration.svg" },
      { label: "Technical Documentation", img: "img/tech-docs.svg" },
    ],
  },
];

const contentVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  expanded: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

function CategorySection({ category, isOpen, onToggle, index }) {
  return (
    <div
      className={styles.section}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        className={styles.sectionHeader}
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{ "--accent-color": category.accentColor }}
      >
        <div className={styles.sectionHeaderLeft}>
          <span className={styles.sectionEmoji}>{category.emoji}</span>
          <div className={styles.sectionTitleGroup}>
            <h2 className={styles.sectionTitle}>{category.title}</h2>
            <p className={styles.sectionDescription}>{category.description}</p>
          </div>
        </div>
        <div className={styles.sectionHeaderRight}>
          <span className={styles.skillCount}>{category.skills.length} skills</span>
          <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>
            ▾
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={contentVariants}
            className={styles.sectionContent}
          >
            <StaggerContainer className={styles.skillsGrid}>
              {category.skills.map((skill) => (
                <StaggerItem key={skill.label}>
                  <div className={styles.skillChip}>
                    {skill.img && (
                      <img
                        src={skill.img}
                        alt={skill.label}
                        className={styles.chipIcon}
                      />
                    )}
                    <span>{skill.label}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Skills() {
  const [openSections, setOpenSections] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {})
  );

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Layout title="Skills" description="Tom Fynes – Skills & Technologies">
      <main>
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <FadeInOnScroll direction="up" delay={0}>
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Skills</h1>
                <p className="text-base leading-relaxed max-w-2xl mx-auto opacity-70">
                  A snapshot of the tools, technologies and competencies that make up
                  my professional toolkit.
                </p>
                <div className="mt-6 flex justify-center">
                  <div
                    className="w-16 h-1 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #DD7596, #B7C3F3)",
                    }}
                  />
                </div>
              </div>
            </FadeInOnScroll>

            {/* Accordion sections */}
            <div className={styles.sectionsContainer}>
              {categories.map((category, index) => (
                <FadeInOnScroll key={category.id} direction="up" delay={index * 100}>
                  <CategorySection
                    category={category}
                    isOpen={openSections[category.id]}
                    onToggle={() => toggleSection(category.id)}
                    index={index}
                  />
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

