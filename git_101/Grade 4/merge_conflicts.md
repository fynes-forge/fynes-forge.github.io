---
id: Resolving Merge Conflicts
sidebar_position: 4
---

A merge conflict happens when two branches change the same part of a file differently and Git can't decide which version to keep. You resolve conflicts by editing the file and choosing what the final content should be.

## When Do Conflicts Happen?

Conflicts occur when:

* Two branches edited the same lines in the same file.
* One branch deleted a file that the other branch modified.

Git can't automatically decide which change is correct, so it marks the conflict in the file and waits for you to resolve it.

## Identifying Conflicts

When a merge produces conflicts, Git outputs:

```bash
Auto-merging filename.txt
CONFLICT (content): Merge conflict in filename.txt
Automatic merge failed; fix conflicts and then commit the result.
```

Check which files have conflicts:

```bash
git status
```

Files listed under `Unmerged paths` need resolving.

## Reading Conflict Markers

Open a conflicted file and you'll see:

```
<<<<<<< HEAD
This is the version from your current branch.
=======
This is the version from the branch being merged in.
>>>>>>> feature/user-login
```

* `<<<<<<< HEAD` — start of your changes.
* `=======` — separator.
* `>>>>>>> feature/user-login` — start of the incoming changes.

## Resolving the Conflict

1. Open the conflicted file in your editor.

2. Decide which version to keep, or write a combined version. Remove all three conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).

3. Save the file.

4. Stage the resolved file:

```bash
git add filename.txt
```

5. Commit to complete the merge:

```bash
git commit -m "Merge feature/user-login — resolve conflict in filename.txt"
```

## Abort the Merge

If you want to cancel the merge entirely and go back to the state before it started:

```bash
git merge --abort
```

:::tip
Most code editors (VS Code, IntelliJ, Vim with plugins) highlight conflict markers and let you accept one side with a single click. Use these tools to speed up conflict resolution.

Write clear commit messages when resolving conflicts so future readers understand what was merged and why.
:::

## Common Mistakes

**Leaving conflict markers in the file** — if you forget to remove `<<<<<<<`, `=======`, or `>>>>>>>`, your code will be broken. Always search the file for these markers before staging.

**Staging without reading the result** — don't just delete one side of the conflict without reading both. Conflicts often need a thoughtful combination of both changes.

**Committing in the middle of a conflict** — `git status` will show `Unmerged paths` until all conflicts are resolved. Git won't let you push while conflicts remain unresolved.

---

**Next Steps:** [Deleting and Renaming Branches](/git_101/Grade%204/Branch%20Management)
