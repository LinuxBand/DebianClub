---
title: Configuração do sistema
description: Guia de configuração e personalização do sistema Debian 13
---

# Configuração do sistema Debian 13

## Gerenciamento de fontes de pacotes

```bash
# Editar fontes APT
sudo nano /etc/apt/sources.list

# Fontes recomendadas para Debian 13
deb http://deb.debian.org/debian/ trixie main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian/ trixie-updates main contrib non-free non-free-firmware
```

## Instalação de pacotes comuns

```bash
# Ferramentas de desenvolvimento
sudo apt install build-essential git vim -y

# Ambiente gráfico (se necessário)
sudo apt install task-gnome-desktop -y

# Drivers proprietários
sudo apt install firmware-linux-nonfree -y
```

## Configuração do firewall

```bash
# Instalar UFW
sudo apt install ufw -y

# Ativar firewall
sudo ufw enable

# Permitir SSH (se necessário)
sudo ufw allow ssh

# Verificar status
sudo ufw status
```

## Configurar hora do sistema

```bash
# Definir fuso horário
sudo timedatectl set-timezone America/Sao_Paulo

# Ativar sincronização NTP
sudo timedatectl set-ntp true

# Verificar configuração de hora
timedatectl status
```

## Próximos passos

- [Ambientes desktop](/pt/basics/desktop-environments)
- [Introdução ao Debian](/pt/basics/introduction)
