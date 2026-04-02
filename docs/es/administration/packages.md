---
title: Gestión de paquetes APT
description: Domina el sistema de gestión de paquetes APT de Debian 13, aprende a instalar, actualizar y administrar paquetes de software
---

# Sistema de gestión de paquetes APT

APT (Advanced Package Tool) es la herramienta central de gestión de paquetes del sistema Debian. Este tutorial te enseñará cómo usar APT para instalar, actualizar y eliminar paquetes de software.

## 🎯 Conceptos básicos de APT

### ¿Qué es APT?

APT es la herramienta de gestión de paquetes del sistema Debian, responsable de:
- 📦 **Instalación de paquetes**: descargar e instalar software desde repositorios
- 🔄 **Gestión de dependencias**: resolver automáticamente las dependencias de paquetes
- ⬆️ **Actualización del sistema**: actualizar paquetes ya instalados
- 🗑️ **Eliminación de software**: desinstalar software no necesario de forma segura

### Repositorios de software (Repository)

Los repositorios son almacenes de paquetes de software:

```bash
# Tipos principales de repositorios
main        # Software libre mantenido oficialmente por Debian
contrib     # Software libre que depende de software no libre
non-free    # Software no libre
security    # Actualizaciones de seguridad
updates     # Actualizaciones para la versión estable
```

## 🔧 Comandos básicos de APT

### Actualizar la lista de paquetes

Antes de usar APT, primero actualiza la lista de paquetes:

```bash
# Actualizar la lista de paquetes (recomendado ejecutar antes de cada uso)
sudo apt update

# Ejemplo de salida:
# 命中:1 http://deb.debian.org/debian bookworm InRelease
# 获取:2 http://security.debian.org/debian-security bookworm-security InRelease [48.0 kB]
# 读取软件包列表... 完成
```

::: tip 💡 Consejo para principiantes
`apt update` solo actualiza la lista de paquetes, no instala ni actualiza ningún software realmente. Este comando es similar a "refrescar el catálogo de productos de una tienda".
:::

### Instalar paquetes

#### Instalar un solo paquete

```bash
# Comando básico de instalación
sudo apt install nombre_del_paquete

# Ejemplo: instalar editor de texto
sudo apt install vim

# Instalar mostrando información detallada
sudo apt install -v firefox-esr
```

#### Instalar múltiples paquetes

```bash
# Instalar varios paquetes a la vez
sudo apt install git curl wget

# Instalar versión específica
sudo apt install python3=3.11.2-1

# Reinstalar (reparar instalación dañada)
sudo apt install --reinstall firefox-esr
```

#### Instalar paquetes sugeridos

```bash
# Instalar incluyendo paquetes sugeridos
sudo apt install --install-suggests libreoffice

# No instalar paquetes sugeridos (comportamiento por defecto)
sudo apt install --no-install-suggests gimp
```

### Buscar paquetes

#### Búsqueda básica

```bash
# Buscar en nombres y descripciones de paquetes
apt search palabra_clave

# Ejemplo: buscar editores
apt search editor

# Buscar funcionalidad específica
apt search "media player"
```

#### Búsqueda precisa

```bash
# Buscar solo en nombres de paquetes
apt search --names-only firefox

# Buscar usando expresiones regulares
apt search '^python3-'
```

### Mostrar información de paquetes

```bash
# Mostrar información detallada del paquete
apt show nombre_del_paquete

# Ejemplo
apt show firefox-esr

# Mostrar información de versión instalada
apt list --installed firefox-esr

# Mostrar versiones disponibles
apt list firefox-esr
```

### Actualizar el sistema

#### Actualizar paquetes instalados

```bash
# Actualizar todos los paquetes que tengan actualizaciones disponibles
sudo apt upgrade

# Actualizar paquete específico
sudo apt upgrade firefox-esr

# Actualización completa (incluye eliminar paquetes conflictivos)
sudo apt full-upgrade
```

#### Actualizaciones de seguridad

```bash
# Instalar solo actualizaciones de seguridad
sudo apt upgrade -s | grep security
sudo apt install $(apt list --upgradable 2>/dev/null | grep security | cut -d/ -f1)
```

### Eliminar paquetes

#### Remover paquetes

