---
title: Docker
---

# Some useful Docker Commands

```bash
# show images
docker images

# image id by tag
ID=$(docker images -q image/name:tag)

# remove image forceful
docker rmi -f $ID
```