---
title: "Guía de uso de Backports"
description: "Guía completa para instalar de forma segura versiones más recientes de software en Debian 13 estable mediante trixie-backports"
---

# Guía de uso de Backports

Debian Stable es conocido por su estabilidad, pero las versiones de software son relativamente conservadoras. **Backports** es una solución de compromiso oficial de Debian: **recompila** software más reciente de `testing` para la versión estable actual, permitiendo instalar paquetes individuales más modernos sin abandonar Stable.

Para Debian 13, el repositorio correspondiente es **`trixie-backports`**.

## Cuándo usar Backports

- ✅ Cuando necesitas una versión más reciente de algún software (por ejemplo, un kernel nuevo para soportar hardware nuevo, LibreOffice más reciente).
- ✅ Deseas mantener el sistema globalmente estable y solo actualizar ciertos paquetes.
- ❌ No uses backports para instalar todo con versiones nuevas — perderías la ventaja de estabilidad de Stable.

> El software en Backports **no recibe el soporte habitual del equipo de seguridad de Debian** y tiene menor prioridad que Stable. Instala solo cuando lo necesites.

## Habilitar trixie-backports

### Método 1: formato deb822 (recomendado)

Crea `/etc/apt/sources.list.d/trixie-backports.sources`:

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

### Método 2: formato tradicional de una línea

También puedes añadir `Suites` a la línea `Suites` de `debian.sources` oficial (ej. `Suites: trixie trixie-updates trixie-backports`), o agregar en `sources.list`:

```
deb http://deb.debian.org/debian trixie-backports main contrib non-free non-free-firmware
```

Para conocer las diferencias entre ambos formatos, consulta [Formato de fuentes deb822](/es/administration/deb822).

## Instalar software de backports

Una vez habilitado, la prioridad predeterminada de backports es **menor** que la de Stable, por lo que un `apt install` normal **no** instalará automáticamente desde backports. Debes usar `-t` (`--target-release`) explícitamente:

```bash
# Instalar la última versión de LibreOffice desde backports
sudo apt install -t trixie-backports libreoffice

# Instalar un kernel más reciente (útil para hardware nuevo)
sudo apt install -t trixie-backports linux-image-amd64
```

Posteriormente, `sudo apt upgrade` actualizará los paquetes ya instalados desde backports a sus nuevas versiones en backports; el resto del software seguirá usando Stable.

## Control fino con APT Pinning (opcional)

Si deseas que ciertos paquetes se instalen **por defecto** desde backports, crea `/etc/apt/preferences.d/backports`:

```
# La prioridad predeterminada de backports es menor que la de stable, para evitar actualizar todos los paquetes automáticamente
Package: *
Pin: release n=trixie-backports
Pin-Priority: 400

# Solo los paquetes relacionados con el kernel se instalan preferentemente desde backports (prioridad mayor que 500 de stable)
Package: linux-image-* linux-headers-*
Pin: release n=trixie-backports
Pin-Priority: 501
```

- Prioridad `< 500`: solo se instala con `-t` explícito.
- Prioridad `> 500`: se prefiere automáticamente la versión de backports.

## Desinstalación y reversión

Los paquetes de backports se pueden desinstalar como cualquier paquete normal. Para volver a la versión de Stable, puedes especificar el número de versión o desinstalar y luego reinstalar desde Stable:

```bash
sudo apt install <nombre-del-paquete>/trixie
```

## Resumen

- En Debian 13, usa `trixie-backports` para obtener software más reciente mientras mantienes el sistema estable.
- La instalación requiere explícitamente `apt install -t trixie-backports <paquete>`, no se actualizará automáticamente.
- Habilita e instala solo cuando sea necesario; backports no recibe soporte de seguridad habitual.

Lectura adicional: [Formato de fuentes deb822](/es/administration/deb822) · [Gestión de paquetes APT](/es/administration/packages)
