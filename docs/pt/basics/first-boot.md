---
title: Configuração da primeira inicialização
description: Configuração inicial após instalar o Debian 13
---

# Configuração da primeira inicialização

## Bem-vindo ao Debian!

Parabéns por instalar o Debian 13 com sucesso!

## Login inicial

```bash
# Se instalou sem ambiente desktop
debian login: nome_usuario
Password: [insira sua senha]
```

## Configuração de rede

```bash
# Configurar WiFi pela linha de comando
nmcli dev wifi list
nmcli dev wifi connect "Nome-WiFi" password "sua-senha"

# Verificar conexão
ping -c 3 debian.org
```

## Atualizar o sistema

```bash
# Atualizar lista de pacotes
sudo apt update

# Atualizar todos os pacotes
sudo apt upgrade -y

# Upgrade completo da distribuição
sudo apt full-upgrade -y
```

## Configurar sudo

```bash
# Instalar sudo se necessário
su -c "apt install sudo"

# Adicionar usuário ao grupo sudo
su -c "usermod -aG sudo seu_nome_usuario"
```

## Instalar ferramentas essenciais

```bash
# Ferramentas básicas
sudo apt install curl wget git vim htop -y

# Codecs multimídia
sudo apt install ffmpeg vlc -y
```

## Próximos passos

- [Configuração do sistema](/pt/basics/configuration)
- [Ambientes desktop](/pt/basics/desktop-environments)
