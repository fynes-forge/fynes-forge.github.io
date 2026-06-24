import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "SQL 101",
    description: "A comprehensive, open-source guide mapping out relational database fundamentals from scratch. Built for modern engineers.",
    type: "Course",
    tags: ["SQL", "Education", "Documentation"],
    link: "/docs/intro", 
  },
  {
    title: "Fynes Forge Ecosystem",
    description: "My central repository framework for decoupled tool engineering, production pipelines, and architecture showcases.",
    type: "Open Source",
    tags: ["GitHub Org", "Architecture", "DevOps"],
    link: "https://github.com/fynes-forge",
    isExternal: true,
  },
  // You can easily add a third project card here in the future!
];

export default function FeaturedWork() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h3 className="text-xl font-semibold mb-2 text-center" style={{ color: "#DD7596" }}>
        🚀 Featured Work
      </h3>
      <p className="text-sm text-center text-gray-400 mb-8 max-w-md mx-auto">
        A quick look at production-ready resources, open-source tools, and documentation forged under the organization.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            className="rounded-xl p-5 flex flex-col justify-between"
            style={{
              background: "rgba(15, 15, 26, 0.6)",
              border: "1px solid rgba(221,117,150,0.15)",
            }}
            whileHover={{
              borderColor: "rgba(221,117,150,0.4)",
              boxShadow: "0 0 25px rgba(221,117,150,0.1)",
              y: -4
            }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span 
                  className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(183,195,243,0.1)",
                    color: "#B7C3F3",
                  }}
                >
                  {project.type}
                </span>
              </div>

              <h4 className="text-xl font-bold mb-2 text-white">
                {project.title}
              </h4>
              
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                target={project.isExternal ? "_blank" : "_self"}
                rel={project.isExternal ? "noopener noreferrer" : ""}
                className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                style={{ color: "#DD7596" }}
              >
                {project.isExternal ? "View on GitHub ↗" : "Explore Course →"}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
