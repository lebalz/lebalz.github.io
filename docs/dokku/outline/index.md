# Outline Wiki

Website
: 👉 [getoutline.com](https://www.getoutline.com/)
Dockerhub
: 👉 [hub.docker.com/r/outlinewiki/outline](https://hub.docker.com/r/outlinewiki/outline)
Guide
: 👉 [official docs](https://docs.getoutline.com/s/hosting/doc/file-storage-N4M0T6Ypu7)
Envs
: 👉 [.env.sample](https://github.com/outline/outline/blob/main/.env.sample)
Azure Config
: 👉[docs.getoutline.com](https://docs.getoutline.com/s/hosting/doc/microsoft-azure-UVz6jsIOcv)

```bash

dokku apps:create outline

dokku domains:add outline outline.domain.com


dokku postgres:create outline
dokku postgres:link outline outline

dokku redis:create outline
dokku redis:link outline outline

dokku config:set outline --no-restart FILE_STORAGE=local
dokku config:set outline --no-restart FILE_STORAGE_UPLOAD_MAX_SIZE=26214400

dokku config:set outline --no-restart NODE_ENV="production"
dokku config:set outline --no-restart UTILS_SECRET=$(openssl rand -hex 32)
dokku config:set outline --no-restart FORCE_HTTPS=false
dokku config:set outline --no-restart DEFAULT_LANGUAGE="de_DE"

dokku config:set outline --no-restart PGSSLMODE=disable
dokku config:set outline --no-restart PORT=3000
dokku config:set outline --no-restart SECRET_KEY=$(openssl rand -hex 32)
dokku config:set outline --no-restart URL="https://outline.domain.com"
dokku config:set outline --no-restart SMTP_HOST=""
dokku config:set outline --no-restart SMTP_NAME=""
dokku config:set outline --no-restart SMTP_PORT="587"
dokku config:set outline --no-restart SMTP_FROM_EMAIL=""
dokku config:set outline --no-restart SMTP_REPLY_TO_EMAIL=""
dokku config:set outline --no-restart AZURE_CLIENT_ID=""
dokku config:set outline --no-restart AZURE_CLIENT_SECRET=""
dokku config:set outline --no-restart AZURE_RESOURCE_APP_ID=""
dokku config:set outline --no-restart SMTP_SECURE=false
dokku config:set outline --no-restart SMTP_USERNAME =""
dokku config:set outline --no-restart SMTP_PASSWORD=""
dokku ports:add outline --no-restart http:80:3000
dokku config:set --no-restart outline DOKKU_LETSENCRYPT_EMAIL=""

mkdir -p /var/lib/dokku/data/storage/outline/data
chown -R 1001 /var/lib/dokku/data/storage/outline/data
dokku storage:mount outline data:/var/lib/outline/data



cat /home/dokku/outline/ENV

dokku git:from-image outline docker.getoutline.com/outlinewiki/outline:latest
```

... deploy

and run

```bash
dokku letsencrypt:enable outline
```

## Update

```bash
docker pull docker.getoutline.com/outlinewiki/outline:latest
dokku ps:rebuild outline
```


## Backup Config
When backing up with [👉 dokku-keeper](https://github.com/lebalz/dokku-keeper)

```yml title="backup_config.yml"
outline:
  files:
    - "/home/dokku/outline/ENV"
  folders:
    - "/var/lib/dokku/data/storage/outline/data"
  commands:
    postgres:
      cmd: "dokku postgres:export outline"
      to: "/database/outline.pg.dump"
      stage: backup
    redis:
      cmd: "dokku redis:export outline"
      to: "/database/outline.redis.dump"
      stage: backup
```
