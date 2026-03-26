---
id: Git Remote Add
sidebar_position: 4
---

`git remote add` registers a remote repository URL under a short name so you can push and pull without typing the full URL every time.

## What is a Remote?

A remote is a named reference to another copy of your repository, usually hosted on GitHub, GitLab, or Bitbucket. The name `origin` is the conventional name for your primary remote, but you can have as many remotes as you need.

## Add a Remote

```bash
git remote add <name> <url>
```

For example, to add a GitHub repo as `origin`:

```bash
git remote add origin git@github.com:your-username/your-repo.git
```

## List Remotes

Check which remotes are configured:

```bash
git remote -v
```

Output:

```bash
origin  git@github.com:your-username/your-repo.git (fetch)
origin  git@github.com:your-username/your-repo.git (push)
```

## Rename a Remote

```bash
git remote rename origin upstream
```

## Remove a Remote

```bash
git remote remove origin
```

## Change a Remote URL

If the URL changes (for example, you transfer a repo to a different account):

```bash
git remote set-url origin git@github.com:new-username/your-repo.git
```

Verify the change:

```bash
git remote -v
```

:::tip
Use descriptive names when working with multiple remotes. The convention is `origin` for your own fork and `upstream` for the original project you forked from.
:::

## Common Mistakes

**Adding the same remote twice** — running `git remote add origin <url>` when `origin` already exists causes an error. Use `git remote set-url origin <url>` to update the URL instead.

**Using HTTPS instead of SSH** — if you set up SSH keys, use the `git@github.com:...` URL format. HTTPS URLs (`https://github.com/...`) require entering credentials or a personal access token each time.

**Typo in the URL** — if you get `Repository not found` errors when pushing, check the URL with `git remote -v` and correct it with `git remote set-url`.

---

**Next Steps:** [Pushing Changes with git push](/git_101/Grade%203/Git%20Push)
