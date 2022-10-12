# WSL2

## Wrong Timezone

Errors like `Can't verify jwt token`

Probably because wsl messes up with the time zone when waking up from sleep mode. --> Sync the time zone with windows

```bash
sudo hwclock -s
```

## PSQL not running: `ERRCONNECT`

Start the db service, on WSL:

```bash
sudo service postgresql start
sudo service postgresql status
```