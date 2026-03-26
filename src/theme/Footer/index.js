import React from "react";
import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInOnScroll } from "@site/src/components/animations";

/* ─────────────── Social SVG icons ─────────────── */

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function StackOverflowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15 21h-10v-2h10v2zm6-11.665l-1.571-9.328-1.98.333 1.572 9.327 1.979-.332zm-6.979 7.793l-9.951-2.462-.495 1.955 9.951 2.46.495-1.953zm1.504-3.272l-9.066-4.518-.898 1.808 9.063 4.518.901-1.808zm1.997-3.388l-7.477-6.568-1.308 1.487 7.479 6.568 1.306-1.487zm1.394-3.654l-5.665-8.236-1.646 1.13 5.665 8.236 1.646-1.13z" />
    </svg>
  );
}

/* ─────────────── Social icon button ─────────────── */

function SocialButton({ href, label, icon, glowColor = "#DD7596" }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              scale: 1.18,
              boxShadow: `0 0 18px ${glowColor}80`,
            }
      }
      whileTap={prefersReducedMotion ? {} : { scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors duration-200 cursor-pointer no-underline"
    >
      {icon}
    </motion.a>
  );
}

/* ─────────────── FooterLink ─────────────── */

function FooterLink({ to, href, label }) {
  const external = !!href && !to;
  return (
    <li>
      <Link
        to={external ? undefined : (to || href || "#")}
        href={external ? href : undefined}
        className="text-gray-400 hover:text-[#DD7596] transition-colors duration-200 text-sm no-underline"
      >
        {label}
      </Link>
    </li>
  );
}

/* ─────────────── Footer ─────────────── */

export default function Footer() {
  const { footer } = useThemeConfig();
  const prefersReducedMotion = useReducedMotion();

  const year = new Date().getFullYear();

  // social links extracted from footer config
  const socialsSection = (footer?.links || []).find(
    (s) => s.title?.toLowerCase() === "socials"
  );
  const coursesSection = (footer?.links || []).find(
    (s) => s.title?.toLowerCase() === "courses"
  );

  const socialItems = socialsSection?.items || [];
  const courseItems = coursesSection?.items || [];

  function getSocialIcon(label = "") {
    const l = label.toLowerCase();
    if (l.includes("github")) return { icon: <GitHubIcon />, glow: "#DD7596" };
    if (l.includes("linkedin")) return { icon: <LinkedInIcon />, glow: "#0077B5" };
    if (l.includes("twitter") || l === "x")
      return { icon: <TwitterIcon />, glow: "#1DA1F2" };
    if (l.includes("stack overflow") || l.includes("stackoverflow"))
      return { icon: <StackOverflowIcon />, glow: "#F48024" };
    return null;
  }

  return (
    <FadeInOnScroll direction="up" delay={0}>
      <footer
        className="mt-auto"
        style={{ background: "#1a202c" }}
        aria-label="Site footer"
      >
        {/* top accent line */}
        <div
          className="h-0.5 w-full"
          style={{
            background: "linear-gradient(90deg, #D05786 0%, #ECDA90 50%, #63C5EA 100%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

            {/* Column 1 — About */}
            <div className="space-y-3">
              <span
                className="text-2xl font-extrabold tracking-tight"
                style={{
                  background: "linear-gradient(90deg, #ECDA90 0%, #B7C3F3 50%, #ECDA90 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 900,
                  letterSpacing: "0.16em",
                }}
              >
                FYNES FORGE
              </span>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Crafting tools. Forging solutions. — Senior Data Engineering,
                open source, and technical education.
              </p>
              <p className="text-gray-500 text-xs">tf.dev@icloud.com</p>
            </div>

            {/* Column 2 — Quick links */}
            <div className="space-y-3">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest">
                Courses
              </h3>
              <ul className="space-y-2 list-none m-0 p-0">
                {courseItems.length > 0 ? (
                  courseItems.map((item, i) => (
                    <FooterLink
                      key={i}
                      to={item.to}
                      href={item.href}
                      label={item.label}
                    />
                  ))
                ) : (
                  <>
                    <FooterLink to="/docs/intro" label="SQL 101" />
                    <FooterLink to="/git_101/intro" label="Git 101" />
                    <FooterLink to="/python_101/intro" label="Python 101" />
                    <FooterLink to="/blog" label="Blog" />
                    <FooterLink to="/skills" label="Skills" />
                  </>
                )}
              </ul>
            </div>

            {/* Column 3 — Social icons */}
            <div className="space-y-3">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest">
                Connect
              </h3>
              <div className="flex gap-3 flex-wrap">
                {socialItems.length > 0 ? (
                  socialItems.map((item, i) => {
                    const social = getSocialIcon(item.label);
                    if (!social) return null;
                    return (
                      <SocialButton
                        key={i}
                        href={item.href || item.to || "#"}
                        label={item.label}
                        icon={social.icon}
                        glowColor={social.glow}
                      />
                    );
                  })
                ) : (
                  <>
                    <SocialButton
                      href="https://github.com/fynes-forge"
                      label="GitHub"
                      icon={<GitHubIcon />}
                    />
                    <SocialButton
                      href="https://www.linkedin.com/in/thomas-f-b00607163/"
                      label="LinkedIn"
                      icon={<LinkedInIcon />}
                      glowColor="#0077B5"
                    />
                    <SocialButton
                      href="https://www.stackoverflow.com/users/7031452/tom"
                      label="Stack Overflow"
                      icon={<StackOverflowIcon />}
                      glowColor="#F48024"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-500 text-xs">
              Copyright © {year} Fynes Forge
            </p>
            <p className="text-gray-600 text-xs">
              Built with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              using Docusaurus
            </p>
          </div>
        </div>
      </footer>
    </FadeInOnScroll>
  );
}
