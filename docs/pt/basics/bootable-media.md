---
title: Criar mídia inicializável
description: Criar um pendrive USB ou DVD inicializável para instalar o Debian 13
---

# Criar mídia inicializável

## Método recomendado: Pendrive USB

### Ferramentas disponíveis

#### Windows
- **Rufus** (recomendado): [https://rufus.ie/](https://rufus.ie/)
- **Balena Etcher**: [https://www.balena.io/etcher/](https://www.balena.io/etcher/)

#### Linux/macOS
```bash
# Com dd (substitua /dev/sdX pelo seu pendrive)
sudo dd if=debian-13.4.0-amd64-netinst.iso of=/dev/sdX bs=4M status=progress
sync
```

### Passos com Rufus (Windows)
1. Inserir pendrive USB (mínimo 8 GB)
2. Selecionar arquivo ISO do Debian
3. Escolher esquema de partição GPT
4. Selecionar sistema destino UEFI
5. Clicar em INICIAR

## Próximos passos

- [Guia de instalação](/pt/basics/installation)
- [Configurações BIOS/UEFI](/pt/basics/bios-settings)
