---
title: "Leitfaden zur Nutzung von Backports"
description: "Vollständige Anleitung zur sicheren Installation neuerer Softwareversionen auf Debian 13 Stable über trixie-backports"
---

# Leitfaden zur Nutzung von Backports

Debian Stable ist für seine Stabilität bekannt, aber die Softwareversionen sind relativ konservativ. **Backports** ist der offizielle Kompromiss von Debian: Es **kompiliert** neuere Software aus `testing` **neu** für die aktuelle Stable-Version, sodass du auf Wunsch einzelne neuere Softwarepakete installieren kannst, ohne Stable verlassen zu müssen.

Für Debian 13 ist das entsprechende Repository **`trixie-backports`**.

## Wann sollte man Backports verwenden?

- ✅ Du benötigst eine neuere Version einer bestimmten Software (z. B. einen neueren Kernel zur Unterstützung neuer Hardware, neuere LibreOffice-Versionen).
- ✅ Du möchtest das System insgesamt stabil halten und nur einzelne Softwarepakete aktualisieren.
- ❌ Verwende nicht alle Pakete aus Backports, nur um "alles neu" zu haben – das würde die Stabilitätsvorteile von Stable zunichtemachen.

> Software in Backports **erhält keinen regulären Support durch das Debian-Sicherheitsteam** und hat eine niedrigere Priorität als Stable. Installiere sie nur nach Bedarf.

## Aktivieren von trixie-backports

### Methode 1: deb822-Format (empfohlen)

Erstelle `/etc/apt/sources.list.d/trixie-backports.sources`:

```bash
sudo tee /etc/apt/sources.list.d/trixie-backports.sources > /dev/null <<'EOF'
Types: deb
URIs: http://deb.debian.org/debian
Suites: trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
EOF

sudo apt update
```

### Methode 2: Traditionelles einzeiliges Format

Du kannst auch `Suites` direkt in die `Suites`-Zeile der offiziellen `debian.sources` aufnehmen (z. B. `Suites: trixie trixie-updates trixie-backports`) oder in `sources.list` hinzufügen:

```
deb http://deb.debian.org/debian trixie-backports main contrib non-free non-free-firmware
```

Zu den Unterschieden zwischen den beiden Formaten siehe [deb822-Quellformat](/de/administration/deb822).

## Installieren von Backports-Software

Nach der Aktivierung hat Backports standardmäßig eine **niedrigere Priorität** als Stable, daher wird `apt install` **nicht** automatisch aus Backports installieren. Du musst explizit `-t` (`--target-release`) verwenden:

```bash
# Installiere die neueste LibreOffice-Version aus Backports
sudo apt install -t trixie-backports libreoffice

# Installiere einen neueren Kernel (nützlich für neue Hardware)
sudo apt install -t trixie-backports linux-image-amd64
```

Ein späteres `sudo apt upgrade` wird die bereits installierten Backports-Pakete auf neue Versionen aus Backports aktualisieren; die restliche Software bleibt auf Stable.

## Feine Steuerung mit APT Pinning (optional)

Wenn bestimmte Pakete **standardmäßig** aus Backports installiert werden sollen, erstelle `/etc/apt/preferences.d/backports`:

```
# Setze Backports-Standardpriorität niedriger als Stable, um automatische Aktualisierung aller Pakete zu vermeiden
Package: *
Pin: release n=trixie-backports
Pin-Priority: 400

# Nur Kernel-bezogene Pakete bevorzugt aus Backports installieren (höhere Priorität als Stables 500)
Package: linux-image-* linux-headers-*
Pin: release n=trixie-backports
Pin-Priority: 501
```

- Priorität `< 500`: Nur bei explizitem `-t` installieren.
- Priorität `> 500`: Automatisch die Backports-Version bevorzugen.

## Deinstallation und Rückkehr

Backports-Software kann wie normale Pakete deinstalliert werden. Wenn du zur Stable-Version zurückkehren möchtest, gib die Versionsnummer an oder deinstalliere und installiere es erneut aus Stable:

```bash
sudo apt install <Paketname>/trixie
```

## Zusammenfassung

- Debian 13 verwendet `trixie-backports`, um neuere Software zu erhalten, während das System stabil bleibt.
- Die Installation erfordert `apt install -t trixie-backports <Paketname>`; es erfolgt keine automatische Aktualisierung.
- Aktiviere und installiere nur nach Bedarf; Backports erhalten keinen regulären Sicherheitssupport.

Weiterführende Lektüre: [deb822-Quellformat](/de/administration/deb822) · [APT-Paketverwaltung](/de/administration/packages)
