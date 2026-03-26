---
slug: ai-agent-portfolio-modernization
title: How I Used an AI Agent to Modernize My Portfolio
authors: [tomfynes]
date: 2026-03-15
tags: [misc, web-dev, ai]
---

I recently handed the keys of my portfolio site over to a GitHub Copilot coding agent and asked it to modernize the whole thing — version upgrades, UI polish, dependency management, the lot. Here's what that actually looked like in practice.

<!-- truncate -->

## The Starting Point

My portfolio is built on [Docusaurus](https://docusaurus.io/), which I genuinely love for keeping documentation and blog posts close to the code. Over time though, I'd accumulated a few things I wanted to tidy up: a deprecation warning in the config, a font stack that felt a bit generic, and some UI elements that could do with a bit more life.

Rather than spending a weekend afternoon on it myself, I decided to let a GitHub Copilot agent take a crack at it. I gave it a brief, pointed it at the repo, and watched what happened.

## What the Agent Did

The agent started by exploring the codebase — reading `package.json`, `docusaurus.config.js`, the CSS, and a few component files before touching anything. That felt reassuring. It wasn't just blindly applying changes; it was building context first.

### Fixing the Config Warning

There was a deprecation warning in every build:

```
[WARNING] The `siteConfig.onBrokenMarkdownLinks` config option is deprecated
```

**Before:**

```js
const config = {
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  // ...
  markdown: {
    mermaid: true,
  },
};
```

**After:**

```js
const config = {
  onBrokenLinks: "throw",
  // ...
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
};
```

Small change, clean build. 

### Typography Refresh

The agent added Inter as the primary font by loading it via the Docusaurus `stylesheets` config option (rather than a CSS `@import`, which PostCSS won't allow after Tailwind directives), with a solid system-ui fallback chain.

In `docusaurus.config.js`:

```js
const config = {
  // ...
  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      type: "text/css",
    },
  ],
};
```

Then in `custom.css`:

```css
:root {
  --ifm-font-family-base: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --ifm-heading-font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

Honestly, this is one of those changes that's subtle but immediately noticeable. Everything just reads more cleanly.

### UI Polish: Transitions and Glassmorphism

This is where it got interesting. The agent added CSS transitions to cards and buttons, and a glassmorphism effect to the navbar — a frosted-glass background with `backdrop-filter: blur()`.

```css
/* Card hover effect */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Navbar glassmorphism */
.navbar {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.85) !important;
  border-bottom: 1px solid rgba(221, 117, 150, 0.15);
}

html[data-theme='dark'] .navbar {
  background-color: rgba(64, 78, 92, 0.9) !important;
}
```

The dark mode version respects the existing Charcoal background color (`#404E5C`) from the palette. It didn't invent new colors — it used what was already there.

### Other Small Wins

- Fixed a React warning by replacing `class=` with `className=` on the profile image
- Added `loading="lazy"` to the profile image
- Added `.docusaurus/` to `.gitignore` so the build cache stops showing up in commits

## What I Thought About It

The thing that impressed me most was how much context it gathered before writing a single line. It read the existing CSS variables, understood the brand palette, and made sure none of the primary color values changed. That's the kind of thing you'd want a junior dev to do, and it did it without being asked.

It also didn't go overboard. It didn't try to rewrite the whole homepage or swap out component libraries. The changes were targeted and conservative, which is exactly right for a site that's already working.

The whole thing took a few minutes of elapsed time and produced a clean build with no warnings. Not bad for a Saturday morning where I didn't have to write a single line myself.

## Would I Do It Again?

Absolutely. I think this pattern — agent handles the mechanical modernization work, I review the diff — is going to become pretty standard for projects like this. It's not magic, but it's genuinely useful for the kind of maintenance tasks that are important but easy to keep pushing off.

If you've got a portfolio site gathering dust somewhere, it might be worth giving it a go.
