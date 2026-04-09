---
id: Git Log
sidebar_position: 4
---

Once you’ve made several commits, it’s important to understand how to view and explore your project’s history. Git’s `git log` command gives you a detailed view of every commit that has been made.


## What Does `Git Log` Do?
`git log` shows a chronological list of commits, including:

* The commit hash (unique ID)
* The author’s name and email
* The date and time of the commit
* The commit message

You may want to use `git log` to:

* Review the history of changes
* Find specific commits
* Understand the evolution of your project


## Example 
```bash
git log
```

Output:
```yaml
commit a3f6f1c9e29a3e82a4dcb3f59e8ab3d28a12c9af
Author: Tom Fynes <tom@fynesforge.dev>
Date:   Fri May 24 14:15 2025

    Add styling to navigation bar

commit d1e8f91b45e8e1f9e4aa84b2e1830c4b5d674cd0
Author: Tom Fynes <tom@fynesforge.dev>
Date:   Fri May 24 13:50 2025

    Initial commit: add version.txt
```

## Further commands

Shows commits as one line (short hash + message)
```bash
git log --oneline
```

DIsplays a text-based branch diagram
```bash
git log --graph
```

Shows the diff (file changes) for each commit
```bash
git log -p
```

Filter commits by author
```bash
git log --author="name"
```

Filter by date
```bash
git log --since="2 weeks ago"
```

Show commits that changed a specific file
```bash
git log file.txt
```