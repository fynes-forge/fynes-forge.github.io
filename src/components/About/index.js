import React from "react";
import { motion } from "framer-motion";
import {
  StaggerContainer,
  StaggerItem,
} from "@site/src/components/animations";

const techCards = [
  {
    label: "Languages",
    items: ["Python 🐍", "SQL 🧮", "JavaScript", "C#"],
  },
  {
    label: "Data",
    items: ["Trino ⚡", "Snowflake ❄️", "SQLMesh", "Airflow"],
  },
  {
    label: "Cloud",
    items: ["Azure ☁️", "AWS 🌩️", "GCP (a bit)"],
  },
  {
    label: "Other",
    items: ["Git", "Docker 🐳", "CI/CD", "Agile/Scrum", "Jupyter"],
  },
];

export default function AboutMe() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      {/* ── Intro card ────────────────────────────────────────────── */}
      <div className="relative pl-6 mb-12">
        {/* Accent left border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-[#DD7596]" />

        {/* "Currently at" badge */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-5"
          style={{
            background: "rgba(221,117,150,0.12)",
            color: "#DD7596",
            border: "1px solid rgba(221,117,150,0.3)",
          }}
        >
          Currently at Optum UK 🏢
        </span>

        <h2 className="text-4xl font-bold mb-6">👋 About Me</h2>

        <div className="max-w-2xl space-y-4 leading-relaxed">
          <p className="text-lg">
            Hi, I'm <span className="font-semibold">Tom</span> — a passionate
            Software Engineer currently working as a{" "}
            <span className="font-semibold">Senior Data Engineer</span> at{" "}
            <span className="font-semibold">Optum UK</span> (formerly EMIS)
            within their Data &amp; Analytics department.
          </p>

          <p className="text-lg">
            With a background in{" "}
            <span className="font-semibold">data engineering</span>,{" "}
            <span className="font-semibold">analytics</span>, and{" "}
            <span className="font-semibold">technical leadership</span>, I'm
            deeply interested in how data can drive better decisions, products,
            and outcomes. I love turning raw data into meaningful insights and
            building scalable, efficient pipelines to make it happen. 🚀
          </p>

          <p className="text-lg">
            Outside of work, you'll find me tinkering with side projects,
            learning new tech, and probably obsessing over a new productivity
            tool. 😅
          </p>
        </div>
      </div>

      {/* ── Tech snapshot grid ────────────────────────────────────── */}
      <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: "#DD7596" }}>
        🛠️ Tech Snapshot
      </h3>

      <StaggerContainer
        staggerDelay={0.1}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {techCards.map((card) => (
          <StaggerItem key={card.label}>
            <motion.div
              className="rounded-xl p-4 h-full"
              style={{
                background: "rgba(15, 15, 26, 0.6)",
                border: "1px solid rgba(221,117,150,0.15)",
              }}
              whileHover={{
                borderColor: "rgba(221,117,150,0.5)",
                boxShadow: "0 0 20px rgba(221,117,150,0.15)",
              }}
              transition={{ duration: 0.2 }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "#DD7596" }}
              >
                {card.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {card.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(183,195,243,0.1)",
                      color: "#B7C3F3",
                      border: "1px solid rgba(183,195,243,0.2)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="text-center mb-10">
        <a
          href="/skills"
          className="text-sm font-medium"
          style={{ color: "#DD7596" }}
        >
          See full skill set →
        </a>
      </div>

      <p className="text-lg text-center">
        Looking to connect with forward-thinking teams, share knowledge, or
        explore exciting new challenges. 👨‍💻
        <br />
        <span className="mt-2 block">Feel free to reach out!</span>
      </p>
    </section>
  );
}
