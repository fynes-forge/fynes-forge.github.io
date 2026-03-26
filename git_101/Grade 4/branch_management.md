---
id: Branch Management
sidebar_position: 5
---

Keeping your branch list clean prevents confusion and clutter. This lesson covers how to delete branches you no longer need and rename branches that have been misnamed.

## Delete a Local Branch

Once a feature branch has been merged, delete it to keep the repo tidy:

```bash
git branch -d feature/user-login
```

The `-d` flag is safe — it only deletes if the branch has been merged. To delete an unmerged branch:

```bash
git branch -D feature/old-experiment
```

:::warning
`-D` is a force delete. The commits on that branch may become unreachable. Only use this when you're certain you don't need that work.
:::

## Delete a Remote Branch

Deleting a local branch doesn't remove it from the remote. Delete it from the remote separately:

```bash
git push origin --delete feature/user-login
```

## List Merged Branches

See which branches have already been merged into `main` and are safe to delete:

```bash
git branch --merged main
```

## Rename a Local Branch

Rename the current branch:

```bash
git branch -m new-name
```

Rename a specific branch:

```bash
git branch -m old-name new-name
```

## Rename a Remote Branch

Git doesn't have a direct rename command for remote branches. The process is:

1. Rename the branch locally:

```bash
git branch -m old-name new-name
```

2. Push the new branch to remote:

```bash
git push origin new-name
```

3. Delete the old branch on the remote:

```bash
git push origin --delete old-name
```

4. Update the upstream tracking reference for the renamed branch:

```bash
git push -u origin new-name
```

:::tip
Make it a habit to delete feature branches after they're merged. Most teams set this up automatically on GitHub by enabling "Automatically delete head branches" in the repository settings.
:::

## Common Mistakes

**Trying to delete the branch you're currently on** — Git won't allow this. Switch to another branch first: `git checkout main`, then delete the old branch.

**Deleting a branch before it's merged** — use `git branch --merged` to check before deleting. If you delete with `-D` by mistake, the commits are still recoverable with `git reflog` shortly after.

**Forgetting to delete the remote branch** — local and remote branches are independent. Always clean up both to avoid confusion for collaborators.

---

**Next Steps:** [Branch Best Practices](/git_101/Grade%204/Branch%20Best%20Practices)
