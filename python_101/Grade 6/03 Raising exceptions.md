# Raising Exceptions

### Introduction
You can raise your own exceptions to signal that something has gone wrong in your code. This makes your functions self-documenting and prevents bad data from propagating silently.

### raise

```python
def set_salary(salary):
    if salary < 0:
        raise ValueError("Salary cannot be negative.")
    return salary

set_salary(-5000)
# ValueError: Salary cannot be negative.
```

### Raising with a Custom Message

```python
def get_employee(employee_id, employees):
    if employee_id not in employees:
        raise KeyError(f"No employee found with ID {employee_id}")
    return employees[employee_id]
```

### Custom Exception Classes

For larger projects, define your own exception types by subclassing `Exception`.

```python
class InvalidSalaryError(Exception):
    """Raised when a salary value is invalid."""
    pass

class EmployeeNotFoundError(Exception):
    """Raised when an employee cannot be found."""
    pass

def set_salary(salary):
    if not isinstance(salary, (int, float)):
        raise TypeError("Salary must be a number.")
    if salary < 0:
        raise InvalidSalaryError(f"Salary {salary} cannot be negative.")
    return salary
```

Callers can then catch your specific exception:

```python
try:
    set_salary(-5000)
except InvalidSalaryError as e:
    print(f"Payroll error: {e}")
```

### Practice Exercises

* Write a function `set_age(age)` that raises a `ValueError` if age is below 0 or above 150.
* Create a custom exception class `InsufficientStockError`. Write a function that raises it when stock goes below zero.
* Write a function that raises an exception and then call it inside a `try/except` that catches and prints the message.
