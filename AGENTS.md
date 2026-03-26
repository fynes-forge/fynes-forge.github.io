## Organisation Context

This repository belongs to Fynes Forge — the open-source engineering organisation of Tom Fynes, Senior Data Engineer.

GitHub: https://github.com/fynes-forge

Portfolio: https://fynes-forge.github.io

Design Philosophy: Industrial, high-contrast, high-performance, and educational.

## Project Purpose

This repository hosts the Fynes Forge Technical Documentation and Course Platform. It serves as a central hub for engineering courses (SQL, Git, Python), project write-ups, and the "Forge Blog." It is built to be a living resource for data engineers.


## Stack

| Layer | Technology |
|---|---|
| Framework | Docusaurus v3 |
| Styling | Tailwind CSS v3 + custom CSS |
| Fonts | Cinzel · Rajdhani · JetBrains Mono |
| Animations | Framer Motion |
| Diagrams | Mermaid |
| Hosting | GitHub Pages |


## Code & Content Conventions

### Docusaurus & React

Styling: Use Tailwind CSS utility classes by default. Only use src/css/custom.css for design system variables (Fynes Forge colors/fonts).

Component Strategy: Check src/theme/ for "swizzled" components before creating new ones. Use @site/ aliases for imports.

Interactivity: Use Framer Motion for UI transitions. Keep components functional and use React hooks.

Assets: Reference images from static/img/ using absolute paths (e.g., /img/diagram.png).

### Documentation (Markdown/MDX)
Course Logic: Respect the multi-instance structure. Content belongs in specific roots: /docs/ (SQL), /git_101/, /python_101/, /projects/.

Diagrams: Use Mermaid syntax within code blocks. Do not use static image exports for flowcharts.

Callouts: Use Docusaurus admonitions (e.g., :::tip, :::danger).

Frontmatter: Every .md or .mdx file must have a title and description.

## Structure

```
├── blog/           # The Forge Blog posts
├── docs/           # SQL 101 course
├── git_101/        # Git 101 course
├── python_101/     # Python 101 course
├── projects/       # Project write-ups
├── src/
│   ├── components/ # Custom React components (Framer Motion, etc.)
│   ├── css/        # Global Fynes Forge design system
│   ├── theme/      # Swizzled Docusaurus components
│   └── pages/      # Landing pages & custom routes
├── static/         # Static assets (images, PDFs)
└── .github/        # Workflows & Copilot instructions
```

## What Agents Should Avoid

❌ Style Drift: Do not introduce CSS-in-JS libraries; stick to Tailwind + standard CSS.

❌ Framework Downgrades: This is Docusaurus v3. Do not suggest v2-specific syntax or plugins.

❌ Hardcoding: Never hardcode course paths; use the defined directory structure for routing.

❌ Verbose Comments: Don't explain what a useEffect hook does. Only comment on complex logic or design system specificities.

❌ Unsafe Markdown: Ensure MDX components are properly imported before use in markdown files.

## Deployment & CI/CD
GitHub Pages: Deployment is handled via GitHub Actions.

Commits: Use Conventional Commits (e.g., feat(ui): add new framer motion transition).

Maintenance: Dependabot handles weekly NPM updates and monthly GitHub Action updates.