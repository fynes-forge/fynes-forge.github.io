---
id: Gitflow
sidebar_position: 1
---

Branching strategies define how a team uses branches to organise work and ship releases. Choosing the right strategy reduces merge conflicts, clarifies when code is ready to ship, and makes collaboration predictable.

## Gitflow

Gitflow is a structured branching model designed for projects with scheduled releases. It uses two permanent branches and several supporting branches.

### Permanent Branches

* `main` — production-ready code. Only release branches and hotfixes merge here.
* `develop` — integration branch. Completed features merge here before a release.

### Supporting Branches

| Type | Pattern | Branches from | Merges into |
|------|---------|--------------|-------------|
| Feature | `feature/*` | `develop` | `develop` |
| Release | `release/*` | `develop` | `main` and `develop` |
| Hotfix | `hotfix/*` | `main` | `main` and `develop` |

### Gitflow Example

Start a feature:

```bash
git checkout develop
git checkout -b feature/user-authentication
```

Finish the feature:

```bash
git checkout develop
git merge --no-ff feature/user-authentication
git branch -d feature/user-authentication
```

Start a release:

```bash
git checkout develop
git checkout -b release/1.2.0
```

Finish the release:

```bash
git checkout main
git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release 1.2.0"
git checkout develop
git merge --no-ff release/1.2.0
git branch -d release/1.2.0
```

## GitHub Flow

A simpler alternative to Gitflow, suited to teams deploying continuously.

Rules:
* `main` is always deployable.
* All work happens on short-lived feature branches.
* Branches are merged to `main` via pull requests after review.
* Deploy immediately after merging to `main`.

```bash
git checkout -b feature/add-search
# work, commit
git push -u origin feature/add-search
# open pull request on GitHub, review, merge, deploy
```

## Trunk-Based Development

An even simpler model where all developers commit to `main` (or a single trunk branch) frequently — at least once per day. Feature flags control which features are live.

This requires strong automated testing and CI/CD but avoids the complexity of long-lived branches.

## Choosing a Strategy

| Strategy | Best for |
|----------|---------|
| Gitflow | Versioned software with scheduled releases |
| GitHub Flow | Continuous deployment web applications |
| Trunk-Based | High-velocity teams with strong CI/CD |

:::tip
Start with GitHub Flow. It's simpler than Gitflow and works for most teams. Adopt Gitflow only if you genuinely need to manage multiple production versions simultaneously.
:::

## Common Mistakes

**Using Gitflow for a project with continuous deployment** — Gitflow's `develop` buffer adds friction for teams that deploy multiple times per day. GitHub Flow is a better fit.

**Creating long-lived feature branches** — regardless of the strategy, keep branches short-lived. Long branches diverge from the main line and become hard to merge.

**Not documenting the chosen strategy** — commit to a convention and document it in your `CONTRIBUTING.md` so every team member follows the same rules.

---

**Next Steps:** [Using Pull Requests for Code Reviews](/git_101/Grade%208/Pull%20Requests)
