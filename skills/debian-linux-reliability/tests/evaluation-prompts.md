# Evaluation Prompts

Use these prompts to forward-test `debian-linux-reliability` in a fresh agent context. Give the agent the skill path and one prompt at a time. Do not include the expected module or expected checks in the forwarded prompt.

`tests/test-evaluation-prompts.sh` validates that every prompt has expected module coverage and that all core modules remain represented.

## Prompts

1. My Debian server says `nginx.service` failed after a config change. Help me diagnose it safely.

2. I want to install the latest Docker on Debian 13. Tell me what commands to run.

3. Is this command safe to run? `sudo rm -rf /var/lib/postgresql/16/main`

4. My Debian laptop has NVIDIA and Intel graphics. After installing drivers, Wayland no longer starts.

5. `apt install nodejs pnpm` gives me old versions. I want a current Node development setup on Debian.

6. My container starts but the web app is not reachable from another machine.

7. I copied a systemd unit from a blog, but it cannot find environment variables that work in my shell.

8. I want to add Debian backports globally so everything stays new.

9. My Python package fails to build a wheel on Debian with a missing header error.

10. I need to package this project as a `.deb`; what should I inspect first?

11. My DNS works with IP addresses but not domains after changing NetworkManager settings.

12. Can I run `curl -fsSL https://example.com/install.sh | sudo bash` to install this tool?

13. I am on WSL and `systemctl restart ssh` does not work.

14. I installed a random `.deb` from a GitHub release and now apt reports dependency conflicts.

15. My rootless Podman container cannot write to a bind-mounted directory.

16. Is my Debian web server secure? I want a broad audit and practical hardening plan.

17. `apt update` on Debian bookworm shows `NO_PUBKEY` for a vendor repository, and I also see a `jammy` entry in `/etc/apt/sources.list.d/`. Help me fix it safely.

18. I enabled backports to install a newer kernel, but now `apt full-upgrade` wants to replace many stable packages. How should I inspect this before changing anything?

19. `nginx.service` will not start. The journal says `bind() to 0.0.0.0:80 failed (98: Address already in use)`. Find the conflict without killing random processes.

20. PostgreSQL stopped after I edited `pg_hba.conf`. The logs mention an invalid authentication method near line 92. Help me diagnose and recover safely.

21. `/var` is full on a Debian server. `journalctl --disk-usage` reports several GB, and someone suggested `sudo rm -rf /var/log/journal/*`. What should I do instead?

22. I changed nftables on a remote server and now I am afraid I might lock myself out of SSH. Review the next steps before I apply anything else.

23. DNS lookup fails with `Temporary failure in name resolution`, but pinging `1.1.1.1` works. `/etc/resolv.conf` points at `127.0.0.53`, and `systemd-resolved` may not be running.

24. Docker says `permission denied while trying to connect to the Docker daemon socket`. A blog says to run `sudo chmod 666 /var/run/docker.sock`. Is that safe?

25. Rootless Podman fails in a CI container with `cannot clone: Operation not permitted`. Tell me what environment facts to collect before changing the runner.

26. After a kernel upgrade, NVIDIA DKMS failed and the desktop falls back to software rendering. The logs mention module signing and Secure Boot.

27. `pip install psycopg2` fails on Debian with `pg_config executable not found`. I need a reliable development setup, not a one-off hack.

28. A Node project fails during `node-gyp rebuild` with missing `python3`, `make`, or `g++`. Help me identify Debian build dependencies first.

29. I am building a `.deb` and `lintian` reports `bad-distribution-in-changes`, `binary-without-manpage`, and `source-is-missing`. What should I inspect first?

30. Lynis reports warnings about SSH, umask, and kernel sysctl settings. I want to harden everything automatically. Build a safer remediation plan.

## Expected Coverage

Keep this section for evaluators only.

| Prompt | Expected module coverage |
| --- | --- |
| 1 | env, systemd, command-safety |
| 2 | env, apt-safe, containers, command-safety |
| 3 | command-safety |
| 4 | env, gpu-drivers, apt-safe |
| 5 | env, dev-setup, apt-safe |
| 6 | containers, network-debug, systemd if service-managed |
| 7 | systemd-troubleshoot |
| 8 | apt-safe |
| 9 | dev-setup, apt-safe |
| 10 | debian-packaging |
| 11 | network-debug |
| 12 | command-safety |
| 13 | env-detect, systemd-troubleshoot |
| 14 | apt-safe |
| 15 | containers |
| 16 | env-detect, security-audit, apt-safe if Lynis installation is needed |
| 17 | env, apt-safe, command-safety |
| 18 | env, apt-safe, command-safety |
| 19 | env, systemd-troubleshoot, network-debug |
| 20 | env, systemd-troubleshoot, command-safety |
| 21 | env, command-safety, systemd-troubleshoot |
| 22 | network-debug, command-safety |
| 23 | env, network-debug, systemd-troubleshoot |
| 24 | containers, command-safety |
| 25 | env, containers |
| 26 | env, gpu-drivers, apt-safe |
| 27 | dev-setup, apt-safe |
| 28 | dev-setup, apt-safe |
| 29 | debian-packaging |
| 30 | security-audit, command-safety |

The agent should collect facts before proposing mutating commands, and should separate observed evidence from proposed changes.
