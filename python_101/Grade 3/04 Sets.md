# Sets

### Introduction
A set is an **unordered collection of unique items**. Duplicates are automatically removed. Sets are useful when you care about membership and uniqueness, not order or position.

### Creating a Set

```python
departments = {"Engineering", "Finance", "HR", "Engineering"}
print(departments)  # {'Engineering', 'Finance', 'HR'} — duplicates removed
```

### Adding and Removing

```python
departments = {"Engineering", "Finance"}

departments.add("HR")
departments.discard("Finance")  # safe — no error if item missing
departments.remove("HR")        # raises KeyError if item missing
```

### Checking Membership

```python
print("Engineering" in departments)   # True
print("Marketing" not in departments) # True
```

### Set Operations

Sets support the same operations as in mathematics.

```python
team_a = {"Alice", "Bob", "Charlie"}
team_b = {"Bob", "Diana", "Eve"}

print(team_a | team_b)   # Union — all unique items from both
print(team_a & team_b)   # Intersection — only items in both
print(team_a - team_b)   # Difference — items in A but not B
print(team_a ^ team_b)   # Symmetric difference — items in either but not both
```

**Output**

```
{'Alice', 'Bob', 'Charlie', 'Diana', 'Eve'}
{'Bob'}
{'Alice', 'Charlie'}
{'Alice', 'Charlie', 'Diana', 'Eve'}
```

### Removing Duplicates from a List

A common use case — convert a list to a set and back.

```python
categories = ["Electronics", "Books", "Electronics", "Clothing", "Books"]
unique_categories = list(set(categories))
print(unique_categories)  # order is not guaranteed
```

### Practice Exercises

* Create a set of five skills. Add two more. Discard one and print the result.
* Given two sets of employee names from different offices, find those who work in both.
* Take a list with duplicate product IDs and use a set to produce a deduplicated version.
* Check whether `"python"` is in the set `{"sql", "python", "excel"}`.
