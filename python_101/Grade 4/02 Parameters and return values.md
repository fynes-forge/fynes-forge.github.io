# Parameters and Return Values

### Introduction
Parameters allow you to pass data into a function. Return values allow a function to send data back to the caller. Together they make functions truly reusable.

### Parameters

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")   # Hello, Alice!
greet("Bob")     # Hello, Bob!
```

### Multiple Parameters

```python
def describe_employee(firstname, department, salary):
    print(f"{firstname} works in {department} and earns £{salary:,}")

describe_employee("Alice", "Engineering", 80000)
```

### Default Parameter Values

If a caller does not provide a value, the default is used.

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Good morning")  # Good morning, Bob!
```

> Default parameters must come after non-default ones.

### Keyword Arguments

You can pass arguments by name, in any order.

```python
def describe_employee(firstname, department, salary):
    print(f"{firstname} — {department} — £{salary:,}")

describe_employee(salary=80000, firstname="Alice", department="Engineering")
```

### Return Values

The `return` statement exits the function and sends a value back to the caller.

```python
def add(a, b):
    return a + b

result = add(10, 5)
print(result)   # 15
```

Without a `return`, a function returns `None`.

### Returning Multiple Values

Python functions can return multiple values as a tuple.

```python
def get_name_and_salary(employee_id):
    # In a real program, this might query a database
    return "Alice", 80000

name, salary = get_name_and_salary(1)
print(name, salary)   # Alice 80000
```

### *args and **kwargs

For functions that accept a variable number of arguments.

```python
# *args collects extra positional arguments as a tuple
def total(*amounts):
    return sum(amounts)

print(total(100, 200, 300))   # 600

# **kwargs collects extra keyword arguments as a dictionary
def display(**details):
    for key, value in details.items():
        print(f"{key}: {value}")

display(name="Alice", department="Engineering", salary=80000)
```

### Practice Exercises

* Write a function `calculate_tax(salary, rate=0.2)` that returns the tax amount. Test with and without providing the rate.
* Write a function `full_name(firstname, lastname)` that returns the full name as a single string.
* Write a function that takes any number of salaries using `*args` and returns the average.
* Write a function `employee_summary` that accepts keyword arguments and prints each key-value pair.
