---
title: Format USB Drive
---

When a usb drive is not mounted and is not recognized by osx or windows (e.g. when you flashed a .iso to it, and something went wrong), you can try to get it done over the terminal:

```bash
# list devices
diskutil list

# erase the disk
# !! the disk must be your device
sudo diskutil eraseDisk FAT32 "DRIVE" MBRFormat /dev/disk2
```

A new name for the drive must be given (here `DRIVE`), but make sure to write it in capital letters, otherwise it won't work.