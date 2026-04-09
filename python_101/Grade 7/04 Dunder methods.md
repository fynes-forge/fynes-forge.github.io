# Dunder Methods

### Introduction
Dunder methods (short for "double underscore") let you define how your objects behave with Python's built-in operations — things like printing, comparing, and using `len()`. They are also called magic methods or special methods.

### __str__ and __repr__

`__str__` controls what `print()` and `str()` show. `__repr__` is the developer-facing representation used in the REPL and for debugging.

```python
class Employee:
    def __init__(self, firstname, lastname, salary):
        self.firstname = firstname
        self.lastname = lastname
        self.salary = salary

    def __str__(self):
        return f"{self.firstname} {self.lastname} (£{self.salary:,})"

    def __repr__(self):
        return f"Employee('{self.firstname}', '{self.lastname}', {self.salary})"

emp = Employee("Alice", "Smith", 80000)
print(emp)         # Alice Smith (£80,000)
print(repr(emp))   # Employee('Alice', 'Smith', 80000)
```

### __len__

```python
class Department:
    def __init__(self, name, employees):
        self.name = name
        self.employees = employees

    def __len__(self):
        return len(self.employees)

dept = Department("Engineering", ["Alice", "Bob", "Charlie"])
print(len(dept))   # 3
```

### __eq__ and __lt__

Define how objects are compared.

```python
class Employee:
    def __init__(self, firstname, salary):
        self.firstname = firstname
        self.salary = salary

    def __eq__(self, other):
        return self.salary == other.salary

    def __lt__(self, other):
        return self.salary < other.salary

emp1 = Employee("Alice", 80000)
emp2 = Employee("Bob", 65000)
emp3 = Employee("Charlie", 80000)

print(emp1 == emp3)   # True
print(emp2 < emp1)    # True
print(sorted([emp1, emp2, emp3], key=lambda e: e.salary))
```

### __contains__

```python
class Department:
    def __init__(self, employees):
        self.employees = employees

    def __contains__(self, name):
        return name in self.employees

dept = Department(["Alice", "Bob", "Charlie"])
print("Alice" in dept)    # True
print("Diana" in dept)    # False
```

### __getitem__

Makes objects subscriptable (accessible with `[]`).

```python
class Department:
    def __init__(self, employees):
        self.employees = employees

    def __getitem__(self, index):
        return self.employees[index]

dept = Department(["Alice", "Bob", "Charlie"])
print(dept[0])    # Alice
print(dept[-1])   # Charlie
```

### Practice Exercises

* Add `__str__` and `__repr__` to your `Product` class. Print a product object and inspect its `repr`.
* Add `__eq__` to compare two products by price.
* Add `__lt__` and use `sorted()` on a list of product objects.
* Create a `Catalogue` class that holds a list of products and implements `__len__` and `__contains__`.
