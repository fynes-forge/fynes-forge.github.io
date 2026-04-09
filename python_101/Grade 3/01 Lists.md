# Lists

### Introduction
A list is an ordered, mutable collection of items. Items can be of any type — and a single list can mix types, though in practice you usually store similar items together.

### Creating a List

```python
employees = ["Alice", "Bob", "Charlie"]
salaries = [50000, 65000, 80000]
mixed = ["Alice", 30, True, None]
empty = []
```

### Accessing Items

Lists are zero-indexed — the first item is at position `0`.

```python
employees = ["Alice", "Bob", "Charlie"]

print(employees[0])   # Alice
print(employees[-1])  # Charlie  (negative index counts from the end)
```

### Slicing

Extract a portion of a list using `[start:stop]`. The `stop` index is not included.

```python
employees = ["Alice", "Bob", "Charlie", "Diana", "Eve"]

print(employees[1:3])   # ['Bob', 'Charlie']
print(employees[:2])    # ['Alice', 'Bob']
print(employees[2:])    # ['Charlie', 'Diana', 'Eve']
```

### Modifying a List

```python
employees = ["Alice", "Bob", "Charlie"]

employees[1] = "Barbara"     # Replace an item
employees.append("Diana")    # Add to the end
employees.insert(0, "Zara")  # Insert at a position
employees.remove("Alice")    # Remove by value
employees.pop()              # Remove and return the last item
employees.pop(0)             # Remove and return item at index 0
```

### Useful List Methods

```python
numbers = [5, 2, 8, 1, 9, 3]

print(len(numbers))     # 6 — number of items
print(min(numbers))     # 1
print(max(numbers))     # 9
print(sum(numbers))     # 28
print(sorted(numbers))  # [1, 2, 3, 5, 8, 9] — returns new sorted list
numbers.sort()          # sorts in place
numbers.reverse()       # reverses in place
print(numbers.count(5)) # how many times 5 appears
print(5 in numbers)     # True — membership check
```

### Iterating Over a List

```python
employees = ["Alice", "Bob", "Charlie"]

for name in employees:
    print(name)
```

### Nested Lists

Lists can contain other lists.

```python
team = [
    ["Alice", "Engineering", 80000],
    ["Bob", "Finance", 65000],
    ["Charlie", "HR", 55000],
]

for member in team:
    print(f"{member[0]} works in {member[1]}")
```

### Practice Exercises

* Create a list of five product names. Print the first and last item.
* Append two new products to your list and print the length.
* Remove the second item from your list by value and print the result.
* Create a list of numbers and use a loop to print only those greater than `50`.
* Sort your numbers list and print the minimum, maximum, and sum.
