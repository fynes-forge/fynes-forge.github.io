---
id: Comparing Branches
sidebar_position: 2
---

Beyond comparing individual files, Git lets you compare entire branches and commits — useful for reviewing what a feature branch adds before merging it.

## Compare Two Branches

Show changes that are in `feature/dashboard` but not in `main`:

```bash
git diff main..feature/dashboard
```

Show changes that are in `main` but not in `feature/dashboard`:

```bash
git diff feature/dashboard..main
```

## Three-Dot Diff — Changes Since the Branch Forked

The three-dot syntax compares `feature/dashboard` against the common ancestor of both branches. This shows only the changes made on `feature/dashboard`, ignoring any new commits on `main` since the branch was created:

```bash
git diff main...feature/dashboard
```

This is the format GitHub uses to display pull request diffs.

## Compare a Branch Against Remote

See what's in `origin/main` that you haven't pulled yet:

```bash
git diff main..origin/main
```

## Compare Two Commits

Find the hashes with `git log --oneline`, then:

```bash
git diff a3f6f1c d1e8f91
```

## Compare a Commit to HEAD

```bash
git diff a3f6f1c HEAD
```

## Show Only the Files That Changed Between Two Commits

```bash
git diff --name-only a3f6f1c d1e8f91
```

## Show Stats for a Comparison

```bash
git diff --stat main..feature/dashboard
```

Output:

```bash
 src/dashboard.py | 45 +++++++++++++++++++++++++++
 tests/test_dashboard.py | 20 ++++++++++++
 2 files changed, 65 insertions(+)
```

:::tip
Use `git diff main...feature/dashboard` (three dots) when reviewing a pull request locally — it shows exactly the same changes as the GitHub PR diff.
:::

## Common Mistakes

**Mixing up two-dot and three-dot diff** — `..` compares the tips of both branches; `...` compares from the common ancestor. For code reviews, `...` (three dots) is usually what you want.

**Comparing the wrong direction** — `git diff A..B` shows what B has that A doesn't. Make sure you have the branches in the right order for what you're trying to answer.

**Not specifying a file when the diff is huge** — narrow down large diffs with a file path: `git diff main..feature/dashboard -- src/dashboard.py`.

---

**Next Steps:** [What is HEAD in Git](/git_101/Grade%205/What%20is%20HEAD)
