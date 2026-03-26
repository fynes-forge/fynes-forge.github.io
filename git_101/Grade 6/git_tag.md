---
id: Git Tag
sidebar_position: 3
---

Tags mark specific points in your project's history — typically release versions. Unlike branches, tags don't move as you make new commits.

## What is a Tag?

A tag is a named pointer to a specific commit. Tags are used to label releases (`v1.0.0`, `v2.3.1`), milestones, or any commit you want to reference permanently.

There are two types of tags:

* **Lightweight** — a simple pointer to a commit, like a bookmark.
* **Annotated** — a full Git object with a tagger name, email, date, and message. Annotated tags are recommended for releases.

## Create a Lightweight Tag

```bash
git tag v1.0.0
```

## Create an Annotated Tag

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
```

## Tag a Specific Commit

If you want to tag a commit that isn't the latest:

```bash
git tag -a v0.9.0 -m "Beta release" a3f6f1c
```

## List All Tags

```bash
git tag
```

Filter by pattern:

```bash
git tag -l "v1.*"
```

## Show Tag Details

```bash
git show v1.0.0
```

For annotated tags, this shows the tagger info, date, message, and the commit the tag points to.

## Delete a Local Tag

```bash
git tag -d v1.0.0
```

:::tip
Use annotated tags (`-a`) for releases — they store extra metadata and can be signed with GPG. Lightweight tags are fine for personal bookmarks or temporary markers.

Follow semantic versioning: `MAJOR.MINOR.PATCH` (e.g., `v2.1.3`).
:::

## Common Mistakes

**Forgetting to push tags** — tags are not pushed by `git push` by default. Use `git push --tags` or push a specific tag. See the [Pushing Tags](/git_101/Grade%206/Pushing%20Tags) lesson.

**Creating a tag on the wrong commit** — check `git log --oneline` to confirm `HEAD` is at the right commit before tagging, or specify the commit hash explicitly.

**Using the same tag name twice** — Git won't overwrite an existing tag by default. Delete the old tag first and recreate it, but note that if it's already been pushed, others may have it locally.

---

**Next Steps:** [Pushing Tags to Remote Repositories](/git_101/Grade%206/Pushing%20Tags)
