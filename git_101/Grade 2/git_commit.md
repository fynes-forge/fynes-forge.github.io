---
id: Git Commit
sidebar_position: 3
---

After staging your changes with `git add`, the next step is to commit them to your Git repository. Commits act like snapshots of your project at a specific moment in time.

## What Does `Git Commit` Do?

`Git commit` creates a snapshot of staged changes and moves these from the staging area to the HEAD (repos hostory).

Each commit includes:

* A snapshot of the staged files

* A unique SHA hash ID

* A commit message

* Author name and timestamp

### Example
```bash
git commit -m "Add homepage layout and styling"
```


## Commit Your first Change

Following on from `git add`:

1. check you have staged changes
```bash
git status
```

Output:
```yaml
Changes to be committed:
  new file: message.txt
```

:::note
If no changes are staged please see the git add page.
:::

2. Commit the changes:
```bash
git commit -m 'Adding my first commit'
```

3. View commit history
```bash
git log
```

Output:
```yaml
commit d1e8f91b45e8e1f9e4...
Author: Your Name <you@example.com>
Date:   Fri May 24 10:00 2025

    Initial commit: add version.txt
```

## Commit Workflow

```mermaid
flowchart LR
    A[Staging Area] -->|git commit| B[HEAD]
```
