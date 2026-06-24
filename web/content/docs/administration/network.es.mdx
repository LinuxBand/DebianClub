---
title: Configuración de Red
description: Guía de configuración de red en Debian 13, incluyendo red cableada, WiFi, firewall y resolución de problemas de red
---

# Configuración de Red en Debian 13

Este tutorial detalla cómo configurar y gestionar conexiones de red en Debian 13, incluyendo red cableada, red inalámbrica, servicios de red y resolución de problemas.

## 🌐 Fundamentos de Gestión de Red

### NetworkManager

NetworkManager es la herramienta de gestión de red más común en instalaciones de escritorio (instalada automáticamente a través de tareas como `task-gnome-desktop`), pero Debian no lo fuerza como la única opción: las instalaciones de servidor y mínimas suelen usar `ifupdown` (`/etc/network/interfaces`) o `systemd-networkd`:

```bash
# Verificar estado de NetworkManager
systemctl status NetworkManager

# Reiniciar NetworkManager
sudo systemctl restart NetworkManager

# Ver dispositivos de red
nmcli device status

# Ver conexiones de red
nmcli connection show
```

### Herramientas de Red Tradicionales

```bash
# Ver interfaces de red
ip addr show
ifconfig  # requiere instalar net-tools

# Ver tabla de rutas
ip route show
route -n  # requiere instalar net-tools

# Probar conectividad de red
ping google.com
traceroute google.com
```

## 🔌 Configuración de Red Cableada

### Configuración Automática (DHCP)

La mayoría de las redes cableadas usan DHCP para obtener una dirección IP automáticamente:

```bash
# Ver conexiones cableadas
nmcli connection show --active

# Crear conexión cableada
sudo nmcli connection add type ethernet con-name "Wired" ifname eth0

# Activar conexión
sudo nmcli connection up "Wired"

# Renovar dirección IP
sudo nmcli connection down "Wired" && sudo nmcli connection up "Wired"
```

### Configuración de IP Estática

```bash
# Crear conexión con IP estática
sudo nmcli connection add type ethernet con-name "Static" ifname eth0 \
    ip4 192.168.1.100/24 gw4 192.168.1.1

# Configurar servidores DNS
sudo nmcli connection modify "Static" ipv4.dns "8.8.8.8,8.8.4.4"

# Configurar método manual
sudo nmcli connection modify "Static" ipv4.method manual

# Activar conexión
sudo nmcli connection up "Static"
```

### Nomenclatura de Interfaces de Red

```bash
# Ver nombres de interfaces de red
ip link show

# Ver nombres de interfaces de red persistentes
ls /sys/class/net/

# Modificar nombre de interfaz (opcional)
sudo nano /etc/systemd/network/10-eth0.link
```

## 📶 Configuración de Red WiFi

### Configuración por Interfaz Gráfica

En GNOME:
1. Haz clic en el icono de red en la esquina superior derecha
2. Selecciona la red WiFi
3. Introduce la contraseña para conectarte

### Configuración por Línea de Comandos

```bash
# Escanear redes WiFi
nmcli device wifi list

# Conectar a red WiFi
sudo nmcli device wifi connect "NombreWiFi" password "contraseña"

# Conectar a red oculta
sudo nmcli device wifi connect "NombreWiFi" password "contraseña" hidden yes

# Ver conexiones WiFi guardadas
nmcli connection show

# Eliminar conexión WiFi
sudo nmcli connection delete "NombreWiFi"
```

### Creación de Punto de Acceso WiFi

```bash
# Crear punto de acceso WiFi
sudo nmcli device wifi hotspot ifname wlan0 ssid "MiPuntoAcceso" password "micontraseña"

# Ver estado del punto de acceso
nmcli device status

# Detener punto de acceso
sudo nmcli device disconnect wlan0
```

### Problemas con Controladores WiFi

```bash
# Verificar dispositivo WiFi
lspci | grep -i wifi
lsusb | grep -i wifi

# Verificar módulos inalámbricos
lsmod | grep wifi
iwconfig

# Instalar controladores WiFi adicionales
sudo apt install firmware-iwlwifi  # Tarjetas Intel
sudo apt install firmware-realtek  # Tarjetas Realtek
sudo apt install firmware-atheros  # Tarjetas Atheros

# Recargar módulos de red
sudo modprobe -r iwlwifi && sudo modprobe iwlwifi
```

## 🔧 Configuración Avanzada de Red

### Puente de Red

