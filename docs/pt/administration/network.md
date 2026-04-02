---
title: Configuração de Rede
description: Guia de configuração de rede para Debian 13, incluindo rede cabeada, WiFi, firewall e solução de problemas de rede
---

# Configuração de Rede no Debian 13

Este tutorial detalha como configurar e gerenciar conexões de rede no Debian 13, incluindo rede cabeada, rede sem fio, serviços de rede e solução de problemas.

## 🌐 Fundamentos de Gerenciamento de Rede

### NetworkManager

O NetworkManager é a ferramenta de gerenciamento de rede mais comum em instalações de desktop (instalada automaticamente por tarefas como `task-gnome-desktop`), mas o Debian não o força como a única opção — servidores e instalações mínimas geralmente usam `ifupdown` (`/etc/network/interfaces`) ou `systemd-networkd`:

```bash
# Verificar o status do NetworkManager
systemctl status NetworkManager

# Reiniciar o NetworkManager
sudo systemctl restart NetworkManager

# Ver dispositivos de rede
nmcli device status

# Ver conexões de rede
nmcli connection show
```

### Ferramentas de Rede Tradicionais

```bash
# Ver interfaces de rede
ip addr show
ifconfig  # requer instalação do net-tools

# Ver tabela de roteamento
ip route show
route -n  # requer instalação do net-tools

# Testar conectividade de rede
ping google.com
traceroute google.com
```

## 🔌 Configuração de Rede Cabeada

### Configuração Automática (DHCP)

A maioria das redes cabeadas usa DHCP para obter um endereço IP automaticamente:

```bash
# Ver conexões cabeadas
nmcli connection show --active

# Criar uma conexão cabeada
sudo nmcli connection add type ethernet con-name "Wired" ifname eth0

# Ativar a conexão
sudo nmcli connection up "Wired"

# Renovar o endereço IP
sudo nmcli connection down "Wired" && sudo nmcli connection up "Wired"
```

### Configuração de IP Estático

```bash
# Criar uma conexão com IP estático
sudo nmcli connection add type ethernet con-name "Static" ifname eth0 \
    ip4 192.168.1.100/24 gw4 192.168.1.1

# Configurar servidores DNS
sudo nmcli connection modify "Static" ipv4.dns "8.8.8.8,8.8.4.4"

# Configurar para modo manual
sudo nmcli connection modify "Static" ipv4.method manual

# Ativar a conexão
sudo nmcli connection up "Static"
```

### Nomenclatura de Interfaces de Rede

```bash
# Ver nomes das interfaces de rede
ip link show

# Ver nomes persistentes das interfaces de rede
ls /sys/class/net/

# Modificar o nome da interface (opcional)
sudo nano /etc/systemd/network/10-eth0.link
```

## 📶 Configuração de Rede WiFi

### Configuração via Interface Gráfica

No GNOME:
1. Clique no ícone de rede no canto superior direito
2. Selecione a rede WiFi
3. Digite a senha para conectar

### Configuração via Linha de Comando

```bash
# Escanear redes WiFi
nmcli device wifi list

# Conectar a uma rede WiFi
sudo nmcli device wifi connect "NomeDaWiFi" password "senha"

# Conectar a uma rede oculta
sudo nmcli device wifi connect "NomeDaWiFi" password "senha" hidden yes

# Ver conexões WiFi salvas
nmcli connection show

# Excluir uma conexão WiFi
sudo nmcli connection delete "NomeDaWiFi"
```

### Criação de Ponto de Acesso WiFi

```bash
# Criar um ponto de acesso WiFi
sudo nmcli device wifi hotspot ifname wlan0 ssid "MyHotspot" password "minhasenha"

# Ver status do ponto de acesso
nmcli device status

# Parar o ponto de acesso
sudo nmcli device disconnect wlan0
```

### Problemas com Drivers WiFi

```bash
# Verificar dispositivos WiFi
lspci | grep -i wifi
lsusb | grep -i wifi

# Verificar módulos sem fio
lsmod | grep wifi
iwconfig

# Instalar drivers WiFi adicionais
sudo apt install firmware-iwlwifi  # Placas Intel
sudo apt install firmware-realtek  # Placas Realtek
sudo apt install firmware-atheros  # Placas Atheros

# Recarregar módulos de rede
sudo modprobe -r iwlwifi && sudo modprobe iwlwifi
```

## 🔧 Configuração Avançada de Rede

### Ponte de Rede (Bridging)

