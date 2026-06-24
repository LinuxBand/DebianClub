---
title: "Podman Container-Management"
description: "Installation und Verwendung von Podman auf Debian 13 – daemonlos, rootless Container-Ausführung und kompatibel mit Docker-Befehlen"
---

# Podman Container-Management

**Podman** ist eine quelloffene Container-Engine, die weitgehend mit Docker kompatibel ist, jedoch zwei entscheidende Vorteile bietet:

- **Daemonlos (daemonless)**: Anders als Docker, das auf einen ständig laufenden Root-Daemon angewiesen ist, führt Podman Container direkt als normale Prozesse aus – die Angriffsfläche ist kleiner.
- **Rootless-Ausführung**: Normale Benutzer können Container ohne Root-Rechte ausführen, was die Sicherheit erhöht.

Debian 13 enthält Podman bereits in den offiziellen Paketquellen, die Installation ist sehr einfach – keine zusätzlichen Drittanbieter-Quellen erforderlich.

## Installation

```bash
sudo apt update
sudo apt install podman

# Überprüfung
podman --version
```

Für eine `docker-compose`-ähnliche Orchestrierung kann zusätzlich installiert werden:

```bash
sudo apt install podman-compose
```

## Grundlegende Verwendung

Podmans Befehlszeile ist nahezu eins zu eins mit Docker identisch:

```bash
# Einen Container ausführen
podman run -d --name web -p 8080:80 docker.io/library/nginx

# Laufende Container anzeigen
podman ps

# Alle Container anzeigen (auch gestoppte)
podman ps -a

# Lokale Images anzeigen
podman images

# Logs anzeigen / in Container einsteigen
podman logs web
podman exec -it web bash

# Stoppen und löschen
podman stop web
podman rm web
```

> Hinweis: Podman gibt standardmäßig explizit das Image-Repository-Präfix an (z.B. `docker.io/library/nginx`). In `/etc/containers/registries.conf` können die standardmäßig zu durchsuchenden Repositories konfiguriert werden.

## Kompatibilität mit Docker-Befehlen

Wer den `docker`-Befehl gewohnt ist, kann das Kompatibilitätspaket installieren, sodass `docker` als Alias für `podman` fungiert:

```bash
sudo apt install podman-docker
```

Danach werden Befehle wie `docker run ...`, `docker ps` usw. direkt an Podman weitergeleitet.

## Rootless-Container

Wenn ein normaler Benutzer `podman` direkt ausführt, wird automatisch der Rootless-Modus verwendet – ohne zusätzliche Konfiguration. Dies ist der größte Vorteil von Podman gegenüber Docker. Überprüfung:

```bash
# Als normaler Benutzer (ohne sudo) ausführen
podman run --rm docker.io/library/alpine echo "Hallo von rootless Podman"
```

Der Rootless-Modus benötigt User Namespaces. Debian 13 aktiviert diese standardmäßig; falls Fehler zu `subuid/subgid` auftreten, stellen Sie sicher, dass in `/etc/subuid` und `/etc/subgid` ein Eintrag für den aktuellen Benutzer vorhanden ist:

```bash
grep "$USER" /etc/subuid /etc/subgid
# Falls nicht, kann manuell hinzugefügt werden (normalerweise geschieht dies automatisch bei der Installation)
sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 "$USER"
```

## Pod: Native Gruppenverwaltung

Der Name Podman stammt von **Pod** (in Anlehnung an Kubernetes-Pods) – mehrere Container können zu einer Gruppe zusammengefasst werden, die sich einen Netzwerk-Namespace teilen:

```bash
# Einen Pod erstellen und Port freigeben
podman pod create --name mypod -p 8080:80

# Container dem Pod hinzufügen
podman run -d --pod mypod docker.io/library/nginx
```

## Container mit systemd verwalten (Quadlet)

Um Container automatisch zu starten und systemweit zu verwalten, wird **Quadlet** empfohlen. Erstellen Sie `.container`-Unit-Dateien in `~/.config/containers/systemd/` (rootless) oder `/etc/containers/systemd/` (systemweit):

```ini
# ~/.config/containers/systemd/web.container
[Container]
Image=docker.io/library/nginx
PublishPort=8080:80

[Install]
WantedBy=default.target
```

Dann neu laden und starten:

```bash
systemctl --user daemon-reload
systemctl --user start web
```

## Podman vs. Docker – Kurzübersicht

| Merkmal | Podman | Docker |
|---|---|---|
| Daemon | Kein (daemonless) | Ständig laufender Daemon |
| Rootless | Nativ standardmäßig unterstützt | Zusätzliche Konfiguration erforderlich |
| Befehlszeile | Kompatibel mit Docker | – |
| systemd-Integration | Nativ mit Quadlet | Zusätzliche Kapselung erforderlich |
| Installation unter Debian 13 | Direkt aus offiziellen Quellen | Docker-Offizielle Quelle muss hinzugefügt werden |

## Zusammenfassung

- `sudo apt install podman` – kein Drittanbieter-Source erforderlich.
- Befehle sind mit Docker kompatibel; mit `podman-docker` wird der `docker`-Befehl direkt weitergeleitet.
- Normale Benutzer führen Container rootless aus; zusammen mit Quadlet können sie von systemd verwaltet werden.

Weiterführende Lektüre: [Docker-Installation und -Verwendung](/en/server/docker) · [Virtualisierung](/en/server/virtualization)
