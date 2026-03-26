---
id: Pull Requests
sidebar_position: 2
---

Pull requests (PRs) are the primary mechanism for peer review on GitHub. They give your team visibility into changes before they're merged, creating a structured feedback loop that improves code quality and knowledge sharing.

## What is a Pull Request?

A pull request asks the team to review a set of commits on a branch and approve merging them into another branch (usually `main`). GitHub provides a diff view, inline commenting, review approvals, and CI status all in one place.

## Opening a Pull Request

1. Push your feature branch to GitHub:

```bash
git push -u origin feature/user-authentication
```

2. Go to your repository on GitHub. A yellow banner usually appears: **"Compare & pull request"** — click it. Or go to the **Pull requests** tab and click **New pull request**.

3. Set the **base branch** (where you want to merge into, e.g., `main`) and the **compare branch** (your feature branch).

4. Write a clear title and description:
   * What does this PR do?
   * Why is this change needed?
   * Any context reviewers need (screenshots, linked issues, testing notes).

5. Assign reviewers under the **Reviewers** section on the right.

6. Click **Create pull request**.

## Reviewing a Pull Request

1. Open the PR and read the description.

2. Click the **Files changed** tab to see the diff.

3. Leave comments by clicking the `+` icon on any line.

4. When done, click **Review changes**:
   * **Comment** — leave feedback without approving or blocking.
   * **Approve** — the code looks good to merge.
   * **Request changes** — the code needs changes before merging.

## Responding to Review Feedback

1. Make the changes on your local branch.

2. Commit and push — the PR updates automatically:

```bash
git add .
git commit -m "Address review: rename variable for clarity"
git push
```

3. Mark review comments as resolved once addressed.

## Merging a Pull Request

Once approved, merge via the GitHub interface. Choose the merge strategy:

* **Create a merge commit** — preserves full history.
* **Squash and merge** — combines all commits into one. Keeps `main` history clean.
* **Rebase and merge** — replays commits onto `main` without a merge commit.

After merging, delete the branch using the **Delete branch** button.

## Draft Pull Requests

Open a PR early as a draft to share work-in-progress and get early feedback without signalling it's ready to merge:

1. Click the arrow next to **Create pull request**.
2. Select **Create draft pull request**.

## Linking Issues to Pull Requests

In your PR description, reference an issue to automatically close it when the PR is merged:

```
Closes #42
Fixes #38
```

:::tip
Keep pull requests small and focused. A PR that changes one logical thing is reviewed faster, causes fewer conflicts, and is easier to roll back if something goes wrong.
:::

## Common Mistakes

**Vague PR descriptions** — "fix stuff" or "updates" gives reviewers no context. Write a description that explains what changed and why.

**Requesting review before the PR is ready** — use draft PRs for work in progress. Only request review when the code is complete and you've reviewed it yourself.

**Ignoring failing CI checks** — don't merge a PR with failing tests or linting errors. Fix the failures first.

---

**Next Steps:** [Setting Up Continuous Integration with GitHub Actions](/git_101/Grade%208/GitHub%20Actions%20CI)
