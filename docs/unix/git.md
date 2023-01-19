---
title: GIT & SSH
tags: [snippets]
---

# GIT & SSH Snippets

```bash
sudo apt install git

git config --global user.name FooBar
git config --global user.email foo@bar.ch

# create new ssh key pair

ssh-keygen

cat ~/.ssh/id_rsa.pub
```

## Ignore changes from tracked files

Ignore all further changes, but you don't want git to remove current file from the repository:

```bash
git update-index --assume-unchanged <file>
```

... and reenable it again

```bash
git update-index --no-assume-unchanged <file>
```
