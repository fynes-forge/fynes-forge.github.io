---
id: Git Branch
sidebar_position: 1
---

Branches let you work on a feature, fix, or experiment in isolation without affecting the main codebase. They're one of Git's most powerful features and a core part of any team workflow.

## What is a Branch?

A branch is an independent line of development. The default branch is usually called `main` (or `master` in older repos). When you create a new branch, Git creates a pointer to the current commit. Your new work goes on that branch without touching `main`.

## List Branches

Show all local branches:

```bash
git branch
```

Show local and remote branches:

```bash
git branch -a
```

The branch with a `*` is the one you're currently on.

## Create a Branch

```bash
git branch <branch-name>
```

Example:

```bash
git branch feature/user-login
```

This creates the branch but does not switch to it.

## Create and Switch in One Step

```bash
git checkout -b feature/user-login
```

Or using the newer `git switch` command (Git 2.23+):

```bash
git switch -c feature/user-login
```

## See Which Branch You're On

```bash
git branch
```

Or:

```bash
git status
```

The first line shows `On branch feature/user-login`.

## Push a New Branch to Remote

```bash
git push -u origin feature/user-login
```

:::tip
Use a consistent naming convention for branches. Common formats are `feature/short-description`, `fix/bug-description`, and `chore/task-description`.

Keep branch names lowercase with hyphens, not spaces or underscores.
:::

## Common Mistakes

**Creating a branch from the wrong starting point** — always check which branch you're on before creating a new one. If you want to branch off `main`, run `git checkout main` first, then create your new branch.

**Forgetting to switch after creating** — `git branch <name>` only creates the branch; it doesn't check it out. Use `git checkout -b <name>` or `git switch -c <name>` to create and switch in one step.

**Too many stale branches** — delete branches once their work is merged. Keeping dozens of old branches makes the repo hard to navigate.

---

**Next Steps:** [Switching Branches with git checkout](/git_101/Grade%204/Git%20Checkout)
