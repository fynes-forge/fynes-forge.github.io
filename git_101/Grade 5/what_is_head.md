---
id: What is HEAD
sidebar_position: 3
---

`HEAD` is Git's pointer to your current position in the repository. Understanding `HEAD` helps you navigate history, create branches at the right point, and understand what commands like `git reset` and `git diff HEAD` are actually doing.

## What is HEAD?

`HEAD` is a reference that points to the commit you currently have checked out. Most of the time, `HEAD` points to a branch name (like `main`), which in turn points to the latest commit on that branch.

View what `HEAD` points to:

```bash
cat .git/HEAD
```

Output when on a branch:

```bash
ref: refs/heads/main
```

## HEAD and Branches

When you make a new commit, two things happen:

1. A new commit object is created.
2. The current branch pointer (e.g., `main`) moves forward to that commit.
3. `HEAD` stays pointing to the branch, so it implicitly moves too.

## Detached HEAD State

If you check out a specific commit hash, tag, or remote branch without creating a local branch, `HEAD` points directly to a commit rather than a branch. This is called "detached HEAD" state.

```bash
git checkout a3f6f1c
```

Git warns you:

```bash
HEAD is now at a3f6f1c Add navigation bar
You are in 'detached HEAD' state.
```

In detached HEAD state, you can look around and run tests. But if you make commits, they won't belong to any branch and will be lost when you switch away unless you create a branch first.

## Create a Branch from Detached HEAD

If you've made commits in detached HEAD state and want to keep them:

```bash
git checkout -b my-experiment
```

## Referencing Commits Relative to HEAD

`HEAD~1` means one commit before `HEAD`. `HEAD~2` means two commits before, and so on.

Show the commit before the current one:

```bash
git show HEAD~1
```

Diff the last two commits:

```bash
git diff HEAD~1 HEAD
```

## Return to a Branch from Detached HEAD

```bash
git checkout main
```

:::tip
Think of `HEAD` as a bookmark. On a branch, it moves forward automatically as you commit. In detached state, it points to a fixed commit until you move it yourself.
:::

## Common Mistakes

**Making commits in detached HEAD state without creating a branch** — those commits become "dangling" and are cleaned up by Git's garbage collector eventually. Create a branch (`git checkout -b <name>`) as soon as you realise you want to keep the work.

**Confusing `HEAD` with `origin/HEAD`** — `origin/HEAD` is the default branch on the remote, not your local position. `HEAD` is always your local current position.

**Using `HEAD~` syntax incorrectly in merge commits** — merge commits have two parents. `HEAD~1` follows the first parent. Use `HEAD^2` to follow the second parent (the merged branch).

---

**Next Steps:** [Navigating with git checkout](/git_101/Grade%205/Navigating%20with%20Checkout)
