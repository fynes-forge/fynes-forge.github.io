---
sidebar_position: 3
---

# Configure MySQL

MySQL is one of the most widely used open source relational databases. This guide covers both a local install and a cloud hosted option using PlanetScale free tier.

## Local Install

### Install MySQL

1. Download MySQL Community Server from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Run the installer for your operating system:

**Windows:**
1. Run MySQL Installer and choose `Developer Default` as the setup type
2. Set a root password during the configuration step — note this down
3. Leave the default port as `3306`

**macOS:**
1. Open a terminal and run:
```bash
brew install mysql
```
2. Start the service:
```bash
brew services start mysql
```
3. Secure the installation and set a root password:
```bash
mysql_secure_installation
```

### Connect via DBeaver

1. Open DBeaver and click the `New Database Connection` button in the top left
2. Search for `MySQL`, select it, and click `Next`
3. Fill in the connection fields:
   - `Host`: `localhost`
   - `Port`: `3306`
   - `Database`: leave blank for now
   - `Username`: `root`
   - `Password`: the root password you set during install
4. Click `Test Connection` — if prompted, download the MySQL JDBC driver
5. Click `Finish`

## Cloud Hosted (PlanetScale Free Tier)

1. Go to [https://planetscale.com](https://planetscale.com) and sign up for a free account
2. Create a new database, name it `sql101`, and select the nearest region
3. Once created, go to `Connect` → `Connect with` → choose `General`
4. Copy the connection details shown in the dialog:
   - `Host`, `Username`, and `Password` are displayed in the connect dialog
   - `Port`: `3306`
5. SSL is required on PlanetScale — in DBeaver open the `SSL` tab and enable `Use SSL` and `Require SSL`
6. Open DBeaver and create a new `MySQL` connection with these details
7. Click `Test Connection`, then `Finish`

## Creating the Database Schema

Now that the connection is established you can create the database schema found [here](https://github.com/Tom-Fynes/sql-101/blob/main/Resources/Create_Databases.sql). MySQL requires a database to exist before running the schema. If you do not already have one, run:

```sql
CREATE DATABASE SQL101;
USE SQL101;
```

Then run the schema script.

### Notes

* If the connection is refused on a local install, check MySQL is running:
  * **Windows**: open the `Services` app and look for `MySQL80` — start it if it is stopped
  * **macOS**: run `brew services list` and confirm `mysql` shows as `started`
* PlanetScale requires SSL — if DBeaver shows an SSL error, double check the `SSL` tab has `Use SSL` enabled
* Root login may be restricted on some macOS installs — if you cannot connect as `root`, create a new user:
```sql
CREATE USER 'sqluser'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON *.* TO 'sqluser'@'localhost';
```
* Port `3306` in use: stop any conflicting MySQL instances or change the port in `my.cnf`

