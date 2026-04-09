# Inheritance

### Introduction
Inheritance allows a class to take on the attributes and methods of another class. The inheriting class is called the **child** (or subclass); the class it inherits from is the **parent** (or superclass). Use it to model "is-a" relationships and avoid duplicating code.

### Basic Inheritance

```python
class Employee:
    def __init__(self, firstname, lastname, salary):
        self.firstname = firstname
        self.lastname = lastname
        self.salary = salary

    def full_name(self):
        return f"{self.firstname} {self.lastname}"

    def describe(self):
        return f"{self.full_name()} — £{self.salary:,}"


class Manager(Employee):
    def __init__(self, firstname, lastname, salary, team_size):
        super().__init__(firstname, lastname, salary)   # call parent __init__
        self.team_size = team_size

    def describe(self):
        return f"{super().describe()} — manages {self.team_size} people"


emp = Employee("Alice", "Smith", 80000)
mgr = Manager("Bob", "Jones", 110000, 8)

print(emp.describe())   # Alice Smith — £80,000
print(mgr.describe())   # Bob Jones — £110,000 — manages 8 people
print(mgr.full_name())  # Bob Jones — inherited from Employee
```

### super()

`super()` gives you access to the parent class. It is most commonly used to call the parent's `__init__` so you do not have to repeat attribute assignments.

### Checking Inheritance

```python
print(isinstance(mgr, Manager))    # True
print(isinstance(mgr, Employee))   # True — a Manager IS an Employee
print(issubclass(Manager, Employee))  # True
```

### Multiple Inheritance

Python supports inheriting from more than one parent, though it is best used sparingly.

```python
class Auditable:
    def audit_log(self):
        return f"Record created for {self.full_name()}"

class AuditedEmployee(Employee, Auditable):
    pass

ae = AuditedEmployee("Charlie", "Brown", 70000)
print(ae.audit_log())   # Record created for Charlie Brown
```

### Practice Exercises

* Create a `DigitalProduct` class that inherits from your `Product` class and adds a `download_url` attribute.
* Override the `describe()` method in `DigitalProduct` to include the URL.
* Create a `PhysicalProduct` subclass that adds a `weight_kg` attribute.
* Check using `isinstance` that a `DigitalProduct` is also an instance of `Product`.
