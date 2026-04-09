# Classes and Objects

### Introduction
Object-Oriented Programming (OOP) organises code around **objects** — bundles of related data and behaviour. A **class** is the blueprint; an **object** (or instance) is what you create from it.

### Defining a Class

```python
class Employee:
    pass   # empty class for now
```

### Creating an Instance

```python
emp = Employee()
print(type(emp))   # <class '__main__.Employee'>
```

### The __init__ Method

`__init__` is called automatically when a new instance is created. Use it to set the initial state of the object.

```python
class Employee:
    def __init__(self, firstname, lastname, department, salary):
        self.firstname = firstname
        self.lastname = lastname
        self.department = department
        self.salary = salary

emp = Employee("Alice", "Smith", "Engineering", 80000)
print(emp.firstname)    # Alice
print(emp.salary)       # 80000
```

`self` refers to the instance being created. It must be the first parameter of every method, though you never pass it yourself when calling.

### Accessing Attributes

```python
emp = Employee("Alice", "Smith", "Engineering", 80000)

# Read
print(emp.department)

# Update
emp.salary = 85000
print(emp.salary)
```

### Practice Exercises

* Define a `Product` class with attributes `name`, `category`, and `price`.
* Create three `Product` instances with different values and print all their attributes.
* Update the price of one product and print it again to confirm the change.
* Create a list of five `Product` objects and use a loop to print each product's name and price.
