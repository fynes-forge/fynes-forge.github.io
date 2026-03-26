---
id: Git Clone
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Instead of starting a new project from scratch, you can use Git to clone an existing repository — copying all its files, branches, and history to your local machine.

This is one of the most common ways to start working on a project that’s hosted on GitHub or another remote platform.

## What does `Git clone` do

Actions of the git clone command are as follows:

* Creates a local copy of a remote repository.

* Automatically sets up the connection to the remote (`origin`).

* Downloads all branches and commit history.

### Example

```bash
git clone repository-url
```

## Clone Your First Repository

1. Open a terminal or command prompt.

2. Navigate to the folder where you want to download the repo:
```bash
cd projects  # or any other directory
```

3. Run the clone command:
```bash
git clone https://github.com/Tom-Fynes/git-101
```

4. You should see output like:
``` vbnet
Cloning into 'git-101'...
remote: Enumerating objects: ...
remote: Counting objects: ...
Receiving objects: ...
Resolving deltas: ...
```

5. Now check your files:
    * Change directory to newly cloned repo
```bash
cd git-101
```

    * List all files and folders in directoy 

<Tabs>
  <TabItem value="Windows" label="windows" default>
    ```bash
        dir
    ```
  </TabItem>
  <TabItem value="MacOs" label="Mac">
    ```bash
        ls
    ```
  </TabItem>
  <TabItem value="Linux" label="linux">
    ```bash
        ls
    ```
  </TabItem>
</Tabs>
