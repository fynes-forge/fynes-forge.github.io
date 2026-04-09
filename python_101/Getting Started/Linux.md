---
sidebar_position: 3
---

# Configure Python on Linux

This page will walk you through installing Python and setting up your environment on Linux. Commands below use `apt` (Debian/Ubuntu). Adjust for your distribution (`dnf`, `yum`, `pacman`) as needed.

## Installing Python

Most Linux distributions include Python 3, but it may not be the latest version.

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv -y
```

Verify:

```bash
python3 --version
pip3 --version
```

## Installing VS Code

### Option A: Snap

```bash
sudo snap install code --classic
```

### Option B: .deb Package

Download the `.deb` from [code.visualstudio.com](https://code.visualstudio.com/) and run:

```bash
sudo dpkg -i code_*.deb
```

Once open, install the **Python** extension (Ctrl+Shift+X → search Python → Install).

## Creating the Course Folder

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

With your virtual environment active:

```bash
python --version
pip --version
```

Both should return version numbers. You are ready to start Grade 1.

### Notes

* Once inside a virtual environment, `python` and `pip` work without the `3` suffix.
* Some distributions may require `python3-full` instead of just `python3-venv` — check the error message if `venv` creation fails.
