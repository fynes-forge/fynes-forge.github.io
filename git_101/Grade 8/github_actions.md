---
id: GitHub Actions CI
sidebar_position: 3
---

GitHub Actions lets you automate workflows — including running tests and linting on every push and pull request — directly in your GitHub repository with no external CI service required.

## What is Continuous Integration?

Continuous Integration (CI) means automatically building and testing your code every time changes are pushed. The goal is to catch bugs early, before they reach `main`.

GitHub Actions runs these automated checks as "workflows" defined in YAML files inside `.github/workflows/`.

## Create Your First CI Workflow

1. In your repository, create the directory:

```bash
mkdir -p .github/workflows
```

2. Create a workflow file:

```bash
touch .github/workflows/ci.yml
```

3. Add the following workflow (Python example):

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run tests
        run: pytest
```

4. Commit and push the file:

```bash
git add .github/workflows/ci.yml
git commit -m "Add CI workflow"
git push
```

5. Go to the **Actions** tab in your GitHub repository to watch the workflow run.

## Key Concepts

**Workflow** — a YAML file defining when and what to run.

**Trigger (`on`)** — the events that start the workflow (push, pull_request, schedule, etc.).

**Job** — a set of steps that run on the same machine.

**Step** — a single task — either a shell command (`run`) or a pre-built action (`uses`).

**Action** — a reusable unit of work from the GitHub Marketplace or your own repo.

## Common Actions (Current Stable Versions)

| Action | Version | Purpose |
|--------|---------|---------|
| `actions/checkout` | `v4` | Check out your repository code |
| `actions/setup-python` | `v5` | Install a specific Python version |
| `actions/setup-node` | `v4` | Install a specific Node.js version |
| `actions/cache` | `v4` | Cache dependencies between runs |

:::caution
Action versions change over time. Always check the [GitHub Marketplace](https://github.com/marketplace?type=actions) for the latest stable version of any action before using it in production.
:::

## Add a Status Badge to Your README

Copy the badge URL from your workflow's page on GitHub (Actions → select workflow → create status badge) and add it to your `README.md`:

```markdown
![CI](https://github.com/your-username/your-repo/actions/workflows/ci.yml/badge.svg)
```

:::tip
Start with a simple CI workflow that just runs your tests. Add linting, security scanning, and deployment steps incrementally once the basics are working reliably.
:::

## Common Mistakes

**Forgetting to commit the workflow file** — the workflow only runs once it's in the repository. Push the `.github/workflows/` directory.

**Using outdated action versions** — pinning to old versions misses security patches. Check for updates with Dependabot or review the action's changelog periodically.

**Not testing the workflow on a branch first** — push the workflow on a feature branch and open a PR to see it run before merging to `main`.

---

**Next Steps:** [Automating Deployments](/git_101/Grade%208/Automating%20Deployments)
