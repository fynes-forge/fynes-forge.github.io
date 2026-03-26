# forge-template

> The Fynes Forge portfolio site — courses, blog, projects, and career.

---

<div align="center">

![Status](https://img.shields.io/badge/status-active-63C5EA?style=flat-square&labelColor=404E5C)
![License](https://img.shields.io/badge/license-MIT-9F7EBE?style=flat-square&labelColor=404E5C)
![Org](https://img.shields.io/badge/org-fynes--forge-ECDA90?style=flat-square&labelColor=404E5C)

</div>

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Docusaurus v3 |
| Styling | Tailwind CSS v3 + custom CSS |
| Fonts | Cinzel · Rajdhani · JetBrains Mono |
| Animations | Framer Motion |
| Diagrams | Mermaid |
| Hosting | GitHub Pages |

## Getting Started

```bash
npm install
npm start       # dev server at localhost:3000
npm run build   # production build
```

## Structure

```
├── blog/           # The Forge Blog posts
├── docs/           # SQL 101 course
├── git_101/        # Git 101 course
├── python_101/     # Python 101 course
├── projects/       # Project write-ups
├── src/
│   ├── components/ # React components
│   ├── css/        # Global styles (Fynes Forge design system)
│   ├── pages/      # Top-level pages
│   └── theme/      # Swizzled Docusaurus components
└── static/         # Static assets
```

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

---

## Licence

MIT © [Fynes Forge](https://github.com/fynes-forge) — see [LICENSE](./LICENSE) for details.
