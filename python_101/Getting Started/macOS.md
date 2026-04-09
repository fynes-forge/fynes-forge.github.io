---
sidebar_position: 2
---

# Configure Python on macOS

This page will walk you through installing Python and setting up your environment on macOS.

## Installing Python

macOS comes with a system Python, but it is outdated and should not be used for development. Install a fresh version using one of the following methods.

### Option A: Homebrew (Recommended)

If you do not have Homebrew installed:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install Python:

```bash
brew install python
```

### Option B: Official Installer

Download the macOS installer from [python.org/downloads](https://www.python.org/downloads/) and follow the prompts.

### Verify

```bash
python3 --version
```

> On macOS, use `python3` and `pip3` unless you have configured an alias or are inside a virtual environment.

## Installing VS Code

1. Download [VS Code](https://code.visualstudio.com/).
2. Move it to your Applications folder.
3. Open it and install the **Python** extension (Cmd+Shift+X → search Python → Install).

## Creating the Course Folder

Open Terminal and run:

```bash
mkdir python-101
cd python-101
```

## Setting Up a Virtual Environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

You should now see `(.venv)` in your terminal prompt.

> You will need to run `source .venv/bin/activate` each time you open a new terminal. Grade 8 covers virtual environments in detail.

## Verifying Your Setup

With your virtual environment active, run:

```bash
python --version
pip --version
```

Both should return version numbers. You are ready to start Grade 1.

### Notes

* Once inside a virtual environment, `python` and `pip` refer to the environment's versions — no need to use `python3`.
* VS Code will detect your `.venv` automatically when you open the folder — select it as your interpreter if prompted.
