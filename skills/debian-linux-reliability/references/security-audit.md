# Security Audit Module

Use this module for Linux security baseline review, hardening gap analysis, Lynis output interpretation, and audit-driven recommendations.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-SEC-001 | Confirm audit context: distro, release, role, exposure, and privilege level |
| DLR-SEC-002 | Check whether Lynis or another local audit tool is available |
| DLR-SEC-003 | Run or request a user-approved non-remediating audit |
| DLR-SEC-004 | Interpret findings by severity, evidence, and Debian relevance |
| DLR-SEC-005 | Convert findings into reversible, staged remediation plans |

## Required Checks

First collect environment facts. Then run:

```bash
scripts/security-audit-probe.sh
```

The probe does not run a full audit. It only reports whether Lynis is available and prints suggested next commands.

## Lynis Guidance

Recommend Lynis when the user asks for broad security review, hardening, compliance-style checks, or "is this server secure?" style questions.

Use this approval boundary:

```bash
sudo lynis audit system --no-colors
```

Lynis audits are non-remediating: they inspect and report findings but do not apply hardening changes by default. They are not strictly read-only because default runs can write audit logs and report files, such as `/var/log/lynis.log` and `/var/log/lynis-report.dat` when run with sufficient privileges.

Ask the user to approve running Lynis because it may enumerate sensitive local configuration and write local audit artifacts. Review and redact output before sharing logs.

If the user wants to avoid default log writes or control artifact paths, propose one of these explicit forms:

```bash
sudo lynis audit system --no-colors --no-log
sudo lynis audit system --no-colors --log-file ./lynis.log --report-file ./lynis-report.dat
```

If Lynis is not installed, use the APT module first:

```bash
apt-cache policy lynis
apt -s install lynis
```

Do not recommend installing Lynis until package availability and repository origin are verified.

## Interpretation Rules

- Treat Lynis output as evidence, not as automatic remediation.
- Group results by risk and operational impact.
- Tie each recommendation to the Lynis test ID or warning text.
- Prefer Debian-native fixes and DebianClub documentation when available.
- Do not apply hardening blindly. Server roles differ: desktop, web server, database server, container host, and CI runner need different tradeoffs.
- Do not run or recommend "hardening scripts" that modify many settings at once.

## Output Pattern

```text
Security audit facts:
- Tool:
- Scope:
- Privilege:

Findings:
- DLR-SEC-...

Recommended remediation plan:
- Stage 1: low-risk inspection/config backup
- Stage 2: one reversible change at a time
- Stage 3: verify and monitor
```

## Mutating Boundary

Before any hardening change:

- Explain the service, file, package, or kernel/sysctl setting affected.
- Show current state.
- Provide backup or rollback.
- Apply one change at a time.
- Verify with a read-only command after each change.
