# Try and Except

### Introduction
The `try/except` block lets you catch exceptions and handle them gracefully instead of letting the program crash.

### Basic Syntax

```python
try:
    # code that might raise an exception
except ExceptionType:
    # code to run if that exception occurs
```

**Example**

```python
try:
    age = int(input("Enter your age: "))
    print(f"In 10 years you will be {age + 10}")
except ValueError:
    print("Please enter a valid number.")
```

### Catching Multiple Exceptions

```python
try:
    value = int(input("Enter a number: "))
    result = 100 / value
    print(result)
except ValueError:
    print("That is not a valid number.")
except ZeroDivisionError:
    print("Cannot divide by zero.")
```

### Catching Multiple in One Except

```python
try:
    ...
except (ValueError, TypeError):
    print("Invalid input.")
```

### The else Clause

The `else` block runs only if no exception was raised.

```python
try:
    value = int(input("Enter a number: "))
except ValueError:
    print("Not a number.")
else:
    print(f"You entered {value}")   # only runs if no exception
```

### The finally Clause

`finally` always runs, whether or not an exception occurred. Use it for cleanup — closing a file, releasing a resource.

```python
try:
    f = open("data.csv", "r")
    content = f.read()
except FileNotFoundError:
    print("File not found.")
finally:
    print("Done.")   # always runs
```

> In practice, the `with` statement handles file cleanup automatically — you rarely need `finally` for files.

### Accessing the Exception

Use `as` to capture the exception object and read its message.

```python
try:
    result = int("not a number")
except ValueError as e:
    print(f"Error: {e}")   # Error: invalid literal for int() with base 10: 'not a number'
```

### A Practical Pattern: Validating User Input

```python
def get_integer(prompt):
    """Keep asking until the user enters a valid integer."""
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Invalid input. Please enter a whole number.")

age = get_integer("Enter your age: ")
print(f"Age: {age}")
```

### Practice Exercises

* Write a function `safe_divide(a, b)` that returns `a / b` or prints a message and returns `None` if `b` is zero.
* Write a function `read_file(path)` that returns the file contents or a clear error message if the file does not exist.
* Use a `try/except/else/finally` block — print a different message in each clause and observe the output both when an error occurs and when it does not.
* Write a loop that keeps asking for a valid positive integer, rejecting anything that is not a number or is less than 1.
