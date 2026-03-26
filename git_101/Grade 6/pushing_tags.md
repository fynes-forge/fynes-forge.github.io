---
id: Pushing Tags
sidebar_position: 4
---

Tags stay local until you explicitly push them. This lesson covers how to push tags to a remote repository so your team and CI/CD systems can access them.

## Why Push Tags?

Tags on your local machine are not automatically shared with the remote. Pushing tags makes releases visible to collaborators and allows GitHub to display them under the **Releases** and **Tags** pages.

## Push a Single Tag

```bash
git push origin v1.0.0
```

## Push All Local Tags

```bash
git push origin --tags
```

This pushes every local tag that doesn't already exist on the remote.

## Push All Annotated Tags Only

```bash
git push origin --follow-tags
```

`--follow-tags` pushes any annotated tags that point to commits being pushed. It's a safer option than `--tags` because it won't push lightweight or stale tags you might not want to share.

## List Tags on the Remote

```bash
git ls-remote --tags origin
```

## Delete a Tag on the Remote

```bash
git push origin --delete v1.0.0
```

Or the older syntax that achieves the same result:

```bash
git push origin :refs/tags/v1.0.0
```

After deleting from the remote, others will still have the tag locally. They need to delete it themselves:

```bash
git tag -d v1.0.0
```

## Delete and Re-Push a Tag

If you need to move a tag to a different commit (for example, you tagged the wrong commit):

1. Delete the tag locally:

```bash
git tag -d v1.0.0
```

2. Delete it from the remote:

```bash
git push origin --delete v1.0.0
```

3. Recreate the tag at the correct commit:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0" <correct-commit-hash>
```

4. Push it:

```bash
git push origin v1.0.0
```

:::tip
Add `git push --follow-tags` to the end of your release workflow to automatically push annotated tags alongside your commits. Some teams alias their release command to do this automatically.
:::

## Common Mistakes

**Assuming `git push` pushes tags** — it doesn't. Tags require an explicit push with `--tags` or by name.

**Pushing and then needing to move a tag** — moving a pushed tag causes problems for anyone who has already fetched it. Make sure the tag is at the right commit before pushing it publicly.

**Leaving old tags on the remote** — clean up pre-release or wrongly named tags from the remote with `git push origin --delete <tag-name>`.

---

**Next Steps:** [Applying Specific Commits with git cherry-pick](/git_101/Grade%206/Git%20Cherry-Pick)
