# GitLab

Gitlab provides a [docker-compose.yml](https://docs.gitlab.com/ee/install/docker.html#install-gitlab-using-docker-compose) file, which can be easily converted to a dokku config with [dokkupose.netlify.app](https://dokkupose.netlify.app/).

This results in the following bash script:

```bash
# gitlab
dokku apps:create gitlab


dokku proxy:ports-add gitlab http:80:80
# eventually open ssh port aswell. docker options must be used here.
# See https://github.com/dokku/dokku/issues/2383#issuecomment-242591167 for more details how to do this.
# dokku docker-options:add gitlab deploy -p 2222:22


# configure volumes of gitlab
sudo -u dokku mkdir -p /var/lib/dokku/data/storage/gitlab/config
dokku storage:mount gitlab /var/lib/dokku/data/storage/gitlab/config:/etc/gitlab

# add gitlab.rb file

cat << EOF >> /var/lib/dokku/data/storage/gitlab/config/gitlab.rb
# GitLab URL
##! URL on which GitLab will be reachable.
##! For more details on configuring external_url see:
##! https://docs.gitlab.com/omnibus/settings/configuration.html#configuring-the-external-url-for-gitlab
external_url 'https://gitlab.example.ch'

##! **Override only if you use a reverse proxy**
##! Docs: https://docs.gitlab.com/omnibus/settings/nginx.html#setting-the-nginx-listen-port
nginx['listen_port'] = 80

##! **Override only if your reverse proxy internally communicates over HTTP**
##! Docs: https://docs.gitlab.com/omnibus/settings/nginx.html#supporting-proxied-ssl
nginx['listen_https'] = false
EOF

sudo -u dokku mkdir -p /var/lib/dokku/data/storage/gitlab/logs
dokku storage:mount gitlab /var/lib/dokku/data/storage/gitlab/logs:/var/log/gitlab

sudo -u dokku mkdir -p /var/lib/dokku/data/storage/gitlab/data
dokku storage:mount gitlab /var/lib/dokku/data/storage/gitlab/data:/var/opt/gitlab

# mount cgroup options
dokku storage:mount gitlab /sys/fs/cgroup:/sys/fs/cgroup

# configure environment of gitlab - important to use http:// and not https protocol, since gitlab runs behind
# the nginx reverse proxy!
dokku config:set gitlab GITLAB_OMNIBUS_CONFIG="external_url 'https://gitlab.example.ch'"

# optional: set email for letsencrypt
dokku config:set --no-restart node-red DOKKU_LETSENCRYPT_EMAIL=foo@bar.ch

# assign image to gitlab
dokku git:from-image gitlab gitlab/gitlab-ee:15.11.13-ee.0


# optional: letsencrypt
dokku letsencrypt gitlab
```

:::important On Ubuntu >=22.04
In Ubuntu 22.04+ cgrub v2 is used, what is not compatible with the current dockerized gitlab setup. To use cgrub v1, add the following command to `CGRUB_CMDLINE_LINUX`:

Check if you have cgrub v2: `grep cgroup /proc/filesystems`.

```bash title="/etc/default/grub"
# nano /etc/default/grub

GRUB_CMDLINE_LINUX="cgroup_enable=memory cgroup_memory=1 swapaccount=1 systemd.unified_cgroup_hierarchy=0"
```

and then run

```bash
sudo update-grub
```
and reboot...

after that you should find the `memory`-folder under `/sys/fs/crgoup/memory`.
:::

## Admin login

- user: **root**
- pw: get it from `initial_root_password` 

Get the admin password from `/etc/gitlab/initial_root_password` by running

```bash
dokku run gitlab cat /etc/gitlab/initial_root_password
```

## Configuring Gandi Mail

You can modify the `gitlab.rb` file directly on your host system:

```bash
nano /var/lib/dokku/data/storage/gitlab/config/gitlab.rb
```

... and set the following config options:

```rb
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "mail.gandi.net"
gitlab_rails['smtp_port'] = 587
gitlab_rails['smtp_user_name'] = "info@domain.ch"
gitlab_rails['smtp_password'] = "Secure Password"
gitlab_rails['smtp_domain'] = "domain.ch"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = false

gitlab_rails['smtp_openssl_verify_mode'] = 'peer'
gitlab_rails['gitlab_email_enabled'] = true
gitlab_rails['gitlab_email_from'] = 'info@domain.ch'
gitlab_rails['gitlab_email_display_name'] = 'GitLab'
gitlab_rails['gitlab_email_reply_to'] = 'info@domain.ch'
```

After this, you need to reconfigure gitlab, by entering the running container and run `reconfigure`

```bash
# enter the docker container spawned by dokku
dokku enter gitlab

# and the reconfigure inside the container
gitlab-ctl reconfigure

# check if you can send an email:
gitlab-rails console
```

end run

```irb
Notify.test_email('USERNAME@gmail.com', 'Message Subject', 'Message Body').deliver_now
```

### Reconfigure
```bash
dokku run gitlab gitlab-ctl reconfigure
```

## Reduce Memory usage

https://techoverflow.net/2020/04/18/how-i-reduced-gitlab-memory-consumption-in-my-docker-based-setup/

```rb
# Disable Prometheus monitoring
prometheus_monitoring['enable'] = false

# Reduce sidekiq concurrency
sidekiq['concurrency'] = 2

# Reduce the PostgreSQL shared memory
postgresql['shared_buffers'] = "256MB"

# use only a single puma server
puma['worker_processes'] = 0

sidekiq['max_concurrency'] = 5


# ensure memory is released as soon as it gets freed

gitlab_rails['env'] = {
  'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000'
}

gitaly['cgroups_count'] = 2
gitaly['cgroups_mountpoint'] = '/sys/fs/cgroup'
gitaly['cgroups_hierarchy_root'] = 'gitaly'
gitaly['cgroups_memory_enabled'] = true
gitaly['cgroups_memory_limit'] = 500000
gitaly['cgroups_cpu_enabled'] = true
gitaly['cgroups_cpu_shares'] = 512

gitaly['concurrency'] = [
  {
    'rpc' => "/gitaly.SmartHTTPService/PostReceivePack",
    'max_per_repo' => 3
  }, {
    'rpc' => "/gitaly.SSHService/SSHUploadPack",
    'max_per_repo' => 3
  }
]
gitaly['env'] = {
  'LD_PRELOAD' => '/opt/gitlab/embedded/lib/libjemalloc.so',
  'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000',
  'GITALY_COMMAND_SPAWN_MAX_PARALLEL' => '2'
}
```
