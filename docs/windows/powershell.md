---
title: Powershell
tags: [snippets]
---

# Powershell Snippets

## for-Loop

```powershell
for ($i=0; $i -le 10; $i++) {
    [console]::beep($i * 100 + 700, 500);
}
```

## Beep Sound

```powershell
# [console]::beep(frequency, ms)
[console]::beep(1200, 500);
[console]::beep(1000, 500);
```

## Lolcat

https://github.com/andot/lolcat

```powershell
Install-Module lolcat -Scope CurrentUser

set-executionpolicy remotesigned -scope CurrentUser

dir | lolcat
```

## Git / SSH-Agent
Ensure the ssh agent is running on startup:

```powershell
# Make sure you're running as an Administrator
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```
