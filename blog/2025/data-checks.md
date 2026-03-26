---
slug: data-quality-validation
title: Data Quality Validation - Ensuring Your Data is Trustworthy
authors: [tomfynes]
date: 2025-09-02
tags: [data-engineering, python]
---

# Data Quality Validation: Ensuring Your Data is Trustworthy

Bad data leads to bad decisions. As data engineers, one of our most important jobs is ensuring data quality. Let's explore how to validate and maintain high-quality data!

## Why Data Quality Matters

Imagine your CEO making a million-dollar decision based on a dashboard... that's pulling from corrupted data. Scary, right? Data quality isn't just a nice-to-have - it's essential for:

- Accurate analytics and reporting
- Reliable machine learning models
- Regulatory compliance
- Customer trust

<!--truncate-->

## The Six Dimensions of Data Quality

When we talk about data quality, we're really talking about six key dimensions:

**Accuracy**: Is the data correct?  
**Completeness**: Are we missing any data?  
**Consistency**: Does data match across systems?  
**Timeliness**: Is the data up-to-date?  
**Validity**: Does data follow the rules?  
**Uniqueness**: Are there duplicates?

## Building Quality Checks with Python

Let's build a data quality framework using pandas and Great Expectations:

```python
import pandas as pd
from datetime import datetime, timedelta

class DataQualityChecker:
    """A simple data quality validation framework"""
    
    def __init__(self, df):
        self.df = df
        self.issues = []
    
    def check_completeness(self, columns, threshold=0.95):
        """Check if columns have sufficient non-null values"""
        for col in columns:
            non_null_pct = self.df[col].notna().sum() / len(self.df)
            if non_null_pct < threshold:
                self.issues.append({
                    'check': 'completeness',
                    'column': col,
                    'message': f'{col} is only {non_null_pct:.1%} complete'
                })
        return self
    
    def check_uniqueness(self, columns):
        """Check for duplicate values"""
        for col in columns:
            duplicates = self.df[col].duplicated().sum()
            if duplicates > 0:
                self.issues.append({
                    'check': 'uniqueness',
                    'column': col,
                    'message': f'{col} has {duplicates} duplicates'
                })
        return self
    
    def check_range(self, column, min_val, max_val):
        """Check if values are within expected range"""
        out_of_range = self.df[
            (self.df[column] < min_val) | 
            (self.df[column] > max_val)
        ]
        if len(out_of_range) > 0:
            self.issues.append({
                'check': 'range',
                'column': column,
                'message': f'{len(out_of_range)} values outside range [{min_val}, {max_val}]'
            })
        return self
    
    def check_freshness(self, timestamp_col, max_age_hours=24):
        """Check if data is recent enough"""
        self.df[timestamp_col] = pd.to_datetime(self.df[timestamp_col])
        oldest = self.df[timestamp_col].min()
        age_hours = (datetime.now() - oldest).total_seconds() / 3600
        
        if age_hours > max_age_hours:
            self.issues.append({
                'check': 'freshness',
                'column': timestamp_col,
                'message': f'Data is {age_hours:.1f} hours old (limit: {max_age_hours}h)'
            })
        return self
    
    def check_pattern(self, column, pattern, description):
        """Check if values match a regex pattern"""
        import re
        invalid = self.df[~self.df[column].astype(str).str.match(pattern)]
        if len(invalid) > 0:
            self.issues.append({
                'check': 'pattern',
                'column': column,
                'message': f'{len(invalid)} values don\'t match {description}'
            })
        return self
    
    def get_report(self):
        """Generate a quality report"""
        if not self.issues:
            return "✅ All quality checks passed!"
        
        report = f"❌ Found {len(self.issues)} data quality issues:\n\n"
        for issue in self.issues:
            report += f"- [{issue['check']}] {issue['column']}: {issue['message']}\n"
        return report

# Example usage
df = pd.read_csv('customer_data.csv')

quality_report = (
    DataQualityChecker(df)
    .check_completeness(['email', 'name', 'phone'])
    .check_uniqueness(['customer_id', 'email'])
    .check_range('age', min_val=0, max_val=120)
    .check_pattern('email', r'^[\w\.-]+@[\w\.-]+\.\w+$', 'email format')
    .check_freshness('created_at', max_age_hours=48)
    .get_report()
)

print(quality_report)
```

## Using Great Expectations

For production systems, Great Expectations is the industry standard:

```python
import great_expectations as gx

# Initialize context
context = gx.get_context()

# Create expectation suite
suite = context.add_expectation_suite("customer_data_suite")

# Add expectations
validator = context.sources.pandas_default.read_csv('customer_data.csv')

# Expect columns to exist
validator.expect_table_columns_to_match_ordered_list([
    'customer_id', 'name', 'email', 'age', 'created_at'
])

# Expect no nulls in critical columns
validator.expect_column_values_to_not_be_null('customer_id')
validator.expect_column_values_to_not_be_null('email')

# Expect unique values
validator.expect_column_values_to_be_unique('customer_id')
validator.expect_column_values_to_be_unique('email')

# Expect values in range
validator.expect_column_values_to_be_between(
    'age', 
    min_value=0, 
    max_value=120
)

# Expect specific format
validator.expect_column_values_to_match_regex(
    'email',
    regex=r'^[\w\.-]+@[\w\.-]+\.\w+$'
)

# Run validation
results = validator.validate()

if results.success:
    print("✅ All expectations met!")
else:
    print("❌ Validation failed:")
    for result in results.results:
        if not result.success:
            print(f" - {result.expectation_config.expectation_type}")
```

