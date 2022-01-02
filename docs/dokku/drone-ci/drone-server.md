---
title: Drone Server
sidebar_position: 1
description: Deploy Drone CI Runner with Dokku
keywords: [drone, dokku, drone ci, drone server, ci]
---

# Drone for Github

To get started with Drone, read the [documentation](https://docs.drone.io/server/provider/gtihub/), where
you can find the following snippet:

```sh {3-7}
docker run \
  --volume=/var/lib/drone:/data \
  --env=DRONE_GITHUB_CLIENT_ID=your-id \
  --env=DRONE_GITHUB_CLIENT_SECRET=super-duper-secret \
  --env=DRONE_RPC_SECRET=super-duper-secret \
  --env=DRONE_SERVER_HOST=drone.company.com \
  --env=DRONE_SERVER_PROTO=https \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  --detach=true \
  --name=drone \
  drone/drone:2
```

It states the following:

- Drone is based on the Docker image `drone/drone:2`
- It is run via `docker run`, where you need to pass various env variables
- It listens on port 80

## Preparing dokku and the image

```sh
# create the app
dokku apps:create drone-server

# set the env variables
dokku config:set drone-server DRONE_GITHUB_CLIENT_ID=1234
dokku config:set drone-server DRONE_GITHUB_CLIENT_SECRET=abcdef
dokku config:set drone-server DRONE_RPC_SECRET=$(openssl rand -hex 32)
dokku config:set drone-server DRONE_SERVER_HOST=drone.lebalz.ch
dokku config:set drone-server DRONE_SERVER_PROTO=http

# give yourself admin access - replace <github-username> with your actual github username 
dokku config:set drone-server DRONE_USER_CREATE=username:<github-username>,admin:true

# mount persistent directory for caching
dokku storage:mount drone-server /var/lib/dokku/data/storage/drone-server:/data

# change port mapping
dokku proxy:ports-add drone-server http:80:80

# add a domain
dokku domains:add drone-server drone.lebalz.ch

# optional: set email for letsencrypt
dokku config:set --no-restart drone-server DOKKU_LETSENCRYPT_EMAIL=foo@bar.ch

# deploy
dokku git:from-image drone-server drone/drone:latest

# optional: letsencrypt
dokku letsencrypt drone-server
```

:::info `DRONE_RPC_SECRET`
Required string value provides the shared secret generated in the previous step. This is used to authenticate the rpc connection between the server and runners. The server and runner must be provided the same secret value. A secure random string can be generated with `openssl rand -hex 32`.
:::

:::danger Careful `DRONE_SERVER_PROTO`
Make sure you disable the HTTPS redirect option. Dokku terminates the SSL
connection with Nginx and internally proxies requests to the container by HTTP.
This makes Drone believe an HTTP request arrived and it issues a redirect to
HTTPS, resulting in an infinite loop.
:::

## Update
To update to a specific version (e.g. `2.7.3` or `latest`) lookup the tags on [https://hub.docker.com/r/drone/drone/tags](https://hub.docker.com/r/drone/drone/tags) and run on your dokku server:

```sh
dokku git:from-image drone-server drone/drone:2.7.3
```

The application will be rebuilt automatically.