import { themes as prismThemes } from "prism-react-renderer";
import tailwindPlugin from "./plugins/tailwind-config.cjs";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Fynes Forge",
  tagline: "Crafting tools. Forging solutions.",
  favicon: "img/forge-mark.svg",

  // 1. Canonical custom domain fixes sitemap.xml, RSS, and canonical link tags
  url: "https://fynesforge.dev",
  baseUrl: "/",
  organizationName: "fynes-forge",
  projectName: "fynesforge.dev",
  trailingSlash: false,

  onBrokenLinks: "throw",

  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;700&display=swap",
      type: "text/css",
    },
  ],

  // 2. Structured data (JSON-LD) for better search & AI entity recognition
  headTags: [
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Fynes Forge",
        url: "https://fynesforge.dev",
        author: {
          "@type": "Person",
          name: "Tom Fynes",
          url: "https://fynesforge.dev/career",
          sameAs: [
            "https://github.com/fynes-forge",
            "https://www.linkedin.com/in/thomas-f-b00607163/",
            "https://www.stackoverflow.com/users/7031452/tom",
          ],
        },
      }),
    },
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    tailwindPlugin,
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "Git-101",
        path: "git_101",
        routeBasePath: "git_101",
        sidebarPath: "./sidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "Python-101",
        path: "python_101",
        routeBasePath: "python_101",
        sidebarPath: "./sidebars.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "Projects",
        path: "projects",
        routeBasePath: "projects",
        sidebarPath: "./sidebars.js",
      },
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"],
  markdown: { mermaid: true, hooks: { onBrokenMarkdownLinks: "warn" } },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "docs/",
          breadcrumbs: true,
          showLastUpdateAuthor: true,
          include: ["**/*.md", "**/*.mdx"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
        },
        pages: {
          path: "src/pages",
          routeBasePath: "",
          include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          mdxPageComponent: "@theme/MDXPage",
          rehypePlugins: [],
          beforeDefaultRemarkPlugins: [],
          beforeDefaultRehypePlugins: [],
        },
        blog: {
          showReadingTime: true,
          blogTitle: "The Forge Blog",
          blogDescription:
            "Thoughts on data engineering, software, and the occasional rabbit hole — by Tom Fynes at Fynes Forge.",
          blogSidebarTitle: "Recent Posts",
          postsPerPage: 10,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
            title: "The Forge Blog",
            description:
              "Thoughts on data engineering, software, and the occasional rabbit hole.",
            copyright: `Copyright © ${new Date().getFullYear()} Fynes Forge`,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        // 3. Clean sitemap excluding thin tag pages
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**", "/blog/tags/**"],
          filename: "sitemap.xml",
        },
        theme: { customCss: "./src/css/custom.css" },
      },
    ],
  ],

  themeConfig: {
    // 4. Must be PNG/JPG (1200x630) — SVGs fail on LinkedIn, X, Bluesky, and Slack
    image: "img/social-card.png",
    metadata: [
      {
        name: "description",
        content:
          "Data engineering tools, SQL optimization utilities, and practical software engineering write-ups by Tom Fynes.",
      },
      {
        name: "keywords",
        content:
          "data engineering, sql optimiser, python, git, software engineering, fynes forge",
      },
      { property: "og:site_name", content: "Fynes Forge" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    navbar: {
      title: "",
      logo: {
        alt: "Fynes Forge",
        src: "img/forge-mark.svg",
        srcDark: "img/forge-mark.svg",
      },
      items: [
        // High-leverage interactive tool promoted to top-level
        {
          to: "/projects/sql-optimiser",
          label: "SQL Optimiser",
          position: "left",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          label: "Projects",
          position: "left",
          type: "dropdown",
          items: [
            { label: "SQL Query Optimiser", to: "/projects/sql-optimiser" },
            { label: "Pipelines", to: "/pipelines" },
            { label: "Dashboard", to: "/dashboard" },
            {
              label: "VS Code Theme",
              href: "https://github.com/fynes-forge/forge-themes",
            },
          ],
        },
        {
          label: "Guides",
          position: "left",
          type: "dropdown",
          items: [
            { label: "SQL 101", to: "/docs/intro" },
            { label: "Git 101", to: "/git_101/intro" },
            { label: "Python 101", to: "/python_101/intro" },
          ],
        },
        {
          label: "Resources",
          position: "left",
          type: "dropdown",
          items: [
            {
              label: "Git Cheat Sheet (PDF)",
              href: "pathname:///fynes-forge-git-cheatsheet.pdf",
              attributes: {
                download: true,
              },
            },
            {
              label: "SQL Cheat Sheet (PDF)",
              href: "pathname:///fynes-forge-sql-cheatsheet.pdf",
              attributes: {
                download: true,
              },
            },
            {
              // Fixed: external links should use `href`, not `to`
              label: "Beginner's Data Toolkit",
              href: "https://tfynes.gumroad.com/l/phlyc",
            },
          ],
        },
        {
          label: "About",
          position: "left",
          type: "dropdown",
          items: [
            { label: "Career & Experience", to: "/career" },
            { label: "Skills & Stack", to: "/skills" },
          ],
        },
        {
          href: "https://github.com/fynes-forge",
          position: "right",
          className: "navbar-github-link",
          "aria-label": "Fynes Forge on GitHub",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Tools & Guides",
          items: [
            { label: "SQL Query Optimiser", to: "/projects/sql-optimiser" },
            { label: "SQL 101", to: "/docs/intro" },
            { label: "Git 101", to: "/git_101/intro" },
            { label: "Python 101", to: "/python_101/intro" },
          ],
        },
        {
          title: "Socials",
          items: [
            { label: "GitHub", href: "https://github.com/fynes-forge" },
            {
              label: "Stack Overflow",
              href: "https://www.stackoverflow.com/users/7031452/tom",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/thomas-f-b00607163/",
            },
          ],
        },
        {
          title: "Contact",
          items: [
            {
              label: "contact@fynesforge.dev",
              href: "mailto:contact@fynesforge.dev",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fynes Forge`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["python", "bash", "sql", "typescript"],
    },
  },
};

export default config;
