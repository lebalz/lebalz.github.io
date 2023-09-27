# Lieder Lo&Leduc

```sql
use db_name;
DROP TABLE IF EXISTS lieder;
DROP TABLE IF EXISTS cds;
CREATE TABLE cds (
  id integer NOT NULL PRIMARY KEY,
  name text NULL
);

CREATE TABLE lieder (
  id integer NOT NULL PRIMARY KEY,
  titel text NULL,
  cd_id integer NULL,
  FOREIGN KEY (cd_id) REFERENCES cds(id)
);

INSERT INTO cds
  (id, name)
VALUES
  (1, 'Update 4.0'),
  (2, 'Living Things'),
  (3, 'Battle Born');

INSERT INTO lieder
  (id, titel, cd_id)
VALUES
  (1, 'Lug wi mir flüge', 1),
  (2, '079', 1),
  (3, 'Chileli vo Wasse', 1),
  (4, 'Cuba Bar', 1),
  (5, 'Lost in the Echo', 2),
  (6, 'In My Remains', 2),
  (7, 'Burn It Down', 2),
  (8, 'Runaways', 3),
  (9, 'A Matter of Time', 3);
```