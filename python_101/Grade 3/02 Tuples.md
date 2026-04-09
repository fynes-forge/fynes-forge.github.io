# Tuples

### Introduction
A tuple is an ordered, **immutable** collection. Once created, it cannot be changed. Tuples are used when the data should not be modified — coordinates, RGB values, database records, and return values from functions are common examples.

### Creating a Tuple

```python
point = (10, 20)
rgb = (255, 128, 0)
single = (42,)        # Note the trailing comma — required for single-item tuples
empty = ()
```

### Accessing Items

Same as lists — zero-indexed.

```python
point = (10, 20)
print(point[0])   # 10
print(point[-1])  # 20
```

### Unpacking

Tuples are often unpacked into separate variables.

```python
point = (10, 20)
x, y = point
print(x, y)   # 10 20

# Works with any iterable
firstname, lastname, age = "Alice", "Smith", 30
```

### Tuples vs Lists

| | Tuple | List |
|-|-------|------|
| Mutable | ❌ | ✅ |
| Syntax | `(1, 2, 3)` | `[1, 2, 3]` |
| Use when | Data should not change | Data may change |

### Practice Exercises

* Create a tuple containing a product name, price, and category. Unpack it into three variables and print them.
* Try to change the first value of the tuple. Read the error message and note what it says.
* Create a function that returns two values as a tuple. Call it and unpack the result.
