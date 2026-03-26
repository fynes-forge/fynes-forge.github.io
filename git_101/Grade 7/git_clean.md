---
id: Git Clean
sidebar_position: 3
---

`git clean` removes untracked files and directories from your working directory, giving you a fast way to get back to a pristine state.

## What Does `git clean` Do?

`git clean` deletes files that are not tracked by Git — files you've created but never staged or committed. It does not touch tracked files or staged changes.

This is useful for removing build artefacts, generated files, or test outputs that have accumulated in your working directory.

## Dry Run First — Always

`git clean` is destructive. Deleted files do not go to the trash. Always run a dry run first to see what would be deleted:

```bash
git clean -n
```

Or:

```bash
git clean --dry-run
```

Output:

```bash
Would remove temp.txt
Would remove build/
```

## Remove Untracked Files

```bash
git clean -f
```

The `-f` (force) flag is required. Git will not delete anything without it.

## Remove Untracked Files and Directories

```bash
git clean -fd
```

## Remove Ignored Files Too

By default, `git clean` leaves files matched by `.gitignore` in place. To remove those as well:

```bash
git clean -fx
```

Remove all: untracked + ignored + directories:

```bash
git clean -fdx
```

## Remove Only Ignored Files (Leave Untracked Files)

```bash
git clean -fX
```

(Capital `X` — only ignored files.)

## Interactive Mode

Review each file before deciding whether to delete it:

```bash
git clean -i
```

:::tip
Always use `git clean -n` (dry run) before `git clean -f`. There is no undo for deleted untracked files.

Use `git clean -fdX` (capital X) after a build to clean up compiled artefacts without touching new source files you haven't committed yet.
:::

## Common Mistakes

**Running `git clean -f` without a dry run first** — new files you haven't committed yet will be permanently deleted. Always dry run first.

**Forgetting `-d` to clean directories** — `git clean -f` only removes files, not directories. Add `-d` to also remove untracked directories.

**Confusing `git clean` with `git checkout`** — `git checkout -- .` restores tracked files to their last committed state. `git clean` removes untracked files. They're complementary, not interchangeable.

---

**Next Steps:** [Pruning Branches with git prune](/git_101/Grade%207/Git%20Prune)
