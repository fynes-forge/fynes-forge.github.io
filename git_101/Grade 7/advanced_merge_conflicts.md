---
id: Advanced Merge Conflicts
sidebar_position: 1
---

As your project and team grow, merge conflicts become more complex — spanning multiple files, involving binary assets, or arising from rebases and cherry-picks. This lesson covers strategies for handling conflicts confidently.

## Reviewing the Full Conflict Scope

Before touching any file, get a complete picture of what's in conflict:

```bash
git status
```

List only the conflicted files:

```bash
git diff --name-only --diff-filter=U
```

Show the full diff for all conflicted files at once:

```bash
git diff
```

## Understand the Three-Way Merge

When a conflict occurs, Git works with three versions of the file:

* **BASE** — the common ancestor commit (where both branches last agreed).
* **OURS** — the version on your current branch (HEAD).
* **THEIRS** — the version on the incoming branch.

Extract these versions for any conflicted file to inspect them separately:

```bash
git show :1:filename.txt   # BASE
git show :2:filename.txt   # OURS
git show :3:filename.txt   # THEIRS
```

## Resolve Conflicts by Choosing One Side

Accept your version entirely for a file:

```bash
git checkout --ours filename.txt
git add filename.txt
```

Accept the incoming version entirely:

```bash
git checkout --theirs filename.txt
git add filename.txt
```

## Resolve Conflicts Using `git rerere`

`rerere` (Reuse Recorded Resolution) records how you resolved a conflict. The next time the same conflict appears (for example, on a long-running rebase), Git applies the recorded resolution automatically.

Enable it globally:

```bash
git config --global rerere.enabled true
```

After enabling, Git records every conflict you resolve manually. View recorded resolutions:

```bash
git rerere status
```

## Handling Binary File Conflicts

Git can't merge binary files (images, compiled assets). You must choose one side explicitly:

```bash
git checkout --ours images/logo.png
git add images/logo.png
```

Or use the incoming version:

```bash
git checkout --theirs images/logo.png
git add images/logo.png
```

## After Resolving All Conflicts

Confirm no conflict markers remain:

```bash
git diff --check
```

Stage resolved files and complete the merge:

```bash
git add .
git commit
```

:::tip
For complex or long-running conflicts, use a visual diff tool (`git mergetool`). The next lesson covers how to set one up.

Enable `git rerere` if you work on long-lived branches or frequently rebase — it saves significant time.
:::

## Common Mistakes

**Partially resolving conflicts** — resolving some files but forgetting others. Always run `git status` and `git diff --check` before staging to confirm all conflicts are cleared.

**Not reading both sides before choosing** — blindly accepting `--ours` or `--theirs` can delete work. Read both versions before deciding.

**Committing files that still contain conflict markers** — `git diff --check` will catch these. Set up a pre-commit hook or CI check to block commits with conflict markers.

---

**Next Steps:** [Using git mergetool](/git_101/Grade%207/Git%20Mergetool)