```bash
# Instalar herramientas de puente
sudo apt install bridge-utils

# Crear puente de red
sudo nmcli connection add type bridge con-name br0 ifname br0
sudo nmcli connection add type bridge-slave con-name br0-eth0 ifname eth0 master br0

# Configurar IP del puente
sudo nmcli connection modify br0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify br0 ipv4.gateway 192.168.1.1
sudo nmcli connection modify br0 ipv4.dns 8.8.8.8
sudo nmcli connection modify br0 ipv4.method manual

# Activar puente
sudo nmcli connection up br0
```

### Configuración de VLAN

```bash
# Crear interfaz VLAN
sudo nmcli connection add type vlan con-name vlan100 ifname eth0.100 \
    dev eth0 id 100

# Configurar IP de VLAN
sudo nmcli connection modify vlan100 ipv4.addresses 192.168.100.10/24
sudo nmcli connection modify vlan100 ipv4.method manual

# Activar VLAN
sudo nmcli connection up vlan100
```

### Agregación de Enlaces (Bonding)

```bash
# Crear interfaz de agregación
sudo nmcli connection add type bond con-name bond0 ifname bond0 \
    bond.options "mode=active-backup,miimon=1000"

# Agregar interfaces esclavas
sudo nmcli connection add type bond-slave con-name bond0-eth0 ifname eth0 master bond0
sudo nmcli connection add type bond-slave con-name bond0-eth1 ifname eth1 master bond0

# Configurar IP de la agregación
sudo nmcli connection modify bond0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify bond0 ipv4.method manual

# Activar agregación
sudo nmcli connection up bond0
```

## 🌍 Configuración de DNS

### systemd-resolved

`systemd-resolved` es el servicio de resolución DNS proporcionado por systemd, que puede funcionar con NetworkManager, pero **no está instalado ni activado por defecto en Debian**. Si estás usando un entorno de escritorio y NetworkManager está ejecutándose, entonces `/etc/resolv.conf` normalmente es gestionado directamente por NetworkManager. Si decides activar systemd-resolved:

```bash
# Ver estado de DNS
systemctl status systemd-resolved

# Ver configuración de DNS
resolvectl status

# Ver estadísticas de DNS
resolvectl statistics

# Limpiar caché de DNS
sudo resolvectl flush-caches
```

### Configuración Manual de DNS

```bash
# Modificar DNS temporalmente (se pierde al reiniciar)
sudo nano /etc/resolv.conf

# Agregar servidores DNS
nameserver 8.8.8.8
nameserver 8.8.4.4

# Modificar DNS permanentemente (a través de NetworkManager)
sudo nmcli connection modify "NombreConexión" ipv4.dns "8.8.8.8,8.8.4.4"
sudo nmcli connection up "NombreConexión"
```

### Servidor DNS Personalizado

```bash
# Instalar dnsmasq
sudo apt install dnsmasq

# Configurar dnsmasq
sudo nano /etc/dnsmasq.conf

# Configuración básica
listen-address=127.0.0.1
bind-interfaces
cache-size=1000

# Activar dnsmasq
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
```

## 🔒 Seguridad de Red

### Configuración de Firewall

```bash
# Instalar y activar UFW
sudo apt install ufw
sudo ufw enable

# Reglas básicas
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Permitir puertos específicos
sudo ufw allow 22        # SSH
sudo ufw allow 80        # HTTP
sudo ufw allow 443       # HTTPS

# Permitir IP específica
sudo ufw allow from 192.168.1.100

# Ver reglas
sudo ufw status verbose
```

### Monitoreo de Red

```bash
# Instalar herramientas de monitoreo de red
sudo apt install nethogs iftop nload

# Monitorear tráfico de red
sudo nethogs    # monitoreo por proceso
sudo iftop      # monitoreo de tráfico en tiempo real
nload           # monitoreo de carga de red

# Ver conexiones de red
ss -tuln        # ver puertos en escucha
netstat -tuln   # requiere instalar net-tools
```

### Configuración de VPN

#### Cliente OpenVPN

```bash
# Instalar OpenVPN
sudo apt install openvpn

# Importar archivo de configuración
sudo cp client.ovpn /etc/openvpn/client.conf

# Iniciar VPN
sudo systemctl start openvpn@client
sudo systemctl enable openvpn@client

# Gestionar VPN a través de NetworkManager
sudo apt install network-manager-openvpn-gnome
```

#### VPN WireGuard

```bash
# Instalar WireGuard
sudo apt install wireguard

# Generar par de claves
wg genkey | tee privatekey | wg pubkey > publickey

# Crear archivo de configuración
sudo nano /etc/wireguard/wg0.conf

# Configuración de ejemplo
[Interface]
PrivateKey = tu_clave_privada
Address = 10.0.0.2/24
DNS = 8.8.8.8

[Peer]
PublicKey = clave_pública_del_servidor
Endpoint = IP_del_servidor:puerto
AllowedIPs = 0.0.0.0/0

# Iniciar WireGuard
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
```

