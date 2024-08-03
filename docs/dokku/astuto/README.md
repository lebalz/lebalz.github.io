# Astuto

> Astuto is an open source customer feedback tool. It helps you collect, manage and prioritize feedback from your customers, so you can build a better product.

Astuto
: [👉 github.com/astuto/astuto](https://github.com/astuto/astuto)
: [👉 docs.astuto.io](https://docs.astuto.io/)


To get started with [Astutot](https://github.com/astuto/astuto), read the
[docker-compose.yml](https://docs.astuto.io/deploy-docker).

It states the following:

- Astuto has a Docker image at [hub.docker.com/r/riggraz/astuto](https://hub.docker.com/r/riggraz/astuto/tags)
- It listens on port `3000`
- It depends on PostgreSQL
- It reads the PostgreSQL config from
  - `POSTGRES_HOST` (@see https://github.com/astuto/astuto/blob/main/config/database.yml)
  - `PORTGRES_USER` (is the user and the database name)
  - `POSTGRES_PASSWORD`
- It requires a `BASE_URL` and a `SECRET_KEY_BASE`
- Has options to conigure `SMTP`:
  - `EMAIL_DELIVERY_METHOD` (Possible values: "smtp". If you don't want to configure an email delivery method, don't define this variable.)
  - `EMAIL_SMTP_HOST` (Hostname of your SMTP server)
  - `EMAIL_SMTP_PORT` (Port of your SMTP server (optional, defaults to: 25))
  - `EMAIL_SMTP_USER` (Username for your SMTP server)
  - `EMAIL_SMTP_PASS` (Password for your SMTP server)
  - `EMAIL_SMTP_HELO_DOMAIN` (HELO domain (optional, defaults to: nil))
  - `EMAIL_SMTP_AUTH` (SMTP server authentication type (optional, defaults to: plain))
  - `EMAIL_SMTP_TLS` (Enables the SMTP connection to use SMTP/TLS (optional, defaults to: nil))
  - `EMAIL_SMTP_OPENSSL_VERIFY_MODE` (Set how OpenSSL checks the certificate when using TLS (optional, defaults to: nil))
  - `EMAIL_SMTP_STARTTLS_AUTO` (Detects if STARTTLS is enabled in your SMTP server and starts to use it (optional, defaults to: true))

## Preparing dokku and the image


```bash
dokku apps:create hfr-astuto

#create and link postgres db
dokku postgres:create hfr-astuto
dokku postgres:link --no-restart hfr-astuto hfr-astuto

# setup the database env variables
dokku config:set --no-restart hfr-astuto POSTGRES_HOST=$(dokku postgres:info hfr-astuto --dsn | cut -d '@' -f 2 | cut -d ':' -f 1)
dokku config:set --no-restart hfr-astuto POSTGRES_USER=$(dokku postgres:info hfr-astuto --dsn | cut -d '/' -f 3 | cut -d ':' -f 1)
dokku config:set --no-restart hfr-astuto POSTGRES_PASSWORD=$(dokku postgres:info hfr-astuto --dsn | cut -d ':' -f 3 | cut -d '@' -f 1)

dokku config:set hfr-astuto SECRET_KEY_BASE=$(openssl rand -hex 64)
dokku config:set hfr-astuto BASE_URL="https://astuto.gbsl.website"

dokku ports:add hfr-astuto http:80:3000

dokku domains:add hfr-astuto astuto.gbsl.website

dokku config:set --no-restart hfr-astuto DOKKU_LETSENCRYPT_EMAIL=balthasar.hofer@gbsl.ch

## optional: set smtp settings
dokku config:set --no-restart hfr-astuto EMAIL_DELIVERY_METHOD=smtp
dokku config:set --no-restart hfr-astuto EMAIL_SMTP_HOST=...
dokku config:set --no-restart hfr-astuto EMAIL_SMTP_PORT=587
dokku config:set --no-restart hfr-astuto EMAIL_SMTP_STARTTLS_AUTO=true
dokku config:set --no-restart hfr-astuto EMAIL_SMTP_USER="foo@bar.ch"
dokku config:set --no-restart hfr-astuto EMAIL_SMTP_PASS="..."
dokku config:set --no-restart EMAIL_SMTP_HELO_DOMAIN="bar.ch"
dokku config:set --no-restart hfr-astuto EMAIL_MAIL_FROM="foo@bar.ch"

dokku git:from-image hfr-astuto riggraz/astuto:latest

# deploy...
# disable cf proxy
dokku letsencrypt:enable hfr-astuto
# reenable cf proxy
```