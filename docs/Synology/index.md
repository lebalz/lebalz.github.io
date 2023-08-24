# Synology NAS

## Mount a photo-folder to the shared folder

Normally, Synology Photos only displays pictures under `/volume1/photo`. To show pictures e.g. from a OneDrive synced folder under `volume1/OneDrive/Bilder`, you have to bind-mount the location:

```bash
mkdir /volume1/photo/OneDrive
sudo mount --bind /volume1/OneDrive/Bilder /volume1/photo/OneDrive
```
For a persistent mount, even after a restart, add a task over the task-scheduler with the mount command. It's important to use the user `root` for the task, otherwise no sudo permissions are granted.

Make sure to give the application `SynologyPhoto` at least `Read` permission for the `volume1/OneDrive/Bilder` folder. Otherwise the pictures will not show up.

Eventually you have to trigger a reindex after the first mount.

