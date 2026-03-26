---
id: Git Fsck
sidebar_position: 6
---

`git fsck` (file system check) verifies the integrity of your Git repository's object database, identifying corrupted, missing, or dangling objects.

## What Does `git fsck` Do?

`git fsck` walks through every object in the `.git/objects` directory and checks:

* Each object is readable and internally consistent.
* Every object referenced by another object actually exists.
* No SHA-1 checksums are corrupted.

It reports any problems it finds, including dangling commits, blobs, and trees.

## Run a Basic Integrity Check

```bash
git fsck
```

Output on a healthy repository:

```bash
Checking object directories: 100% done.
Checking connectivity: done.
```

If problems exist, you'll see lines like:

```bash
dangling commit a3f6f1c9e29a3e82a4dcb3f59e8ab3d28a12c9af
dangling blob d1e8f91b45e8e1f9e4aa84b2e1830c4b5d674cd0
```

## What Are Dangling Objects?

Dangling objects are Git objects that exist but aren't referenced by any branch, tag, or HEAD. They're usually the result of:

* Commits made in detached HEAD state that were abandoned.
* Branches that were deleted without being merged.
* Stashes that were dropped.

Dangling objects are not errors — they're just unreferenced. `git gc` will eventually remove them.

## Recover a Dangling Commit

If you accidentally deleted a branch or dropped a stash, `git fsck` can help you find the commit:

```bash
git fsck --lost-found
```

Objects that can be recovered are written to `.git/lost-found/`. Inspect a recovered commit:

```bash
git show a3f6f1c
```

Create a branch from it to bring it back:

```bash
git checkout -b recovered-work a3f6f1c
```

## Find Dangling Blobs (Lost File Contents)

```bash
git fsck --lost-found --unreachable
```

Lost blobs appear in `.git/lost-found/other/`. You can read each one:

```bash
cat .git/lost-found/other/d1e8f91b45e8e1f9e4
```

## Check Connectivity Only

Skip full object validation and just check that all referenced objects exist:

```bash
git fsck --connectivity-only
```

:::tip
If your terminal unexpectedly closes during a Git operation, run `git fsck` afterwards to check for partial or corrupted objects. For most corruptions, restoring from a remote clone is the easiest fix.
:::

## Common Mistakes

**Confusing dangling objects with corruption** — dangling commits and blobs are normal and not errors. Real corruption shows as `error:` or `broken link` messages.

**Not checking the remote after corruption** — if a repository is corrupted locally, the cleanest fix is usually `git clone` from the remote rather than manually patching objects.

**Ignoring `git fsck` output** — if `git fsck` reports actual errors (not just dangling objects), investigate before the repository gets worse. Reach out to your team or check the remote backup.

---

**Next Steps:** [Understanding Gitflow and Branching Strategies](/git_101/Grade%208/Gitflow)
