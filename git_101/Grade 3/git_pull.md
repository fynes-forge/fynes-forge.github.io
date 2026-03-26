---
id: Git Pull
sidebar_position: 7
---

`git pull` fetches changes from a remote repository and merges them into your current branch in one step, keeping your local work in sync with collaborators.

## What Does `git pull` Do?

`git pull` is shorthand for two commands run in sequence:

1. `git fetch` — downloads new commits from the remote.
2. `git merge` — merges the fetched commits into your current branch.

This keeps your local branch up to date with whatever has been pushed to the remote.

## Basic Pull

```bash
git pull
```

This pulls from the upstream tracking branch configured for your current branch.

## Pull from a Specific Remote and Branch

```bash
git pull origin main
```

## Pull Using Rebase Instead of Merge

Using rebase keeps the commit history linear by replaying your local commits on top of the fetched commits:

```bash
git pull --rebase origin main
```

This avoids extra "merge commit" entries in your history.

## Set Rebase as the Default Pull Strategy

```bash
git config --global pull.rebase true
```

:::tip
`git pull --rebase` produces a cleaner history than the default merge strategy. Many teams prefer it as their standard workflow.

Always commit or stash your local changes before pulling — an unclean working directory can cause pull to fail or produce unexpected conflicts.
:::

## Common Mistakes

**Pulling with uncommitted changes** — if you have unstaged changes, `git pull` may fail. Commit your work first or stash it with `git stash`, pull, then unstash with `git stash pop`.

**`divergent branches` warning** — this happens when your local branch and the remote branch have both moved forward since you last synced. Either merge (`git pull`) or rebase (`git pull --rebase`) to reconcile them. Git 2.27+ requires you to configure your pull strategy explicitly:

```bash
git config --global pull.rebase false   # merge (default)
git config --global pull.rebase true    # rebase
git config --global pull.ff only        # fast-forward only
```

**Pulling into the wrong branch** — check `git branch` before pulling to confirm you're on the right branch.

---

**Next Steps:** [Understanding Remotes](/git_101/Grade%203/Understanding%20Remotes)
