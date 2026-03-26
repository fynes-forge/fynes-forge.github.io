---
id: Gitignore
sidebar_position: 7
---

`.gitignore` tells Git which files and directories to ignore, keeping secrets, build artifacts, and local configuration out of your repository.

## What is `.gitignore`?

`.gitignore` is a plain text file in your repository root. Each line is a pattern that matches file paths to ignore. Files matching these patterns won't appear in `git status` and won't be staged or committed.

## Create a `.gitignore` File

In your repository root:

```bash
touch .gitignore
```

Then open it in your editor and add patterns.

## Common Patterns

Ignore a specific file:

```
secrets.env
```

Ignore all files with an extension:

```
*.log
*.pyc
```

Ignore a directory:

```
node_modules/
dist/
__pycache__/
```

Ignore a file only in the root directory:

```
/config.local.json
```

Ignore a file in any subdirectory:

```
**/debug.log
```

Allow a file that would otherwise be matched by a broader rule (use `!`):

```
*.log
!important.log
```

## View Ignored Files

Check which files are currently being ignored:

```bash
git check-ignore -v filename.txt
```

List all ignored files in the repository:

```bash
git status --ignored
```

## Stop Tracking a File That's Already Committed

If you accidentally committed a file and now want to ignore it, adding it to `.gitignore` alone isn't enough — Git is already tracking it. Remove it from tracking:

```bash
git rm --cached filename.txt
```

Then add the pattern to `.gitignore`, commit both changes:

```bash
git add .gitignore
git commit -m "Stop tracking secrets.env and add to .gitignore"
```

## Global `.gitignore`

Set up a global ignore file that applies across all your repositories — useful for IDE files and OS-generated files:

```bash
git config --global core.excludesFile ~/.gitignore_global
```

Then add patterns to `~/.gitignore_global`:

```
.DS_Store
Thumbs.db
.idea/
.vscode/
```

:::tip
GitHub provides starter `.gitignore` templates for popular languages and frameworks at [github.com/github/gitignore](https://github.com/github/gitignore). Use these as a starting point for new projects.
:::

## Common Mistakes

**Adding secrets after they've been committed** — `.gitignore` only prevents future tracking. If a secret was already committed, it's in the history. Rotate the credential immediately and use `git filter-repo` or GitHub's secret scanning to assess the impact.

**Ignoring files with the wrong path separator** — Git uses forward slashes (`/`) in `.gitignore` patterns on all platforms, including Windows.

**Forgetting to commit `.gitignore`** — `.gitignore` is a project file and should be committed so all collaborators benefit from the same ignore rules.

---

**Next Steps:** [Identifying and Resolving Advanced Merge Conflicts](/git_101/Grade%207/Advanced%20Merge%20Conflicts)
