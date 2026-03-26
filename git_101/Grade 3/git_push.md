---
id: Git Push
sidebar_position: 5
---

`git push` uploads your local commits to a remote repository, making your work visible to collaborators and backed up online.

## What Does `git push` Do?

When you commit locally, those changes exist only on your machine. `git push` sends those commits to the remote repository so others can see them and so your work is safely stored off your machine.

## Basic Push

```bash
git push <remote> <branch>
```

Push your `main` branch to `origin`:

```bash
git push origin main
```

## Set an Upstream Branch

The first time you push a new branch, use `-u` to set the upstream tracking branch:

```bash
git push -u origin main
```

After this, you can run `git push` from that branch without any arguments.

## Push a New Branch

If you've created a local branch that doesn't exist on the remote yet:

```bash
git push -u origin feature/new-feature
```

## Push All Branches

```bash
git push --all origin
```

## Force Push

:::caution
Force pushing rewrites the remote history. This can destroy work for anyone who has already pulled from that branch. Only use this on your own branches and only when you know what you're doing.
:::

```bash
git push --force origin feature/my-branch
```

A safer alternative that prevents overwriting if someone else has pushed in the meantime:

```bash
git push --force-with-lease origin feature/my-branch
```

:::tip
Always run `git status` and `git log` before pushing to confirm you're sending the right commits.

Use `git push --force-with-lease` instead of `--force` whenever you need to rewrite history — it's the same effect but safer.
:::

## Common Mistakes

**`rejected — non-fast-forward`** — the remote has commits your local branch doesn't have. Pull first: `git pull origin main`, resolve any conflicts, then push again.

**`error: failed to push some refs`** — same root cause as above. Fetch and merge the remote changes before pushing.

**Pushing to the wrong branch** — always specify the branch name explicitly (`git push origin main`) until you're confident about which branch is checked out.

---

**Next Steps:** [Using git fetch to Retrieve Changes](/git_101/Grade%203/Git%20Fetch)
