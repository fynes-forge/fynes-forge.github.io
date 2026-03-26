---
id: intro
sidebar_position: 1
---
# Intro

The SQL 101 course is designed for someone aspiring to build a career as data engineer, analyst, or  a data scientist. This course covers fundamental SQL concepts, including querying, database design, and data manipulation. learning to extract insights and support data-driven decision-making.

By the end of the course, you will be writing complex queries, optimizing database performance, and using SQL to solve practical problems.

If you like this course and want to support the project, you can do so here:

[![Support me on Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/tomfynes)


## Recommened Programs

* [DBeaver Community](https://dbeaver.io/)
* [DuckDB](https://duckdb.org/)

You may also use any other database engine you feel comfortable with however the create database statement may need to be adjusted. It maybe also be that some functions are not in your chosen engine or are named differently.

## Setup

To participate please fork the [repo](https://github.com/Tom-Fynes/sql-101) and follow one of the setup documents. please save your queries [here](https://github.com/Tom-Fynes/sql-101/tree/main/Exercises). Also while going through the course if you find an issue or think of an improvement please log an issue [here](https://github.com/Tom-Fynes/sql-101/issues)

* [DuckDB](/docs/Getting%20Started/Duckdb)
* [SQL Server](/docs/Getting%20Started/SQL%20Server)
* [MySQL](/docs/Getting%20Started/MySql)
* [Postgres](/docs/Getting%20Started/Postgres)

## Grades

Grades have been added to help break your journy into helpful sections. Each section will cover different skill levels and will help you demonstrate your ability to other people.

### Grade 1: Introduction to SQL and Databases

* [**Overview of SQL**](/docs/Grade%201/01%20What%20is%20SQL): What is SQL and its importance.

* [**Relational Databases**](/docs/Grade%201/02%20Relational%20databases): Basic concepts of relational databases, tables, rows, and columns.
* [**Simple Queries**](/docs/Grade%201/03%20Simple%20queries): Using `SELECT` to retrieve data from a single table.
* [**Filtering Data**](/docs/Grade%201/04%20Filtering%20data): Using `WHERE` clause to filter results.

### Grade 2: Intermediate Data Retrieval

* [**Sorting Data**](/docs/Grade%202/01%20sorting%20data): Using `ORDER BY` to sort query results.

* [**Limiting Results**](/docs/Grade%202/02%20Limiting%20data): Using `LIMIT` (or `TOP` in some SQL dialects) to restrict the number of returned rows.
* [**Basic Functions**](/docs/Grade%202/03%20Basic%20functions): Introduction to SQL functions like `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`.
* [**Aliasing**](/docs/Grade%202/04%20Alias): Using `AS` to rename columns in the result set.

### Grade 3: Advanced Data Retrieval

* [**Joins**](/docs/Grade%203/01%20joins): Understanding and using different types of joins (`INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`).

* [**Aggregate Functions**](/docs/Grade%203/02%20Aggregation): Grouping data with `GROUP BY` and filtering groups with `HAVING`.
* [**Subqueries**](/docs/Grade%203/03%20subqueries): Writing and using subqueries in `SELECT`, `FROM`, `WHERE`, and `HAVING` clauses.
* [**Set Operations**](/docs/Grade%203/04%20Set%20operations): Using `UNION`, `INTERSECT`, and `EXCEPT`.

### Grade 4: Data Manipulation

* [**Inserting Data**](/docs/Grade%204/01%20Inserting%20data): Using `INSERT` to add new records to a table.

* [**Updating Data**](/docs/Grade%204/02%20Updateing%20data): Using `UPDATE` to modify existing records.
* [**Deleting Data**](/docs/Grade%204/03%20Deleting%20data): Using `DELETE` to remove records.

### Grade 5: Database Design and Data Definition

* [**Creating Tables**](/docs/Grade%205/01%20Create%20tables): Using `CREATE TABLE` to define new tables.

* [**Altering Tables**](/docs/Grade%205/02%20Altering%20tables): Using `ALTER TABLE` to modify existing tables (e.g., adding, dropping columns).
* [**Dropping Tables**](/docs/Grade%205/03%20Droping%20Tables): Using `DROP TABLE` to delete tables.
* [**Constraints**](/docs/Grade%205/04%20Constraints): Understanding and implementing primary keys, foreign keys, unique constraints, and check constraints.

### Grade 6: Advanced SQL Functions and Expressions

* [**String Functions**](/docs/Grade%206/01%20String%20functions): Using functions like `CONCAT`, `SUBSTRING`, `LENGTH`, `TRIM`, etc.

* [**Date and Time Functions**](/docs/Grade%206/02%20Date%20time): Using functions like `NOW`, `DATEADD`, `DATEDIFF`, `FORMAT`, etc.
* [**Mathematical Functions**](/docs/Grade%206/03%20Maths): Using functions like `ROUND`, `ABS`, `CEIL`, `FLOOR`, etc.
* [**Case Statements**](/docs/Grade%206/04%20Case): Using `CASE` for conditional logic within queries.

### Grade 7: Performance Tuning and Optimization

* [**Indexes**](/docs/Grade%207/01%20Indexes): Understanding the importance of indexes and how to create them.

* [**Query Optermization**](/docs/Grade%207/02%20Optermization): Tips and techniques for writing efficient queries.
* [**Execution Plans**](/docs/Grade%207/03%20Execution%20plans): Reading and interpreting execution plans to optimize query performance.
* [**Temporary Tables and CTEs**](/docs/Grade%207/04%20Temp%20tables%20and%20ctes): Using temporary tables and Common Table Expressions (CTEs) to simplify complex queries.

### Grade 8: Transactions and Security

* [**Transactions**](/docs/Grade%208/01%20Transactions): Using `BEGIN TRANSACTION`, `COMMIT`, and `ROLLBACK` to manage transactions.

* [**Locking and Concurrency**](/docs/Grade%208/02%20Locking%20concurrentct): Understanding locking mechanisms and how to handle concurrency.
* [**Windows Functions**](/docs/Grade%208/03%20Windows%20functions): Using `ROWNUMBER`, `RANK`, and `NTILE`.

### Grade 9: Extras

In this section we will cover technoligy specific topics such as reading CSVs in DuckDB and variable in SQL Server (TSQL).
