---
slug: dimensional-modeling-basics
title: Dimensional Modeling 101 - Design Better Data Warehouses
authors: [tomfynes]
date: 2025-09-24
tags: [data-modeling, sql]
---

# Dimensional Modeling 101: Design Better Data Warehouses

If you're building a data warehouse, dimensional modeling is your best friend. It makes data easier to query, understand, and analyze. Let's break down this powerful technique!

## What is Dimensional Modeling?

Dimensional modeling is a design technique optimized for data retrieval and analytics. Unlike transactional databases (OLTP) which are optimized for writes, dimensional models (OLAP) are built for blazing-fast reads and intuitive queries.

Think of it as organizing your data warehouse like a well-structured library, where finding what you need is quick and intuitive.

<!--truncate-->

## The Two Key Components

**Fact Tables**: Contain measurements, metrics, or facts about your business (sales, clicks, transactions)

**Dimension Tables**: Contain descriptive attributes about the facts (who, what, when, where, why)

## Star Schema: The Foundation

The most common dimensional model is the star schema. It looks like this:

```
        Dim_Date
           |
           |
Dim_Product --- Fact_Sales --- Dim_Customer
           |
           |
        Dim_Store
```

One central fact table surrounded by dimension tables - like a star!

## Let's Build an Example: E-Commerce Sales

Here's a practical example of dimensional modeling for an e-commerce business:

```sql
-- Fact Table: Contains the measurements
CREATE TABLE fact_sales (
    sale_id BIGSERIAL PRIMARY KEY,
    date_key INTEGER NOT NULL,
    product_key INTEGER NOT NULL,
    customer_key INTEGER NOT NULL,
    store_key INTEGER NOT NULL,
    
    -- Measurements (facts)
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    cost_amount DECIMAL(10,2) NOT NULL,
    profit_amount DECIMAL(10,2) NOT NULL,
    
    -- Foreign keys to dimensions
    FOREIGN KEY (date_key) REFERENCES dim_date(date_key),
    FOREIGN KEY (product_key) REFERENCES dim_product(product_key),
    FOREIGN KEY (customer_key) REFERENCES dim_customer(customer_key),
    FOREIGN KEY (store_key) REFERENCES dim_store(store_key)
);

-- Dimension Table: Date
CREATE TABLE dim_date (
    date_key INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    day_of_week VARCHAR(10),
    day_of_month INTEGER,
    day_of_year INTEGER,
    week_of_year INTEGER,
    month INTEGER,
    month_name VARCHAR(10),
    quarter INTEGER,
    year INTEGER,
    is_weekend BOOLEAN,
    is_holiday BOOLEAN,
    holiday_name VARCHAR(50)
);

-- Dimension Table: Product
CREATE TABLE dim_product (
    product_key SERIAL PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL, -- Business key
    product_name VARCHAR(200) NOT NULL,
    brand VARCHAR(100),
    category VARCHAR(100),
    subcategory VARCHAR(100),
    unit_cost DECIMAL(10,2),
    supplier_name VARCHAR(100),
    
    -- SCD Type 2 fields (we'll explain this later)
    effective_date DATE NOT NULL,
    expiration_date DATE,
    is_current BOOLEAN DEFAULT TRUE,
    
    UNIQUE(product_id, effective_date)
);

-- Dimension Table: Customer
CREATE TABLE dim_customer (
    customer_key SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(200),
    email VARCHAR(100),
    customer_segment VARCHAR(50),
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(50),
    signup_date DATE,
    
    effective_date DATE NOT NULL,
    expiration_date DATE,
    is_current BOOLEAN DEFAULT TRUE
);

-- Dimension Table: Store
CREATE TABLE dim_store (
    store_key SERIAL PRIMARY KEY,
    store_id VARCHAR(50) NOT NULL,
    store_name VARCHAR(100),
    store_type VARCHAR(50),
    address VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(50),
    region VARCHAR(50),
    manager_name VARCHAR(100),
    opening_date DATE
);
```

## Querying is Beautiful

With this model, complex analytics become simple:

```sql
-- Total sales by product category and month
SELECT 
    p.category,
    d.year,
    d.month_name,
    SUM(f.total_amount) as total_sales,
    SUM(f.profit_amount) as total_profit,
    COUNT(DISTINCT f.customer_key) as unique_customers
FROM fact_sales f
JOIN dim_product p ON f.product_key = p.product_key
JOIN dim_date d ON f.date_key = d.date_key
WHERE d.year = 2024
  AND p.is_current = TRUE
GROUP BY p.category, d.year, d.month_name
ORDER BY total_sales DESC;

-- Customer segmentation analysis
SELECT 
    c.customer_segment,
    c.country,
    COUNT(DISTINCT f.customer_key) as customer_count,
    AVG(f.total_amount) as avg_order_value,
    SUM(f.quantity) as total_items_sold
FROM fact_sales f
JOIN dim_customer c ON f.customer_key = c.customer_key
JOIN dim_date d ON f.date_key = d.date_key
WHERE d.date >= CURRENT_DATE - INTERVAL '90 days'
  AND c.is_current = TRUE
GROUP BY c.customer_segment, c.country;
```

Notice how easy these queries are to read and write!

## Slowly Changing Dimensions (SCD)

What happens when a customer moves to a new city? Or a product's price changes? We need to track history!

