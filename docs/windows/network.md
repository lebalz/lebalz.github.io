---
title: Network
tags: [DNS, Network]
---

# Windows Network

## Troubleshoot your Network

```powershell
# clear dns cash
ipconfig /flushdns

# either create or update host A/AAAA record within the active directory integrated DNS.
# does not have any impact in public networks
ipconfig /registerdns

# release the current local ip
ipconfig /release

# request a new ip address for the device
ipconfig /renew

# reset the socket, which is used for the communication "os <-> network"
NETSH winsock reset catalog

# reset ipv4 TCP/IP and DHCP Parameters
NETSH int ipv4 reset reset.log

# reset ipv6 TCP/IP and DHCP Parameters
NETSH int ipv6 reset reset.log
```
