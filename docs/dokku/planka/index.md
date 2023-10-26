# Planka Board

[👉 Planka](https://planka.app/)

## Dokku installation

- [👉 docker-compose.yml](https://github.com/plankanban/planka/blob/master/docker-compose.yml)
- [👉 Docker Installation](https://docs.planka.cloud/docs/installation/docker/production_version)

```bash
dokku apps:create planka

dokku postgres:create planka
dokku postgres:link planka planka

dokku config:set planka BASE_URL=https://domain.com
dokku domains:add planka domain.com
dokku proxy:ports-add planka http:80:1337

dokku config:set planka SECRET_KEY_BASE=$(openssl rand -base64 48)

dokku config:set planka DEFAULT_ADMIN_EMAIL=demo@demo.demo
dokku config:set planka DEFAULT_ADMIN_PASSWORD=secure-pw
dokku config:set planka DEFAULT_ADMIN_NAME=Demo Demo
dokku config:set planka DEFAULT_ADMIN_USERNAME=demo

dokku storage:mount planka user-avatars:/app/public/user-avatars
dokku storage:mount planka project-background-images:/app/public/project-background-images
dokku storage:mount planka attachments:/app/private/attachments

dokku config:set --no-restart planka  DOKKU_LETSENCRYPT_EMAIL=foo@bar.ch

dokku git:from-image planka ghcr.io/plankanban/planka:latest
```

## OICD with Azure AD
- [👉 OIDC Configuration](https://docs.planka.cloud/docs/Configuration/OIDC)

```bash
dokku config:set planka OIDC_ISSUER="https://login.microsoftonline.com/TENANT_ID/v2.0/.well-known/openid-configuration"
dokku config:set planka OIDC_CLIENT_ID="..."
dokku config:set planka OIDC_CLIENT_SECRET="..."
dokku config:set planka OIDC_SCOPES="openid profile email"
dokku config:set planka OIDC_IGNORE_ROLES=true
```

## Update

```bash
docker pull ghcr.io/plankanban/planka:latest
dokku ps:rebuild planka
```

## Backup Config
When backing up with [👉 dokku-keeper](https://github.com/lebalz/dokku-keeper)

```yml title="backup_config.yml"
planka:
  files:
    - "/home/dokku/planka/ENV"
  folders:
    - "/tmp/planka-backup/volumes"
  commands:
    volume-user-avatars:
      cmd: "docker run --rm --volumes-from planka.web.1 -v /tmp/planka-backup/volumes:/backup ubuntu cp -r /app/public/user-avatars /backup/user-avatars"
      stage: "pre-backup"
    volume-project-background-images:
      cmd: "docker run --rm --volumes-from planka.web.1 -v /tmp/planka-backup/volumes:/backup ubuntu cp -r /app/public/project-background-images /backup/project-background-images"
      stage: "pre-backup"
    volume-attachments:
      cmd: "docker run --rm --volumes-from planka.web.1 -v /tmp/planka-backup/volumes:/backup ubuntu cp -r /app/private/attachments /backup/attachments"
      stage: "pre-backup"
    postgres:
      cmd: "dokku postgres:export planka"
      to: "/database/planka.dump"
      stage: backup
    cleanup:
      cmd: "rm -rm /tmp/planka-backup"
      stage: "post-backup"
```

### Restore Volumes
Copy the backup volumes to `/tmp/planka/volumes` and then run

```bash
docker run --rm --volumes-from planka.web.1 -v /tmp/planka/volumes:/backup ubuntu cp -rf /backup/user-avatars /app/public/
docker run --rm --volumes-from planka.web.1 -v /tmp/planka/volumes:/backup ubuntu cp -rf /backup/project-background-images /app/public/
docker run --rm --volumes-from planka.web.1 -v /tmp/planka/volumes:/backup ubuntu cp -rf /backup/attachments /app/private/
```


