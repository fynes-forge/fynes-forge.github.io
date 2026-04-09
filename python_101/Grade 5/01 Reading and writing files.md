# Reading and Writing Files

### Introduction
Working with files is a core skill for data roles. Python's built-in `open()` function handles reading from and writing to text files.

### Opening a File

```python
open(filepath, mode)
```

Common modes:

| Mode | Meaning |
|------|---------|
| `"r"` | Read (default) — file must exist |
| `"w"` | Write — creates or overwrites the file |
| `"a"` | Append — adds to the end without overwriting |
| `"r+"` | Read and write |

### The with Statement

Always use `with` when working with files. It automatically closes the file when the block exits, even if an error occurs.

```python
with open("employees.txt", "r") as f:
    content = f.read()

print(content)
```

### Reading Files

```python
# Read the entire file as a single string
with open("employees.txt", "r") as f:
    content = f.read()

# Read one line at a time
with open("employees.txt", "r") as f:
    for line in f:
        print(line.strip())   # strip() removes the trailing newline

# Read all lines into a list
with open("employees.txt", "r") as f:
    lines = f.readlines()
```

### Writing Files

```python
# Write — creates or overwrites
with open("output.txt", "w") as f:
    f.write("Alice,Engineering,80000\n")
    f.write("Bob,Finance,65000\n")

# Append — adds to existing content
with open("output.txt", "a") as f:
    f.write("Charlie,HR,55000\n")
```

### Writing Multiple Lines

```python
employees = ["Alice", "Bob", "Charlie"]

with open("names.txt", "w") as f:
    for name in employees:
        f.write(name + "\n")
```

### File Paths

```python
# Relative path (relative to where you run the script from)
with open("data/employees.txt", "r") as f:
    ...

# Use pathlib for safer cross-platform paths (covered in Grade 5 modules section)
from pathlib import Path
path = Path("data") / "employees.txt"
with open(path, "r") as f:
    ...
```

### Handling Missing Files

Trying to open a file that does not exist in `"r"` mode raises a `FileNotFoundError`. Error handling is covered in Grade 6 — for now, make sure the file exists before reading.

### Practice Exercises

* Create a file called `products.txt` and write five product names to it, one per line.
* Read the file back and print each line without the trailing newline character.
* Append two more product names to the file and confirm they appear at the end.
* Read the file into a list and print only the lines that contain the letter `"a"`.
