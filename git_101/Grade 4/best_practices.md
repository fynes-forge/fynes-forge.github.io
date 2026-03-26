---
id: Branch Best Practices
sidebar_position: 6
---

Good branching habits keep your codebase stable, your history readable, and collaboration smooth. These practices are used by professional teams on projects of all sizes.

## Use Feature Branches

Never commit directly to `main`. Create a dedicated branch for every piece of work — features, fixes, chores, and experiments alike.

```bash
git checkout -b feature/add-search
```

When the work is done, open a pull request and merge it after review.

## Naming Conventions

Use a consistent prefix that describes the type of work:

| Prefix | Example |
|--------|---------|
| `feature/` | `feature/user-authentication` |
| `fix/` | `fix/login-redirect-bug` |
| `chore/` | `chore/update-dependencies` |
| `docs/` | `docs/api-reference` |
| `hotfix/` | `hotfix/payment-crash` |

Keep names lowercase, use hyphens, and be descriptive but concise.

## Keep Branches Short-Lived

Long-running branches diverge from `main` and become harder to merge. Aim to merge feature branches within days, not weeks. Break large features into smaller pull requests if needed.

## Pull Requests for Code Review

Pull requests are the main collaboration mechanism on GitHub. Before merging:

1. Push your branch to the remote:

```bash
git push -u origin feature/add-search
```

2. On GitHub, click **Compare & pull request**.

3. Write a clear description of what the PR does and why.

4. Request reviewers.

5. Address any review comments with new commits on the same branch.

6. Once approved, merge and delete the branch.

## Protect Your Main Branch

In your GitHub repository settings, enable branch protection rules on `main`:

* Require pull request reviews before merging.
* Require status checks to pass before merging.
* Disallow direct pushes to `main`.

## Keep Your Branch Up to Date

Before opening a pull request, sync your branch with the latest `main` to avoid large conflicts at merge time:

```bash
git fetch origin
git rebase origin/main
```

Or if your team uses merge instead of rebase:

```bash
git merge origin/main
```

:::tip
Small, focused pull requests are reviewed faster and cause fewer conflicts. A PR that changes one thing is easier to understand and roll back than one that changes ten things.
:::

## Common Mistakes

**Committing directly to `main`** — this bypasses review, breaks the history narrative, and makes rollbacks harder. Use feature branches for everything.

**Opening a pull request against the wrong base branch** — always double-check that the PR targets the correct branch (usually `main` or `develop`) before requesting review.

**Stacking branches on unmerged work** — if branch B depends on branch A and branch A changes during review, branch B's diff becomes hard to read. Merge A first, then create B from the updated `main`.

---

**Next Steps:** [Using git diff to Compare Changes](/git_101/Grade%205/Git%20Diff)