```bash
# Instalar ferramentas de bridge
sudo apt install bridge-utils

# Criar uma ponte de rede
sudo nmcli connection add type bridge con-name br0 ifname br0
sudo nmcli connection add type bridge-slave con-name br0-eth0 ifname eth0 master br0

# Configurar IP da ponte
sudo nmcli connection modify br0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify br0 ipv4.gateway 192.168.1.1
sudo nmcli connection modify br0 ipv4.dns 8.8.8.8
sudo nmcli connection modify br0 ipv4.method manual

# Ativar a ponte
sudo nmcli connection up br0
```

### Configuração de VLAN

```bash
# Criar interface VLAN
sudo nmcli connection add type vlan con-name vlan100 ifname eth0.100 \
    dev eth0 id 100

# Configurar IP da VLAN
sudo nmcli connection modify vlan100 ipv4.addresses 192.168.100.10/24
sudo nmcli connection modify vlan100 ipv4.method manual

# Ativar a VLAN
sudo nmcli connection up vlan100
```

### Agregação de Enlaces (Bonding)

```bash
# Criar interface de agregação
sudo nmcli connection add type bond con-name bond0 ifname bond0 \
    bond.options "mode=active-backup,miimon=1000"

# Adicionar interfaces escravas
sudo nmcli connection add type bond-slave con-name bond0-eth0 ifname eth0 master bond0
sudo nmcli connection add type bond-slave con-name bond0-eth1 ifname eth1 master bond0

# Configurar IP da agregação
sudo nmcli connection modify bond0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify bond0 ipv4.method manual

# Ativar a agregação
sudo nmcli connection up bond0
```

## 🌍 Configuração de DNS

### systemd-resolved

O `systemd-resolved` é o serviço de resolução DNS fornecido pelo systemd, que pode funcionar com o NetworkManager, mas **não é instalado e ativado por padrão no Debian**. Se você estiver usando um ambiente desktop e o NetworkManager estiver em execução, o `/etc/resolv.conf` geralmente é gerenciado diretamente pelo NetworkManager. Se você optar por ativar o systemd-resolved:

```bash
# Verificar status do DNS
systemctl status systemd-resolved

# Verificar configuração de DNS
resolvectl status

# Verificar estatísticas de DNS
resolvectl statistics

# Limpar cache de DNS
sudo resolvectl flush-caches
```

### Configuração Manual de DNS

```bash
# Modificar DNS temporariamente (perde após reiniciar)
sudo nano /etc/resolv.conf

# Adicionar servidores DNS
nameserver 8.8.8.8
nameserver 8.8.4.4

# Modificar DNS permanentemente (via NetworkManager)
sudo nmcli connection modify "NomeDaConexão" ipv4.dns "8.8.8.8,8.8.4.4"
sudo nmcli connection up "NomeDaConexão"
```

### Servidor DNS Personalizado

```bash
# Instalar dnsmasq
sudo apt install dnsmasq

# Configurar dnsmasq
sudo nano /etc/dnsmasq.conf

# Configuração básica
listen-address=127.0.0.1
bind-interfaces
cache-size=1000

# Ativar dnsmasq
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
```

## 🔒 Segurança de Rede

### Configuração de Firewall

```bash
# Instalar e ativar UFW
sudo apt install ufw
sudo ufw enable

# Regras básicas
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Permitir portas específicas
sudo ufw allow 22        # SSH
sudo ufw allow 80        # HTTP
sudo ufw allow 443       # HTTPS

# Permitir IP específico
sudo ufw allow from 192.168.1.100

# Ver regras
sudo ufw status verbose
```

### Monitoramento de Rede

```bash
# Instalar ferramentas de monitoramento de rede
sudo apt install nethogs iftop nload

# Monitorar tráfego de rede
sudo nethogs    # monitorar por processo
sudo iftop      # monitoramento de tráfego em tempo real
nload           # monitoramento de carga de rede

# Ver conexões de rede
ss -tuln        # ver portas em escuta
netstat -tuln   # requer instalação do net-tools
```

### Configuração de VPN

#### Cliente OpenVPN

```bash
# Instalar OpenVPN
sudo apt install openvpn

# Importar arquivo de configuração
sudo cp client.ovpn /etc/openvpn/client.conf

# Iniciar VPN
sudo systemctl start openvpn@client
sudo systemctl enable openvpn@client

# Gerenciar VPN via NetworkManager
sudo apt install network-manager-openvpn-gnome
```

#### VPN WireGuard

```bash
# Instalar WireGuard
sudo apt install wireguard

# Gerar par de chaves
wg genkey | tee privatekey | wg pubkey > publickey

# Criar arquivo de configuração
sudo nano /etc/wireguard/wg0.conf

# Configuração de exemplo
[Interface]
PrivateKey = sua_chave_privada
Address = 10.0.0.2/24
DNS = 8.8.8.8

[Peer]
PublicKey = chave_pública_do_servidor
Endpoint = IP_do_servidor:porta
AllowedIPs = 0.0.0.0/0

# Iniciar WireGuard
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
```

