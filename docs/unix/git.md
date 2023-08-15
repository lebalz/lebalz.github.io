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

## Restore SSH Keys [^1]

1. Change the file permission

  ```bash
  sudo chown user:user ~/.ssh/id_rsa*
  sudo chmod 600 ~/.ssh/id_rsa
  sudo chmod 644 ~/.ssh/id_rsa.pub
  ```
2. (Re-)Start the ssh-agent

  ```bash
  exec ssh-agent bash
  ```

3. Add your SSH private key to the ssh-agent

  ```bash
  ssh-add ~/.ssh/id_rsa
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

## Create new Repo with `main` Branch

```bash
echo "# asdfghjhgfdsa" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:lebalz/<reponame>.git
git push -u origin main
```

[^1]: Source: [Snippet by Colematt](https://gist.github.com/colematt/3645b50b20254a7c1a5a8608757626b2)
