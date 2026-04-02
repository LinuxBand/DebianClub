---
title: Versionssupport-Ende (EOL)
description: Informationen zum Lebenszyklus und den End-of-Life-Daten der einzelnen Debian-Versionen.
---

# Debian-Versionssupport-Ende (EOL)

Das Verständnis des Lebenszyklus der von Ihnen verwendeten Debian-Version ist entscheidend, um sicherzustellen, dass Ihr System weiterhin Sicherheits­updates und technischen Support erhält.

## Debian-Versionsmodelle

Debian hat im Wesentlichen drei Versions­zweige:

-   **Stable**: Dies ist das offizielle Release und wird für Produktions­umgebungen empfohlen. Es wurde ausgiebig getestet und bietet die höchste Stabilität und Sicherheit.
-   **Testing**: Dieser Zweig enthält Pakete, die für das nächste Stable-Release vorgesehen sind. Er ist relativ stabil, aber nicht so zuverlässig wie die `stable`-Version. Er eignet sich für Entwickler und fortgeschrittene Benutzer, die neuere Software wünschen.
-   **Unstable (Codename Sid)**: Dies ist der aktive Entwicklungs­zweig für Debian-Pakete. Er enthält die neueste Software, kann jedoch Stabilitäts­probleme aufweisen und wird für unternehmens­kritische Systeme nicht empfohlen.

## Langzeit­support (LTS)

Nach seiner offiziellen Veröffentlichung erhält jede stabile Debian-Version etwa 3 Jahre lang Sicherheits­support vom Debian-Sicherheits­team.

Nach diesem Zeitraum übernimmt ein unabhängiges Team aus Freiwilligen und Unternehmen die Bereitstellung von zusätzlichem Langzeit­support (LTS), in der Regel für weitere 2 Jahre. Das bedeutet, dass jedes stabile Debian-Release insgesamt ca. 5 Jahre lang Sicherheits­updates erhält.

## EOL-Schnell­referenz­tabelle

Die folgende Tabelle enthält die Veröffentlichungs- und End-of-Life-Daten der aktuellen Debian-Versionen.

| Codename                 | Veröffentlichungs­datum | Ende des regulären Supports | Ende des Langzeit­supports (LTS) |
| :----------------------- | :---------------------- | :-------------------------- | :-------------------------------- |
| **Debian 13 (Trixie)**   | 2025-08-09              | ~ August 2028               | ~ August 2030                     |
| **Debian 12 (Bookworm)** | 2023-06-10              | ~ Juni 2026                 | ~ Juni 2028                       |
| **Debian 11 (Bullseye)** | 2021-08-14              | Juli 2024                   | 2026-06-30                        |
| **Debian 10 (Buster)**   | 2019-07-06              | 2022-09-10                  | 2024-06-30                        |
| **Debian 9 (Stretch)**   | 2017-06-17              | 2020-07-06                  | 2022-06-30                        |
| **Debian 8 (Jessie)**    | 2015-04-25              | 2018-06-17                  | 2020-06-30                        |

::: tip
Daten mit `~` sind Schätzungen und können leichten Änderungen unterliegen. Bitte verfolgen Sie die offiziellen Debian-Ankündigungen für die genauesten Informationen.
:::

Es wird dringend empfohlen, das Upgrade auf eine neuere stabile Version zu planen und durchzuführen, bevor der LTS-Zeitraum Ihrer aktuellen Version endet, um die Sicherheit Ihres Systems zu gewährleisten.
