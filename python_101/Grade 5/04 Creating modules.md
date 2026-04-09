# Creating Your Own Modules

### Introduction
Any `.py` file is a module. Splitting your code across multiple files keeps things organised and makes logic reusable across different scripts.

### Creating a Module

Create a file called `utils.py`:

```python
# utils.py

def calculate_tax(salary, rate=0.2):
    """Return the tax amount for a given salary."""
    return salary * rate

def full_name(firstname, lastname):
    """Return a formatted full name."""
    return f"{firstname} {lastname}"

TAX_RATE = 0.2
```

### Importing Your Module

In another file in the same directory:

```python
# main.py
import utils

name = utils.full_name("Alice", "Smith")
tax = utils.calculate_tax(80000)

print(f"{name} owes £{tax:,.2f} in tax")
```

Or import specific names:

```python
from utils import full_name, calculate_tax

print(full_name("Alice", "Smith"))
print(calculate_tax(80000, rate=0.3))
```

### The if __name__ == "__main__" Guard

When Python runs a file directly, it sets `__name__` to `"__main__"`. When the file is imported as a module, `__name__` is set to the module name instead.

This guard lets you include test code in a module that only runs when the file is executed directly — not when it is imported.

```python
# utils.py

def calculate_tax(salary, rate=0.2):
    return salary * rate

if __name__ == "__main__":
    # This block only runs when utils.py is executed directly
    print(calculate_tax(80000))
```

```bash
python utils.py        # prints 16000.0
python main.py         # does NOT print 16000.0
```

### Organising Modules into Packages

A **package** is a directory containing an `__init__.py` file. This signals to Python that the directory should be treated as a package.

```
project/
├── main.py
└── payroll/
    ├── __init__.py
    ├── tax.py
    └── employees.py
```

```python
# main.py
from payroll.tax import calculate_tax
from payroll.employees import full_name
```

The `__init__.py` can be empty, or it can import names to make them available at the package level.

### Practice Exercises

* Create a `helpers.py` module with two functions: one that formats a salary as a string (e.g. `"£80,000"`) and one that checks whether a salary is above a threshold.
* Import and use both functions in a separate `main.py` file.
* Add the `if __name__ == "__main__"` guard to `helpers.py` with a quick test of both functions.
* Create a `data/` package with an `__init__.py` and a `loader.py` file. In `loader.py` write a function that reads a CSV file and returns a list of dictionaries.
