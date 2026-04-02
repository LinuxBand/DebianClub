---
title: Configuración del primer arranque
description: Configuración inicial después de instalar Debian 13
---

# Configuración del primer arranque

## ¡Bienvenido a Debian!

¡Felicitaciones por instalar Debian 13 con éxito!

## Inicio de sesión inicial

```bash
# Si instaló sin entorno de escritorio
debian login: nombre_usuario
Password: [ingrese su contraseña]
```

## Configuración de red

```bash
# Configurar WiFi desde la línea de comandos
nmcli dev wifi list
nmcli dev wifi connect "Nombre-WiFi" password "su-contraseña"

# Verificar conexión
ping -c 3 debian.org
```

## Actualizar el sistema

```bash
# Actualizar lista de paquetes
sudo apt update

# Actualizar todos los paquetes
sudo apt upgrade -y

# Actualización completa de distribución
sudo apt full-upgrade -y
```

## Configurar sudo

```bash
# Instalar sudo si es necesario
su -c "apt install sudo"

# Agregar usuario al grupo sudo
su -c "usermod -aG sudo su_nombre_usuario"
```

## Instalar herramientas esenciales

```bash
# Herramientas básicas
sudo apt install curl wget git vim htop -y

# Códecs multimedia
sudo apt install ffmpeg vlc -y
```

## Próximos pasos

- [Configuración del sistema](/es/basics/configuration)
- [Entornos de escritorio](/es/basics/desktop-environments)
