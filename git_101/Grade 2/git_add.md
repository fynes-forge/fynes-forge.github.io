---
id: Git Add
sidebar_position: 2
---

Once you’ve made changes in your project, the next step is to stage those changes using `git add`. This prepares them to be included in your next commit.

## What Does `Git Add` Do?

`Git add` moves changes from the Working Directory to the Staging Area. If you edit a file and don’t run git add, the changes will not be added to your next commit. 

### Examples

Add a single file
```bash
git add <filename>
```

Add multiple files

```bash
git add file1.txt file2.txt
```

Add all changes

```bash
git add .
```

Add all changes (including deletions)

```bash
git add -A
```

## Add Your First Change

1. Open terminal and navigate to the `git-101` repo

```bash
cd projects/git-101
```

2. Create a file:
```bash
echo "Hello Git" > message.txt
```

3. Check the status:
```bash
git status
```

Output:

```yaml
Untracked files:
  message.txt
```

4. Stage the file:
```bash
git add message.txt
```

5. Check status again:
```bash
git status
```

Output:
```yaml
Changes to be committed:
  new file: message.txt
```

## Staging Workflow

```mermaid
flowchart LR
    A[Working Directory] -->|git add| B[Staging Area]
```