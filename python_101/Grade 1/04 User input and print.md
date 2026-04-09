# User Input and Print

### Introduction
Programs often need to communicate with the person running them — either by displaying output or asking for input. This section covers the `print()` function in more detail and introduces `input()` for reading user input.

### print() in Depth

`print()` can take multiple arguments and has optional keyword arguments to control formatting.

```python
print("Hello", "World")           # Hello World
print("Hello", "World", sep="-")  # Hello-World
print("Loading", end="...")       # Loading... (no newline)
print("done")                     # done
```

**Formatting numbers**

```python
salary = 75234.5678
print(f"Salary: {salary:.2f}")    # Salary: 75234.57
print(f"Salary: {salary:,.2f}")   # Salary: 75,234.57
```

### input()

`input()` pauses the program and waits for the user to type something and press Enter. It always returns a **string**.

#### Syntax

```python
variable = input("Prompt message: ")
```

**Example**

```python
name = input("Enter your name: ")
print(f"Hello, {name}!")
```

```
Enter your name: Alice
Hello, Alice!
```

### input() Always Returns a String

If you need a number from the user, you must convert it.

```python
age_input = input("Enter your age: ")
age = int(age_input)
print(f"In 10 years you will be {age + 10}")
```

Or on one line:

```python
age = int(input("Enter your age: "))
```

> If the user types something that cannot be converted (e.g. `"hello"` when you call `int()`), Python will raise a `ValueError`. Error handling is covered in Grade 6.

### Combining input() and print()

```python
firstname = input("First name: ")
lastname = input("Last name: ")
salary = float(input("Salary: "))

print(f"\nEmployee Summary")
print(f"Name:   {firstname} {lastname}")
print(f"Salary: £{salary:,.2f}")
```

```
First name: Alice
Last name: Smith
Salary: 75000

Employee Summary
Name:   Alice Smith
Salary: £75,000.00
```

### Practice Exercises

* Ask the user for their name and favourite number. Print a sentence using both.
* Ask the user for two numbers. Add them together and print the result.
* Print a formatted receipt: ask for an item name and price, then print them aligned neatly using an f-string.
* Ask the user for their year of birth. Calculate and print their approximate age.
