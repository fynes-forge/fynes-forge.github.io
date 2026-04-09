# Variables and Data Types

### Introduction
Variables are used to store values so you can refer to them later in your code. Python is dynamically typed, which means you do not need to declare a type — Python works it out from the value you assign.

### Assigning Variables

```python
name = "Alice"
age = 30
salary = 75000.50
is_active = True
```

Variable names should be lowercase, with words separated by underscores. This is called **snake_case** and is the Python convention.

### Core Data Types

#### String (`str`)
Text data, enclosed in single or double quotes.

```python
firstname = "Alice"
greeting = 'Hello, World!'
```

You can combine strings using `+`:

```python
full_name = "Alice" + " " + "Smith"
print(full_name)  # Alice Smith
```

Or use an **f-string** (the preferred modern approach):

```python
firstname = "Alice"
lastname = "Smith"
print(f"Full name: {firstname} {lastname}")  # Full name: Alice Smith
```

#### Integer (`int`)
Whole numbers, positive or negative.

```python
age = 30
year = 2024
negative = -10
```

#### Float (`float`)
Numbers with a decimal point.

```python
salary = 75000.50
temperature = -3.5
```

#### Boolean (`bool`)
One of two values: `True` or `False`. Note the capital letter.

```python
is_active = True
has_contract = False
```

#### NoneType (`None`)
Represents the absence of a value.

```python
contract_end_date = None
```

### Checking the Type of a Variable

```python
name = "Alice"
age = 30
salary = 75000.50

print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(salary))  # <class 'float'>
```

### Type Conversion

You can convert between types when needed.

```python
age_str = "30"
age_int = int(age_str)      # "30" → 30
price_str = str(19.99)      # 19.99 → "19.99"
whole = int(3.9)            # 3.9 → 3 (truncates, does not round)
```

### Common Mistakes

* Forgetting quotes around strings: `name = Alice` → `NameError`
* Mixing types without converting: `"Age: " + 30` → `TypeError`

```python
# Correct way
age = 30
print("Age: " + str(age))
# Or, more cleanly:
print(f"Age: {age}")
```

### Practice Exercises

* Create variables for your `firstname`, `lastname`, `age`, and `salary`. Print them all on one line using an f-string.
* Create a variable with the value `"42"`. Convert it to an integer and add `8` to it. Print the result.
* Print the type of each of the four variables you created.
* Create a variable called `is_employed` and set it to `True`. Print it.
