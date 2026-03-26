---
sidebar_position: 2
---

# Configure PostgreSQL

PostgreSQL is an open source relational database. This guide covers both a local install and a cloud hosted option using Supabase free tier.

## Local Install

### Install PostgreSQL

1. Download PostgreSQL from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
2. Run the installer for your operating system:

**Windows:**
1. Run the interactive installer
2. Leave the default port as `5432`
3. Set a password for the `postgres` superuser — note this down, you will need it shortly
4. When prompted about Stack Builder at the end, uncheck it and click `Finish`

**macOS:**
1. Open a terminal and run:
```bash
brew install postgresql@16
```
2. Start the service:
```bash
brew services start postgresql@16
```

### Connect via DBeaver

1. Install DBeaver Community from [https://dbeaver.io/download/](https://dbeaver.io/download/)
2. Open DBeaver and click the `New Database Connection` button in the top left (the plug icon with a `+`)
3. Search for `PostgreSQL`, select it, and click `Next`
4. Fill in the connection fields:
   - `Host`: `localhost`
   - `Port`: `5432`
   - `Database`: `postgres`
   - `Username`: `postgres`
   - `Password`: the password you set during install
5. Click `Test Connection` — if this is your first PostgreSQL connection, DBeaver will prompt you to download the PostgreSQL JDBC driver. Click `Download`
6. Once the test passes, click `Finish`
7. The new connection will appear in the `Database Navigator` on the left

## Cloud Hosted (Supabase Free Tier)

1. Go to [https://supabase.com](https://supabase.com) and sign up for a free account
2. Create a new project, give it a name (e.g. `SQL101`), set a strong database password, and choose the nearest region
3. Wait for the project to provision — this takes roughly 2 minutes
4. In the Supabase dashboard go to `Project Settings` → `Database`
5. Find the `Connection string` section and copy the `URI` value, or use the individual fields:
   - `Host`: shown under `Host`
   - `Port`: `5432`
   - `Database`: `postgres`
   - `Username`: `postgres`
   - `Password`: the password you set when creating the project
6. Open DBeaver and create a new `PostgreSQL` connection using these details
7. Click `Test Connection`, then `Finish`

## Creating the Database Schema

Now that the connection is established you can create the database schema found [here](https://github.com/Tom-Fynes/sql-101/blob/main/Resources/Create_Databases.sql). Run the script against your `postgres` database or a new database you have created for the course.

### Notes

* If `Test Connection` fails on a local install, check the PostgreSQL service is running:
  * **Windows**: open the `Services` app and look for `postgresql-x64-16` — start it if it is stopped
  * **macOS**: run `brew services list` and confirm `postgresql@16` shows as `started`
* If using Supabase, ensure your IP is not blocked — the free tier allows all IPs by default so this is rarely an issue
* Password errors: double check there are no trailing spaces copied into the `Password` field in DBeaver
* Port conflicts: if `5432` is already in use, the PostgreSQL installer lets you set an alternative port — update DBeaver to match

