# Planka Board

[👉 Planka](https://planka.app/)

```bash
dokku apps:create planka
dokku postgres:create planka

dokku postgres:link planka planka

dokku config:set planka BASE_URL=https://domain.com
dokku config:set planka SECRET_KEY_BASE=$(openssl rand -base64 48)

dokku config:set planka DEFAULT_ADMIN_EMAIL=demo@demo.demo
dokku config:set planka DEFAULT_ADMIN_PASSWORD=secure-pw
dokku config:set planka DEFAULT_ADMIN_NAME=Demo Demo
dokku config:set planka DEFAULT_ADMIN_USERNAME=demo

dokku storage:mount planka user-avatars:/app/public/user-avatars
dokku storage:mount planka project-background-images:/app/public/project-background-images
dokku storage:mount planka attachments:/app/private/attachments

dokku proxy:ports-add planka http:80:1337
dokku config:set --no-restart planka  DOKKU_LETSENCRYPT_EMAIL=foo@bar.ch

dokku git:from-image planka ghcr.io/plankanban/planka:latest
```

## OICD with Azure AD

```bash
dokku config:set planka OIDC_ISSUER="https://login.microsoftonline.com/49068363-8361-4607-9549-62b6b55794aa/v2.0/.well-known/openid-configuration"
dokku config:set planka OIDC_CLIENT_ID="..."
dokku config:set planka OIDC_CLIENT_SECRET="..."
dokku config:set planka OIDC_SCOPES="openid profile email"
```
