---
title: Linux Mint / LMDE — Distribuição Derivada do Debian
description: A distribuição Linux desktop amigável para iniciantes; a edição LMDE é baseada diretamente no Debian stable.
---

# Linux Mint / LMDE

Linux Mint é uma das distribuições Linux desktop mais acessíveis, construída em torno do lema "da liberdade veio a elegância". A edição principal é baseada no Ubuntu, enquanto **LMDE (Linux Mint Debian Edition)** é baseada diretamente no Debian stable.

## Informações básicas

| Atributo | Detalhes |
|---|---|
| Baseado em | Ubuntu (edição principal) / Debian stable (LMDE) |
| Ciclo de lançamento | Segue Ubuntu LTS (principal); segue Debian stable (LMDE) |
| Desktop padrão | Cinnamon (principal), MATE, Xfce |
| Usuários-alvo | Iniciantes no desktop, migrantes do Windows |
| Site | [https://linuxmint.com](https://linuxmint.com) |

## Recursos principais

- **Zero atrito na instalação**: Codecs multimídia, ajustes de fontes e aplicativos comuns pré-instalados.
- **Desktop Cinnamon**: Ambiente que espelha o layout Windows tradicional — barra de tarefas, menu Iniciar, bandeja do sistema.
- **Mint Tools**: Timeshift (instantâneos do sistema), Update Manager (com indicadores de nível de risco), Driver Manager.
- **Política de atualização conservadora**: Update Manager aplica por padrão apenas patches de segurança e atualizações de baixo risco.

## Primeiros passos

```bash
# Edição principal: https://linuxmint.com/download.php
# LMDE: https://linuxmint.com/download_lmde.php

# Após a instalação, atualizar o sistema
sudo apt update && sudo apt upgrade -y

# Instalar Timeshift para backups (geralmente pré-instalado)
sudo apt install timeshift -y
```

## Links úteis

- Site: [https://linuxmint.com](https://linuxmint.com)
- Download (principal): [https://linuxmint.com/download.php](https://linuxmint.com/download.php)
- Download LMDE: [https://linuxmint.com/download_lmde.php](https://linuxmint.com/download_lmde.php)

---

## Próximos passos

Voltar à [visão geral das distribuições derivadas do Debian](/pt/variants/).
