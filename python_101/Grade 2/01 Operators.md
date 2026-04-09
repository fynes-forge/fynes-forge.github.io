# Comparison and Logical Operators

### Introduction
Operators let you compare values and combine conditions. The results are always `True` or `False`, making them essential for controlling the flow of your programs.

### Comparison Operators

These compare two values and return a boolean.

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `>` | Greater than | `10 > 5` | `True` |
| `>=` | Greater than or equal to | `5 >= 5` | `True` |
| `<` | Less than | `3 < 10` | `True` |
| `<=` | Less than or equal to | `4 <= 3` | `False` |

**Examples**

```python
salary = 60000

print(salary > 50000)   # True
print(salary == 60000)  # True
print(salary != 60000)  # False
print(salary < 40000)   # False
```

### Logical Operators

Logical operators combine multiple conditions.

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `and` | Both must be True | `True and False` | `False` |
| `or` | At least one must be True | `True or False` | `True` |
| `not` | Inverts the result | `not True` | `False` |

**Examples**

```python
salary = 60000
department = "Engineering"

print(salary > 50000 and department == "Engineering")  # True
print(salary > 80000 or department == "Engineering")   # True
print(not salary > 80000)                              # True
```

### Membership Operators

Check whether a value exists in a sequence.

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `in` | Value is in the sequence | `"Alice" in ["Alice", "Bob"]` | `True` |
| `not in` | Value is not in the sequence | `5 not in [1, 2, 3]` | `True` |

```python
approved_departments = ["Engineering", "Finance", "HR"]
department = "Engineering"

print(department in approved_departments)      # True
print("Marketing" not in approved_departments) # True
```

### Arithmetic Operators

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `+` | Addition | `10 + 5` | `15` |
| `-` | Subtraction | `10 - 5` | `5` |
| `*` | Multiplication | `10 * 5` | `50` |
| `/` | Division | `10 / 3` | `3.333...` |
| `//` | Floor division | `10 // 3` | `3` |
| `%` | Modulo (remainder) | `10 % 3` | `1` |
| `**` | Exponent | `2 ** 8` | `256` |

### Practice Exercises

* Check whether a salary of `55000` is greater than `50000` and less than `100000`. Print the result.
* Create two variables `is_employed` and `has_contract`. Set one to `True` and one to `False`. Print whether both are `True`, and whether at least one is `True`.
* Check if the string `"python"` is in the list `["sql", "python", "java"]`.
* Calculate the remainder when `17` is divided by `5`.
