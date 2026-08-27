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

## Configuration

Add under `%UserProfile%` a file called `.wslconfig` containing some boundaries for your wsl:

```
[wsl2]
memory=8GB
swap=2GB
autoMemoryReclaim=gradual
```

you could even specify `processors=2` to limit the cpu cores wsl can use.

Additionally, you mightg want to disable AntiVirus to scan the wsl file system:

1. Open `Windows Sicherheit`
2. Go to `Viren- und Bedrohungsschutz`
3. exclude the folder `%LocalAppData%\wsl` from beeing checked.
