---
id: Git Diff
sidebar_position: 1
---

`git diff` shows the exact line-by-line changes between two states of your repository, making it easy to review what you've changed before committing or after pulling.

## What Does `git diff` Show?

`git diff` compares files and shows additions (lines starting with `+`) and removals (lines starting with `-`).

By default it compares your working directory against the staging area — in other words, changes you've made but not yet staged.

## Basic Usage

Show unstaged changes:

```bash
git diff
```

Show staged changes (what will go into the next commit):

```bash
git diff --staged
```

Or the equivalent older flag:

```bash
git diff --cached
```

## Diff a Specific File

```bash
git diff filename.txt
```

## Diff Between Two Commits

```bash
git diff a3f6f1c d1e8f91
```

Use `git log --oneline` to find commit hashes.

## Diff Between a Commit and the Working Directory

```bash
git diff HEAD
```

## Diff Between Two Branches

```bash
git diff main..feature/user-login
```

This shows what's in `feature/user-login` that isn't in `main`.

## Show a Summary (Changed Files Only)

```bash
git diff --stat
```

Output:

```bash
 src/app.py | 10 +++++-----
 tests/test_app.py | 4 ++++
 2 files changed, 10 insertions(+), 4 deletions(-)
```

:::tip
Run `git diff --staged` before every commit to do a final review of exactly what you're about to record. This catches accidental changes and debug code before they're committed.
:::

## Common Mistakes

**Seeing no output when you expect changes** — if changes are already staged, `git diff` (without `--staged`) won't show them. Use `git diff --staged` to see staged changes.

**Being confused by the `a/` and `b/` prefixes** — `a/` is the original file and `b/` is the modified version. This is just diff notation, not a directory path.

**Using `git diff` when `git diff --stat` is enough** — for large diffs, start with `--stat` to see a summary of which files changed, then drill into specific files.

---

**Next Steps:** [Comparing Branches and Commits](/git_101/Grade%205/Comparing%20Branches)
