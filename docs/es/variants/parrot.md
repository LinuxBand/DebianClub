---
title: Parrot OS — Derivada de Debian
description: Una distribución de lanzamiento continuo basada en Debian que equilibra herramientas de investigación de seguridad con un escritorio cotidiano capaz, ofreciendo ediciones Security, Home y HTB.
---

# Parrot OS

Parrot OS (también conocido como ParrotSec) es una distribución de lanzamiento continuo basada en Debian desarrollada por el equipo italiano Frozenbox. A diferencia de las distribuciones puramente enfocadas en seguridad, Parrot OS está diseñado para ser tanto una plataforma capaz de investigación de seguridad como un escritorio cómodo para uso diario. Ofrece varias ediciones distintas para atender diferentes flujos de trabajo.

## Información Básica

| Atributo | Detalles |
|---|---|
| Basada en | Debian testing (rolling) |
| Ciclo de versiones | Lanzamiento continuo |
| Escritorio predeterminado | MATE (Security/Home), KDE Plasma (opcional) |
| Usuarios objetivo | Investigadores de seguridad, desarrolladores, usuarios de escritorio preocupados por la privacidad |
| Sitio web | [https://parrotsec.org](https://parrotsec.org) |

## Características Principales

- **Múltiples ediciones con propósito específico**: Security (kit completo de pentesting), Home (escritorio diario ligero), HTB (preconfigurado para Hack The Box) y ediciones Cloud/Docker para uso en servidores y contenedores.
- **Más ligero que Kali**: El escritorio MATE combinado con los ajustes de kernel de Parrot mantiene el uso de RAM más bajo que Kali Linux. El sistema funciona cómodamente con 2 GB de RAM.
- **Herramientas de privacidad integradas**: AnonSurf (enrutamiento Tor de un clic para todo el tráfico), sandboxing de aplicaciones Firejail y OnionShare están incluidos, dando a los usuarios cotidianos controles de privacidad fuertes sin configuración adicional.
- **Edición Home amigable para desarrolladores**: La edición Home se entrega sin herramientas de seguridad pesadas pero incluye runtimes de programación populares y utilidades de desarrollo, lo que la convierte en un driver diario viable para programadores.
- **Actualizaciones continuas**: Basado en Debian testing, el software se mantiene actualizado sin reinstalaciones periódicas.

## Relación con Debian

Parrot OS está basado en Debian testing y obtiene la mayoría de los paquetes directamente de esa rama, complementado por el repositorio de Parrot (que contiene herramientas de seguridad, software propietario y paquetes con versiones mejoradas). El equipo de Parrot mantiene parches de kernel con seguridad reforzada y su propio repositorio de herramientas. Dado que sigue Debian testing en lugar de stable, las versiones del software son más actuales pero la estabilidad del sistema es ligeramente menor que las distribuciones basadas en stable.

## Primeros Pasos

```bash
# Descarga la ISO de la edición apropiada desde: https://parrotsec.org/download/

# Después de la instalación, actualiza usando el comando de actualización de Parrot
sudo parrot-upgrade
# Equivalente a:
sudo apt update && sudo apt full-upgrade -y

# Habilita AnonSurf para enrutar todo el tráfico a través de Tor
sudo anonsurf start
sudo anonsurf status
sudo anonsurf stop

# Instala herramientas de seguridad adicionales según sea necesario
sudo apt install metasploit-framework burpsuite -y
```

## ¿Para Quién Es?

- Profesionales de seguridad que quieren un entorno que también sirva como escritorio de uso diario
- Estudiantes en Hack The Box, TryHackMe o plataformas similares (la edición HTB está preconfigurada)
- Usuarios conscientes de la privacidad que quieren enrutamiento Tor de un clic sin un sistema solo live
- Desarrolladores que quieren una base Debian de lanzamiento continuo moderna con herramientas de privacidad integradas

::: tip Parrot OS vs. Kali Linux
Kali Linux prioriza la completitud de su biblioteca de herramientas de seguridad y está enfocado estrictamente en pentesting profesional. Parrot OS es mejor si quieres una estación de trabajo de propósito general que también maneje trabajo de seguridad, especialmente en hardware de especificaciones más bajas.
:::

## Enlaces Relacionados

- Sitio web: [https://parrotsec.org](https://parrotsec.org)
- Descarga: [https://parrotsec.org/download/](https://parrotsec.org/download/)
- Documentación: [https://parrotsec.org/docs/](https://parrotsec.org/docs/)
- GitLab (fuente): [https://gitlab.com/parrotsec](https://gitlab.com/parrotsec)

---

## Próximos Pasos

Vuelve a la [visión general de Derivadas de Debian](/es/variants/) para explorar otras distribuciones basadas en Debian.
