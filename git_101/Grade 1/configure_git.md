---
id: Setting Username and Email
sidebar_position: 3
---

Before making your first commit, it's essential to tell Git who you are. Git uses your `username` and `email address` to label every commit you make. This helps with collaboration, tracking changes, and understanding project history.

## Why this is important

Git doesn’t require an account to use locally, but every commit is tagged with a name and email. Without setting these, your commits may be anonymous or incorrectly attributed.

:::warning
If you're using GitHub or another remote service, the email you configure should match the one associated with your account to link commits to your profile.
:::

## Set Global Username and Email

To configure Git with your details, open a terminal or command prompt and run:

```bash 
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

In the above example `--global` tells Git to use these settings for all repositories on your system.


Example:

```bash
git config --global user.name "Tom Fynes"
git config --global user.email "tom.fynesn@example.com"
```

## Set Username and Email for a Specific Repository

If you want to use different details for a particular project you can use the following:

1. Navigate to the project directory:
```bash
cd path/to/your/project
```

Set local configuration:

```bash
git config user.name "Project-Specific Name"
git config user.email "project@example.com"
```

This overrides the global settings only for that repository.

##  Check Your Configuration

If you need to check what your current config looks like you can do this by using:
```bash
git config --list
```

This will output something like:

```bash
user.name=Tom Fynes
user.email=tom.fynes@example.com
```

And To check values from a specific scope, you can do the following:
```bash 
git config --global --list    # Global values
git config --local --list     # Repository-specific values
```