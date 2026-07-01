# Network Debug Module

Use this module for DNS failures, no internet, interface issues, routes, ports, firewalls, proxy variables, NetworkManager, systemd-networkd, and server reachability.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-NET-001 | Inspect interface link and address state |
| DLR-NET-002 | Inspect IPv4 and IPv6 routes |
| DLR-NET-003 | Inspect DNS resolver state |
| DLR-NET-004 | Inspect listening sockets and local bind state |
| DLR-NET-005 | Inspect firewall state |
| DLR-NET-006 | Identify active network manager |
| DLR-NET-007 | Inspect proxy environment indicators |

## Required Checks

Run:

```bash
scripts/network-diagnose.sh
```

The script is read-only, but some firewall or socket details may be limited without root.

## Diagnosis Order

1. Interface state: link up/down, addresses, carrier
2. Route state: default route, conflicting routes, IPv6 routes
3. DNS state: resolver manager, `/etc/resolv.conf`, nameservers
4. Listening ports: `ss -lntup`
5. Firewall state: nftables/ufw
6. Network manager: NetworkManager, systemd-networkd, ifupdown
7. Proxy variables

## Rules

- Separate DNS failure from routing failure.
- Separate local bind/listen issues from firewall or external reachability.
- Do not recommend restarting networking blindly. Identify the active manager first.
- Do not assume NetworkManager on servers or minimal installs.
- Do not assume `iptables`; Debian systems may use nftables.
- Do not paste public IPs, internal topology, or proxy credentials unless needed; redact secrets.

## Safe Checks

Prefer read-only checks first:

```bash
ip -br addr
ip route
resolvectl status
ss -lntup
nft list ruleset
nmcli device status
networkctl list
```

Only propose firewall, resolver, or interface changes after identifying the active manager and rollback.