```bash
# Remover paquete (conserva archivos de configuración)
sudo apt remove nombre_del_paquete

# Ejemplo
sudo apt remove firefox-esr

# Eliminar completamente (incluye archivos de configuración)
sudo apt purge nombre_del_paquete

# Remover automáticamente dependencias no necesarias
sudo apt autoremove
```

#### Limpiar el sistema

```bash
# Limpiar caché de archivos de paquetes descargados
sudo apt clean

# Limpiar solo archivos de paquetes obsoletos
sudo apt autoclean

# Remover paquetes huérfanos
sudo apt autoremove --purge
```

## 📋 Paquetes recomendados comunes

### Herramientas de desarrollo

```bash
# Herramientas básicas de desarrollo
sudo apt install build-essential

# Control de versiones Git
sudo apt install git

# Editores de código
sudo apt install vim nano code

# Lenguajes de programación
sudo apt install python3 python3-pip nodejs npm
```

### Herramientas multimedia

```bash
# Reproductores de audio
sudo apt install audacity rhythmbox

# Reproductores de video
sudo apt install vlc mpv

# Edición de imágenes
sudo apt install gimp inkscape

# Códecs de audio y video
sudo apt install ubuntu-restricted-extras
```

### Herramientas de red

```bash
# Diagnóstico de red
sudo apt install net-tools curl wget

# Herramientas de descarga
sudo apt install aria2 youtube-dl

# Navegadores
sudo apt install firefox-esr chromium
```

### Software de oficina

```bash
# Suite ofimática LibreOffice
sudo apt install libreoffice

# Lectores de PDF
sudo apt install evince okular

# Mapas mentales
sudo apt install freemind
```

## ⚙️ Gestión de repositorios

### Ver repositorios actuales

```bash
# Ver configuración de repositorios
cat /etc/apt/sources.list

# Ver repositorios adicionales
ls /etc/apt/sources.list.d/
```

### Editar repositorios

```bash
# Editar archivo principal de repositorios
sudo nano /etc/apt/sources.list

# Configuración completa de repositorios para Debian 13 (Trixie) (incluye software no libre y firmware):
deb http://deb.debian.org/debian trixie main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian trixie main contrib non-free non-free-firmware

deb http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
deb-src http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware

deb http://deb.debian.org/debian trixie-updates main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian trixie-updates main contrib non-free non-free-firmware
```

::: tip Diferencia entre non-free y non-free-firmware
- `non-free-firmware`: Firmware de hardware (WiFi, tarjetas gráficas, Bluetooth, etc.), componente especializado añadido en Debian 13
- `non-free`: Otro software no libre (como envoltorios de controladores NVIDIA, fuentes propietarias, etc.)

Si necesitas instalar software no libre como controladores NVIDIA (`nvidia-driver`), debes conservar el componente `non-free`.
:::

### Usar mirrors chinos

Para mejorar la velocidad de descarga, puedes usar mirrors chinos:

```bash
# Hacer copia de seguridad del archivo original
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# Editar repositorios
sudo nano /etc/apt/sources.list
```

**Mirror de la Universidad de Tsinghua:**
```bash
# Mirror de la Universidad de Tsinghua
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free-firmware
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian-security trixie-security main contrib non-free-firmware
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security trixie-security main contrib non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free-firmware
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free-firmware
```

**Mirror de la Universidad de Ciencia y Tecnología de China:**
```bash
# Mirror de la Universidad de Ciencia y Tecnología de China
deb https://mirrors.ustc.edu.cn/debian/ trixie main contrib non-free-firmware
deb-src https://mirrors.ustc.edu.cn/debian/ trixie main contrib non-free-firmware

deb https://mirrors.ustc.edu.cn/debian-security/ trixie-security main contrib non-free-firmware
deb-src https://mirrors.ustc.edu.cn/debian-security/ trixie-security main contrib non-free-firmware

deb https://mirrors.ustc.edu.cn/debian/ trixie-updates main contrib non-free-firmware
deb-src https://mirrors.ustc.edu.cn/debian/ trixie-updates main contrib non-free-firmware
```

### Añadir repositorios de terceros

#### Añadir claves GPG

```bash
# Descargar y añadir clave GPG
wget -qO - https://example.com/key.gpg | sudo apt-key add -

# Método moderno (recomendado)
wget -qO - https://example.com/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/example-keyring.gpg
```

