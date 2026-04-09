# Working with CSV Files

### Introduction
CSV (Comma-Separated Values) is one of the most common formats for exchanging tabular data. Python's built-in `csv` module handles the parsing so you do not have to split strings manually.

### Reading a CSV File

Given a file `employees.csv`:

```
firstname,lastname,department,salary
Alice,Smith,Engineering,80000
Bob,Jones,Finance,65000
Charlie,Brown,HR,55000
```

```python
import csv

with open("employees.csv", "r", newline="") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
```

**Output**
```
['firstname', 'lastname', 'department', 'salary']
['Alice', 'Smith', 'Engineering', '80000']
['Bob', 'Jones', 'Finance', '65000']
['Charlie', 'Brown', 'HR', '55000']
```

> Always pass `newline=""` when opening CSV files — this prevents `csv.reader` from mishandling line endings on Windows.

### Skipping the Header Row

```python
import csv

with open("employees.csv", "r", newline="") as f:
    reader = csv.reader(f)
    next(reader)   # skip the header row
    for row in reader:
        print(f"{row[0]} {row[1]} — {row[3]}")
```

### DictReader: Reading Into Dictionaries

`DictReader` maps each row to a dictionary using the header row as keys. This is usually more readable than using column indexes.

```python
import csv

with open("employees.csv", "r", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['firstname']} works in {row['department']} earning £{row['salary']}")
```

### Writing a CSV File

```python
import csv

employees = [
    ["Alice", "Smith", "Engineering", 80000],
    ["Bob",   "Jones", "Finance",     65000],
]

with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["firstname", "lastname", "department", "salary"])  # header
    writer.writerows(employees)
```

### DictWriter: Writing From Dictionaries

```python
import csv

employees = [
    {"firstname": "Alice", "department": "Engineering", "salary": 80000},
    {"firstname": "Bob",   "department": "Finance",     "salary": 65000},
]

fields = ["firstname", "department", "salary"]

with open("output.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerows(employees)
```

### Practice Exercises

* Create a CSV file of five products with columns `name`, `category`, and `price`. Write it using `csv.writer`.
* Read the file back using `DictReader` and print only the products with a price above `20`.
* Add a new column `discounted_price` (price * 0.9) and write the updated data to a new CSV file.
* Read a CSV, collect all unique categories into a set, and print them.
