---
id: Git GC
sidebar_position: 5
---

`git gc` (garbage collection) compresses your repository by packing loose objects into pack files, pruning unreachable objects, and optimising internal data structures — making the repository faster and smaller.

## What Does `git gc` Do?

As you work with Git, it accumulates loose object files — one file per commit, tree, blob, or tag. Over time these add up. `git gc`:

* Packs loose objects into binary pack files.
* Runs `git prune` to remove unreachable objects older than the expiry window.
* Optimises the reflog and pack-refs.
* Re-packs pack files if there are too many.

Git runs `git gc --auto` automatically in the background after operations like `git fetch` and `git push`, so you rarely need to run it manually.

## Run Garbage Collection

```bash
git gc
```

## Run an Aggressive Optimisation

A more thorough repack that may produce a smaller repository at the cost of taking longer:

```bash
git gc --aggressive
```

:::caution
`git gc --aggressive` can take a long time on large repositories and may not produce significant gains for day-to-day repositories. Use it only when you specifically need to shrink the repository size.
:::

## Run Quietly

```bash
git gc --quiet
```

## Check Repository Size Before and After

```bash
du -sh .git
git gc
du -sh .git
```

## Prune All Unreachable Objects Immediately

By default, `git gc` keeps objects younger than 2 weeks to protect recent reflog entries. Force immediate pruning:

```bash
git gc --prune=now
```

## View Current Pack Statistics

```bash
git count-objects -v
```

Output includes the number of loose objects, pack files, and total size.

:::tip
If your repository has grown unexpectedly large, check for accidentally committed large files with `git rev-list --objects --all | sort -k 2 > /tmp/all-objects.txt` before running `git gc`. Garbage collection can't remove objects that are still referenced.
:::

## Common Mistakes

**Expecting `git gc` to shrink a repo with large committed files** — `git gc` can only remove unreachable objects. If a large file is still referenced in any commit in the history, it stays. Use `git filter-repo` to permanently remove large files from history.

**Running `git gc --aggressive` on every commit** — it's slow and unnecessary for most repositories. Run it occasionally or when you specifically notice the `.git` directory has grown large.

**Confusing garbage collection with cleaning the working directory** — `git gc` works on Git's internal object database, not your source files. Use `git clean` for working directory cleanup.

---

**Next Steps:** [Analysing Repository with git fsck](/git_101/Grade%207/Git%20Fsck)
