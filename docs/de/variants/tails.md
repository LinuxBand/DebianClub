---
title: Tails — Debian-Derivat
description: Ein amnesisches Live-OS für Datenschutz und Anonymität — leitet den gesamten Datenverkehr über Tor und hinterlässt nach dem Herunterfahren keine Spuren.
---

# Tails

Tails — kurz für **The Amnesic Incognito Live System** — ist ein Live-Betriebssystem auf Basis von Debian stable, das mit einem einzigen Ziel entwickelt wurde: Ihre Privatsphäre und Anonymität zu schützen. Es ist dafür gedacht, von einem USB-Stick gestartet zu werden, läuft vollständig im RAM und hinterlässt auf dem Hostrechner keine Spuren, wenn Sie es herunterfahren. Der gesamte Netzwerkverkehr wird zwingend über das Tor-Anonymisierungsnetzwerk geleitet.

## Grundlegende Informationen

| Eigenschaft | Details |
|---|---|
| Basiert auf | Debian stable |
| Veröffentlichungszyklus | Sicherheitsupdates ca. alle 6–8 Wochen |
| Standard-Desktop | GNOME (angepasst, abgespeckt) |
| Zielgruppe | Journalisten, Aktivisten, datenschutzbewusste Nutzer, Personen in Hochrisiko-Situationen |
| Website | [https://tails.boum.org](https://tails.boum.org) |

## Hauptmerkmale

- **Amnesisch von Natur aus**: Das System läuft im RAM. Beim Herunterfahren werden alle temporären Dateien, der Browserverlauf und Metadaten aus dem Speicher gelöscht — nichts wird auf die interne Festplatte geschrieben.
- **Obligatorisches Tor-Routing**: Jede Netzwerkverbindung wird über Tor geleitet. Jede Anwendung, die versucht, außerhalb von Tor eine Verbindung herzustellen, wird automatisch blockiert, um versehentliche IP-Lecks zu verhindern.
- **Datenschutz-Werkzeugpaket**: Tor Browser, Thunderbird mit OpenPGP-E-Mail-Verschlüsselung, OnionShare (anonymes Datei-Sharing), KeePassXC (Passwort-Manager) und weitere sind ab Werk enthalten.
- **Verschlüsselter persistenter Speicher**: Eine optionale verschlüsselte Partition auf dem USB-Stick kann Dokumente, Lesezeichen und kryptographische Schlüssel über Sitzungen hinweg speichern, ohne den amnesischen Charakter des Systems zu beeinträchtigen.
- **Verifizierte Downloads**: Tails stellt OpenPGP-Signaturen und eine Browser-Erweiterung zur Verfügung, um die Integrität heruntergeladener Images vor der Verwendung zu prüfen.

## Beziehung zu Debian

Tails ist auf Debian stable aufgebaut und nutzt dessen Paketverwaltung und Sicherheits-Update-Infrastruktur. Darüber hinaus wendet das Tails-Team umfangreiche Härtungsmaßnahmen an: Deaktivierung unnötiger Dienste, Verschärfung von AppArmor-Profilen, Anpassung von Kernel-Parametern zur Minimierung von Informationslecks und Integration des vollständigen Tor-Project-Software-Stacks. Das Tails-Team veröffentlicht Sicherheitsupdates ungefähr alle sechs bis acht Wochen, in enger Anlehnung an Debians Sicherheitshinweise.

## Erste Schritte

```bash
# Tails muss von einem USB-Stick ausgeführt werden (mindestens 8 GB)
# Offizielle Installationsschritte:

# Schritt 1 — Image herunterladen:
# https://tails.boum.org/install/

# Schritt 2 — Auf USB schreiben:
# Erstmalige Installation: balenaEtcher verwenden (https://www.balena.io/etcher/)
# Folgeinstallationen: Tails Installer aus einer laufenden Tails-Sitzung verwenden
# (Klonen bewahrt die persistente Speicherpartition)

# Schritt 3 — Download verifizieren (dringend empfohlen):
# Die Tails-Website stellt eine Browser-Erweiterung und OpenPGP-Signaturen bereit,
# um sicherzustellen, dass das Image nicht manipuliert wurde.

# Hinweis: Das Ausführen von Tails in einer virtuellen Maschine schwächt die
# Sicherheitsgarantien erheblich. Physischer USB-Boot ist die empfohlene Methode.
```

## Für wen ist es geeignet?

- Journalisten und Anwälte, die sicher kommunizieren und Quellen schützen müssen
- Menschenrechtsaktivisten, die in Hochrisiko-Umgebungen arbeiten
- Alltägliche Nutzer, die starken Datenschutz auf gemeinsam genutzten oder nicht vertrauenswürdigen Computern wünschen
- Alle, die Zensur umgehen oder .onion-Dienste aufrufen müssen

::: warning Einschränkungen
Tails schützt Ihre Privatsphäre während einer Sitzung, kann aber keine Hardware-Überwachung (z. B. BIOS-Implantate, physische Keylogger) oder Benutzerfehler (wie das Einloggen in persönliche Konten während der Nutzung von Tails) abwehren.
:::

## Weiterführende Links

- Website: [https://tails.boum.org](https://tails.boum.org)
- Installationsanleitung: [https://tails.boum.org/install/](https://tails.boum.org/install/)
- Dokumentation: [https://tails.boum.org/doc/](https://tails.boum.org/doc/)
- Tor Project: [https://www.torproject.org](https://www.torproject.org)

---

## Nächste Schritte

Kehren Sie zur [Übersicht der Debian-Derivate](/de/variants/) zurück, um andere Debian-basierte Distributionen zu erkunden.
