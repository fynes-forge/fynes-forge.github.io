# Debugging Techniques

### Introduction
Debugging is the process of finding and fixing the cause of unexpected behaviour. The goal is not just to fix the symptom but to understand why it happened.

### 1. Read the Traceback

The traceback is your first source of information. Read it bottom to top — the last line names the exception, the lines above show the call chain that led to it.

```
Traceback (most recent call last):
  File "main.py", line 12, in <module>
    process(data)
  File "main.py", line 7, in process
    total = sum(values)
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

Here the problem is a string in a list that should contain only integers, on line 7 of `process()`.

### 2. Print Debugging

The simplest technique — add `print()` calls to inspect values at different points.

```python
def calculate_bonus(salary, multiplier):
    print(f"DEBUG salary={salary}, multiplier={multiplier}")
    bonus = salary * multiplier
    print(f"DEBUG bonus={bonus}")
    return bonus
```

Remove or comment out debug prints before sharing your code.

### 3. The Python Debugger (pdb)

`pdb` lets you pause execution and step through code line by line.

```python
import pdb

def calculate_bonus(salary, multiplier):
    pdb.set_trace()   # execution pauses here
    return salary * multiplier
```

Useful `pdb` commands at the prompt:

| Command | Action |
|---------|--------|
| `n` | Next line |
| `s` | Step into a function |
| `c` | Continue to next breakpoint |
| `p variable` | Print a variable's value |
| `q` | Quit the debugger |

In Python 3.7+ you can use `breakpoint()` instead of `import pdb; pdb.set_trace()`.

```python
def calculate_bonus(salary, multiplier):
    breakpoint()
    return salary * multiplier
```

### 4. VS Code Debugger

VS Code has a built-in debugger with a visual interface:

1. Click the line number in the editor to set a **breakpoint** (a red dot appears).
2. Press **F5** or click **Run → Start Debugging**.
3. Execution pauses at the breakpoint.
4. Use the debug toolbar to step through, inspect variables, and continue.

This is the most productive approach for anything beyond a quick print check.

### 5. Common Bugs and How to Find Them

| Symptom | Likely cause | Where to look |
|---------|-------------|---------------|
| `TypeError` on arithmetic | A string where a number is expected | Check `type()` of inputs |
| `KeyError` on dict access | Key does not exist | Use `.get()` or check with `in` |
| Wrong output from a loop | Off-by-one error | Print the loop variable on each iteration |
| Function returns `None` | Missing `return` | Check every code path has a `return` |
| Variable has unexpected value | Modified elsewhere | Search for all assignments to that name |

### Practice Exercises

* Take a function with a deliberate bug (wrong operator, missing return) and use print debugging to find and fix it.
* Set a `breakpoint()` in a function and step through it, printing the value of a variable at each step.
* Write a function that receives a list of mixed types (integers and strings) and raises a `TypeError` when it hits a string. Use the traceback to identify exactly which value caused the problem.