## SQL-Based Quality Checks

For data in databases, SQL checks are often simpler:

```sql
-- Check for completeness
SELECT 
    COUNT(*) as total_rows,
    COUNT(customer_id) as non_null_customer_ids,
    COUNT(email) as non_null_emails,
    (COUNT(email) * 100.0 / COUNT(*)) as email_completeness_pct
FROM customers;

-- Check for duplicates
SELECT 
    email, 
    COUNT(*) as count
FROM customers
GROUP BY email
HAVING COUNT(*) > 1;

-- Check for outliers
SELECT 
    MIN(age) as min_age,
    MAX(age) as max_age,
    AVG(age) as avg_age,
    PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY age) as p99_age
FROM customers
WHERE age NOT BETWEEN 0 AND 120;

-- Check for freshness
SELECT 
    MAX(created_at) as latest_record,
    EXTRACT(EPOCH FROM (NOW() - MAX(created_at))) / 3600 as hours_since_last
FROM customers;

-- Check referential integrity
SELECT COUNT(*)
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;
```

## Integrating Quality Checks into Pipelines

Here's how to add quality checks to your Airflow DAG:

```python
from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.bash import BashOperator

def validate_data(**context):
    """Run data quality checks"""
    df = pd.read_csv('/data/latest.csv')
    
    checker = DataQualityChecker(df)
    checker.check_completeness(['id', 'email'])
    checker.check_uniqueness(['id'])
    
    if checker.issues:
        # Push issues to XCom
        context['ti'].xcom_push(key='quality_issues', value=checker.issues)
        return 'send_alert' # Branch to alert task
    else:
        return 'load_to_warehouse' # Continue pipeline

with DAG('etl_with_quality_checks', ...) as dag:
    
    extract = PythonOperator(
        task_id='extract_data',
        python_callable=extract_data
    )
    
    validate = BranchPythonOperator(
        task_id='validate_data',
        python_callable=validate_data
    )
    
    load = PythonOperator(
        task_id='load_to_warehouse',
        python_callable=load_data
    )
    
    alert = PythonOperator(
        task_id='send_alert',
        python_callable=send_quality_alert
    )
    
    extract >> validate >> [load, alert]
```

## Monitoring Data Quality Over Time

Track quality metrics to spot trends:

```python
import matplotlib.pyplot as plt

def track_quality_metrics(df, timestamp_col):
    """Track quality metrics over time"""
    df[timestamp_col] = pd.to_datetime(df[timestamp_col])
    df['date'] = df[timestamp_col].dt.date
    
    # Calculate daily metrics
    daily_metrics = df.groupby('date').agg({
        'customer_id': 'count',
        'email': lambda x: x.notna().sum() / len(x), # Completeness
        'age': lambda x: ((x >= 0) & (x <= 120)).sum() / len(x) # Validity
    }).rename(columns={
        'customer_id': 'record_count',
        'email': 'email_completeness',
        'age': 'age_validity'
    })
    
    return daily_metrics

# Visualize trends
metrics = track_quality_metrics(df, 'created_at')
metrics[['email_completeness', 'age_validity']].plot(
    title='Data Quality Trends',
    ylabel='Quality Score',
    ylim=[0, 1]
)
plt.show()
```

## Best Practices

**Start with critical fields**: Focus on the data that matters most for your business

**Automate everything**: Quality checks should run automatically with every pipeline

**Set SLAs**: Define acceptable thresholds (e.g., "99% completeness on email field")

**Alert strategically**: Don't cry wolf - alert only on actionable issues

**Document expectations**: Make it clear what "good data" looks like

```python
# Example: Document expectations
QUALITY_RULES = {
    'customer_id': {
        'nullable': False,
        'unique': True,
        'type': 'integer'
    },
    'email': {
        'nullable': False,
        'unique': True,
        'pattern': r'^[\w\.-]+@[\w\.-]+\.\w+$',
        'min_length': 5
    },
    'age': {
        'nullable': True,
        'min_value': 0,
        'max_value': 120,
        'type': 'integer'
    }
}
```

## Resources

- [Great Expectations Documentation](https://docs.greatexpectations.io/)
- [dbt Testing](https://docs.getdbt.com/docs/build/tests)
- [Soda Core](https://www.soda.io/core) - Open source data quality tool
- [Apache Griffin](https://griffin.apache.org/) - Data quality solution

## Wrapping Up

Data quality is not a one-time task - it's an ongoing commitment. Build quality checks into your pipelines from day one, and you'll save yourself countless headaches down the road.
