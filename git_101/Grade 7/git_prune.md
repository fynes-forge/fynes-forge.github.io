---
id: Git Prune
sidebar_position: 4
---

`git prune` removes unreachable objects and stale remote-tracking references from your local repository, helping keep it clean and up to date.

## What Does `git prune` Do?

Git objects (commits, trees, blobs) that are no longer referenced by any branch, tag, or other pointer are called "unreachable" or "dangling". `git prune` removes these. You rarely need to run it manually — `git gc` calls it automatically — but it's useful to understand.

## Prune Stale Remote-Tracking Branches

The more common use is pruning stale remote-tracking references — local entries for branches that have been deleted on the remote.

Prune stale references for the `origin` remote:

```bash
git remote prune origin
```

Or prune while fetching (the most common approach):

```bash
git fetch --prune
```

Configure Git to prune automatically on every fetch:

```bash
git config --global fetch.prune true
```

## See Which Remote-Tracking Branches Are Stale

Run a dry run to preview what would be pruned without actually removing anything:

```bash
git remote prune --dry-run origin
```

## Prune Unreachable Git Objects Manually

Low-level prune of unreachable objects (normally handled by `git gc`):

```bash
git prune
```

With verbose output:

```bash
git prune -v
```

Prune objects older than a specific expiry time:

```bash
git prune --expire=now
```

:::tip
Set `fetch.prune true` globally and you'll never need to remember to run `git remote prune`. Your remote-tracking branch list will stay clean automatically.
:::

## Common Mistakes

**Confusing `git prune` with `git branch -d`** — `git prune` removes stale remote-tracking references (like `origin/old-feature`). `git branch -d` removes local branches. They address different things.

**Running `git prune` instead of `git remote prune origin`** — the low-level `git prune` removes unreachable objects, not stale remote refs. For keeping your remote-tracking branches in sync, use `git remote prune origin` or `git fetch --prune`.

**Expecting immediate storage savings** — `git prune` removes object files, but the storage benefit is small until you also run `git gc` to repack loose objects.

---

**Next Steps:** [Compressing Repository with git gc](/git_101/Grade%207/Git%20GC)
