---
id: Connecting to GitHub
sidebar_position: 3
---

Once you have a local Git repository, you can link it to GitHub so your work is backed up online and shareable with others.

## What Does Connecting Mean?

A remote is a URL that points to a repository hosted somewhere else — in this case, GitHub. When you connect your local repo to GitHub, Git knows where to push commits and where to pull changes from.

## Create a Repository on GitHub

1. Sign in to [github.com](https://github.com).

2. Click the **+** icon in the top-right corner and select **New repository**.

3. Give the repository a name that matches your local project.

4. Leave **Initialize this repository with a README** unchecked — you already have a local repo.

5. Click **Create repository**.

GitHub will show you a page with setup instructions. Keep this page open.

## Link Your Local Repo to GitHub

1. In your terminal, navigate to your local project:

```bash
cd projects/git-demo
```

2. Add the GitHub repository as a remote named `origin`:

```bash
git remote add origin git@github.com:your-username/your-repo.git
```

3. Verify the remote was added:

```bash
git remote -v
```

Output:

```bash
origin  git@github.com:your-username/your-repo.git (fetch)
origin  git@github.com:your-username/your-repo.git (push)
```

4. Push your local commits to GitHub for the first time:

```bash
git push -u origin main
```

The `-u` flag sets `origin/main` as the upstream tracking branch. After this, you can run `git push` without arguments.

:::tip
If your default branch is named `master` instead of `main`, replace `main` with `master` in the push command.

You can rename your local branch to `main` with: `git branch -m master main`
:::

## Common Mistakes

**`error: remote origin already exists`** — you've already added a remote called `origin`. Check it with `git remote -v` and update it if needed:

```bash
git remote set-url origin git@github.com:your-username/your-repo.git
```

**`Permission denied (publickey)`** — your SSH key isn't set up yet. See the [SSH Keys](/git_101/Grade%203/SSH%20Keys) lesson before continuing.

**`src refspec main does not match any`** — you haven't made any commits yet. Run `git add .` then `git commit -m "Initial commit"` first.

---

**Next Steps:** [Adding a Remote with git remote add](/git_101/Grade%203/Git%20Remote%20Add)
