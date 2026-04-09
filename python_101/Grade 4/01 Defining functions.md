# Defining Functions

### Introduction
A function is a reusable block of code that performs a specific task. Instead of writing the same logic in multiple places, you define it once and call it whenever you need it.

### Basic Syntax

```python
def function_name():
    # code to run when the function is called
```

**Example**

```python
def greet():
    print("Hello, World!")

greet()   # Hello, World!
greet()   # Hello, World!
```

### Naming Conventions

Function names follow the same rules as variables — lowercase with underscores (snake_case).

```python
def calculate_salary():
    ...

def get_employee_name():
    ...
```

### Docstrings

A docstring is a string at the top of a function that describes what it does. It is good practice to include one.

```python
def greet():
    """Print a greeting message to the terminal."""
    print("Hello, World!")
```

### Practice Exercises

* Define a function called `print_header` that prints a decorative line of `=` characters.
* Call it three times and verify it prints the same output each time.
* Add a docstring to your function describing what it does.
