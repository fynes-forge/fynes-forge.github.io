# What is pip

### Introduction
`pip` is Python's package installer. It lets you download and install third-party libraries from the Python Package Index ([PyPI](https://pypi.org/)) — a public repository of over 500,000 packages.

### Basic Usage

```bash
# Install a package
pip install requests

# Install a specific version
pip install requests==2.31.0

# Install the latest compatible version within a range
pip install "requests>=2.28,<3"

# Upgrade an installed package
pip install --upgrade requests

# Uninstall a package
pip uninstall requests

# List installed packages
pip list

# Show details about a specific package
pip show requests
```

### Searching for Packages

Rather than searching from the command line (the search command was removed), go to [pypi.org](https://pypi.org/) and search there. Check:

* How recently it was updated
* How many downloads it has
* Whether it has a linked GitHub repo with active maintenance

### pip and Virtual Environments

Always activate your virtual environment before running `pip install`. Packages installed without an active environment go into the system Python, which can cause version conflicts between projects.

```bash
# Activate first
source .venv/bin/activate      # macOS/Linux
.venv\Scripts\activate         # Windows

# Then install
pip install requests
```

Grade 8 covers virtual environments in detail.

### Commonly Used Packages in Data Roles

| Package | Use |
|---------|-----|
| `pandas` | Tabular data manipulation |
| `polars` | Fast DataFrames (modern alternative to pandas) |
| `requests` | HTTP requests and APIs |
| `sqlalchemy` | Database connections and ORM |
| `boto3` | AWS SDK |
| `pydantic` | Data validation |
| `pytest` | Testing |
| `black` | Code formatting |

### Practice Exercises

* Run `pip list` and note which packages are currently installed.
* Install the `requests` package and verify it appears in `pip list`.
* Run `pip show requests` and note the version, author, and homepage.
* Uninstall `requests` and confirm it no longer appears in `pip list`.
