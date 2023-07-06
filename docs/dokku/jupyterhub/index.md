# Dokku Jupyterhub

The goal of this project is to run a dockerized [jupyterhub](https://jupyter.org/hub) instance on a [dokku](https://dokku.com/) server.

Dokku will create and handle the docker network for the communication between jupyterhub and the jupyter notebooks (spawned as separate docker containers). Dokku performs a `Dockerfile`-deploy.

The spawned notebook image is based on a Docker image build from the `images/Dockerfile` after each deploy.

Data-Persistence is achieved by bind mounting directories from the dokku host to the notebook containers. See `jupyterhub_config.py` for all settings.

## Dokku requirements

The following plugins are required and must be installed on your dokku host:
- [post-deploy-script @lebalz](https://github.com/lebalz/dokku-post-deploy-script) to build the users jupyterlab image after each deploy
- [postgres](https://github.com/dokku/dokku-postgres)
- [letsencrypt](https://github.com/dokku/dokku-letsencrypt)

## Create jupyterhub app folder

[github.com/lebalz/dokku-jupyterhub](https://github.com/lebalz/dokku-jupyterhub)

Create a new git project with the following files:

```bash
├── Dockerfile
├── POST_DEPLOY_SCRIPT
├── README.md
├── images
│   ├── overrides.json
│   └── Dockerfile
├── jupyterhub_config.py
└── my_azuread.py
```

There are two Dockerfiles - the one in the root is used to build the jupyterhub image, the one in the images folder is used to build the users jupyterlab image.

The `POST_DEPLOY_SCRIPT` is used to build the users jupyterlab image after each deploy.


To intialize a new repository with git:

```bash
git init
git add .
git commit -m "initial commit"

# add dokku remote
git remote add dokku dokku@<your-ip>:jupyterhub
```


### ./Dockerfile

```docker
# Do not forget to pin down the version
FROM jupyterhub/jupyterhub:4.0.1

# Install dependencies (for advanced authentication and spawning)
RUN pip3 install \
    dockerspawner==12.1.0 \
    oauthenticator==14.2.0 \
    jupyterhub-idle-culler==1.2.1 \
    psycopg2-binary==2.9.3

RUN pip3 install PyJWT==2.3.0

# Copy the custom authenticator
COPY my_azuread.py .

RUN mv my_azuread.py $(dirname "$(python3 -c "import oauthenticator as _; print(_.__file__)")")/my_azuread.py

# Copy the JupyterHub configuration into the container
COPY jupyterhub_config.py .

# Copy the POST_DEPLOY_SCRIPT into the container
COPY POST_DEPLOY_SCRIPT .

# Copy the notebook dockerfile into the container
COPY images ./images
```

### 

<details>
<summary><code>./jupyterhub_config.py</code></summary>

```python
import os
import sys
from pathlib import Path
import shutil
from oauthenticator.my_azuread import MyAzureAdOAuthenticator
from dockerspawner import DockerSpawner

PREFIX = 'jupyter'
ADMINS = set(['foo-bar--mail-ch'])
HOME_PATH = '/home/jovyan/work'
APP_NAME = f'{PREFIX}-jupyterhub'
APP_ROOT_HOST = f'/var/lib/dokku/data/storage/{APP_NAME}'

VOLUME_GROUPS = {
    'data-science': [
        f'{APP_ROOT_HOST}/groups/data-science'
    ]
}

MEMBERSHIPS = {
    'foo-bar--mail-ch': set(['data-science'])
}

PERFORMANCE_LIMITS = {
    'foo-bar--mail-ch': '8G'
}


class MyDockerSpawner(DockerSpawner):

    def start(self):
        username = self.user.name
        if self.user.name in ADMINS:
            shared_mode = 'rw'
        else:
            shared_mode = 'ro'
        root = Path(notebook_dir)
        # basic volumes
        self.volumes = {
            f'{APP_ROOT_HOST}/data/users/{username}': {'bind': notebook_dir, 'mode': 'rw'},
            f'{APP_ROOT_HOST}/data/user-settings/{username}': {'bind': '/home/jovyan/.jupyter/lab', 'mode': 'rw'},
            f'{APP_ROOT_HOST}/data/shared': {'bind': str(root.joinpath('shared')), 'mode': shared_mode},
            f'{APP_ROOT_HOST}/data/colab': {'bind': str(root.joinpath('colab')), 'mode': 'rw'}
        }

        # additional volumes for assigned students only
        if self.user.name in MEMBERSHIPS:
            for group in MEMBERSHIPS[self.user.name]:
                for group_dir in VOLUME_GROUPS[group]:
                    # make a relative path to mount, e.g.
                    #   /var/lib/dokku/data/storage/jupyterhub/groups/data-science/
                    # will be mounted to
                    #   /groups/data-science/
                    parts = Path(group_dir).relative_to(APP_ROOT_HOST).parts

                    self.volumes[group_dir] = {
                        'bind': str(root.joinpath(*parts)),
                        'mode': shared_mode
                    }

        if self.user.name in ADMINS:
            self.volumes[f'{APP_ROOT_HOST}/data/users'] = {
                'bind': str(root.joinpath('users')),
                'mode': 'rw'
            }

        if self.user.name in PERFORMANCE_LIMITS:
            self.extra_host_config = {
                'mem_limit': PERFORMANCE_LIMITS[self.user.name],
                'memswap_limit': '-1'
            }
        return super().start()


c.JupyterHub.spawner_class = MyDockerSpawner
c.JupyterHub.last_activity_interval = 150
c.JupyterHub.shutdown_on_logout = True

# Spawn containers from this image
c.DockerSpawner.image = os.environ['DOCKER_JUPYTER_IMAGE']

# JupyterHub requires a single-user instance of the Notebook server, so we
# default to using the `start-singleuser.sh` script included in the
# jupyter/docker-stacks *-notebook images as the Docker run command when
# spawning containers.  Optionally, you can override the Docker run command
# using the DOCKER_SPAWN_CMD environment variable.
# spawn_cmd = os.environ.get('DOCKER_SPAWN_CMD', "start-singleuser.sh")
# c.DockerSpawner.extra_create_kwargs.update({'command': spawn_cmd})

c.DockerSpawner.network_name = os.environ['DOCKER_NETWORK_NAME']
c.DockerSpawner.use_internal_ip = True

# Pass the network name as argument to spawned containers
c.DockerSpawner.extra_host_config = {'network_mode': os.environ['DOCKER_NETWORK_NAME']}


def ensure_dir(dir_path):
    if not dir_path.exists():
        dir_path.mkdir(exist_ok=True)
    if dir_path.group() != 'users':
        shutil.chown(str(dir_path), user=1000, group=100)


def set_user_permission(spawner):
    '''ensures the correct access rights for the jupyterhub user group'''
    username = spawner.user.name
    container_data = os.environ.get('DATA_VOLUME_CONTAINER', '/data')
    data_root = Path(container_data, 'users')
    ensure_dir(data_root)
    ensure_dir(data_root.joinpath(username))
    settings_root = Path(container_data, 'user-settings')
    ensure_dir(settings_root)
    ensure_dir(settings_root.joinpath(username))


c.Spawner.pre_spawn_hook = set_user_permission

# Explicitly set notebook directory because we'll be mounting a host volume to
# it.  Most jupyter/docker-stacks *-notebook images run the Notebook server as
# user `jovyan`, and set the notebook directory to `/home/jovyan/work`.
# We follow the same convention.


notebook_dir = os.environ.get('DOCKER_NOTEBOOK_DIR') or HOME_PATH
c.DockerSpawner.notebook_dir = notebook_dir
# Mount the real user's Docker volume on the host to the notebook user's
# notebook directory in the container

c.DockerSpawner.extra_host_config = {
    'mem_limit': '350m',
    'memswap_limit': '-1'
}
#    'mem_swappiness': 0


# Remove containers once they are stopped
c.DockerSpawner.remove_containers = True
c.DockerSpawner.name_template = f'{PREFIX}{"-{prefix}-{username}"}'
# For debugging arguments passed to spawned containers
c.DockerSpawner.debug = False

# c.JupyterHub.bind_url = 'http://127.0.0.1:8000'

c.JupyterHub.hub_ip = '0.0.0.0'
c.JupyterHub.hub_connect_ip = os.environ['HUB_IP']
c.JupyterHub.services = [
    {
        'name': 'idle-culler',
        'admin': True,
        'command': [
            sys.executable,
            '-m',
            'jupyterhub_idle_culler',
            '--timeout=300'
        ],
    }
]


# Authenticate users with GitHub OAuth
# c.JupyterHub.authenticator_class = 'oauthenticator.GitHubOAuthenticator'
# c.GitHubOAuthenticator.oauth_callback_url = os.environ['OAUTH_CALLBACK_URL']
c.JupyterHub.authenticator_class = MyAzureAdOAuthenticator
c.MyAzureAdOAuthenticator.tenant_id = os.environ.get('AAD_TENANT_ID')
c.MyAzureAdOAuthenticator.oauth_callback_url = os.environ.get('AAD_OAUTH_CALLBACK_URL')
c.MyAzureAdOAuthenticator.client_id = os.environ.get('AAD_CLIENT_ID')
c.MyAzureAdOAuthenticator.client_secret = os.environ.get('AAD_CLIENT_SECRET')

# Persist hub data on volume mounted inside container
data_dir = os.environ.get('DATA_VOLUME_CONTAINER', '/data')
c.JupyterHub.cookie_secret_file = os.path.join(data_dir,
                                               'jupyterhub_cookie_secret')

c.JupyterHub.db_url = os.environ['DATABASE_URL']

# Whitlelist users and admins
c.Authenticator.admin_users = ADMINS

# admin can access all other users
c.JupyterHub.admin_access = True

c.Spawner.default_url = '/lab'
```

</details>

<details>
<summary><code>./my_azuread.py</code></summary>

```python
"""
Custom Authenticator to use Azure AD with JupyterHub

""""""
Custom Authenticator to use Azure AD with JupyterHub

"""
import json
import jwt
import urllib
# import logging
# logging.basicConfig(filename='example_jwt.log', encoding='utf8', level=logging.DEBUG)

from tornado.httpclient import HTTPRequest, AsyncHTTPClient

from jupyterhub.auth import LocalAuthenticator

from traitlets import default
from .azuread import AzureAdOAuthenticator


def azure_token_url_for(tentant):
    return 'https://login.microsoftonline.com/{0}/oauth2/token'.format(tentant)


def azure_authorize_url_for(tentant):
    return 'https://login.microsoftonline.com/{0}/oauth2/authorize'.format(
        tentant)


def sanitized_username(raw):
    cleaned_name = raw.lower()
    cleaned_name = cleaned_name.replace(',', '')
    cleaned_name = cleaned_name.replace(' ', '')
    cleaned_name = cleaned_name.replace('@', '--')
    cleaned_name = cleaned_name.replace('.', '-')

    if len(cleaned_name) > 31:
        # we need to shorten this because it won't work with the system's useradd!
        splitpos = cleaned_name.find("--")
        before = cleaned_name[0:splitpos]
        after = cleaned_name[splitpos:]
        remaining = 31 - len(after)
        shortened = before[0:remaining]
        cleaned_name = shortened + after
    return cleaned_name


class MyAzureAdOAuthenticator(AzureAdOAuthenticator):
    login_service = "Office365 GBSL"

    @default('username_claim')
    def _username_claim_default(self):
        return 'unique_name'

    def normalize_username(self, username):
        """
        Override normalize_username to avoid lowercasing usernames
        """
        return sanitized_username(username)

    async def authenticate(self, handler, data=None):
        code = handler.get_argument("code")
        http_client = AsyncHTTPClient()

        params = dict(
            client_id=self.client_id,
            client_secret=self.client_secret,
            grant_type='authorization_code',
            code=code,
            redirect_uri=self.get_callback_url(handler))

        data = urllib.parse.urlencode(
            params, doseq=True, encoding='utf-8', safe='=')

        url = azure_token_url_for(self.tenant_id)

        headers = {
            'Content-Type':
            'application/x-www-form-urlencoded; charset=UTF-8'
        }
        req = HTTPRequest(
            url,
            method="POST",
            headers=headers,
            body=data  # Body is required for a POST...
        )

        resp = await http_client.fetch(req)
        resp_json = json.loads(resp.body.decode('utf8', 'replace'))

        # app_log.info("Response %s", resp_json)
        access_token = resp_json['access_token']

        id_token = resp_json['id_token']
        decoded = jwt.decode(id_token, options={"verify_signature": False})
        cleaned_name = sanitized_username(decoded[self.username_claim])

        userdict = {"name": cleaned_name}

        userdict["auth_state"] = auth_state = {}
        auth_state['access_token'] = access_token
        # results in a decoded JWT for the user data
        auth_state['user'] = decoded

        return userdict


class LocalMyAzureAdOAuthenticator(LocalAuthenticator, MyAzureAdOAuthenticator):
    """A version that mixes in local system user creation"""
    pass

```

</details>

## Images

The runtime image must be available on the dokku server. It is possbible to build it after each deploy (postdeploy script) or to pull the image manually on the dokku host from a registry.

### Option 1: Pull an existing image
1. remove or rename the `POST_DEPLOY_SCRIPT` from the repository, otherwise it will be used to build the image... (`mv POST_DEPLOY_SCRIPT _POST_DEPLOY_SCRIPT`)
2. pull the preferred image and configure your jupyterhub to use it:
```sh
docker pull jupyter/scipy-notebook:latest

# and set the network as default
dokku config:set $APP DOCKER_JUPYTER_IMAGE="jupyter/scipy-notebook:latest"
```

### Option2: `./images/Dockerfile`

(ensure you have the [post-deploy-script](https://github.com/lebalz/dokku-post-deploy-script) plugin installed on your dokku host)

1. Configure a `DOCKER_JUPYTER_IMAGE` on your host - this name will be used to tag your built image
   ```bash
   dokku config:set $APP DOCKER_JUPYTER_IMAGE="jupyter/lebalz:latest"
   ```

2. Add a `POST_DEPLOY_SCRIPT` to the root (already done here).

    ```bash
    #!/bin/bash
    # create and tag image...
    TAG=$(dokku config:get $APP DOCKER_JUPYTER_IMAGE)
    echo $TAG
    echo "start build"
    (cd images && docker build . -t $TAG)
    ```
3. Setup your `images/Dockerfile`
   ```docker
    FROM jupyter/minimal-notebook:lab-4.0.2

    LABEL maintainer="dev-name"
    LABEL version="0.0.1"
    LABEL description="Jupyter Notebook image"

    USER root
    # graphviz and graphviz-dev is needed for use with jupyterlab
    RUN apt-get update -y && apt-get install -y graphviz graphviz-dev
    USER jovyan

    # all additional pip packages
    RUN pip3 install --no-cache \
        jupyterhub==4.0.1 \
        jupyterlab==4.0.2 \
        notebook==6.5.4 \
        numpy==1.25.0 \
        Pillow==10.0.0 \
        pandas==2.0.3 \
        xlrd==2.0.1 \
        openpyxl==3.1.2 \
        ipywidgets==8.0.7 \
        ipympl==0.9.3 \
        jupyterlab-spellchecker==0.8.3 \
        orjson==3.9.1\
        graphviz==0.20
    
    # add the overrides file to the jupyterlab image: 
    COPY overrides.json /opt/conda/share/jupyter/lab/settings/
   ```
4. Make sure that all your Dependencies to build your image are configured properly on your dokku host under `DOKKU_POST_DEPLOY_SCRIPT_DEPENDENCIES`
    ```bash
    dokku config:set --no-restart $APP DOKKU_POST_DEPLOY_SCRIPT_DEPENDENCIES="images/Dockerfile;images/overrides.json"
    ```



## Dokku Setup
Expecting dokku service name is set via `APP` Env, e.g. `APP="jupyterhub"`

```bash
APP="jupyterhub"
DOMAIN="your.domain.com"
# create app
############

dokku apps:create $APP
# ensure docker networks can be used
# dokku version >= v26
dokku scheduler:set $APP selected docker-local
# for dokku dokku version < v26
# dokku config:set $APP DOCKER_SCHEDULER=docker-local

# configure port map for accessing hub
dokku config:set $APP DOKKU_PROXY_PORT_MAP="http:80:8000"

# mount docker socket to spawn new containers
dokku storage:mount $APP /var/run/docker.sock:/var/run/docker.sock

# add a domain to it
dokku domains:add $APP $DOMAIN

# create network
dokku network:create $APP
dokku network:set $APP bind-all-interfaces true

# attach the network to the app
dokku network:set $APP attach-post-create $APP

# configure env variables for the network
dokku config:set $APP DOCKER_NETWORK_NAME=$APP
dokku config:set $APP HUB_IP=$APP.web

# create postgres service
dokku postgres:create $APP
dokku postgres:link $APP $APP

## The URI should start with postgresql:// instead of postgres://.
#   SQLAlchemy used to accept both, but has removed support for the
#   postgres name.
DB_URL=$(dokku config:get $APP DATABASE_URL)
dokku config:set --no-restart $APP DATABASE_URL="${DB_URL//postgres:\/\//postgresql:\/\/}"
# or optional edit the env file directly
# nano /home/dokku/$APP/ENV

# configure post deploy script
# all files needed for the image build must be configured here
# ";" separated list of files (relative to the root of the app)
# - images/Dockerfile      /* the dockerfile for the image build */
# - images/overrides.json  /* configure jupyterlab settings */
# - ...
dokku config:set --no-restart $APP DOKKU_POST_DEPLOY_SCRIPT_DEPENDENCIES="images/Dockerfile;images/overrides.json"

# STOARGE AND DATA PERSISTENCE
##############################

mkdir -p /var/lib/dokku/data/storage/$APP/data
dokku storage:mount $APP /var/lib/dokku/data/storage/$APP/data:/data

## create shared directories
mkdir -p /var/lib/dokku/data/storage/$APP/data/shared
mkdir -p /var/lib/dokku/data/storage/$APP/data/colab

## grant user jovian:users access to shared mounted volumes
chown -R 1000:100 /var/lib/dokku/data/storage/$APP/data/shared
chown -R 1000:100 /var/lib/dokku/data/storage/$APP/data/colab

# increase max body upload size
dokku nginx:set $APP client-max-body-size 30m


# AUTHENTICATORS - OAUTH
########################
### edit your credentials: `nano /home/dokku/$APP/ENV`
# or use the dokku config:set command as shown below

## GITHUB oauth config
# dokku config:set $APP OAUTH_CALLBACK_URL="https://$DOMAIN/hub/oauth_callback"
# dokku config:set $APP GITHUB_CLIENT_ID="XXXXXXXXXXXXXX"
# dokku config:set $APP GITHUB_CLIENT_SECRET="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

## AZURE AD oauth config
# dokku config:set $APP AAD_TENANT_ID="xxxxxx-xxxxxx-xxxxxxx"
# dokku config:set $APP AAD_OAUTH_CALLBACK_URL="https://$DOMAIN/hub/oauth_callback"
# dokku config:set $APP AAD_CLIENT_ID="xxxxxx-xxxxxx-xxxxxxx"
# dokku config:set $APP AAD_CLIENT_SECRET="xxxxxx-xxxxxx-xxxxxxx"

```


### Letsencrypt
After the initial deploy, you can enable letsencrypt for your domain.

Make sure:

- you have set a domain and your page is reachable
- no pagerules with permanent redirects e.g. from Cloudflare exists

```sh
MAIL="your@email.address"
dokku config:set --no-restart $APP DOKKU_LETSENCRYPT_EMAIL=$MAIL
dokku letsencrypt $APP
```


## Jupyterlab Settings

[Jupyterlab Docs](https://jupyterlab.readthedocs.io/en/latest/user/directories.html)

edit the `images/overrides.json`
