---
slug: apache-airflow-getting-started
title: Getting Started with Apache Airflow - Orchestrate Your Data Pipelines
authors: [tomfynes]
date: 2025-08-19
tags: [data-engineering]
---

# Getting Started with Apache Airflow: Orchestrate Your Data Pipelines

Apache Airflow has become the go-to tool for orchestrating data workflows. If you've ever needed to run tasks in a specific order, on a schedule, with dependencies - Airflow is your friend!

## What is Apache Airflow?

Airflow is a platform to programmatically author, schedule, and monitor workflows. Think of it as a smart scheduler that can:

- Run tasks in the right order
- Retry failed tasks automatically
- Send alerts when things go wrong
- Provide a beautiful UI to monitor everything

<!--truncate-->

## Core Concepts

Before we dive in, let's understand the key concepts:

**DAG (Directed Acyclic Graph)**: Your workflow definition. It's a collection of tasks with dependencies.

**Task**: A single unit of work (run a Python function, execute SQL, etc.)

**Operator**: Defines what a task does (PythonOperator, BashOperator, etc.)

**Schedule**: When your DAG runs (daily, hourly, custom cron)

## Installation

Let's get Airflow running locally:

```bash
# Install Airflow (use a virtual environment!)
pip install apache-airflow

# Initialize the database
airflow db init

# Create an admin user
airflow users create \
    --username admin \
    --firstname Admin \
    --lastname User \
    --role Admin \
    --email admin@example.com

# Start the web server (default port 8080)
airflow webserver --port 8080

# In another terminal, start the scheduler
airflow scheduler
```

Visit `http://localhost:8080` and log in with your credentials!

## Your First DAG

Let's create a simple ETL pipeline. Create a file in `~/airflow/dags/my_first_dag.py`:

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator

