# PostgreSQL
## Export Database (plain text)

```bash
pg_dump --host=<host> --port=5432 --username=postgres --password --dbname=<db-name> > dump.sql
```

## Import Database (plain text)

```bash
psql --host=<host> --port=5432 --username=postgres --password --dbname=<db-name> < dump.sql
```


## Show all indexes
 
```sql
SELECT
    tablename,
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    schemaname = 'public'
ORDER BY
    tablename,
    indexname;
```


## Create Roles and grant privileges

When the default schema `public` is used:
```sql
CREATE ROLE students WITH LOGIN PASSWORD 'students' ;
-- connect to a database you want the user to grant access
GRANT SELECT ON ALL TABLES IN SCHEMA public TO students;
```

otherwise, when a custom schema is used (e.g. `bookings`):

```sql
-- connect to a database you want the user to grant access (for flights db)
GRANT USAGE ON SCHEMA bookings TO students;
GRANT SELECT ON ALL TABLES IN SCHEMA bookings TO students;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA bookings TO students;
```