#### Añadir repositorios

```bash
# Crear nuevo archivo de repositorio
echo "deb [signed-by=/usr/share/keyrings/example-keyring.gpg] https://example.com/debian stable main" | sudo tee /etc/apt/sources.list.d/example.list

# Actualizar lista de paquetes
sudo apt update
```

## 🔍 Operaciones avanzadas de APT

### Dependencias de paquetes

```bash
# Ver dependencias de un paquete
apt depends nombre_del_paquete

# Ver qué paquetes dependen de este
apt rdepends nombre_del_paquete

# Simular instalación (no instala realmente)
sudo apt install -s nombre_del_paquete
```

### Operaciones con archivos de paquetes

```bash
# Descargar archivo de paquete sin instalar
apt download nombre_del_paquete

# Ver lista de archivos dentro del paquete
dpkg -L nombre_del_paquete

# Encontrar a qué paquete pertenece un archivo
dpkg -S /ruta/al/archivo

# Ver scripts de instalación del paquete
apt-get source nombre_del_paquete
```

### Control de versiones

```bash
# Bloquear versión del paquete (evitar actualización)
sudo apt-mark hold nombre_del_paquete

# Desbloquear versión
sudo apt-mark unhold nombre_del_paquete

# Ver paquetes bloqueados
apt-mark showhold

# Degradar paquete (requiere versión antigua disponible)
sudo apt install nombre_del_paquete=número_de_versión
```

## 🛡️ Seguridad y mejores prácticas

### Actualizaciones de seguridad

```bash
# Configurar actualizaciones automáticas de seguridad
sudo apt install unattended-upgrades

# Configurar actualizaciones automáticas
sudo dpkg-reconfigure unattended-upgrades

# Verificar manualmente actualizaciones de seguridad
sudo unattended-upgrade --dry-run
```

### Mantenimiento del sistema

```bash
# Comandos de mantenimiento periódico (recomendado ejecutar semanalmente)
sudo apt update && sudo apt upgrade
sudo apt autoremove
sudo apt autoclean

# Verificar integridad del sistema
sudo apt check

# Reparar paquetes dañados
sudo apt install -f
```

### Copias de seguridad y recuperación

```bash
# Exportar lista de paquetes instalados
dpkg --get-selections > paquetes-instalados.txt

# Restaurar lista de paquetes
sudo dpkg --set-selections < paquetes-instalados.txt
sudo apt-get dselect-upgrade
```

## 🆘 Resolución de problemas

### Problemas comunes

#### Error de clave GPG
```bash
# Problema: error NO_PUBKEY
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys ID_de_la_clave

# O usar método moderno
wget -qO - https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xID_de_la_clave | sudo gpg --dearmor -o /usr/share/keyrings/package-keyring.gpg
```

#### Problemas de dependencias de paquetes
```bash
# Reparar dependencias dañadas
sudo apt install -f

# Limpiar y reconfigurar
sudo dpkg --configure -a

# Forzar eliminación de paquete problemático
sudo dpkg --remove --force-remove-reinstreq nombre_del_paquete
```

#### Espacio en disco insuficiente
```bash
# Limpiar caché de paquetes
sudo apt clean

# Remover paquetes no necesarios
sudo apt autoremove --purge

# Encontrar archivos grandes
sudo du -h /var/cache/apt/archives/
```

## 📱 Gestión gráfica de paquetes

### Gestor de paquetes Synaptic

```bash
# Instalar gestor gráfico de paquetes
sudo apt install synaptic

# Ejecutar Synaptic
sudo synaptic
```

### Centro de software GNOME

```bash
# Instalar centro de software GNOME
sudo apt install gnome-software

# Iniciar centro de software
gnome-software
```

## Próximos pasos

Después de dominar la gestión de paquetes APT, puedes continuar aprendiendo:

1. [Gestión de servicios del sistema](/administration/services) - Administrar servicios del sistema
2. [Gestión de permisos de usuario](/administration/users) - Configuración de usuarios y permisos
3. [Configuración de red](/administration/network) - Configuración y administración de red

---

**¿Quieres aprender más técnicas de administración del sistema?** [Continúa aprendiendo sobre servicios del sistema →](/administration/services)