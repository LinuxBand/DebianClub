---
title: BIOS/UEFI-Einstellungen
description: BIOS/UEFI-Einstellungen für den Start von USB-Medium konfigurieren
---

# BIOS/UEFI-Einstellungen

Um vom Debian-Installationsmedium zu starten, müssen Sie möglicherweise die BIOS/UEFI-Einstellungen ändern.

## BIOS/UEFI aufrufen

Drücken Sie beim Start die entsprechende Taste Ihres Herstellers:

| Hersteller | BIOS-Taste | Boot-Menü-Taste |
|-----------|-----------|----------------|
| Dell | F2 | F12 |
| HP | F10 | F9 |
| Lenovo | F1 / Enter | F12 |
| ASUS | F2 / Del | F8 |
| MSI | Del | F11 |
| Acer | F2 | F12 |

## Startreihenfolge ändern

1. BIOS/UEFI aufrufen
2. Abschnitt "Boot" oder "Starten" finden
3. "USB-Laufwerk" an die erste Stelle verschieben
4. Speichern und neu starten (normalerweise F10)

## Wichtige UEFI-Einstellungen

### Secure Boot aktivieren/deaktivieren

```
UEFI → Security → Secure Boot → Disabled
```

::: tip Hinweis
Debian 13 unterstützt Secure Boot. Es ist in der Regel nicht notwendig, es zu deaktivieren. Ältere Systeme könnten jedoch eine Deaktivierung erfordern.
:::

## Nach der Installation

Denken Sie daran, die Startreihenfolge nach der Installation wieder auf den ursprünglichen Zustand zurückzusetzen.
