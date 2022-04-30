---
title: Docker
sidebar_position: 3
tags: [snippets]
---

# Docker CLI Snippets

```bash
# show images
docker images

# image id by tag
ID=$(docker images -q image/name:tag)

# remove image forceful
docker rmi -f $ID
```