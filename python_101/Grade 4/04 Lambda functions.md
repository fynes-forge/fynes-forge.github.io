# Lambda Functions

### Introduction
A lambda function is a small, anonymous function written in a single expression. They are useful when you need a short function for a brief purpose — most often as an argument to another function.

### Syntax

```python
lambda parameters: expression
```

The expression is evaluated and returned automatically — no `return` keyword needed.

### Basic Example

```python
# Standard function
def square(n):
    return n ** 2

# Equivalent lambda
square = lambda n: n ** 2

print(square(5))   # 25
```

### Where Lambdas Are Most Useful

Lambdas shine when passed directly to functions like `sorted()`, `map()`, and `filter()`.

#### sorted() with a key

```python
employees = [
    {"name": "Charlie", "salary": 55000},
    {"name": "Alice",   "salary": 80000},
    {"name": "Bob",     "salary": 65000},
]

# Sort by salary
by_salary = sorted(employees, key=lambda e: e["salary"])
for emp in by_salary:
    print(emp["name"], emp["salary"])
```

**Output**
```
Charlie 55000
Bob 65000
Alice 80000
```

#### map()

Apply a function to every item in an iterable.

```python
salaries = [50000, 65000, 80000]
after_tax = list(map(lambda s: s * 0.8, salaries))
print(after_tax)   # [40000.0, 52000.0, 64000.0]
```

#### filter()

Keep only the items where the function returns `True`.

```python
salaries = [30000, 55000, 80000, 45000, 90000]
high = list(filter(lambda s: s > 60000, salaries))
print(high)   # [80000, 90000]
```

### Lambda vs def

| | `def` | `lambda` |
|-|-------|---------|
| Lines | Multiple | One |
| Name | Required | Optional |
| Docstring | ✅ | ❌ |
| Best for | Complex reusable logic | Short one-off functions |

> If a lambda grows beyond a simple expression, replace it with a proper `def`. Readability matters more than brevity.

### Practice Exercises

* Use `sorted()` with a lambda to sort a list of product dictionaries by price, descending.
* Use `map()` with a lambda to convert a list of prices from GBP to USD (multiply by `1.27`).
* Use `filter()` with a lambda to keep only employees whose department is `"Engineering"`.
* Rewrite the `filter()` example above using a list comprehension. Which do you prefer?
