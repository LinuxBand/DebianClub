---
title: Kali Linux — Debian-Derivat
description: Die branchenführende Distribution für Penetrationstests und Cybersicherheit mit über 600 Sicherheitswerkzeugen ab Werk.
---

# Kali Linux

Kali Linux ist die bekannteste sicherheitsorientierte Linux-Distribution, die 2013 von Offensive Security als Nachfolger von BackTrack Linux veröffentlicht wurde. Basierend auf Debian testing und einem Rolling-Release-Modell folgend, wird es mit über 600 vorinstallierten Werkzeugen für Penetrationstests, digitale Forensik und Reverse Engineering ausgeliefert.

## Grundlegende Informationen

| Eigenschaft | Details |
|---|---|
| Basiert auf | Debian testing (rolling) |
| Veröffentlichungszyklus | Rolling Release |
| Standard-Desktop | Xfce (seit 2019); GNOME, KDE verfügbar |
| Zielgruppe | Sicherheitsprofis, Pentester, CTF-Teilnehmer |
| Website | [https://www.kali.org](https://www.kali.org) |

## Hauptmerkmale

- **600+ Sicherheitswerkzeuge**: Nmap, Metasploit, Burp Suite, Wireshark, Aircrack-ng, John the Ripper und Hunderte weitere — alle nach Kategorie geordnet und sofort nach der Installation einsatzbereit.
- **Rolling-Release-Modell**: Folgt Debian testing, sodass Werkzeuge kontinuierlich aktualisiert werden, ohne eine vollständige Neuinstallation zu erfordern.
- **Multi-Plattform-Unterstützung**: Verfügbar für x86_64, ARM, WSL (Windows Subsystem for Linux), Docker und dedizierte Raspberry-Pi-Images.
- **Live-Modus**: Direktes Starten von einem USB-Stick ohne Installation auf der Festplatte — ideal für temporäre Bewertungen und Außeneinsätze.
- **Kali Undercover-Modus**: Verwandelt den Desktop mit einem Klick in eine Windows-10-ähnliche Oberfläche — nützlich beim Arbeiten in öffentlichen Bereichen.

## Beziehung zu Debian

Kali Linux basiert auf Debian testing und synchronisiert regelmäßig Pakete aus diesem Zweig. Offensive Security fügt benutzerdefinierte Kernel-Patches (z. B. Unterstützung für WLAN-Karten-Injection) hinzu und pflegt ein separates Repository mit Sicherheitswerkzeugen, die nicht in Debian enthalten sind. Das Paketmanagement von Kali ist APT-kompatibel mit Debian, aber **das Einbinden von Debian- oder Ubuntu-Repositorien in ein Kali-System wird dringend abgeraten**, da dies Werkzeug-Abhängigkeiten und Systemstabilität beeinträchtigen kann.

## Erste Schritte

```bash
# Laden Sie das ISO von: https://www.kali.org/get-kali/ herunter
# Empfohlen: die Installer-Edition für eine vollständige Installation oder Live für USB-Boot

# Nach der Installation das System aktualisieren
sudo apt update && sudo apt full-upgrade -y

# Die vollständige Werkzeug-Suite installieren
sudo apt install kali-linux-everything -y

# Nur die 10 meistgenutzten Werkzeuge installieren
sudo apt install kali-tools-top10 -y

# Zum GNOME-Desktop wechseln (optional)
sudo apt install kali-desktop-gnome -y
```

## Für wen ist es geeignet?

- Professionelle Penetrationstester, die autorisierte Sicherheitsbewertungen durchführen
- CTF-Teilnehmer (Capture The Flag) und Sicherheits-Challenge-Teilnehmer
- Studenten, die Cybersicherheitskurse und -zertifizierungen absolvieren (OSCP, CEH usw.)
- Digitale Forensikanalysten und Malware-Forscher

::: warning Rechtlicher Hinweis
Die in Kali Linux enthaltenen Werkzeuge dürfen ausschließlich gegen Systeme eingesetzt werden, die Sie besitzen oder für die Sie eine ausdrückliche schriftliche Genehmigung zum Testen haben. Die unbefugte Nutzung von Penetrationstestwerkzeugen ist in den meisten Ländern illegal.
:::

## Weiterführende Links

- Website: [https://www.kali.org](https://www.kali.org)
- Download: [https://www.kali.org/get-kali/](https://www.kali.org/get-kali/)
- Dokumentation: [https://www.kali.org/docs/](https://www.kali.org/docs/)
- Werkzeugverzeichnis: [https://www.kali.org/tools/](https://www.kali.org/tools/)
- Offensive Security Training: [https://www.offsec.com](https://www.offsec.com)

---

## Nächste Schritte

Kehren Sie zur [Übersicht der Debian-Derivate](/de/variants/) zurück, um andere Debian-basierte Distributionen zu erkunden.
