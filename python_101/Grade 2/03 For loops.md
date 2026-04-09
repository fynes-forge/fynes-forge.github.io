# For Loops

### Introduction
A `for` loop iterates over a sequence — a list, string, range, or any iterable — and runs the same block of code for each item.

### Basic Syntax

```python
for variable in sequence:
    # code to run for each item
```

### Iterating Over a List

```python
employees = ["Alice", "Bob", "Charlie"]

for employee in employees:
    print(employee)
```

**Output**

```
Alice
Bob
Charlie
```

### Using range()

`range()` generates a sequence of numbers. It is commonly used when you need to repeat something a set number of times.

```python
# range(stop) — 0 up to (but not including) stop
for i in range(5):
    print(i)
# 0, 1, 2, 3, 4

# range(start, stop)
for i in range(2, 6):
    print(i)
# 2, 3, 4, 5

# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)
# 0, 2, 4, 6, 8
```

### Iterating Over a String

Strings are sequences of characters — you can loop over them directly.

```python
for char in "Python":
    print(char)
```

**Output**

```
P
y
t
h
o
n
```

### break and continue

`break` exits the loop immediately. `continue` skips the rest of the current iteration and moves to the next.

```python
salaries = [30000, 55000, 80000, 120000, 45000]

for salary in salaries:
    if salary > 100000:
        print("Found a high earner, stopping")
        break
    print(salary)
```

```python
for i in range(10):
    if i % 2 == 0:
        continue   # skip even numbers
    print(i)
# 1, 3, 5, 7, 9
```

### enumerate()

When you need both the index and the value, use `enumerate()`.

```python
employees = ["Alice", "Bob", "Charlie"]

for index, name in enumerate(employees):
    print(f"{index + 1}. {name}")
```

**Output**

```
1. Alice
2. Bob
3. Charlie
```

### List Comprehensions

A compact way to create a list using a `for` loop in a single line.

```python
# Standard loop
squares = []
for n in range(1, 6):
    squares.append(n ** 2)

# List comprehension — same result
squares = [n ** 2 for n in range(1, 6)]

print(squares)  # [1, 4, 9, 16, 25]
```

### Practice Exercises

* Loop over a list of five product names and print each one.
* Use `range()` to print the numbers 1 to 10.
* Loop over the same range but only print even numbers using `continue`.
* Create a list of salaries. Use a loop to print only those above `50000`.
* Use a list comprehension to create a list of the squares of numbers 1 to 8.
