---
id: Git Revert
sidebar_position: 5
---

`git revert` creates a new commit that undoes the changes from a previous commit, giving you a safe way to remove unwanted work from your history without rewriting it.

## What Does `git revert` Do?

`git revert` is the safest way to undo a commit that has already been pushed to a shared repository. Instead of erasing the original commit, it adds a new commit that applies the inverse changes. The original commit remains in the history — only the effect is undone.

This is important for shared branches: rewriting history on a branch others have pulled from causes problems. `git revert` avoids that entirely.

## Revert the Most Recent Commit

```bash
git revert HEAD
```

Git opens your editor for a commit message. Save and close to complete the revert.

## Revert a Specific Commit

Find the hash with `git log --oneline`:

```bash
git log --oneline
```

Then revert it:

```bash
git revert a3f6f1c
```

## Revert Without Opening the Editor

Use the `--no-edit` flag to accept the default commit message:

```bash
git revert HEAD --no-edit
```

## Revert Multiple Commits

Revert a range of commits (oldest first):

```bash
git revert HEAD~3..HEAD
```

This creates a separate revert commit for each commit in the range.

## Stage the Revert Without Committing

If you want to review or combine with other changes before committing:

```bash
git revert --no-commit HEAD
```

The reversed changes are staged but not yet committed. Commit when ready:

```bash
git commit -m "Revert navigation bar changes"
```

:::tip
Use `git revert` on public or shared branches. Use `git reset` (the next lesson) only on private, local branches you haven't pushed yet.
:::

## Common Mistakes

**Reverting a merge commit without the `-m` flag** — merge commits have two parents. Git doesn't know which parent to revert to without being told:

```bash
git revert -m 1 <merge-commit-hash>
```

`-m 1` means "revert to the first parent" (usually the branch you merged into).

**Expecting the reverted file to disappear** — `git revert` adds a new commit; it doesn't delete the original. Both commits are in the history. Use `git log` to see all of them.

**Confusing `revert` with `reset`** — `revert` is safe for shared history; `reset` rewrites history. On a shared branch, `git reset` followed by a force push will cause problems for everyone else.

---

**Next Steps:** [Using git reset to Unstage or Undo Changes](/git_101/Grade%205/Git%20Reset)
