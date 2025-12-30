# Troubleshooting

## Letsencrypt

When you are not able to renew a certificate, try to remove it first with

```bash
dokku certs:remove app
```

and then run again

```bash
dokku letsencrypt app
```

## Unknown buildpack version

e.g. when you want to build for a newly released node lts version, but heroku can't find it. run

```bash
docker pull gliderlabs/herokuish:latest
dokku buildpacks:set-property APP stack gliderlabs/herokuish:latest
dokku repo:purge-cache APP
```

and redeploy
