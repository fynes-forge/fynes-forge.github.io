---
sidebar_position: 5
---

# Configure Snowflake

Snowflake is a cloud-based data warehouse. This guide uses the Snowflake free trial which lasts 30 days and requires no credit card.

## Create a Free Trial Account

1. Go to [https://signup.snowflake.com](https://signup.snowflake.com) and fill in your details
2. Choose the cloud provider and region closest to you — any provider works for this course, AWS is a safe default
3. Select the `Standard` edition — this is sufficient for SQL 101
4. Check your email and activate the account
5. On first login you will land in the Snowflake web UI called `Snowsight`
6. Note your account identifier from the browser URL — it looks like `https://app.snowflake.com/yourregion/youraccountid/`. You will need `youraccountid` for the DBeaver connection

## Connect via DBeaver

1. Open DBeaver and click the `New Database Connection` button in the top left
2. Search for `Snowflake`, select it, and click `Next`
3. Fill in the connection fields:
   - `Host`: `youraccountid.snowflakecomputing.com` (replace `youraccountid` with your actual account identifier)
   - `Port`: `443`
   - `Database`: leave blank for now
   - `Warehouse`: `COMPUTE_WH` (the default warehouse on the free trial)
   - `Username`: your Snowflake login email
   - `Password`: your Snowflake password
4. Click `Test Connection` — if prompted, download the Snowflake JDBC driver
5. Click `Finish`
6. The Snowflake connection will appear in the `Database Navigator` on the left

## Creating the Database Schema

Now that the connection is established you can create the database schema found [here](https://github.com/Tom-Fynes/sql-101/blob/main/Resources/Create_Databases.sql). Before running the schema, make sure a warehouse is active and you have the right role:

1. Ensure `COMPUTE_WH` is running. In `Snowsight` go to `Admin` → `Warehouses` and confirm it is resumed. Or run:
```sql
ALTER WAREHOUSE COMPUTE_WH RESUME;
```
2. Run the following before executing the schema script to ensure sufficient privileges:
```sql
USE ROLE SYSADMIN;
```
3. After the schema is created, run the following before running course queries:
```sql
USE DATABASE SQL101;
```

### Notes

* Account identifier format: some older Snowflake accounts use `orgname-accountname` format — check under `Admin` → `Accounts` in `Snowsight` if unsure
* Warehouse suspended: free trial warehouses auto-suspend after inactivity — resume with `ALTER WAREHOUSE COMPUTE_WH RESUME;`
* Trial expiry: the free trial lasts 30 days — export any work before it expires. The course content can be completed well within the trial period
* DBeaver driver error: if the Snowflake driver fails to auto-download, manually download the JDBC driver from [https://docs.snowflake.com/en/user-guide/jdbc-download](https://docs.snowflake.com/en/user-guide/jdbc-download) and add it via `Driver Manager` in DBeaver
* Role permissions: if schema creation fails, ensure you are using the `SYSADMIN` role — run `USE ROLE SYSADMIN;` before the schema script
