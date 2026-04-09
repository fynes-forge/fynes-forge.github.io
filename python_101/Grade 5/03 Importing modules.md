# Importing Modules

### Introduction
A module is a Python file containing functions, classes, and variables that you can reuse across your programs. Python comes with a large standard library of built-in modules — no installation required.

### Importing a Module

```python
import math

print(math.pi)           # 3.141592653589793
print(math.sqrt(144))    # 12.0
print(math.ceil(4.2))    # 5
print(math.floor(4.9))   # 4
```

### Importing Specific Names

```python
from math import sqrt, pi

print(sqrt(144))   # 12.0
print(pi)          # 3.141592653589793
```

### Aliases

```python
import math as m
from datetime import datetime as dt

print(m.sqrt(25))
print(dt.now())
```

### Useful Standard Library Modules

#### datetime — Dates and Times

```python
from datetime import datetime, date, timedelta

today = date.today()
print(today)                        # 2024-11-01

now = datetime.now()
print(now.strftime("%d/%m/%Y %H:%M"))   # 01/11/2024 14:30

in_30_days = today + timedelta(days=30)
print(in_30_days)
```

#### os — Operating System Interaction

```python
import os

print(os.getcwd())              # current working directory
print(os.listdir("."))          # files in current directory
os.makedirs("data", exist_ok=True)  # create a directory
```

#### pathlib — File Paths (Modern Approach)

```python
from pathlib import Path

p = Path("data") / "employees.csv"
print(p.exists())      # True or False
print(p.suffix)        # .csv
print(p.stem)          # employees
print(p.parent)        # data
```

#### random — Random Numbers

```python
import random

print(random.randint(1, 100))          # random integer 1–100
print(random.choice(["Alice", "Bob"])) # random item from list
random.shuffle([1, 2, 3, 4, 5])        # shuffle in place
```

#### json — JSON Data

```python
import json

data = {"name": "Alice", "department": "Engineering", "salary": 80000}

json_string = json.dumps(data, indent=2)   # dict → JSON string
print(json_string)

parsed = json.loads(json_string)           # JSON string → dict
print(parsed["name"])

# Write to file
with open("employee.json", "w") as f:
    json.dump(data, f, indent=2)

# Read from file
with open("employee.json", "r") as f:
    loaded = json.load(f)
```

### Practice Exercises

* Use the `datetime` module to print today's date in the format `DD-MM-YYYY`.
* Use `os.listdir()` to list all files in the current directory.
* Use `random.choice()` to pick a random item from a list of five department names.
* Read the CSV you created in the previous lesson and write its contents to a JSON file using the `json` module.
