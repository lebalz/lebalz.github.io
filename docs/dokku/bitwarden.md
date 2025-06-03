---
title: Bitwarden
---

# Bitwarden - Vaultwarden

[Vaultwarden](https://github.com/dani-garcia/vaultwarden#installation): An alternative implementation of the Bitwarden server API written in **Rust** and **compatible with upstream Bitwarden clients**, perfect for self-hosted deployment where running the official resource-heavy service might not be ideal.

```bash
#!/bin/bash
APP=bitwarden
MAIL=foor@bar.ch
DOMAIN=bitwarden.dokku.me

# create app
dokku apps:create $APP

# setup and mount persitent storage
mkdir -p /var/lib/dokku/data/storage/$APP/data
dokku storage:mount $APP /var/lib/dokku/data/storage/$APP/data:/data/

# add port mapping
dokku proxy:ports-add $APP "http:80:80"
# set domain
dokku domains:add $APP $DOMAIN
# use X-Forwarded-For header to resolve users IP
dokku config:set $APP IP_HEADER="X-Forwarded-For"

# SMTP configuration
dokku config:set $APP DOMAIN=https://$DOMAIN
dokku config:set $APP SMTP_HOST=mail.gandi.net
dokku config:set $APP SMTP_FROM=foo@bar.ch
dokku config:set $APP SMTP_FROM_NAME=Bitwarden
dokku config:set $APP SMTP_PORT=587 
dokku config:set $APP SMTP_SSL=true
dokku config:set $APP SMTP_USERNAME=foo@bar.ch
dokku config:set $APP SMTP_PASSWORD=safe-pw

# letsencrypt config
dokku config:set --no-restart $APP DOKKU_LETSENCRYPT_EMAIL=$MAIL

# enable admin route
dokku config:set $APP ADMIN_TOKEN=$(openssl rand -base64 48)

# for correct propagation of the clients ip:
dokku nginx:set $APP x-forwarded-for-value "\$proxy_add_x_forwarded_for"

# deploy
dokku git:from-image $APP vaultwarden/server:latest

#letsencrypt
dokku letsencrypt $APP
```

## Update

```bash
docker pull vaultwarden/server:latest
dokku ps:rebuild bitwarden
```
