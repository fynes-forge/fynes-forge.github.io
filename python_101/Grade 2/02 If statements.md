# If Statements

### Introduction
If statements allow your program to make decisions. Code inside an `if` block only runs when the condition is `True`.

### Basic If Statement

```python
if condition:
    # code to run when condition is True
```

**Example**

```python
salary = 75000

if salary > 50000:
    print("Senior role")
```

### If / Else

```python
salary = 30000

if salary > 50000:
    print("Senior role")
else:
    print("Junior role")
```

### If / Elif / Else

Use `elif` (short for "else if") to check multiple conditions in sequence. Python stops at the first match.

```python
salary = 55000

if salary < 30000:
    print("Junior")
elif salary < 60000:
    print("Mid-level")
elif salary < 100000:
    print("Senior")
else:
    print("Principal or above")
```

**Output**

```
Mid-level
```

### Indentation Matters

Python uses indentation (4 spaces) to define blocks. Incorrect indentation will cause an `IndentationError`.

```python
# Correct
if salary > 50000:
    print("High earner")

# Wrong — will raise IndentationError
if salary > 50000:
print("High earner")
```

### Nested If Statements

You can place `if` statements inside other `if` statements.

```python
department = "Engineering"
salary = 80000

if department == "Engineering":
    if salary > 75000:
        print("Senior Engineer")
    else:
        print("Engineer")
```

> **Tip:** Deeply nested code is hard to read. If you find yourself going more than two levels deep, consider restructuring using `and` / `or`.

### Truthy and Falsy Values

In Python, values other than `True` and `False` can be treated as booleans in an `if` condition.

| Falsy | Truthy |
|-------|--------|
| `0` | Any non-zero number |
| `""` (empty string) | Any non-empty string |
| `[]` (empty list) | Any non-empty list |
| `None` | Any object |

```python
name = ""

if name:
    print(f"Hello, {name}")
else:
    print("No name provided")
```

### Practice Exercises

* Write an `if/elif/else` statement that categorises a product price: under `10` is `"Cheap"`, between `10` and `50` is `"Moderate"`, above `50` is `"Expensive"`.
* Ask the user for a number. Print whether it is positive, negative, or zero.
* Check if a `username` variable is an empty string and print an appropriate message.
* Write an `if` statement using `and` to check if a salary is between `40000` and `90000`.
