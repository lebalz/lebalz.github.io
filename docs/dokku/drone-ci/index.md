---
title: Drone CI
---

# Drone CI

[Drone CI](https://www.drone.io/) can be easily used with Github, Bitbucket, Gitlab,...

To deploy it on dokku, you need two apps - [drone-server](drone-server.md) and [drone-runner](drone-runner.md).

A `.drone.yml` in the root of your repository specifies the steps to perform. 

As an example, here is the minimal script that builds and deploys this page (without cache).

```yml title=.drone.yml
---
kind: pipeline
type: docker
name: default

steps:

- name: submodules
  image: alpine/git
  commands:
  - git submodule update --init --recursive

- name: website
  image: node:16.11.1
  commands:
  - mkdir -p $HOME/.ssh
  - ssh-keyscan -t rsa github.com >> $HOME/.ssh/known_hosts
  - echo "$GITHUB_PRIVATE_KEY" > "$HOME/.ssh/id_rsa"
  - chmod 0600 $HOME/.ssh/id_rsa
  - yarn install --frozen-lockfile
  - npm run deploy
  environment:
    USE_SSH: true
    GIT_USER: $DRONE_COMMIT_AUTHOR
    GITHUB_PRIVATE_KEY:
      from_secret: "git_deploy_private_key"
  when:
    event:
      include:
      - push
      - pull_request

trigger:
  branch:
  - main
```

The setup expects that a env variable named `git_deploy_private_key` containing the private key of which the public key is stored as a deploy key in e.g. Github.