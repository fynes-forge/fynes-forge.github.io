# Polars

### Introduction
Polars is a fast, modern DataFrame library written in Rust. It is designed as a high-performance alternative to Pandas, with a cleaner API, better memory efficiency, and significantly faster execution on large datasets. It is increasingly used in data engineering roles alongside or instead of Pandas.

Install it first:

```bash
pip install polars
# or with uv
uv add polars
```

### Importing

```python
import polars as pl
```

### Creating a DataFrame

```python
import polars as pl

df = pl.DataFrame({
    "firstname":  ["Alice", "Bob", "Charlie", "Diana"],
    "department": ["Engineering", "Finance", "Engineering", "HR"],
    "salary":     [80000, 65000, 75000, 55000],
})

print(df)
```

**Output**

```
shape: (4, 3)
┌───────────┬─────────────┬────────┐
│ firstname ┆ department  ┆ salary │
│ ---       ┆ ---         ┆ ---    │
│ str       ┆ str         ┆ i64    │
╞═══════════╪═════════════╪════════╡
│ Alice     ┆ Engineering ┆ 80000  │
│ Bob       ┆ Finance     ┆ 65000  │
│ Charlie   ┆ Engineering ┆ 75000  │
│ Diana     ┆ HR          ┆ 55000  │
└───────────┴─────────────┴────────┘
```

### Reading Data

```python
df = pl.read_csv("employees.csv")
df = pl.read_json("employees.json")
df = pl.read_parquet("employees.parquet")   # Polars shines with parquet

print(df.shape)
print(df.columns)
print(df.dtypes)
print(df.head())
print(df.describe())
```

### Selecting and Filtering

Polars uses an **expression-based API** — operations are built up as expressions and executed together, which is why it is so fast.

```python
# Select columns
df.select(["firstname", "salary"])

# Filter rows
df.filter(pl.col("salary") > 70000)

# Multiple conditions
df.filter(
    (pl.col("department") == "Engineering") & (pl.col("salary") > 70000)
)

# Select and filter together
df.select(["firstname", "salary"]).filter(pl.col("salary") > 70000)
```

### Adding and Transforming Columns

```python
# with_columns adds or replaces columns
df = df.with_columns([
    (pl.col("salary") * 0.2).alias("tax"),
    (pl.col("salary") * 0.8).alias("net_salary"),
])

# Rename
df = df.rename({"firstname": "first_name"})

# Cast a column type
df = df.with_columns(pl.col("salary").cast(pl.Float64))
```

### Grouping and Aggregation

```python
summary = df.group_by("department").agg([
    pl.col("firstname").count().alias("headcount"),
    pl.col("salary").mean().alias("avg_salary"),
    pl.col("salary").sum().alias("total_salary"),
])

print(summary)
```

### Sorting

```python
df.sort("salary", descending=True)
df.sort(["department", "salary"], descending=[False, True])
```

### Lazy Evaluation

Polars has a lazy API that optimises your entire query before running it — similar to how a SQL engine works. This is where its performance advantage is most pronounced.

```python
result = (
    pl.scan_csv("employees.csv")       # lazy — nothing runs yet
    .filter(pl.col("salary") > 60000)
    .group_by("department")
    .agg(pl.col("salary").mean().alias("avg_salary"))
    .sort("avg_salary", descending=True)
    .collect()                          # executes the whole plan here
)

print(result)
```

### Writing Data

```python
df.write_csv("output.csv")
df.write_json("output.json")
df.write_parquet("output.parquet")
```

### Polars vs Pandas

| | Pandas | Polars |
|-|--------|--------|
| Speed on large data | Moderate | Much faster |
| Memory usage | Higher | Lower |
| API style | Index-based | Expression-based |
| Lazy execution | ❌ | ✅ |
| Null handling | `NaN` (inconsistent) | `null` (consistent) |
| Maturity | Very mature | Growing fast |

> **Which should you use?** Pandas is more established and better supported by older tooling. Polars is the better choice for new projects, especially those dealing with large files or performance-sensitive pipelines. It is worth knowing both.

### Practice Exercises

* Load the same `employees.csv` you used in the Pandas lesson into a Polars DataFrame. Print its shape and column names.
* Filter to only `Engineering` employees earning more than `70000`.
* Add `tax` and `net_salary` columns using `with_columns`.
* Group by `department`, returning headcount and average salary.
* Write a lazy query using `scan_csv` that filters, groups, and sorts — then collect and print the result.
