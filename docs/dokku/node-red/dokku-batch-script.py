pw_hashed = 'your-hashed-pwd:36422f0d25181b32ac0e41e4c11c62985914f3a27b1d682bbcc33735c3cb1b28'

def cmd(name):
    dokku_name = f'hfr-fata-{name}'
    cmd_raw = f'''
dokku apps:create {dokku_name}

# create data dir
mkdir -p /var/lib/dokku/data/storage/{dokku_name}/data
# make sure you set the correct user permission
chown -R 1000:1000 /var/lib/dokku/data/storage/{dokku_name}/data

# mount the docker socket
dokku storage:mount  {dokku_name} /var/lib/dokku/data/storage/{dokku_name}/data:/data

# change port mapping and set domain
dokku proxy:ports-add {dokku_name} http:80:1880
dokku domains:add {dokku_name} {name}.gbsl.website

# set a friendly name
dokku docker-options:add {dokku_name} deploy "--name {name}"
dokku docker-options:add {dokku_name} run "--name {name}"

# optional: set email for letsencrypt
dokku config:set --no-restart {dokku_name} DOKKU_LETSENCRYPT_EMAIL=foo@bar.ch

# deploy
dokku git:from-image {dokku_name} nodered/node-red:latest

# optional: letsencrypt
dokku letsencrypt:enable {dokku_name}

sed -i 's/module.exports = {{/module.exports = {{ adminAuth: {{    type: "credentials",    users: [{{        username: "admin",        password: "{pw_hashed}",        permissions: "\*"    }}]}},/' /var/lib/dokku/data/storage/{dokku_name}/data/settings.js
dokku ps:rebuild {dokku_name}
'''
    with open('deploy.sh', 'a') as f:
        f.write(cmd_raw)


for i in range(1, 25):
    cmd(f'node-red-{i}')