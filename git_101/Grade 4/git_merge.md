---
id: Git Merge
sidebar_position: 3
---

`git merge` combines the work from one branch into another, bringing a completed feature or fix into your main codebase.

## What Does `git merge` Do?

When you merge a branch, Git takes the commits from that branch and integrates them into the current branch. If both branches have progressed without conflicting changes, Git performs a fast-forward or automatic merge.

## Merge a Branch into Your Current Branch

1. Switch to the branch you want to merge **into** (usually `main`):

```bash
git checkout main
```

2. Merge the feature branch:

```bash
git merge feature/user-login
```

## Types of Merge

**Fast-forward merge** — if the target branch has no new commits since the feature branch was created, Git moves the pointer forward. No merge commit is created.

**Three-way merge** — if both branches have diverged, Git creates a new "merge commit" that ties the two histories together.

## Create a Merge Commit Even on Fast-Forward

Useful for keeping a clear record that a feature branch was merged:

```bash
git merge --no-ff feature/user-login
```

## Abort a Merge in Progress

If a merge goes wrong and you want to start over:

```bash
git merge --abort
```

## After a Successful Merge

Push the updated branch to the remote:

```bash
git push origin main
```

:::tip
Merge into `main` only after code review. Use pull requests on GitHub rather than merging locally — this keeps an audit trail of who reviewed and approved the work.

Use `--no-ff` when merging feature branches to keep a visible history of when features landed.
:::

## Common Mistakes

**Merging without committing local changes first** — Git won't automatically commit your staged changes before merging. Commit or stash first.

**Being on the wrong branch** — always run `git branch` to confirm you're on the receiving branch before merging. Merging in the wrong direction can mix up histories.

**Ignoring conflicts after a failed merge** — if the merge stops with conflict markers in files, Git is waiting for you to resolve them. Don't leave conflicted files uncommitted. See the [Resolving Merge Conflicts](/git_101/Grade%204/Resolving%20Merge%20Conflicts) lesson.

---

**Next Steps:** [Resolving Merge Conflicts](/git_101/Grade%204/Resolving%20Merge%20Conflicts)
