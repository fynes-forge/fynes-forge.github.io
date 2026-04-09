# Virtual Environments

### Introduction
A virtual environment is an isolated Python installation for a single project. It has its own copy of `pip` and its own set of installed packages, completely separate from your system Python and other projects.

Without virtual environments, all packages from all projects are installed globally. This leads to version conflicts — Project A needs `requests==2.28` but Project B needs `requests==2.31`, and they cannot both be satisfied at the same time.

### Creating a Virtual Environment

Python's built-in `venv` module handles this.

```bash
# Create a virtual environment called .venv in the current directory
python -m venv .venv
```

The name `.venv` is the convention. The dot prefix hides it from directory listings by default on macOS and Linux.

### Activating

You must activate the environment before using it. Once active, `python` and `pip` refer to the environment's versions.

```bash
# macOS / Linux
source .venv/bin/activate

# Windows (Command Prompt)
.venv\Scripts\activate

# Windows (PowerShell)
.venv\Scripts\Activate.ps1
```

Your prompt will change to show `(.venv)` when the environment is active.

### Deactivating

```bash
deactivate
```

### Checking You Are in the Right Environment

```bash
which python      # macOS/Linux — should show .venv/bin/python
where python      # Windows — should show .venv\Scripts\python.exe
pip list          # should only show packages for this project
```

### Never Commit the .venv Folder

Add `.venv` to your `.gitignore`. It is large, OS-specific, and regeneratable from your dependency file.

```
# .gitignore
.venv/
```

### Recreating an Environment

Because you never commit `.venv`, anyone cloning your project creates their own:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Dependency files are covered in the next lesson.

### Practice Exercises

* Create a new directory called `test-project`. Inside it, create a virtual environment.
* Activate it and run `pip list` — note that it starts nearly empty.
* Install `requests` into this environment. Confirm it is installed.
* Deactivate and run `pip list` again to confirm `requests` is not in the global environment.
* Delete the `.venv` folder and recreate it from scratch.
