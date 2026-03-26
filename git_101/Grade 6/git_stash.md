---
id: Git Stash
sidebar_position: 1
---

`git stash` saves your uncommitted changes to a temporary shelf so you can switch context quickly without committing half-finished work.

## What Does `git stash` Do?

When you need to switch branches but aren't ready to commit, `git stash` takes all your staged and unstaged changes, stores them in a stack, and restores your working directory to a clean state (matching the last commit).

## Stash Your Changes

```bash
git stash
```

Your working directory is now clean and you can switch branches, pull, or do anything else that requires a clean state.

## Stash with a Description

Adding a message makes it easier to identify the stash later:

```bash
git stash push -m "WIP: half-finished login form"
```

## List All Stashes

```bash
git stash list
```

Output:

```bash
stash@{0}: On feature/login: WIP: half-finished login form
stash@{1}: On main: quick fix attempt
```

## Stash Including Untracked Files

By default, stash only saves tracked files. To include new files that haven't been staged yet:

```bash
git stash push --include-untracked
```

Or to include everything including ignored files:

```bash
git stash push --all
```

## Show the Contents of a Stash

```bash
git stash show stash@{0}
```

For a full diff:

```bash
git stash show -p stash@{0}
```

:::tip
Always add a message when stashing. Stash entries without messages are hard to identify days later, especially if you have more than one.
:::

## Common Mistakes

**Stashing on the wrong branch** — the stash is not branch-specific. When you pop it, you're applying it to whatever branch you're currently on. Make a note of which branch the stash belongs to.

**Forgetting about old stashes** — stashes don't expire automatically. Run `git stash list` periodically and drop entries you no longer need.

**Not stashing untracked files** — `git stash` without flags won't save new files. Add `--include-untracked` if you have new files you haven't added yet.

---

**Next Steps:** [Applying Stashed Changes](/git_101/Grade%206/Applying%20Stash)
