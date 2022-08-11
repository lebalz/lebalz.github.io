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