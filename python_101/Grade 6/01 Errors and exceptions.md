# Errors and Exceptions

### Introduction
Errors are a normal part of programming. Understanding the different types and how to read a traceback is the first step to fixing them quickly.

### Types of Errors

#### Syntax Errors
The code is not valid Python. The interpreter catches this before running anything.

```python
if salary > 50000
    print("High earner")
# SyntaxError: expected ':'
```

#### Runtime Errors (Exceptions)
The code is valid Python but something goes wrong when it runs.

```python
salary = int("not a number")   # ValueError
employee = {}
print(employee["name"])        # KeyError
result = 10 / 0                # ZeroDivisionError
```

### Common Built-in Exceptions

| Exception | Caused by |
|-----------|-----------|
| `ValueError` | Wrong value type, e.g. `int("hello")` |
| `TypeError` | Wrong type, e.g. `"age: " + 30` |
| `KeyError` | Missing dictionary key |
| `IndexError` | List index out of range |
| `FileNotFoundError` | File does not exist |
| `ZeroDivisionError` | Dividing by zero |
| `AttributeError` | Calling a method that does not exist |
| `NameError` | Variable not defined |
| `ImportError` | Module not found |

### Reading a Traceback

When an unhandled exception occurs, Python prints a traceback. Read it **bottom to top** — the last line is the error, the lines above show where it happened.

```
Traceback (most recent call last):
  File "main.py", line 8, in <module>
    result = calculate(value)
  File "main.py", line 3, in calculate
    return 10 / value
ZeroDivisionError: division by zero
```

The error is `ZeroDivisionError`, it occurred in the `calculate` function on line 3, called from line 8 in the main script.

### Practice Exercises

* Write code that deliberately causes a `TypeError`. Read the traceback and identify the line number.
* Cause a `KeyError` by accessing a key that does not exist in a dictionary. Note the key name in the error.
* Cause an `IndexError` by accessing an index that is out of range. 
* Write a short function and call it with the wrong number of arguments. Identify the exception type.
