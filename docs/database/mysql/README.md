# MySQL
## Create Roles and grant privileges

```sql
CREATE DATABASE demo;

CREATE USER 'students'@'%' IDENTIFIED WITH mysql_native_password  BY 'super-strong-pw';
GRANT SELECT ON demo.* TO 'students'@'%';
GRANT ALL PRIVILEGES ON `edu\_%` . * TO 'students'@'%'; -- students can create tables with prefix edu_
FLUSH PRIVILEGES;
```

## MySql 8+ Authentication

When you want to be able to connect from standard clients as Sqlectron, change the authentication method: 

```SQL
alter user 'root'@'localhost' identified with mysql_native_password by 'plaintext-pw';
alter user 'root'@'%' identified with mysql_native_password by 'plaintext-pw';
alter user 'mysql'@'%' identified with mysql_native_password by 'plaintext-pw';
```

## Max Connection Errors
Configure mysql `my.cnf` (create it when it does not exist) under `/var/lib/dokku/services/mysql/<app-name>/config/my.cnf`

```cnf title="/var/lib/dokku/services/mysql/<app-name>/config/my.cnf"
[mysqld]
lower_case_table_names = 1
max_connections = 1000
max_connect_errors=10000
```

:::tip[Current Configuration]

```sql
SHOW VARIABLES;
```
:::