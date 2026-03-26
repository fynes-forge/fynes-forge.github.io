---
id: Git Rebase
sidebar_position: 6
---

`git rebase` moves or rewrites a series of commits so they appear on top of another base commit, producing a cleaner, linear history compared to a standard merge.

## What Does `git rebase` Do?

When you rebase a branch onto another, Git takes each commit on your branch, temporarily removes them, moves the branch pointer to the new base, then replays your commits one by one on top.

The result: your branch looks as though it was started from the new base, even if it wasn't. The commits get new SHA hashes because their parent changes.

## Basic Rebase

Bring your feature branch up to date with `main` by replaying your commits on top of the latest `main`:

1. Switch to your feature branch:

```bash
git checkout feature/search
```

2. Rebase onto `main`:

```bash
git rebase main
```

## Interactive Rebase

Interactive rebase (`-i`) lets you edit, squash, reorder, or drop commits before they're replayed. This is powerful for cleaning up messy commit history before opening a pull request.

Open the last 3 commits for editing:

```bash
git rebase -i HEAD~3
```

Git opens your editor with a list of commits:

```
pick a3f6f1c Add search input
pick d1e8f91 Fix search input placeholder
pick b2c7e8a Add search button
```

Change `pick` to one of these actions:

| Action | Effect |
|--------|--------|
| `pick` | Keep the commit as-is |
| `reword` | Keep but edit the commit message |
| `squash` | Combine with the previous commit |
| `fixup` | Combine with previous, discard this commit's message |
| `drop` | Delete the commit entirely |

## Resolve Conflicts During Rebase

If a conflict occurs while replaying a commit, Git pauses. Resolve the conflict, then continue:

```bash
git add filename.txt
git rebase --continue
```

To abort and return to the state before the rebase started:

```bash
git rebase --abort
```

:::warning
Never rebase commits that have been pushed to a shared branch. Rebase rewrites SHA hashes. If others have pulled those commits, their history will diverge and they'll face conflicts.
:::

:::tip
Use interactive rebase to squash "WIP" and "fix typo" commits before merging a pull request. A clean history is much easier to read and bisect later.
:::

## Common Mistakes

**Rebasing a shared branch** — this is the cardinal rule violation. Rebase only on local or personal branches that haven't been pushed, or branches where you're the sole contributor and you force-push carefully.

**Not aborting a failed rebase** — if you resolve conflicts incorrectly during a rebase, the replayed commits may be wrong. Abort with `git rebase --abort` and start again.

**Squashing too aggressively** — squashing everything into one commit makes it impossible to bisect bugs to a specific change. Keep commits logically meaningful even after cleaning up.

---

**Next Steps:** [Ignoring Files with .gitignore](/git_101/Grade%206/Gitignore)
