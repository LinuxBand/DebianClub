---
title: Gestión de Seguridad
description: Aprende a gestionar la seguridad de un sistema Debian, incluyendo control de acceso de usuarios, configuración de cortafuegos, actualizaciones automáticas y detección de intrusiones.
---

# Gestión de Seguridad

Garantizar la seguridad de un sistema Debian es una tarea central en la administración de sistemas. Esta guía cubrirá varias áreas clave para ayudarte a fortalecer tu sistema y protegerlo contra amenazas potenciales.

## 🔐 Usuarios y Control de Acceso

Limitar el acceso al sistema es la primera línea de defensa en seguridad.

### Aplicar Políticas de Contraseñas Fuertes

Utiliza el módulo `libpam-pwquality` para obligar a los usuarios a crear contraseñas más seguras.

1.  **Instalar el módulo**:
    ```bash
    sudo apt update
    sudo apt install libpam-pwquality
    ```

2.  **Configurar la política**:
    Edita el archivo `/etc/security/pwquality.conf` para definir las reglas de las contraseñas.
    ```ini
    # Configuración de ejemplo:
    minlen = 10                  # Longitud mínima de 10
    dcredit = -1                 # Al menos 1 dígito
    ucredit = -1                 # Al menos 1 letra mayúscula
    lcredit = -1                 # Al menos 1 letra minúscula
    ocredit = -1                 # Al menos 1 carácter especial
    difok = 3                    # Al menos 3 caracteres diferentes de la contraseña anterior
    ```

### Fortalecer la Seguridad de SSH

SSH es el método más común para acceder a servidores de forma remota. Aquí hay algunas recomendaciones para fortalecerlo:

1.  **Editar el archivo de configuración de SSH**:
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

2.  **Configuración recomendada**:
    - **Deshabilitar inicio de sesión root**: `PermitRootLogin no`
    - **Deshabilitar autenticación por contraseña (recomendado usar claves)**: `PasswordAuthentication no`
    - **Habilitar autenticación por clave pública**: `PubkeyAuthentication yes`
    - **Cambiar el puerto predeterminado (opcional)**: `Port 2222`

3.  **Reiniciar el servicio SSH**:
    ```bash
    sudo systemctl restart sshd
    ```

## 🔥 Configuración del Cortafuegos (UFW)

Debian no habilita un cortafuegos por defecto. `UFW` (Uncomplicated Firewall) es una herramienta de interfaz amigable. En Debian 13, UFW utiliza el framework `nftables` en segundo plano (compatible con la sintaxis antigua de `iptables`).

1.  **Instalar UFW**:
    ```bash
    sudo apt install ufw
    ```

2.  **Configurar reglas básicas**:
    ```bash
    sudo ufw default deny incoming   # Denegar todas las conexiones entrantes
    sudo ufw default allow outgoing  # Permitir todas las conexiones salientes
    sudo ufw allow ssh               # Permitir conexiones SSH (o el puerto que hayas cambiado)
    sudo ufw allow http              # Si es un servidor web, permitir HTTP
    sudo ufw allow https             # Permitir HTTPS
    ```

3.  **Habilitar UFW**:
    ```bash
    sudo ufw enable
    ```
    El sistema advertirá que esto podría interrumpir conexiones SSH existentes; confirma para continuar.

4.  **Verificar el estado**:
    ```bash
    sudo ufw status verbose
    ```

## 🔄 Actualizaciones de Seguridad Automáticas

Aplicar parches de seguridad de manera oportuna es crucial. `unattended-upgrades` puede instalar actualizaciones de seguridad automáticamente.

1.  **Instalar**:
    ```bash
    sudo apt install unattended-upgrades
    ```

2.  **Habilitar**:
    Ejecuta el asistente de configuración, que creará un archivo de configuración básico.
    ```bash
    sudo dpkg-reconfigure -plow unattended-upgrades
    ```
    Selecciona "Sí" en el cuadro de diálogo que aparece.

3.  **Ajustar la configuración (opcional)**:
    Puedes editar el archivo `/etc/apt/apt.conf.d/50unattended-upgrades` para personalizar el comportamiento de las actualizaciones, por ejemplo, habilitando reinicios automáticos.

## 🛡️ Protección contra Intrusiones (Fail2Ban)

`Fail2Ban` monitorea archivos de registro y actualiza automáticamente las reglas del cortafuegos para bloquear direcciones IP basándose en comportamientos sospechosos (como múltiples intentos de inicio de sesión fallidos).

1.  **Instalar Fail2Ban**:
    ```bash
    sudo apt install fail2ban
    ```

2.  **Crear archivo de configuración local**:
    No modifiques directamente los archivos `.conf`. En su lugar, crea un archivo `.local` para sobrescribir la configuración.
    ```bash
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    sudo nano /etc/fail2ban/jail.local
    ```

3.  **Configurar protección SSH**:
    En `jail.local`, encuentra la sección `[sshd]` y asegúrate de que `enabled = true`. Puedes ajustar `maxretry` (número máximo de intentos) y `bantime` (duración del bloqueo).
    ```ini
    [sshd]
    enabled = true
    port    = ssh
    maxretry = 3
    bantime = 3600  # Bloquear durante 1 hora
    ```

4.  **Reiniciar el servicio**:
    ```bash
    sudo systemctl restart fail2ban
    ```

## 📝 Gestión y Auditoría de Registros

Revisar regularmente los registros del sistema es clave para detectar actividades anómalas.

- **Usar `journalctl` para ver registros**:
  ```bash
  # Ver todos los registros (de más antiguo a más reciente)
  journalctl

  # Monitorear registros en tiempo real
  journalctl -f

  # Ver registros de un servicio específico, por ejemplo sshd
  journalctl -u sshd.service

  # Ver registros del kernel
  journalctl -k
  ```