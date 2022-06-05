# Node RED

Instructions to set up with Docker from [nodered.org](https://nodered.org/docs/getting-started/docker)

```bash
docker run -it \
-p 1880:1880 \
-v node_red_data:/data \
-e "NODE_RED_CREDENTIAL_SECRET=your_secret_goes_here" \
--name mynodered \
nodered/node-red
```


[empty link]()

The instructions state that

- the runner requires a directory `node_red_data` to be mounted
- it listens on port `1880`
- a user-friendly name used for your node is given
- the docker name
- [nodered/node-red](https://hub.docker.com/r/nodered/node-red/) the image name

## Preparing dokku and deploy the image

```bash
dokku apps:create node-red

# create data dir
mkdir -p /var/lib/dokku/data/storage/node-red/data
# make sure you set the correct user permission
chown -R 1000:1000 /var/lib/dokku/data/storage/node-red/data

# mount the docker socket
dokku storage:mount node-red /var/lib/dokku/data/storage/node-red/data:/data

# change port mapping and set domain
dokku proxy:ports-add node-red http:80:1880
dokku domains:add node-red red.lebalz.ch

# set a friendly name
dokku docker-options:add node-red deploy "--name mynodered"
dokku docker-options:add node-red run "--name mynodered"

# optional: set email for letsencrypt
dokku config:set --no-restart node-red DOKKU_LETSENCRYPT_EMAIL=foo@bar.ch

# deploy
dokku git:from-image node-red nodered/node-red:latest

# optional: letsencrypt
dokku letsencrypt node-red
```

## Configure `settings.js`

To enable e.g. password authentication, edit the default `settings.js` by uncommenting the `adminAuth` field. Generate a hashed password by using the [node-red-admin](https://nodered.org/docs/user-guide/node-red-admin) cli tool locally on your computer:

```bash
npm install -g --unsafe-perm node-red-admin
node-red-admin hash-pw
```

Then edit the `settings.js` on your mounted directory:

```bash
bash /var/lib/dokku/data/storage/node-red/data/settings.js
```
... edit the `adminAuth` section:

```js
 adminAuth: {
    type: "credentials",
    users: [{
        username: "admin",
        password: "36422f0d25181b32ac0e41e4c11c62985914f3a27b1d682bbcc33735c3cb1b28", /* hashed pw */
        permissions: "*"
    }]
},
/* basic auth for routes deployed by nodes*/
/*httpNodeAuth: {
    user: "admin",
    pass: "36422f0d25181b32ac0e41e4c11c62985914f3a27b1d682bbcc33735c3cb1b28"
},*/
```

and redeploy dokku instance

```bash
dokku ps:rebuild node-red
```

## Update

If you deployed `:latest`, then you would need to run

```bash
docker pull nodered/node-red:latest
dokku ps:rebuild node-red
```

Available tags: 
To update to a specific version (e.g. `2.2.2-12`) lookup the tags on [nodered/node-red/tags](https://hub.docker.com/r/nodered/node-red/tags) and run on your dokku server:

```bash
dokku git:from-image node-red nodered/node-red:2.2.2-12
```

The application will be rebuilt automatically.
