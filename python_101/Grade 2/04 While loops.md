# While Loops

### Introduction
A `while` loop runs a block of code repeatedly as long as a condition remains `True`. Unlike a `for` loop, it does not iterate over a fixed sequence — it keeps going until you tell it to stop.

### Basic Syntax

```python
while condition:
    # code to run while condition is True
```

**Example**

```python
count = 0

while count < 5:
    print(count)
    count += 1
```

**Output**

```
0
1
2
3
4
```

> Always make sure something inside the loop will eventually make the condition `False`, or the loop will run forever.

### Infinite Loops

An infinite loop runs indefinitely. Useful in some contexts (like waiting for user input), but usually a bug.

```python
# Intentional: keep asking until a valid response
while True:
    answer = input("Type 'yes' to continue: ")
    if answer == "yes":
        break
    print("Please type 'yes'")
```

Use `Ctrl+C` in the terminal to kill an unintended infinite loop.

### break and continue

Same as in `for` loops — `break` exits immediately, `continue` skips to the next iteration.

```python
attempts = 0

while attempts < 5:
    password = input("Enter password: ")
    if password == "secret":
        print("Access granted")
        break
    attempts += 1
    print(f"Wrong. {5 - attempts} attempts remaining.")
else:
    print("Too many failed attempts.")
```

> The `else` block on a `while` loop runs only if the loop finished without hitting a `break`.

### When to Use while vs for

| Use `for` when | Use `while` when |
|---------------|-----------------|
| You know how many times to iterate | You don't know how many iterations are needed |
| Iterating over a list or range | Waiting for a condition to change |
| Reading items from a collection | Retry logic, polling, or user input |

### Practice Exercises

* Write a `while` loop that prints numbers from `10` down to `1`.
* Write a loop that keeps asking the user to guess a number until they get it right (use a fixed number as the answer).
* Use a `while` loop to sum all integers from `1` to `100` and print the result.
* Write a loop that counts how many times you can halve `1000` before it goes below `1`.
