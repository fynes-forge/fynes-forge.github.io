---
id: Git Reset
sidebar_position: 6
---

`git reset` moves the branch pointer backwards to undo commits, and optionally changes what's in the staging area and working directory. Use it carefully — it rewrites history and can lose work.

## The Three Modes of git reset

`git reset` has three modes that control how much gets undone:

| Mode | Commits | Staging Area | Working Directory |
|------|---------|--------------|-------------------|
| `--soft` | Undone | Unchanged (changes staged) | Unchanged |
| `--mixed` (default) | Undone | Cleared | Unchanged |
| `--hard` | Undone | Cleared | Cleared |

## Unstage a File (Mixed Reset)

Remove a file from the staging area without touching the working directory:

```bash
git reset HEAD filename.txt
```

Or with the clearer newer command:

```bash
git restore --staged filename.txt
```

## Undo the Last Commit but Keep the Changes Staged (Soft Reset)

The commit is removed but all its changes remain staged:

```bash
git reset --soft HEAD~1
```

## Undo the Last Commit and Unstage the Changes (Mixed Reset)

The commit is removed and changes return to the working directory as unstaged:

```bash
git reset HEAD~1
```

## Undo the Last Commit and Discard All Changes (Hard Reset)

:::warning
`--hard` permanently discards all changes in the commit and any uncommitted changes in your working directory. This cannot be undone easily.
:::

```bash
git reset --hard HEAD~1
```

## Reset to a Specific Commit

```bash
git reset --hard a3f6f1c
```

All commits after `a3f6f1c` are removed from the branch. Changes they introduced are lost.

## Recover from an Accidental Hard Reset

If you reset too far, `git reflog` can save you. The reflog records every position `HEAD` has been at:

```bash
git reflog
```

Find the commit hash you want to return to, then:

```bash
git reset --hard <hash-from-reflog>
```

:::tip
`--soft` is the safest reset. Use it when you want to redo a commit message or combine several commits into one.

Never use `git reset` to undo commits that have already been pushed to a shared branch. Use `git revert` instead.
:::

## Common Mistakes

**Using `--hard` without realising changes will be lost** — changes discarded by `--hard` don't go to the staging area or the trash. They're gone unless you have them in `git reflog` or a remote backup.

**Running `git reset` on a shared branch** — if you reset commits and then force push, every collaborator who has pulled those commits will have diverged history. Only reset on local private branches.

**Forgetting that `git reset HEAD~1` is `--mixed` by default** — after this, your changes are unstaged but still in the working directory. Add and commit them again when you're ready.

---

**Next Steps:** [Saving Work-in-Progress with git stash](/git_101/Grade%206/Git%20Stash)
