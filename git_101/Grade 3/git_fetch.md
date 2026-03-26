---
id: Git Fetch
sidebar_position: 6
---

`git fetch` downloads changes from a remote repository without modifying your working directory or current branch, letting you review what's new before integrating it.

## What Does `git fetch` Do?

`git fetch` retrieves new commits, branches, and tags from the remote, but it does not merge anything into your local branch. Your working files stay exactly as they are. This makes it safe to run at any time.

After fetching, the remote changes are stored in remote-tracking branches like `origin/main`.

## Fetch from the Default Remote

```bash
git fetch
```

## Fetch from a Specific Remote

```bash
git fetch origin
```

## Fetch a Specific Branch

```bash
git fetch origin main
```

## See What Was Fetched

After fetching, compare your local branch with the remote-tracking branch:

```bash
git log main..origin/main
```

This shows commits on `origin/main` that aren't yet in your local `main`.

## Apply the Fetched Changes

Once you've reviewed the fetched commits, merge them into your current branch:

```bash
git merge origin/main
```

Or rebase instead of merging:

```bash
git rebase origin/main
```

:::tip
`git fetch` before `git merge` is a safe pattern for integrating remote changes — you can inspect what's coming before it touches your work.

Run `git fetch --prune` to also delete local remote-tracking branches that no longer exist on the remote.
:::

## Common Mistakes

**Confusing `fetch` with `pull`** — `git pull` is `fetch` + `merge` in one step. `git fetch` gives you more control because you can review changes before merging.

**Forgetting to merge after fetching** — running `git fetch` and then editing files without merging first means your local branch is still behind the remote. Always merge or rebase after fetching.

**Expecting working files to change** — `git fetch` never touches your working directory. If your files haven't changed after a fetch, that's correct behaviour.

---

**Next Steps:** [Using git pull to Fetch and Merge Changes](/git_101/Grade%203/Git%20Pull)
