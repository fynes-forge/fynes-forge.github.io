---
id: Git Cherry-Pick
sidebar_position: 5
---

`git cherry-pick` applies a specific commit from one branch onto your current branch, letting you bring across individual changes without merging the entire branch.

## What Does `git cherry-pick` Do?

Cherry-picking takes the diff introduced by a single commit and replays it on top of your current branch as a new commit. The original commit stays where it is.

This is useful for:

* Backporting a bug fix from `main` to a release branch.
* Bringing a specific feature commit to another branch without a full merge.
* Applying a hotfix to multiple branches.

## Cherry-Pick a Single Commit

Find the commit hash with `git log --oneline` on the source branch:

```bash
git log --oneline feature/payments
```

Then cherry-pick it onto your current branch:

```bash
git cherry-pick a3f6f1c
```

## Cherry-Pick Without Committing

Stage the changes but don't create a commit yet — useful when you want to edit the changes before committing:

```bash
git cherry-pick --no-commit a3f6f1c
```

## Cherry-Pick a Range of Commits

Apply commits from `a3f6f1c` up to and including `d1e8f91` (oldest first):

```bash
git cherry-pick a3f6f1c^..d1e8f91
```

## Cherry-Pick a Merge Commit

Merge commits have two parents. Specify which parent's side you want with `-m`:

```bash
git cherry-pick -m 1 <merge-commit-hash>
```

## Resolve Conflicts During Cherry-Pick

If the cherry-picked commit conflicts with your current branch, Git pauses and marks the conflicts. Resolve them, then continue:

```bash
git add filename.txt
git cherry-pick --continue
```

To abort and return to the state before cherry-picking:

```bash
git cherry-pick --abort
```

:::tip
Cherry-pick creates a new commit with the same changes but a different SHA. If you later merge the original branch, Git may flag the same change twice. Use it for targeted fixes, not as a substitute for proper branching.
:::

## Common Mistakes

**Cherry-picking instead of merging** — if you need everything from a branch, merge it. Cherry-picking is for specific commits only.

**Cherry-picking a commit that depends on earlier commits** — if commit B depends on commit A and you only cherry-pick B, the result may not work. Pick the full set of related commits or merge the branch instead.

**Forgetting to resolve conflicts** — if a cherry-pick stops with conflicts and you switch branches without continuing or aborting, Git leaves your repository in a conflicted state. Always finish or abort a cherry-pick before moving on.

---

**Next Steps:** [Rewriting Commit History with git rebase](/git_101/Grade%206/Git%20Rebase)
