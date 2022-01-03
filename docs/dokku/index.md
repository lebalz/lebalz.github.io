---
title: Dokku
keywords: [dokku]
---

# Dokku

> Dokku is a software suite that simulates a PaaS on any server. It uses the same base functionality as Heroku and tries to mimic usage of Heroku as much as possible. With Dokku, it’s very easy to deploy software and run multiple projects on the same physical server through the use of containers. [^1]

# Dokku Server Setup
## Plugins

```bash
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku plugin:install https://github.com/dokku/dokku-http-auth.git
dokku plugin:install https://github.com/lebalz/dokku-post-deploy-script post-deploy-script
dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
dokku plugin:install https://github.com/dokku/dokku-mysql.git mysql
dokku plugin:install https://github.com/dokku/dokku-redis.git redis
```

## Server Swap
### Enable Swap
1. First, create a file that will be used as swap:

```sh
sudo fallocate -l 2G /swapfile
```

Set the file permissions to 600 to prevent regular users to write and read the file:

```sh
sudo chmod 600 /swapfile
```

Create a Linux swap area on the file:
```sh
sudo mkswap /swapfile
```

Activate the swap file by running the following command:

```sh
sudo swapon /swapfile
```

To make the change permanent open the /etc/fstab file:

```sh
sudo nano /etc/fstab
```

and paste the following line:

```sh
/etc/fstab
/swapfile swap swap defaults 0 0
```

Verify that the swap is active by using either the swapon or the free command, as shown below:
```sh
sudo swapon --show
```

```sh
NAME      TYPE      SIZE  USED PRIO
/swapfile file        2G    0B   -1Copy
```

```sh
sudo free -h
              total        used        free      shared  buff/cache   available
Mem:          981Mi        97Mi        68Mi       0.0Ki       814Mi       735Mi
Swap:         2.0Gi        10Mi       1.9Gi
```

### Adjusting the Swappiness Value
Swappiness is a Linux kernel property that defines how often the system will use the swap space. It can have a value between 0 and 100. A low value will make the kernel to try to avoid swapping whenever possible, while a higher value will make the kernel to use the swap space more aggressively.

On Ubuntu, the default swappiness value is set to 60. You can check the current value by typing the following command:

```sh
cat /proc/sys/vm/swappiness

# 60
```

While the swappiness value of 60 is OK for most Linux systems, for production servers, you may need to set a lower value.

For example, to set the swappiness value to 10, run:
```sh
sudo sysctl vm.swappiness=10
```

To make this parameter persistent across reboots, append the following line to the /etc/sysctl.conf file:
```sh
# /etc/sysctl.conf
vm.swappiness=10
```

The optimal swappiness value depends on your system workload and how the memory is being used. You should adjust this parameter in small increments to find an optimal value

### Disable Swap
1. First, deactivate the swap space:
```sh
sudo swapoff -v /swapfile
```
2. Next, remove the swap file entry /swapfile swap swap defaults 0 0 from the /etc/fstab file.

3. Finally, remove the actual swapfile file using the rm command:
```sh
sudo rm /swapfile
```

[^1]: [What is Dokku](https://knowledge.code-fabrik.ch/software/dokku/)