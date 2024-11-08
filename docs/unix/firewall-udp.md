# Firewall and UDP

https://www.heise.de/hintergrund/Wie-Skype-Co-Firewalls-umgehen-270856.html

## Disable bound port 53 from systemd

https://www.linuxuprising.com/2020/07/ubuntu-how-to-free-up-port-53-used-by.html

## Hetzner Server

CLoud-Config, copy/paste to the cloud console

```yml
#cloud-config

packages:
  - hping3
package_update: true

runcmd:
  - printf "[Resolve]\nDNS=1.1.1.1\nFallbackDNS=8.8.8.8\nDNSStubListener=no\n" > /etc/systemd/resolved.conf
  - ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
  - reboot now
```
### Step 1: Create 2 Hetzner Servers

Create 2 servers with it, e.g.: `local` and `remote`.

### Step 2: Let them talk

Ensure, both can
- ping each other
- can connect ovr natcat (`nc`):

```bash
# local - ip:  65.21.252.60
nc -u -l -p 14141

# remote - ip: 157.90.232.190
echo "hello" | nc -p 53 -u 65.21.252.60 14141
```

--> this shall output "hello" on `local`s terminal

`local` nc command explained
- `-u` use `UDP` Protocol
- `-l` listen for incoming connections
- `-p` the port on which `nc` listens

`remote` nc command explained
- `-p` the destination port: `53` is used for `UDP`
- `-u` use `UDP` Protocol
- `65.21.252.60` the ip address of the destination (`local`)

### Step 3: Create a Firewall

Create with Hetzner a Firewall in front of the `local` Server

Ensure, that now the example above does not work anymore.

### Step 4: Screw a hole into the firewall

Open a second console on `local` and create with `hping3` a packet for the `remote` server.
Because the request is now outgoing, the firewall let's it pass through and waits for responses.
Clearly no answer is received, since on the `remote` no UDP service is listening on port `53`.

```bash
# local/2  - ip:  65.21.252.60
hping3 --count 1 --udp --baseport 14141 -p 53 157.90.232.190
```
explanation:
- `--count` (`-c`) number of packets to send
- `--udp` (`-2`) use `udp` protocol (`0`: raw ip mode
- `--baseport` (`-s`) the outgoing port to use - it must be the one where `nc`is listening
- `-p` destination port: udp port `53`

now try again and the "hello" shall appear 🥳

