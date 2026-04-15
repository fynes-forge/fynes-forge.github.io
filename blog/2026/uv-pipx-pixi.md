---
slug: uv-pipx-to-pixi
title: "Thinking About Switching from uv + pipx to Pixi? Read This First."
authors: [tomfynes]
date: 2026-04-15
tags: [python, tooling, data-engineering]
---

I've been running `uv` and `pipx` as my Python toolchain for a while now. It's a good setup — fast, clean, and uv in particular has earned its reputation as the current gold standard for Python package management. So when Pixi came up in conversation recently, I spent some time actually thinking through whether the switch makes sense.

The short answer is: it depends on what kind of developer you are and what you're building. The longer answer is below.

<!-- truncate -->

## The Fundamental Difference

Before getting into pros and cons, it's worth being clear about what you're actually choosing between.

`uv` + `pipx` is a **Python-first** toolchain. It's built to manage Python packages and Python environments, and it does that exceptionally well. Pixi is a **system-first** toolchain. It's built on the Conda ecosystem — specifically the Rust-based `rattler` library under the hood — and it thinks about your entire project environment, not just the Python parts.

That's not a subtle difference. It changes how you think about dependencies at a fundamental level.

## The Case For Pixi

### It handles non-Python dependencies properly

This is the argument that actually moves the needle. If your projects are purely Python, `uv` probably has you covered. But if you're working with anything that reaches outside the Python ecosystem — Node.js tooling, C++ libraries, CUDA, PostgreSQL binaries, system-level dependencies — Pixi can manage all of it inside the project environment.

That means you stop relying on developers having the right things installed globally on their machines. The environment is fully described and reproducible, not just the Python parts of it.

For data engineering and ML work specifically, this matters a lot. The "manylinux" problem and missing system headers like `libssl` or `libxml2` are a perennial source of friction with pip-based tools. Because Pixi pulls from Conda-forge, it downloads pre-compiled binaries for these libraries rather than trying to build them locally. That's a meaningful reliability improvement.

### One config, one lockfile

Right now, a typical project setup might have a `pyproject.toml`, a `Makefile` or `Taskfile`, and a list of global tools installed via `pipx` that exist only in someone's head or a setup document. Pixi consolidates this. The `pixi.toml` handles your Python version, your dependencies, your environment variables, and your task runner in one place. The `pixi.lock` file covers everything.

The integrated task runner is worth calling out specifically. It's cross-platform and similar to `npm run` — a small thing, but it removes one more tool from the stack.

### Replacing pipx with something more capable

`pipx` is good at one thing: installing Python CLI tools in isolated environments. Pixi's `pixi global install` does the same thing, but because it's backed by Conda-forge you can also install non-Python global tools — `ripgrep`, `fzf`, anything in the Conda-forge catalogue — through the same interface. One tool for global installations rather than two.

## The Case Against

### The PyPI vs Conda-forge friction is real

Pixi can install packages from PyPI — it actually uses `uv` under the hood for this, which is a nice detail — but its primary source is Conda-forge. In practice this means two things.

First, some pure Python packages on Conda-forge lag slightly behind PyPI versions. Usually not by much, and usually not in ways that matter, but if you're chasing the latest releases of fast-moving libraries it's something to be aware of.

Second, mixing Conda and PyPI dependencies in the same project can occasionally produce resolution headaches. Pixi handles this considerably better than traditional Conda or Mamba, but the complexity is still there in a way that a pure uv setup simply doesn't have.

### It's non-standard for Python library development

`pyproject.toml` is the PEP-standard way to define Python package metadata. If you're building a library to publish to PyPI, other Python contributors will expect to see that. Pixi's native configuration is `pixi.toml`, and while it does support `pyproject.toml`, the Pixi-first workflow adds a layer of abstraction that can feel off to contributors who aren't familiar with it.

For application development or internal tooling this is a non-issue. For libraries you intend to share with the wider Python community, it's worth thinking about.

### Private registry setup is heavier

If you're using Artifactory or any private package registry, the `uv` setup is straightforward — set `PIP_INDEX_URL` and you're done. Pixi requires configuring Conda channels in Artifactory, managing identity tokens, and dealing with channel URLs. It's more capable once it's working, but it's decidedly more DevOps-heavy to set up. If your team doesn't already have a Conda channel in Artifactory, building one is not a small afternoon task.

### Environments are larger on disk

Pixi environments tend to be heavier than uv virtual environments. Because they often contain full binaries — a copy of Python, OpenSSL, sometimes bash — rather than just symlinks to a global Python install, the disk footprint is noticeably bigger. On a developer machine with plenty of storage this is a minor inconvenience. On constrained environments like CI runners or Docker images, it's worth factoring in.

## How to Think About the Decision

The comparison looks roughly like this:

| | uv + pipx | Pixi |
|---|---|---|
| Speed | Excellent | Good |
| Python-only projects | Ideal | Works well |
| Polyglot / system deps | Limited | Strong |
| PyPI package coverage | Complete | Near-complete |
| Private registries | Simple | Complex |
| Standard Python tooling | Yes | Partial |
| Disk usage | Light | Heavier |
| Task runner | External | Built-in |

If your work is primarily Python, your projects don't need system-level dependencies, and you publish libraries to PyPI — stick with `uv`. It's faster and simpler for that use case.

If you're working across multiple languages, dealing with heavy C-extensions or ML dependencies, or you want a single reproducible environment that captures everything not just the Python — Pixi is worth the transition cost.

For data engineering specifically, I think Pixi becomes genuinely compelling the moment you have a project that touches anything outside the Python standard library that isn't a pure Python wheel. The pain of managing system dependencies through pip is real, and Pixi solves it in a way that uv doesn't try to.

The architecture shift isn't just tooling — it's a different way of thinking about what "the environment" means. If that framing clicks for you and your work, the transition is probably worth it.

---

I haven't made the switch myself yet, but I'm watching it closely. If you've made the move from a uv-based workflow to Pixi and have thoughts on how it actually played out in practice, I'd be interested to hear them.