## 📊 Optimización del Rendimiento de Red

### Ajuste de Parámetros de Red

```bash
# Ver parámetros de red actuales
sysctl net.core.rmem_max
sysctl net.core.wmem_max

# Ajustar parámetros temporalmente
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728

# Ajustar parámetros permanentemente
sudo nano /etc/sysctl.d/99-network-performance.conf

# Agregar parámetros de optimización
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_congestion_control = bbr

# Aplicar configuración
sudo sysctl -p /etc/sysctl.d/99-network-performance.conf
```

### Pruebas de Ancho de Banda

```bash
# Instalar herramientas de prueba de velocidad
sudo apt install speedtest-cli

# Probar velocidad de red
speedtest-cli

# Usar iperf3 para pruebas
sudo apt install iperf3

# Lado servidor
iperf3 -s

# Prueba desde cliente
iperf3 -c IP_del_servidor
```

## 🆘 Resolución de Problemas de Red

### Diagnóstico Básico

```bash
# 1. Verificar interfaces de red
ip link show

# 2. Verificar direcciones IP
ip addr show

# 3. Verificar rutas
ip route show

# 4. Verificar DNS
nslookup google.com
dig google.com

# 5. Probar conectividad
ping -c 4 8.8.8.8        # probar internet
ping -c 4 192.168.1.1    # probar puerta de enlace
```

### Solución de Problemas Comunes

#### No se puede obtener Dirección IP

```bash
# Reiniciar servicio de red
sudo systemctl restart NetworkManager

# Obtener IP manualmente
sudo dhclient eth0

# Verificar registros de DHCP
journalctl -u NetworkManager
```

#### Fallo en Resolución DNS

```bash
# Verificar configuración de DNS
cat /etc/resolv.conf

# Probar servidor DNS
nslookup google.com 8.8.8.8

# Limpiar caché de DNS
sudo resolvectl flush-caches

# Restablecer configuración de DNS
sudo systemctl restart systemd-resolved
```

#### Problemas de Conexión WiFi

```bash
# Verificar estado del dispositivo WiFi
nmcli radio wifi

# Activar WiFi
nmcli radio wifi on

# Reiniciar dispositivo WiFi
sudo nmcli device disconnect wlan0
sudo nmcli device connect wlan0

# Verificar controladores
dmesg | grep -i wifi
```

### Script de Diagnóstico de Red

Crear script de diagnóstico de red:

```bash
#!/bin/bash
# Script de diagnóstico de red

echo "=== Estado de Interfaces de Red ==="
ip link show

echo -e "\n=== Información de Direcciones IP ==="
ip addr show

echo -e "\n=== Tabla de Rutas ==="
ip route show

echo -e "\n=== Configuración de DNS ==="
cat /etc/resolv.conf

echo -e "\n=== Prueba de Conectividad con Puerta de Enlace ==="
ping -c 3 $(ip route | grep default | awk '{print $3}')

echo -e "\n=== Prueba de Conectividad con Internet ==="
ping -c 3 8.8.8.8

echo -e "\n=== Prueba de Resolución DNS ==="
nslookup google.com

echo -e "\n=== Conexiones Activas ==="
nmcli connection show --active
```

## 📝 Copia de Seguridad de Configuración de Red

### Hacer Copia de Seguridad de Configuración de Red

```bash
# Hacer copia de seguridad de configuración de NetworkManager
sudo tar -czf network-backup.tar.gz /etc/NetworkManager/

# Hacer copia de seguridad de configuración de conexiones
sudo cp -r /etc/NetworkManager/system-connections/ ~/network-connections-backup/

# Exportar configuración de red
nmcli -f all connection show > network-connections.txt
```

### Restaurar Configuración de Red

```bash
# Restaurar archivos de configuración
sudo tar -xzf network-backup.tar.gz -C /

# Recargar NetworkManager
sudo systemctl reload NetworkManager

# Reconectar red
nmcli connection reload
```

## Próximos Pasos

Una vez que domines la configuración de red, puedes continuar aprendiendo:

1. [Configuración de Firewall](/administration/firewall) - Fortalecer la seguridad de red
2. [Gestión de Servicios del Sistema](/administration/services) - Gestionar servicios de red
3. [Gestión de Registros](/administration/logs) - Ver registros de red

---

**¿Has completado la configuración de red?** [Continúa aprendiendo configuración de firewall →](/administration/firewall)