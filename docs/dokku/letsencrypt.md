# Letsencrypt

## Troubleshooting

When `dokku letsencrypt:auto-renew app-name` fails

:::danger ERROR
```sh
2022-01-22 07:42:43,377:ERROR:__main__:1388: CA marked some of the authorizations as
    invalid, which likely means it could not access http://example.com/.well-known/acme-challenge/X.
    Did you set correct path in -d example.com:path or --default_root? Are all your domains
    accessible from the internet? Please check your domains' DNS entries, your host's
    network/firewall setup and your webserver config. If a domain's DNS entry has both A
    and AAAA fields set up, some CAs such as Let's Encrypt will perform the challenge
    validation over IPv6. If your DNS provider does not answer correctly to CAA records
    request, Let's Encrypt won't issue a certificate for your domain (see 
    https://letsencrypt.org/docs/caa/). Failing authorizations:
    https://acme-v02.api.letsencrypt.org/acme/authz-v3/70727888570
Traceback (most recent call last):
  File "/simp_le/simp_le.py", line 1551, in main
    return main_with_exceptions(cli_args)
  File "/simp_le/simp_le.py", line 1535, in main_with_exceptions
    persist_new_data(args, existing_data)
  File "/simp_le/simp_le.py", line 1456, in persist_new_data
    chain=None,
  File "/simp_le/simp_le.py", line 1124, in persist_data
    plugin.save(new_data)
  File "/simp_le/simp_le.py", line 648, in save
    pems = [self.dump_cert(data.cert)]
  File "/simp_le/simp_le.py", line 468, in dump_cert
    return OpenSSL.crypto.dump_certificate(self.typ, data.wrapped).strip()
AttributeError: 'NoneType' object has no attribute 'wrapped'

Unhandled error has happened, traceback is above
```
:::

and even `dokku letsencrypt:revoke app-name` fails 

:::danger ERROR
```sh
-----> Revoking letsencrypt certificate for app-name...
        - Domain 'domain.com'
darkhttpd/1.12, copyright (c) 2003-2016 Emil Mikulic.
listening on: http://0.0.0.0:80/
ACME server returned an error: urn:ietf:params:acme:error:unauthorized :: The client lacks sufficient authorization :: Certificate is expired


Debugging tips: -v improves output verbosity. Help is available under --help.
```
:::

(and `dokku letsencrypt:cleanup app-name` does not help), then an easy trick will do the job:

:::success Readd the domain
Remove your current domain since this will cleanup and remove the broken certificates.
Then add it again and run letsencrypt for the win:

```bash
dokku domains:report app-name

dokku domains:remove app-name domain.com
dokku domains:add app-name domain.com

dokku letsencrypt app-name
```

:::