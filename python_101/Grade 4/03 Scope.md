# Scope

### Introduction
Scope determines where a variable can be accessed. Python uses the **LEGB** rule to look up variables: Local → Enclosing → Global → Built-in.

### Local Scope

Variables created inside a function exist only within that function.

```python
def calculate():
    result = 100   # local variable
    print(result)

calculate()
print(result)   # NameError — result does not exist outside the function
```

### Global Scope

Variables created outside any function are global and accessible everywhere.

```python
tax_rate = 0.2   # global variable

def calculate_tax(salary):
    return salary * tax_rate   # can read the global variable

print(calculate_tax(80000))   # 16000.0
```

### Modifying a Global Variable

Reading a global variable from inside a function works automatically. Modifying one requires the `global` keyword.

```python
count = 0

def increment():
    global count
    count += 1

increment()
increment()
print(count)   # 2
```

> **Tip:** Relying heavily on `global` makes code harder to follow and test. Prefer passing values in as parameters and returning updated values.

### Enclosing Scope (Closures)

When a function is defined inside another function, the inner function can access the outer function's variables.

```python
def make_multiplier(factor):
    def multiply(number):
        return number * factor   # factor comes from the enclosing scope
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(10))   # 20
print(triple(10))   # 30
```

### Built-in Scope

Names like `print`, `len`, `range`, and `int` are always available — they live in Python's built-in scope. Avoid naming your own variables after them.

```python
# Don't do this
list = [1, 2, 3]   # shadows the built-in list() function
print(list([4, 5]))  # TypeError — you've overwritten list
```

### Practice Exercises

* Create a global variable `company_name`. Write a function that reads and prints it without using `global`.
* Write a function that tries to modify a global counter without the `global` keyword. Observe the error, then fix it.
* Write a `make_greeting(greeting)` function that returns an inner function. The inner function should accept a name and print `"{greeting}, {name}!"`.
