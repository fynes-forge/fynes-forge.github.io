# Dictionaries

### Introduction
A dictionary stores data as **key-value pairs**. Keys must be unique and are used to look up values. Dictionaries are unordered in older Python versions, but in Python 3.7+ they preserve insertion order.

### Creating a Dictionary

```python
employee = {
    "firstname": "Alice",
    "lastname": "Smith",
    "department": "Engineering",
    "salary": 80000
}
```

### Accessing Values

```python
print(employee["firstname"])           # Alice
print(employee.get("salary"))          # 80000
print(employee.get("age", "unknown"))  # unknown — default if key missing
```

> Use `.get()` when the key may not exist — accessing a missing key with `[]` raises a `KeyError`.

### Adding and Updating

```python
employee["age"] = 30          # add a new key
employee["salary"] = 85000    # update an existing key
```

### Removing Items

```python
employee.pop("age")       # remove by key, returns the value
del employee["lastname"]  # remove by key
```

### Checking Keys

```python
if "department" in employee:
    print(employee["department"])
```

### Iterating Over a Dictionary

```python
employee = {"firstname": "Alice", "department": "Engineering", "salary": 80000}

for key in employee:
    print(key)

for key, value in employee.items():
    print(f"{key}: {value}")

print(list(employee.keys()))    # ['firstname', 'department', 'salary']
print(list(employee.values()))  # ['Alice', 'Engineering', 80000]
```

### Nested Dictionaries

```python
company = {
    "Alice": {"department": "Engineering", "salary": 80000},
    "Bob":   {"department": "Finance",     "salary": 65000},
}

print(company["Alice"]["salary"])  # 80000

for name, details in company.items():
    print(f"{name} — {details['department']}")
```

### Dictionary Comprehensions

```python
salaries = {"Alice": 80000, "Bob": 65000, "Charlie": 55000}

# Create a new dict with salaries above 60000
high_earners = {name: salary for name, salary in salaries.items() if salary > 60000}
print(high_earners)  # {'Alice': 80000, 'Bob': 65000}
```

### Practice Exercises

* Create a dictionary representing a product with keys for `name`, `price`, and `category`. Print the price.
* Add a `stock` key to the dictionary. Then update the price.
* Loop over the dictionary and print each key and value on a separate line.
* Create a list of product dictionaries and loop over it to print each product name and price.
* Use `.get()` to safely access a key that does not exist, providing a default value.