### Type 1: Overwrite (No History)

Simply update the record - easiest but loses history:

```sql
UPDATE dim_customer
SET city = 'New York', state = 'NY'
WHERE customer_id = 'C12345' AND is_current = TRUE;
```

### Type 2: Add New Row (Full History)

Most common approach - create a new record:

```python
def update_customer_scd_type2(customer_id, new_city, new_state):
    """Handle SCD Type 2 update for customer dimension"""
    
    # Expire the old record
    cursor.execute("""
        UPDATE dim_customer
        SET expiration_date = CURRENT_DATE,
            is_current = FALSE
        WHERE customer_id = %s AND is_current = TRUE
    """, (customer_id,))
    
    # Insert new record
    cursor.execute("""
        INSERT INTO dim_customer 
        (customer_id, customer_name, city, state, 
         effective_date, is_current)
        SELECT 
            customer_id, customer_name, %s, %s,
            CURRENT_DATE, TRUE
        FROM dim_customer
        WHERE customer_id = %s AND expiration_date = CURRENT_DATE
    """, (new_city, new_state, customer_id))
```

Now you can analyze sales with historical customer locations!

### Type 3: Add New Column (Limited History)

Track just current and previous values:

```sql
ALTER TABLE dim_customer
ADD COLUMN previous_city VARCHAR(100),
ADD COLUMN previous_state VARCHAR(50),
ADD COLUMN city_change_date DATE;

UPDATE dim_customer
SET previous_city = city,
    previous_state = state,
    city = 'New York',
    state = 'NY',
    city_change_date = CURRENT_DATE
WHERE customer_id = 'C12345';
```

## Date Dimension: The Workhorse

The date dimension deserves special attention. Here's how to populate it:

```python
import pandas as pd
from datetime import datetime, timedelta

def generate_date_dimension(start_date, end_date):
    """Generate a complete date dimension table"""
    
    dates = pd.date_range(start=start_date, end=end_date, freq='D')
    
    date_dim = pd.DataFrame({
        'date_key': dates.strftime('%Y%m%d').astype(int),
        'date': dates,
        'day_of_week': dates.day_name(),
        'day_of_month': dates.day,
        'day_of_year': dates.dayofyear,
        'week_of_year': dates.isocalendar().week,
        'month': dates.month,
        'month_name': dates.month_name(),
        'quarter': dates.quarter,
        'year': dates.year,
        'is_weekend': dates.dayofweek.isin([5, 6])
    })
    
    # Add holiday logic (simplified)
    holidays = ['2024-01-01', '2024-07-04', '2024-12-25']
    date_dim['is_holiday'] = date_dim['date'].astype(str).isin(holidays)
    
    return date_dim

# Generate 5 years of dates
date_dim = generate_date_dimension('2020-01-01', '2024-12-31')
date_dim.to_sql('dim_date', engine, if_exists='replace', index=False)
```

## Fact Tables: Additive vs. Non-Additive

**Additive Facts**: Can be summed across all dimensions (quantity, amount)

```sql
-- This makes sense
SELECT SUM(total_amount) FROM fact_sales;
```

**Semi-Additive**: Can be summed across some dimensions (inventory levels)

```sql
-- Summing inventory across time doesn't make sense
-- But summing across products does
SELECT product_key, SUM(units_in_stock)
FROM fact_inventory
WHERE date_key = 20240115
GROUP BY product_key;
```

**Non-Additive**: Can't be summed (ratios, percentages)

```sql
-- Don't sum percentages or ratios!
-- Instead, recalculate them
SELECT 
    category,
    SUM(total_amount) / SUM(quantity) as avg_price
FROM fact_sales
GROUP BY category;
```

## Best Practices

**Use surrogate keys**: Integer keys (product_key) instead of natural keys (product_id) for better performance

**Denormalize dimensions**: Include redundant data to avoid joins within dimensions

```sql
-- Good: Denormalized
dim_product: product_id, name, category, subcategory, brand

-- Avoid: Normalized (requires joins)
dim_product: product_id, name, category_id
dim_category: category_id, category_name, subcategory_id
```

**Keep fact tables narrow**: Only include true measurements

**Pre-calculate when possible**: Add calculated fields to facts

```sql
-- Add derived facts at load time
profit_amount = total_amount - cost_amount
profit_margin = profit_amount / total_amount
```

## Snowflake Schema: When to Use It

Sometimes you'll hear about snowflake schemas - these are normalized dimensional models:

```
              Dim_Category
                   |
Dim_Date --- Fact_Sales --- Dim_Product --- Dim_Brand
                   |
              Dim_Customer --- Dim_Segment
```

Use snowflake schemas only when:
- Storage is extremely expensive (rare nowadays)
- Dimension tables are massive
- You need to enforce referential integrity

For most use cases, stick with star schemas!

## Tools to Help

- [dbt](https://www.getdbt.com/) - Build dimensional models with SQL
- [Apache Superset](https://superset.apache.org/) - Visualize your star schema
- [Kimball's Toolkit](https://www.kimballgroup.com/) - The bible of dimensional modeling

## Wrapping Up

Dimensional modeling makes your data warehouse intuitive and performant. Start with a simple star schema, use surrogate keys, and let your fact and dimension tables do the heavy lifting.

Your analysts will thank you for the simple, fast queries!