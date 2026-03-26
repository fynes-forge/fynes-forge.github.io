---
id: Understanding Remotes
sidebar_position: 8
---

Remotes are pointers to other copies of your repository. Understanding how to manage multiple remotes and tracking branches gives you full control over how your local repo syncs with the outside world.

## What is a Remote-Tracking Branch?

When you clone or fetch from a remote, Git creates remote-tracking branches like `origin/main`. These are read-only snapshots of what the remote looked like the last time you fetched. They're not branches you work on directly — they just show you the state of the remote.

View all branches including remote-tracking ones:

```bash
git branch -a
```

Output:

```bash
* main
  remotes/origin/main
  remotes/origin/feature/login
```

## Managing Multiple Remotes

You might work with multiple remotes when:

* You've forked a project and want to pull updates from the original (`upstream`).
* You deploy to multiple environments (e.g., `staging` and `production`).

Add a second remote:

```bash
git remote add upstream git@github.com:original-owner/original-repo.git
```

List all remotes:

```bash
git remote -v
```

Fetch from the original project:

```bash
git fetch upstream
```

Merge upstream changes into your local `main`:

```bash
git merge upstream/main
```

## Tracking Branches

A tracking branch is a local branch that has a configured relationship with a remote branch. When you run `git push` or `git pull` without arguments, Git uses this relationship.

Set up tracking when pushing a new branch:

```bash
git push -u origin feature/my-feature
```

Or set tracking on an existing local branch:

```bash
git branch --set-upstream-to=origin/main main
```

Check which remote branch each local branch tracks:

```bash
git branch -vv
```

Output:

```bash
* main  a3f6f1c [origin/main] Add navigation bar
```

## Remove a Remote

```bash
git remote remove upstream
```

## Prune Stale Remote-Tracking Branches

Remote-tracking branches for branches deleted on the remote stick around until you prune them:

```bash
git fetch --prune
```

Or configure Git to prune automatically on every fetch:

```bash
git config --global fetch.prune true
```

:::tip
Keep your remote list clean. A cluttered list of stale remotes and tracking branches makes it harder to understand your repository's state.

When contributing to open-source projects, the typical pattern is: `origin` = your fork, `upstream` = the original project.
:::

## Common Mistakes

**Fetching from the wrong remote** — run `git remote -v` to confirm remote names and URLs before fetching or pushing.

**Forgetting to fetch before merging upstream changes** — always `git fetch upstream` first so your remote-tracking branches are up to date before merging.

**Stale tracking branches after a remote branch is deleted** — run `git fetch --prune` or `git remote prune origin` to clean these up.

---

**Next Steps:** [Creating Branches with git branch](/git_101/Grade%204/Git%20Branch)
