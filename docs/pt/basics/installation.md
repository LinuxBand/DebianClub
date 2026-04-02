---
title: Guia de instalação
description: Guia de instalação completo passo a passo para o Debian 13
---

# Guia de instalação do Debian 13

## Preparação antes da instalação

- ✅ Mídia inicializável criada
- ✅ Dados importantes em backup
- ✅ Conexão de rede disponível (recomendado)

::: warning Importante
A instalação nova **apagará completamente** os dados do disco rígido! Faça backup dos arquivos importantes.
:::

## Iniciando o instalador

### Acessar configurações BIOS/UEFI

Teclas comuns:
- **Dell**: F2 ou F12
- **HP**: F10 ou F9
- **Lenovo**: F1 ou F12
- **ASUS**: F2 ou Del

### Etapas de instalação

1. **Selecionar idioma** — Português ou seu idioma preferido
2. **Configurar rede** — Conexão cabeada recomendada
3. **Particionar disco** — Usar particionamento guiado para iniciantes
4. **Instalar sistema base** — Download automático
5. **Selecionar software** — Escolher ambiente desktop
6. **Instalar carregador GRUB** — Instalar no disco principal
7. **Concluir instalação** — Reiniciar

## Esquema de particionamento recomendado

| Partição | Tamanho | Sistema de arquivos | Notas |
|---------|---------|---------------------|-------|
| `/boot/efi` | 512 MB | FAT32 | Somente sistemas UEFI |
| `/` | 20-50 GB | ext4 | Partição raiz |
| `swap` | 2-8 GB | swap | Memória virtual |
| `/home` | Espaço restante | ext4 | Dados do usuário |

## Próximos passos

- [Primeira inicialização](/pt/basics/first-boot)
- [Configuração do sistema](/pt/basics/configuration)
