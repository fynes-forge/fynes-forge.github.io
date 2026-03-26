---
id: Applying Stash
sidebar_position: 2
---

After stashing your work, you need to know how to bring it back. Git gives you several ways to apply, inspect, and clean up stashed changes.

## Apply the Most Recent Stash

Applies the latest stash and leaves it in the stash list:

```bash
git stash apply
```

## Pop the Most Recent Stash

Applies the latest stash and removes it from the stash list:

```bash
git stash pop
```

`pop` is the most common choice — apply and remove in one step.

## Apply a Specific Stash

If you have multiple stashes, reference them by index:

```bash
git stash apply stash@{2}
```

## Pop a Specific Stash

```bash
git stash pop stash@{1}
```

## Handle Conflicts When Applying

If the stashed changes conflict with your current working directory, Git will show conflict markers just like a merge conflict. Resolve the conflicts, then stage the resolved files:

```bash
git add filename.txt
```

When using `git stash apply`, the stash stays in the list after a conflict. Drop it manually once resolved:

```bash
git stash drop stash@{0}
```

## Drop a Stash Without Applying

Remove a stash you no longer need:

```bash
git stash drop stash@{0}
```

## Clear All Stashes

```bash
git stash clear
```

:::warning
`git stash clear` permanently removes all stashes with no way to recover them. Double-check with `git stash list` before running this.
:::

## Apply a Stash to a New Branch

If your stashed changes no longer apply cleanly to the current branch, apply them to a fresh branch instead:

```bash
git stash branch feature/login-work stash@{0}
```

This creates a new branch from the commit at which the stash was created, applies the stash, and removes it from the stash list.

:::tip
Use `git stash pop` for everyday use. Use `git stash apply` when you want to apply the same stash to multiple branches.
:::

## Common Mistakes

**Applying a stash to the wrong branch** — stashes are not tied to a branch. Always check `git branch` before running `git stash pop` to confirm you're on the right branch.

**Losing a stash by running `git stash clear`** — this removes everything permanently. Drop individual stashes (`git stash drop`) rather than clearing the whole list.

**Not resolving conflicts after applying** — if `git stash apply` produces conflicts, your files will have conflict markers. Don't ignore them. Resolve them the same way you would a merge conflict before continuing.

---

**Next Steps:** [Creating Tags with git tag](/git_101/Grade%206/Git%20Tag)
