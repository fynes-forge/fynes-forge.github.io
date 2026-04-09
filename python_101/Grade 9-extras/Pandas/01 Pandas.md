# Pandas

### Introduction
Pandas is the most widely used Python library for working with tabular data. It provides two core data structures — `Series` (a single column) and `DataFrame` (a table of rows and columns) — along with a comprehensive set of tools for loading, cleaning, transforming, and analysing data.

Install it first:

```bash
pip install pandas
# or with uv
uv add pandas
```

### Importing

```python
import pandas as pd
```

### Creating a DataFrame

```python
import pandas as pd

data = {
    "firstname": ["Alice", "Bob", "Charlie", "Diana"],
    "department": ["Engineering", "Finance", "Engineering", "HR"],
    "salary": [80000, 65000, 75000, 55000],
}

df = pd.DataFrame(data)
print(df)
```

**Output**

```
  firstname   department  salary
0     Alice  Engineering   80000
1       Bob      Finance   65000
2   Charlie  Engineering   75000
3     Diana           HR   55000
```

### Reading Data

```python
# From CSV
df = pd.read_csv("employees.csv")

# From JSON
df = pd.read_json("employees.json")

# First look at the data
print(df.head())        # first 5 rows
print(df.tail(3))       # last 3 rows
print(df.shape)         # (rows, columns)
print(df.columns)       # column names
print(df.dtypes)        # data types
print(df.info())        # summary of structure and nulls
print(df.describe())    # statistics for numeric columns
```

### Selecting Data

```python
# Select a single column (returns a Series)
print(df["salary"])

# Select multiple columns (returns a DataFrame)
print(df[["firstname", "salary"]])

# Select rows by condition
high_earners = df[df["salary"] > 70000]

# Multiple conditions
engineers = df[(df["department"] == "Engineering") & (df["salary"] > 70000)]

# Select by row index — iloc uses integer positions
print(df.iloc[0])       # first row
print(df.iloc[0:3])     # first three rows

# Select by label — loc uses index labels
print(df.loc[0, "salary"])
```

### Adding and Modifying Columns

```python
# New column from calculation
df["tax"] = df["salary"] * 0.2
df["net_salary"] = df["salary"] - df["tax"]

# Update values conditionally
df.loc[df["department"] == "Engineering", "salary"] = df["salary"] * 1.05
```

### Handling Missing Data

```python
print(df.isnull().sum())         # count nulls per column
df_clean = df.dropna()           # remove rows with any null
df_filled = df.fillna(0)         # replace nulls with 0
df["salary"] = df["salary"].fillna(df["salary"].mean())
```

### Grouping and Aggregation

```python
# Group by department, calculate mean salary
dept_summary = df.groupby("department")["salary"].mean()
print(dept_summary)

# Multiple aggregations
summary = df.groupby("department").agg(
    headcount=("firstname", "count"),
    avg_salary=("salary", "mean"),
    total_salary=("salary", "sum"),
)
print(summary)
```

### Sorting

```python
df_sorted = df.sort_values("salary", ascending=False)
df_sorted = df.sort_values(["department", "salary"], ascending=[True, False])
```

### Writing Data

```python
df.to_csv("output.csv", index=False)
df.to_json("output.json", orient="records", indent=2)
```

### Practice Exercises

* Load the `employees.csv` you created in Grade 5 into a DataFrame. Print its shape and column names.
* Filter the DataFrame to only show employees in `Engineering`.
* Add a `tax` column (20% of salary) and a `net_salary` column.
* Group by `department` and calculate the average and total salary per department.
* Sort by salary descending and write the result to a new CSV file.
