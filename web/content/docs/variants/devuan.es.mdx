---
title: Devuan — Derivada de Debian
description: Una bifurcación de Debian que reemplaza systemd con sysvinit, runit u OpenRC, preservando la libertad del sistema init.
---

# Devuan

Devuan (pronunciado "dev-one") es una bifurcación de Debian iniciada por el colectivo Veteran Unix Admins en 2015, en respuesta a que Debian 8 Jessie adoptó systemd como su sistema init predeterminado. La misión principal de Devuan es simple: proporcionar una distribución basada en Debian que no dependa de systemd, dando a los usuarios la libertad de elegir sysvinit, runit u OpenRC como su sistema init.

## Información Básica

| Atributo | Detalles |
|---|---|
| Basada en | Debian (dependencias de systemd eliminadas/reemplazadas) |
| Ciclo de versiones | Se alinea con los lanzamientos de Debian stable |
| Escritorio predeterminado | Xfce (predeterminado), GNOME, KDE, LXQt disponibles |
| Usuarios objetivo | Usuarios que prefieren init tradicional, administradores de sistemas, desarrolladores embebidos |
| Sitio web | [https://www.devuan.org](https://www.devuan.org) |

## Características Principales

- **Libertad del sistema init**: Elige sysvinit (tradicional), runit (rápido, ligero) u OpenRC (el marco init usado por Gentoo) en el momento de la instalación — sin implicación de systemd.
- **Compatibilidad casi completa con Debian**: Los paquetes de Devuan son casi totalmente compatibles con los paquetes de Debian. Solo los paquetes con dependencias duras de systemd son parcheados o reemplazados. La mayoría de la documentación y comandos de Debian se aplican directamente.
- **Paridad de versiones con Debian**: Los nombres y números de versión de Devuan reflejan los de Debian — Devuan 1 Jessie = Debian 8, Devuan 5 Daedalus = Debian 12 Bookworm — haciendo que la relación entre los dos sea fácil de entender.
- **Amigable para contenedores y sistemas embebidos**: Un entorno sin systemd usa menos recursos y arranca más rápido en contenedores (Docker/LXC) y en hardware embebido donde la complejidad de systemd no es deseada.
- **Variedad de medios de instalación**: ISO de instalador estándar, imágenes Live, Netinstall e imágenes para dispositivos ARM son todos proporcionados.

## Relación con Debian

Devuan es una bifurcación directa de Debian en lugar de una derivada. Su repositorio de paquetes está construido sobre el de Debian, pero los paquetes que introducen dependencias duras de systemd son parcheados. La compatibilidad binaria se mantiene a través de `libelogind0`, un reemplazo que satisface `libsystemd0` a nivel binario sin ejecutar systemd. Esto significa que la gran mayoría del software de Debian funciona sin modificaciones en Devuan, aunque los escritorios profundamente integrados con systemd como GNOME moderno requieren adaptación adicional.

## Primeros Pasos

```bash
# Descarga la ISO desde: https://www.devuan.org/get-devuan
# Opciones: netinstall, desktop-live, minimal-live e imágenes ARM

# Después de la instalación, actualiza el sistema
sudo apt update && sudo apt full-upgrade -y

# Verifica qué sistema init está en ejecución
cat /proc/1/comm
# Debería mostrar: init (sysvinit), runit, o openrc-init

# Gestión de servicios con sysvinit
sudo service nginx start
sudo service nginx status
sudo update-rc.d nginx enable

# Gestión de servicios con runit
sudo sv start nginx
sudo sv status nginx
```

## ¿Para Quién Es?

- Administradores y usuarios avanzados que filosófica o prácticamente prefieren los sistemas init UNIX tradicionales
- Administradores de sistemas que necesitan un entorno mínimo y predecible para contenedores o sistemas embebidos
- Aprendices de Linux que quieren entender y controlar el proceso de arranque completo sin la abstracción de systemd
- Usuarios con servidores más antiguos o hardware poco común que tienen problemas de compatibilidad conocidos con systemd

## Enlaces Relacionados

- Sitio web: [https://www.devuan.org](https://www.devuan.org)
- Descarga: [https://www.devuan.org/get-devuan](https://www.devuan.org/get-devuan)
- Documentación: [https://www.devuan.org/os/documentation](https://www.devuan.org/os/documentation)
- Listas de correo y comunidad: [https://www.devuan.org/os/community](https://www.devuan.org/os/community)

---

## Próximos Pasos

Vuelve a la [visión general de Derivadas de Debian](/es/variants/) para explorar otras distribuciones basadas en Debian.
