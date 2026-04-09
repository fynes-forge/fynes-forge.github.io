---
sidebar_position: 1
---

# Configure Python on Windows

This page will walk you through installing Python and setting up your environment on Windows.

## Installing Python

1. Go to [python.org/downloads](https://www.python.org/downloads/) and download the latest Python 3 installer.
2. Run the installer.
3. **Important:** On the first screen, tick **"Add Python to PATH"** before clicking Install Now.
4. Once complete, open **Command Prompt** and verify the installation:

```bash
python --version
```

> If you see `python` is not recognised, restart your terminal and try again. If it still fails, check that Python was added to your PATH via **System Properties → Environment Variables**.

## Installing VS Code

1. Download [VS Code](https://code.visualstudio.com/).
2. Install and open it.
3. Go to the Extensions panel (Ctrl+Shift+X) and search for **Python** — install the extension by Microsoft.

## Creating the Course Folder

Open Command Prompt and run:

```bash
mkdir python-101
cd python-101
```

## Setting Up a Virtual Environment

It is good practice to use a virtual environment for every project. This keeps your installed packages separate from the global Python installation.

```bash
python -m venv .venv
.venv\Scripts\activate
```

You should now see `(.venv)` in your terminal prompt.

> You will need to run `.venv\Scripts\activate` each time you open a new terminal. Grade 8 covers virtual environments in detail.

## Verifying Your Setup

With your virtual environment active, run:

```bash
python --version
pip --version
```

Both should return version numbers. You are ready to start Grade 1.

### Notes

* On Windows, `python` and `pip` refer to the version installed in your active environment.
* If `python` is not found but `python3` works, use `python3` throughout the course.
* VS Code will usually detect your `.venv` automatically — if prompted to select an interpreter, choose the one inside `.venv`.
