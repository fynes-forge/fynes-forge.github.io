---
sidebar_position: 4
---

# Configure SQL Server

This guide covers SQL Server Express (free local install) and Azure SQL (cloud hosted, free tier available).

## SQL Server Express (Local)

### Install SQL Server Express

1. Download SQL Server Express from [https://www.microsoft.com/en-us/sql-server/sql-server-downloads](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
2. Run the installer and choose the `Basic` installation type
3. Note the connection string shown at the end of the install — it will look like `localhost\SQLEXPRESS`
4. Optionally, download and install SSMS (SQL Server Management Studio) from [https://aka.ms/ssmsfullsetup](https://aka.ms/ssmsfullsetup) for a native UI — or continue with DBeaver

### Connect via DBeaver

1. Open DBeaver and click the `New Database Connection` button in the top left
2. Search for `SQL Server`, select it, and click `Next`
3. Fill in the connection fields:
   - `Host`: `localhost\SQLEXPRESS`
   - `Port`: `1433`
   - `Authentication`: `Windows Authentication` (simplest for local installs)
   - Alternatively, if you set up SQL Server Authentication during install, use those credentials instead
4. Click `Test Connection` — if prompted, download the JDBC driver
5. Click `Finish`

### Connect via SSMS (Optional)

1. Open SSMS
2. Set `Server type` to `Database Engine`
3. Set `Server name` to `localhost\SQLEXPRESS`
4. Set `Authentication` to `Windows Authentication`
5. Click `Connect`

## Azure SQL (Cloud)

1. Go to [https://portal.azure.com](https://portal.azure.com) and sign in — a free account is available at [https://azure.microsoft.com/free](https://azure.microsoft.com/free) and includes 12 months of Azure SQL
2. Click `Create a resource`, search for `SQL Database`, and click `Create`
3. Fill in the details:
   - `Resource group`: create new, name it `sql101-rg`
   - `Database name`: `SQL101`
   - `Server`: create a new server, set an admin login and password, and choose the nearest region
   - `Compute + storage`: select `Basic` tier
4. Under `Networking`, set `Add current client IP` to `Yes` so DBeaver can connect from your machine
5. Click `Review + Create`, then `Create` — provisioning takes around 2 minutes
6. Once deployed, go to the resource → `Connection strings` and note the individual fields:
   - `Server`: `yourserver.database.windows.net`
   - `Port`: `1433`
   - `Database`: `SQL101`
   - `Username` and `Password`: the credentials set during server creation
7. Open DBeaver and create a new `SQL Server` connection with these details — enable SSL if prompted
8. Click `Test Connection`, then `Finish`

## Creating the Database Schema

Now that the connection is established you can create the database schema found [here](https://github.com/Tom-Fynes/sql-101/blob/main/Resources/Create_Databases.sql). Run `USE SQL101` after creating the database to ensure schema objects are created in the right place. For Azure SQL, ensure the firewall rule includes your current IP — if you change networks you may need to update this in the Azure portal under `Networking`.

### Notes

* Named instance connection issues: ensure the SQL Server Browser service is running — open `Services` and start `SQL Server Browser`
* Port `1433` blocked: for local Express, enable TCP/IP in `SQL Server Configuration Manager` under `SQL Server Network Configuration`
* Azure firewall errors: go to the Azure portal → SQL Server resource → `Networking` → add your current IP to the firewall rules
* Windows Authentication not working in DBeaver on macOS or Linux: use SQL Server Authentication instead — mixed mode must be enabled during install or via SSMS afterwards
* Driver errors in DBeaver: try the `jTDS` driver option instead of the default Microsoft JDBC driver if connection issues persist

