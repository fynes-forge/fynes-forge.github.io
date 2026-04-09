# Your First Script

### Introduction
A Python script is simply a text file with a `.py` extension. The Python interpreter reads and executes it from top to bottom. This section covers how to write, save, and run your first script.

### Hello, World

The traditional first program in any language — print a message to the screen.

#### In the Terminal (Interactive Mode)

Python comes with an interactive shell called the REPL (Read-Eval-Print Loop). You can use it to run single lines of code immediately.

```bash
python
```

```python
>>> print("Hello, World!")
Hello, World!
```

Type `exit()` or press `Ctrl+D` to leave the REPL.

#### As a Script File

Create a file called `hello.py` and add the following:

```python
print("Hello, World!")
```

Run it from the terminal:

```bash
python hello.py
```

**Output**

```
Hello, World!
```

### Comments

Comments are lines Python ignores — they are there for the reader, not the interpreter. Use them to explain what your code is doing.

```python
# This is a single-line comment
print("Hello!")  # This comment is at the end of a line

"""
This is a multi-line string.
It is often used as a block comment or docstring.
"""
```

### The print() Function

`print()` outputs values to the terminal. It can print strings, numbers, variables, and more.

```python
print("Hello, World!")
print(42)
print("The answer is", 42)
print("Line one\nLine two")   # \n creates a new line
```

**Output**

```
Hello, World!
42
The answer is 42
Line one
Line two
```

### Running Scripts vs the REPL

| | REPL | Script file |
|--|------|-------------|
| Good for | Quick tests, exploring | Real programs, saving work |
| How to run | Type `python` | `python filename.py` |
| Output shown automatically | ✅ | Only via `print()` |

### Practice Exercises

* Create a file called `grade1.py` and print your name to the terminal.
* Add a comment above the print statement explaining what it does.
* Print three separate lines of output using three `print()` calls.
* Print two values in a single `print()` call separated by a space.
