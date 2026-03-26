---
id: Git Checkout
sidebar_position: 2
---

`git checkout` switches your working directory to a different branch or commit, letting you move between lines of work or inspect any point in your project's history.

## What Does `git checkout` Do?

`git checkout` updates the files in your working directory to match the state of the branch or commit you're switching to. It also moves `HEAD` to point at the new location.

Git 2.23 introduced `git switch` as a dedicated command for changing branches. Both work — `git switch` is clearer for branch switching; `git checkout` is more versatile.

## Switch to an Existing Branch

```bash
git checkout main
```

Or with the newer syntax:

```bash
git switch main
```

## Create and Switch to a New Branch

```bash
git checkout -b feature/dashboard
```

Or:

```bash
git switch -c feature/dashboard
```

## Switch to a Remote Branch

If a branch exists on the remote but not locally:

```bash
git checkout -b feature/dashboard origin/feature/dashboard
```

Git 2.23+ shorthand — Git automatically sets up tracking:

```bash
git switch feature/dashboard
```

## Check Out a Specific Commit

This puts you in "detached HEAD" state — you're not on any branch:

```bash
git checkout a3f6f1c
```

You can look around and run tests, but don't commit here unless you create a new branch first.

## Restore a Single File to Its Last Committed State

Discard working directory changes to one file:

```bash
git checkout -- filename.txt
```

Or using the clearer newer command:

```bash
git restore filename.txt
```

:::tip
Prefer `git switch` for changing branches and `git restore` for discarding file changes — these newer commands are more descriptive and harder to misuse than the all-in-one `git checkout`.
:::

## Common Mistakes

**Unsaved changes blocking a checkout** — if you have uncommitted changes that conflict with the target branch, Git will refuse to switch. Either commit your changes first, or stash them with `git stash`.

**Accidentally entering detached HEAD state** — if you run `git checkout <commit-hash>`, you're no longer on a branch. Any commits you make here will be lost when you switch branches. Create a new branch immediately if you want to keep your work: `git checkout -b my-fix`.

**Using `git checkout -- <file>` when you meant to checkout a branch** — the `--` separator makes it clear you're talking about a file, not a branch. Without it, Git guesses based on whether the name matches a branch or a file.

---

**Next Steps:** [Merging Changes with git merge](/git_101/Grade%204/Git%20Merge)
