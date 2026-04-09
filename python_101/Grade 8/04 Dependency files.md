# requirements.txt and pyproject.toml

### Introduction
Dependency files record which packages your project needs so anyone can recreate your environment exactly. There are two main formats — `requirements.txt` (traditional) and `pyproject.toml` (modern standard).

### requirements.txt

The simplest format. A plain text file listing packages, one per line.

#### Generating One

```bash
# Snapshot your current environment
pip freeze > requirements.txt
```

Example output:

```
certifi==2024.2.2
charset-normalizer==3.3.2
idna==3.7
requests==2.31.0
urllib3==2.2.1
```

#### Installing From One

```bash
pip install -r requirements.txt
```

#### Keeping It Clean

`pip freeze` includes every package including transitive dependencies. A cleaner approach is to only list your direct dependencies manually:

```
# requirements.txt
requests>=2.28
pandas>=2.0
```

Then use `pip freeze` as a separate lock file if you need exact pinning.

### pyproject.toml

The modern, PEP-standard file for Python projects. It stores project metadata, dependencies, and tool configuration in one place.

```toml
[project]
name = "my-project"
version = "0.1.0"
description = "A data processing project"
requires-python = ">=3.10"
dependencies = [
    "requests>=2.28",
    "pandas>=2.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "black>=24.0",
]

[tool.black]
line-length = 88

[tool.pytest.ini_options]
testpaths = ["tests"]
```

#### Installing From pyproject.toml

```bash
# With pip
pip install -e .         # installs the project in editable mode
pip install -e ".[dev]"  # includes dev dependencies

# With uv
uv sync               # installs all dependencies
uv sync --dev         # includes dev dependencies
```

### uv.lock

When using `uv`, a `uv.lock` file is generated automatically. It pins every dependency (including transitive ones) to an exact version. Commit this file to version control — it ensures everyone on the team, and your CI pipeline, installs exactly the same packages.

```bash
# Install from lock file (exact versions)
uv sync
```

### Which Format Should You Use?

| Situation | Recommendation |
|-----------|---------------|
| Quick script or personal project | `requirements.txt` |
| Package or shared project | `pyproject.toml` |
| Using uv | `pyproject.toml` + `uv.lock` |
| Contributing to a project | Use whatever format it already has |

### Practice Exercises

* Activate your virtual environment, install `requests` and `pandas`, then run `pip freeze > requirements.txt`. Inspect the file.
* Delete your `.venv`, recreate it, and install from `requirements.txt`. Verify both packages are present.
* Create a minimal `pyproject.toml` for a project with `requests` as a dependency.
* If you completed the `uv` lesson, run `uv add pytest` and inspect the updated `pyproject.toml` and `uv.lock`.
