---
title: Drone Runner
sidebar_position: 2
description: Deploy Drone CI Runner with Dokku
keywords: [drone, dokku, drone ci, drone runner, ci]
---
# Drone Runner

For the runner, follow the same steps as fot the server, but make sure you
follow the instructions for the [runners](https://docs.drone.io/runner/docker/installation/linux/).

```sh {3-7}
docker run --detach \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  --env=DRONE_RPC_PROTO=https \
  --env=DRONE_RPC_HOST=drone.company.com \
  --env=DRONE_RPC_SECRET=super-duper-secret \
  --env=DRONE_RUNNER_CAPACITY=2 \
  --env=DRONE_RUNNER_NAME=my-first-runner \
  --publish=3000:3000 \
  --restart=always \
  --name=runner \
  drone/drone-runner-docker:1
```

The instructions state that

- the runner requires the file `/var/run/docker.sock` to be mounted
- it listens on port `3000`

## Preparing dokku and the image

```sh
dokku apps:create drone-runner

# env variables
dokku config:set drone-runner DRONE_RPC_SECRET=$(dokku config:get hfr-drone-server DRONE_RPC_SECRET)
dokku config:set drone-runner DRONE_RPC_PROTO=https
dokku config:set drone-runner DRONE_RPC_HOST=drone.lebalz.ch
dokku config:set drone-runner DRONE_RUNNER_CAPACITY=2
dokku config:set drone-runner DRONE_RUNNER_NAME=bolt

# mount the docker socket
dokku storage:mount drone-runner /var/run/docker.sock:/var/run/docker.sock

# change port mapping and set domain
dokku proxy:ports-add drone-runner http:3000:3000

# deploy
dokku git:from-image drone-runner drone/drone-runner-docker:latest
```

## Update
To update to a specific version (e.g. `1.8.0` or `latest`) lookup the tags on [https://hub.docker.com/r/drone/drone-runner-docker/tags](https://hub.docker.com/r/drone/drone-runner-docker/tags) and run on your dokku server:

```sh
docker pull drone/drone-runner-docker:1.8.0
dokku git:from-image drone-runner drone/drone-runner-docker:1.8.0
```

The application will be rebuilt automatically.