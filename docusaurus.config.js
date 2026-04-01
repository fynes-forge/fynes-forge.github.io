import { themes as prismThemes } from "prism-react-renderer";
import tailwindPlugin from "./plugins/tailwind-config.cjs";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Fynes Forge",
  tagline: "Crafting tools. Forging solutions.",
  favicon: "img/forge-mark.svg",

  url: "https://fynes-forge.github.io",
  baseUrl: "/",
  organizationName: "fynes-forge",
  projectName: "fynes-forge.github.io",
  trailingSlash: false,

  onBrokenLinks: "throw",

  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;700&display=swap",
      type: "text/css",
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
        theme: { customCss: "./src/css/custom.css" },
      },
    ],
  ],

  themeConfig: {
    image: "img/forge-mark.svg",
    metadata: [
      {
        name: "keywords",
        content:
          "data engineering, python, sql, software engineering, fynes forge",
      },
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
        { to: "/blog", label: "The Forge Blog", position: "left" },
        {
          label: "Courses",
          position: "left",
          type: "dropdown",
          items: [
            { label: "SQL 101", to: "/docs/intro" },
            { label: "Git 101", to: "/git_101/intro" },
            { label: "Python 101", to: "/python_101/intro" },
          ],
        },
        {
          label: "Projects",
          position: "left",
          type: "dropdown",
          items: [
            {
              label: "VS Code Theme",
              href: "https://github.com/fynes-forge/forge-themes",
            },
            { label: "SQL Query Optimiser", to: "/projects/sql-optimiser" },
            { label: "Pipelines", to: "/pipelines" },
            { label: "Dashboard", to: "/dashboard" },
          ],
        },
        {
          label: "Resources",
          position: "left",
          type: "dropdown",
          items: [
            {
              label: "Beginner's Data Toolkit",
              to: "https://tfynes.gumroad.com/l/phlyc",
            },
            {
              label: "Git Cheat Sheet",
              // Use 'href' for static assets and add the leading slash
              href: "/downloads/cheatsheet.jpg",
              target: "_blank",
            },
            {
              label: "SQL Cheat Sheet",
              href: "/downloads/sql_cheatsheet.jpg",
              target: "_blank",
            },
          ],
        },
        { to: "skills", label: "Skills", position: "left" },
        { to: "career", label: "Career", position: "left" },
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
          title: "Courses",
          items: [
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
            { label: "tf.dev@icloud.com", to: "mailto:tf.dev@icloud.com" },
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
