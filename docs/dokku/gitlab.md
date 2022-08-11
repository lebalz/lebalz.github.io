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

sudo -u dokku mkdir -p /var/lib/dokku/data/storage/gitlab/logs
dokku storage:mount gitlab /var/lib/dokku/data/storage/gitlab/logs:/var/log/gitlab

sudo -u dokku mkdir -p /var/lib/dokku/data/storage/gitlab/data
dokku storage:mount gitlab /var/lib/dokku/data/storage/gitlab/data:/var/opt/gitlab

# configure environment of gitlab - important to use http:// and not https protocol, since gitlab runs behind
# the nginx reverse proxy!
dokku config:set gitlab GITLAB_OMNIBUS_CONFIG="external_url 'http://gitlab.gbsl.website'
letsencrypt['enable']=false
# Add any other gitlab.rb configuration here, each on its own line
"

# optional: set email for letsencrypt
dokku config:set --no-restart node-red DOKKU_LETSENCRYPT_EMAIL=foo@bar.ch

# assign image to gitlab
dokku git:from-image gitlab gitlab/gitlab-ee:latest



# optional: letsencrypt
dokku letsencrypt gitlab
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