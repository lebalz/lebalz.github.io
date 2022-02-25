---
title: Umami
description: Deploy Umami tracker with Dokku
keywords: [umami, web, tracker, web analytics, dokku]
---

# Umami [^1]

> Umami is a simple, easy to use, self-hosted web analytics solution. The goal is to provide you with a friendlier, privacy-focused alternative to Google Analytics and a free, open-sourced alternative to paid solutions. [^2]

To get started with [Umami](https://umami.is/), read the
[docker-compose.yml](https://github.com/mikecao/umami/blob/master/docker-compose.yml).

It states the following:

- Umami has a Docker image at [ghcr.io/mikecao/umami:postgresql-latest](https://github.com/mikecao/umami/pkgs/container/umami)
- It listens on port `3000`
- It depends on PostgreSQL
- It reads the PostgreSQL config from `DATABASE_URL`
- It requires the env variables `DATABASE_URL`, `DATABASE_TYPE` and `HASH_SALT`

## Preparing dokku and the image

:::warning Prerequirements
The following Dokku plugins are required
- Dokkus [Postgres](https://github.com/dokku/dokku-postgres)
- 
:::

```bash
dokku apps:create umami

# create and link postgres db
dokku postgres:create umami
dokku postgres:link umami umami

# set env variables
dokku config:set umami HASH_SALT=$(openssl rand -hex 32)
dokku config:set umami DATABASE_TYPE=postgresql

# set port mapping
dokku proxy:ports-remove umami http:80:5000
dokku proxy:ports-add umami http:80:3000

# add a domain
dokku domains:add umami umami.lebalz.ch

# optional: set email for letsencrypt
dokku config:set --no-restart umami DOKKU_LETSENCRYPT_EMAIL=foo@bar.ch

# optional: set custom script name. Default is umami (might be known by ad blockers)
dokku config:set --no-restart umami TRACKER_SCRIPT_NAME=myumami
```

:::info Notes
- The environment variable `DATABASE_URL` must not be set manually since it was automatically set when linking the database to the application.
:::


## Create database tables

* Copy the content of the file `schema.postgresql.sql`
* Open a connection to your dokku PostgreSQL instance: `dokku postgres:connect umami-postgres`
* Paste the content of the file that you previously copied

<details><summary>schema.postgresql.sql</summary>

The Schema from [Github repository](https://github.com/mikecao/umami):

```sql reference title=sql/schema.postgresql.sql
https://github.com/mikecao/umami/blob/master/sql/schema.postgresql.sql
```

</details>

## Deploy the image

```bash
dokku git:from-image umami ghcr.io/mikecao/umami:postgresql-latest

# optional: letsencrypt
dokku letsencrypt drone-server
```

The default username is `admin` and the default password is `umami`.

## Updating

```bash
# pull the latest image
docker pull ghcr.io/mikecao/umami:postgresql-latest

# rebuild umami
dokku ps:rebuild umami
```

## Troubleshooting

* Debug proxy mapping: `dokku nginx:error-logs umami -t`


[^1]: Reference: [knowledge.code-fabrik.ch](https://knowledge.code-fabrik.ch/software/dokku/docker-image-deploys/umami.html)
[^2]: Reference: [Umami](https://umami.is/)