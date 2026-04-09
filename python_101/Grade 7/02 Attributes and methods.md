# Attributes and Methods

### Introduction
Attributes store an object's data. Methods are functions defined on a class that describe what an object can do.

### Instance Methods

Methods receive `self` as the first argument, giving them access to the instance's attributes.

```python
class Employee:
    def __init__(self, firstname, lastname, salary):
        self.firstname = firstname
        self.lastname = lastname
        self.salary = salary

    def full_name(self):
        return f"{self.firstname} {self.lastname}"

    def calculate_tax(self, rate=0.2):
        return self.salary * rate

    def apply_raise(self, percent):
        self.salary = self.salary * (1 + percent / 100)

emp = Employee("Alice", "Smith", 80000)
print(emp.full_name())           # Alice Smith
print(emp.calculate_tax())       # 16000.0
emp.apply_raise(10)
print(emp.salary)                # 88000.0
```

### Class Attributes

Class attributes are shared across all instances — useful for constants or defaults.

```python
class Employee:
    company = "Fynes Forge"       # class attribute
    default_tax_rate = 0.2

    def __init__(self, firstname, salary):
        self.firstname = firstname   # instance attribute
        self.salary = salary

emp1 = Employee("Alice", 80000)
emp2 = Employee("Bob", 65000)

print(emp1.company)   # Fynes Forge
print(emp2.company)   # Fynes Forge
print(Employee.company)  # Fynes Forge
```

### Static Methods

Static methods do not receive `self` or the class — they are utility functions that logically belong to the class but do not need access to its state.

```python
class Employee:
    @staticmethod
    def is_valid_salary(salary):
        return isinstance(salary, (int, float)) and salary >= 0

print(Employee.is_valid_salary(80000))   # True
print(Employee.is_valid_salary(-100))    # False
```

### Class Methods

Class methods receive the class (`cls`) instead of the instance. They are often used as alternative constructors.

```python
class Employee:
    def __init__(self, firstname, lastname, salary):
        self.firstname = firstname
        self.lastname = lastname
        self.salary = salary

    @classmethod
    def from_dict(cls, data):
        return cls(data["firstname"], data["lastname"], data["salary"])

data = {"firstname": "Alice", "lastname": "Smith", "salary": 80000}
emp = Employee.from_dict(data)
print(emp.full_name() if hasattr(emp, 'full_name') else emp.firstname)
```

### Practice Exercises

* Add a `describe()` method to your `Product` class that prints a formatted summary of the product.
* Add a class attribute `currency = "GBP"` and use it in the `describe()` method.
* Add a `apply_discount(percent)` method that reduces the product's price.
* Add a `@staticmethod` called `is_valid_price(price)` that returns `True` if price is a positive number.