## 📊 Otimização de Desempenho de Rede

### Ajuste de Parâmetros de Rede

```bash
# Ver parâmetros de rede atuais
sysctl net.core.rmem_max
sysctl net.core.wmem_max

# Ajustar parâmetros temporariamente
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728

# Ajustar parâmetros permanentemente
sudo nano /etc/sysctl.d/99-network-performance.conf

# Adicionar parâmetros de otimização
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_congestion_control = bbr

# Aplicar configuração
sudo sysctl -p /etc/sysctl.d/99-network-performance.conf
```

### Teste de Largura de Banda

```bash
# Instalar ferramenta de teste de velocidade
sudo apt install speedtest-cli

# Testar velocidade da rede
speedtest-cli

# Usar iperf3 para teste
sudo apt install iperf3

# Lado do servidor
iperf3 -s

# Teste do lado do cliente
iperf3 -c IP_do_servidor
```

## 🆘 Solução de Problemas de Rede

### Diagnóstico Básico

```bash
# 1. Verificar interfaces de rede
ip link show

# 2. Verificar endereços IP
ip addr show

# 3. Verificar roteamento
ip route show

# 4. Verificar DNS
nslookup google.com
dig google.com

# 5. Testar conectividade
ping -c 4 8.8.8.8        # testar internet externa
ping -c 4 192.168.1.1    # testar gateway
```

### Resolução de Problemas Comuns

#### Não Consegue Obter Endereço IP

```bash
# Reiniciar serviço de rede
sudo systemctl restart NetworkManager

# Obter IP manualmente
sudo dhclient eth0

# Verificar logs do DHCP
journalctl -u NetworkManager
```

#### Falha na Resolução de DNS

```bash
# Verificar configuração de DNS
cat /etc/resolv.conf

# Testar servidor DNS
nslookup google.com 8.8.8.8

# Limpar cache de DNS
sudo resolvectl flush-caches

# Redefinir configuração de DNS
sudo systemctl restart systemd-resolved
```

#### Problemas de Conexão WiFi

```bash
# Verificar status do dispositivo WiFi
nmcli radio wifi

# Ativar WiFi
nmcli radio wifi on

# Reiniciar dispositivo WiFi
sudo nmcli device disconnect wlan0
sudo nmcli device connect wlan0

# Verificar drivers
dmesg | grep -i wifi
```

### Script de Diagnóstico de Rede

Criar um script de diagnóstico de rede:

```bash
#!/bin/bash
# Script de diagnóstico de rede

echo "=== Status das Interfaces de Rede ==="
ip link show

echo -e "\n=== Informações de Endereço IP ==="
ip addr show

echo -e "\n=== Tabela de Roteamento ==="
ip route show

echo -e "\n=== Configuração de DNS ==="
cat /etc/resolv.conf

echo -e "\n=== Teste de Conectividade com o Gateway ==="
ping -c 3 $(ip route | grep default | awk '{print $3}')

echo -e "\n=== Teste de Conectividade com a Internet Externa ==="
ping -c 3 8.8.8.8

echo -e "\n=== Teste de Resolução de DNS ==="
nslookup google.com

echo -e "\n=== Conexões Ativas ==="
nmcli connection show --active
```

## 📝 Backup de Configuração de Rede

### Fazer Backup da Configuração de Rede

```bash
# Fazer backup da configuração do NetworkManager
sudo tar -czf network-backup.tar.gz /etc/NetworkManager/

# Fazer backup das configurações de conexão
sudo cp -r /etc/NetworkManager/system-connections/ ~/network-connections-backup/

# Exportar configurações de rede
nmcli -f all connection show > network-connections.txt
```

### Restaurar Configuração de Rede

```bash
# Restaurar arquivos de configuração
sudo tar -xzf network-backup.tar.gz -C /

# Recarregar NetworkManager
sudo systemctl reload NetworkManager

# Reconectar rede
nmcli connection reload
```

## Próximos Passos

Após dominar a configuração de rede, você pode continuar aprendendo:

1. [Configuração de Firewall](/administration/firewall) - Fortalecer a segurança de rede
2. [Gerenciamento de Serviços do Sistema](/administration/services) - Gerenciar serviços de rede
3. [Gerenciamento de Logs](/administration/logs) - Ver logs de rede

---

**Configuração de rede concluída?** [Continue aprendendo sobre configuração de firewall →](/administration/firewall)