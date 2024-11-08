# Flights DB

[Demo Flights DB](https://postgrespro.com/community/demodb)

Unpack the zip file and copy the files to the server.

## Create DB on dokku with given files

```bash
scp demo-flights.sql root@123.22.23.23:/root/flights/demo-flights.sql

ssh root@123.22.23.23

# on dokku

dokku postgres:create flights-db
# copy the files to the container
docker cp flights/ $(dokku postgres:info flights-db --id):/home/flights

dokku postgres:enter flights-db

# inside postgres container "flights-db"
cd /home/flights
psql -f demo-small.sql -U postgres
```

## Grant `SELECT` privileges to db

Since a custom schema is used, we need to grant privileges to the user `students`.

```sql
-- connect to a database you want the user to grant access (for flights db)
GRANT USAGE ON SCHEMA bookings TO students;
GRANT SELECT ON ALL TABLES IN SCHEMA bookings TO students;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA bookings TO students;
```