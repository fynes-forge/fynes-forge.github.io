---
id: Navigating with Checkout
sidebar_position: 4
---

`git checkout` isn't just for switching branches — you can use it to navigate to any commit in your history, restore individual files, and explore your project at any point in time.

## Navigate to a Specific Commit

Find the commit hash with `git log --oneline`, then:

```bash
git checkout a3f6f1c
```

This puts you in detached HEAD state. Your working directory updates to match the project as it was at that commit. You can read files, run tests, and explore — but any new commits you make won't belong to a branch.

## Navigate to a Tag

```bash
git checkout v1.0.0
```

## Navigate Back to a Branch

Return to your latest work:

```bash
git checkout main
```

## Restore a File to a Previous Version

Retrieve a specific file as it was in an older commit, without changing anything else:

```bash
git checkout a3f6f1c -- filename.txt
```

The restored file lands in your working directory ready to be staged and committed.

## Restore a File to the Last Committed State

Discard all uncommitted changes to a file:

```bash
git checkout -- filename.txt
```

Or with the newer command:

```bash
git restore filename.txt
```

## Navigate to the Previous Branch

Switch back to whichever branch you were on last:

```bash
git checkout -
```

:::tip
`git checkout -` is the branch equivalent of `cd -` in the terminal. It's a fast way to toggle between two branches without typing the full branch name.
:::

## Common Mistakes

**Checking out a commit when you have uncommitted changes** — if your working directory has changes that conflict with the target commit, Git will refuse the checkout. Commit or stash your changes first.

**Losing work in detached HEAD state** — commits made in detached HEAD state are not on any branch. Before navigating away, run `git checkout -b <branch-name>` to save your work.

**Overwriting a file unintentionally with `git checkout -- <file>`** — this cannot be undone. The working directory changes are permanently discarded. Make sure you don't need those changes before running this command.

---

**Next Steps:** [Using git revert to Undo Commits](/git_101/Grade%205/Git%20Revert)