# Default arguments for all tasks
default_args = {
    'owner': 'data_team',
    'depends_on_past': False,
    'email': ['alerts@example.com'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

# Define the DAG
dag = DAG(
    'simple_etl_pipeline',
    default_args=default_args,
    description='A simple ETL pipeline',
    schedule_interval='0 0 * * *', # Run daily at midnight
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['etl', 'example'],
)

# Task 1: Extract data
def extract_data(**context):
    """Simulate extracting data from a source"""
    print("Extracting data from source...")
    data = {'users': 1000, 'revenue': 50000}
    
    # Push data to XCom for other tasks
    context['ti'].xcom_push(key='extracted_data', value=data)
    print(f"Extracted: {data}")

extract_task = PythonOperator(
    task_id='extract_data',
    python_callable=extract_data,
    dag=dag,
)

# Task 2: Transform data
def transform_data(**context):
    """Transform the extracted data"""
    print("Transforming data...")
    
    # Pull data from previous task
    ti = context['ti']
    data = ti.xcom_pull(key='extracted_data', task_ids='extract_data')
    
    # Transform
    transformed = {
        'total_users': data['users'],
        'avg_revenue_per_user': data['revenue'] / data['users']
    }
    
    ti.xcom_push(key='transformed_data', value=transformed)
    print(f"Transformed: {transformed}")

transform_task = PythonOperator(
    task_id='transform_data',
    python_callable=transform_data,
    dag=dag,
)

# Task 3: Load data
def load_data(**context):
    """Load transformed data to destination"""
    print("Loading data to warehouse...")
    
    ti = context['ti']
    data = ti.xcom_pull(key='transformed_data', task_ids='transform_data')
    
    # Simulate loading to database
    print(f"Loaded to warehouse: {data}")
    print("Pipeline completed successfully!")

load_task = PythonOperator(
    task_id='load_data',
    python_callable=load_data,
    dag=dag,
)

# Task 4: Send notification
notify_task = BashOperator(
    task_id='send_notification',
    bash_command='echo "ETL pipeline completed at $(date)"',
    dag=dag,
)

# Set dependencies
extract_task >> transform_task >> load_task >> notify_task
```

## Understanding the Flow

The `>>` operator sets up dependencies. Our pipeline flows like this:

```
extract_data → transform_data → load_data → send_notification
```

Each task waits for the previous one to succeed before running.

## Working with Different Operators

Airflow has many built-in operators. Here are some common ones:

```python
from airflow.providers.postgres.operators.postgres import PostgresOperator
from airflow.providers.http.operators.http import SimpleHttpOperator
from airflow.providers.amazon.aws.operators.s3 import S3CreateBucketOperator

# Execute SQL
sql_task = PostgresOperator(
    task_id='run_query',
    postgres_conn_id='my_postgres',
    sql="""
        INSERT INTO daily_stats (date, revenue)
        SELECT CURRENT_DATE, SUM(amount)
        FROM transactions
        WHERE date = CURRENT_DATE;
    """,
    dag=dag,
)

# Call an API
api_task = SimpleHttpOperator(
    task_id='call_api',
    http_conn_id='my_api',
    endpoint='/api/v1/trigger',
    method='POST',
    data=json.dumps({'status': 'completed'}),
    headers={"Content-Type": "application/json"},
    dag=dag,
)
```

## Dynamic Task Generation

Need to create tasks dynamically? Here's how:

```python
from airflow.models import Variable

# Get list of tables from Airflow Variables
tables = Variable.get("tables_to_process", deserialize_json=True)

for table in tables:
    task = PythonOperator(
        task_id=f'process_{table}',
        python_callable=process_table,
        op_kwargs={'table_name': table},
        dag=dag,
    )
```

## Scheduling Options

Airflow supports various schedule intervals:

```python
# Cron expressions
'0 0 * * *' # Daily at midnight
'0 */4 * * *' # Every 4 hours
'0 0 * * 1' # Every Monday
'*/15 * * * *' # Every 15 minutes

# Airflow presets
'@daily' # Once a day at midnight
'@hourly' # Top of every hour
'@weekly' # Once a week on Sunday
'@monthly' # First day of the month

# Timedelta
schedule_interval=timedelta(hours=2) # Every 2 hours
```

## Best Practices

**Keep DAGs simple**: Each DAG should have a single responsibility

**Use Variables and Connections**: Store credentials and config in Airflow's UI, not in code

```python
from airflow.models import Variable

api_key = Variable.get("api_key")
db_conn = BaseHook.get_connection('my_database')
```

**Implement idempotency**: Your tasks should produce the same result if run multiple times

```python
def idempotent_insert(**context):
    execution_date = context['ds'] # 2024-01-15
    
    # Delete existing data for this date first
    delete_query = f"DELETE FROM daily_stats WHERE date = '{execution_date}'"
    # Then insert fresh data
    insert_query = f"INSERT INTO daily_stats ..."
```

**Monitor and alert**: Use callbacks for notifications

```python
def on_failure_callback(context):
    """Send Slack notification on failure"""
    # Your notification logic here
    pass

dag = DAG(
    'my_dag',
    on_failure_callback=on_failure_callback,
    ...
)
```

## Debugging Tips

Check the logs in the UI - they're incredibly helpful!

Test tasks individually:

```bash
# Test a specific task
airflow tasks test simple_etl_pipeline extract_data 2024-01-15

# List all tasks in a DAG
airflow tasks list simple_etl_pipeline

# Show DAG structure
airflow dags show simple_etl_pipeline
```

## Resources

- [Official Airflow Documentation](https://airflow.apache.org/docs/)
- [Astronomer Registry](https://registry.astronomer.io/) - Pre-built operators
- [Awesome Apache Airflow](https://github.com/jghoman/awesome-apache-airflow)

## Next Steps

Now that you've got the basics:

1. Try the tutorial DAGs that come with Airflow
2. Connect to a real database using Connections
3. Explore the Taskflow API for cleaner code
4. Set up monitoring and alerting

Airflow is powerful once you get the hang of it. Start simple, and gradually add complexity as you need it!