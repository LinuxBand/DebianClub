---
title: MX Linux — Derivada de Debian
description: Un favorito perenne de DistroWatch que combina la fiabilidad de Debian stable con MX Tools y una base antiX.
---

# MX Linux

MX Linux es una distribución de escritorio colaborativa desarrollada por las comunidades antiX y el antiguo MEPIS. Desde su primera versión en 2014, ha ocupado consistentemente los primeros puestos en las listas de descargas de DistroWatch. Construida sobre Debian stable, añade la suite MX Tools sobre una base antiX para ofrecer un sistema estable, capaz y acogedor para usuarios de todos los niveles de experiencia.

## Información Básica

| Atributo | Detalles |
|---|---|
| Basada en | Debian stable (con componentes base de antiX) |
| Ciclo de versiones | Sigue Debian stable; versiones principales aproximadamente cada 2 años |
| Escritorio predeterminado | Xfce (insignia), KDE Plasma, Fluxbox |
| Usuarios objetivo | Usuarios intermedios, propietarios de hardware antiguo, buscadores de estabilidad |
| Sitio web | [https://mxlinux.org](https://mxlinux.org) |

## Características Principales

- **Suite MX Tools**: MX Package Installer (gestor de software gráfico), MX Snapshot (crea una ISO arrancable de tu sistema en funcionamiento), MX Boot Options y una docena más de utilidades que facilitan el mantenimiento rutinario.
- **Soporte de sistema init dual**: Ofrece tanto systemd como sysvinit en el momento de la instalación; los usuarios pueden elegir según sus preferencias, una rareza entre las distribuciones principales.
- **Moderadamente ligero**: La edición Xfce típicamente usa entre 500 y 700 MB de RAM en reposo — más pesado que antiX pero más ligero que la mayoría de los escritorios completos, funcionando sin problemas en hardware de la última década.
- **Potente entorno Live**: El modo Live admite almacenamiento persistente (guardando archivos y configuraciones en USB), y MX Snapshot puede reempaquetar la sesión live en una nueva ISO.
- **Base estable de Debian**: Hereda la destacada fiabilidad de Debian stable, con el MX Test Repo que proporciona acceso a versiones más recientes de aplicaciones seleccionadas.

## Relación con Debian

MX Linux se basa directamente en Debian stable; los paquetes provienen de los repositorios oficiales de Debian, complementados por el repositorio de MX Linux (que aloja MX Tools y versiones de software más recientes seleccionadas). Los componentes de antiX (como el marco de arranque live) se incluyen como paquetes independientes. Debido a que se utiliza la base Debian stable, las versiones de los paquetes tienden a ser conservadoras, pero la estabilidad del sistema es excepcional.

## Primeros Pasos

```bash
# Descarga la ISO desde: https://mxlinux.org/mx-iso-torrents/
# Disponible en 32 y 64 bits, en ediciones Xfce, KDE y Fluxbox

# Después de la instalación, actualiza el sistema
sudo apt update && sudo apt upgrade -y

# Abre el MX Package Installer (gráfico)
mx-packageinstaller

# O instala software a través de la línea de comandos como siempre
sudo apt install <nombre-del-paquete>

# Lista las MX Tools instaladas
ls /usr/bin/mx*

# Crea una instantánea del sistema
sudo mx-snapshot
```

## ¿Para Quién Es?

- Usuarios intermedios que quieren la estabilidad de Debian con un conjunto de herramientas gráficas más amigable
- Personas que ejecutan Linux en hardware antiguo (más de 5 años) pero que aún quieren un escritorio completo
- Usuarios que quieren elegir entre systemd y sysvinit
- Cualquiera que sienta curiosidad por una de las distribuciones más consistentemente populares de la comunidad Linux

## Enlaces Relacionados

- Sitio web: [https://mxlinux.org](https://mxlinux.org)
- Descarga: [https://mxlinux.org/mx-iso-torrents/](https://mxlinux.org/mx-iso-torrents/)
- Manuales: [https://mxlinux.org/manuals/](https://mxlinux.org/manuals/)
- Foros de la comunidad: [https://forum.mxlinux.org](https://forum.mxlinux.org)

---

## Próximos Pasos

Vuelve a la [visión general de Derivadas de Debian](/es/variants/) para explorar otras distribuciones basadas en Debian.
