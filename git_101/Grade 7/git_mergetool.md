---
id: Git Mergetool
sidebar_position: 2
---

`git mergetool` launches a visual diff editor to help you resolve merge conflicts side-by-side, making complex conflicts much easier to work through than editing raw conflict markers in a text editor.

## What Does `git mergetool` Do?

When a merge produces conflicts, `git mergetool` opens each conflicted file in a configured diff tool. The tool displays three or four panes: BASE, OURS, THEIRS, and the merged result. You edit the result pane and save.

## Configure a Merge Tool

Set your preferred tool globally:

```bash
git config --global merge.tool vimdiff
```

Other common options:

| Tool | Description |
|------|-------------|
| `vimdiff` | Vim-based, built into most Unix systems |
| `opendiff` | macOS FileMerge (included with Xcode) |
| `meld` | Free cross-platform GUI tool |
| `kdiff3` | Free cross-platform GUI tool |
| `vscode` | VS Code (requires extra config) |

## Configure VS Code as the Merge Tool

```bash
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
```

## Run the Merge Tool

After a merge conflict:

```bash
git mergetool
```

Git opens each conflicted file in your tool one by one. After you save and close each file, Git marks it as resolved.

## Skip Backing Up Files

By default, `git mergetool` creates `.orig` backup files. Disable this:

```bash
git config --global mergetool.keepBackup false
```

Or delete them after resolving:

```bash
find . -name "*.orig" -delete
```

## Complete the Merge After Using the Tool

After closing the last file in the tool, stage and commit:

```bash
git add .
git commit
```

:::tip
`meld` is a popular free choice for beginners — it has a clear three-pane layout and is available on Linux, macOS, and Windows. Install it and set it with `git config --global merge.tool meld`.
:::

## Common Mistakes

**Running `git mergetool` before a merge conflict exists** — the tool does nothing until there are conflicts. Start a merge first, then run the tool.

**Closing the tool without saving** — if you close the merge tool without saving the merged result, the file may be left with conflict markers or empty. Git may mark it as resolved anyway. Check the result with `git diff` before committing.

**Leaving `.orig` files in the repository** — mergetool creates `.orig` backups by default. Add `*.orig` to your `.gitignore` or disable backups with `mergetool.keepBackup false`.

---

**Next Steps:** [Removing Untracked Files with git clean](/git_101/Grade%207/Git%20Clean)
