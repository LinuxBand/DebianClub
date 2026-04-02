---
title: Configurações BIOS/UEFI
description: Configurar as definições BIOS/UEFI para inicializar a partir de mídia USB
---

# Configurações BIOS/UEFI

Para inicializar a partir da sua mídia de instalação do Debian, pode ser necessário modificar as configurações BIOS/UEFI.

## Acessar o BIOS/UEFI

Pressione a tecla correspondente ao seu fabricante ao inicializar:

| Fabricante | Tecla BIOS | Tecla Menu Boot |
|-----------|-----------|----------------|
| Dell | F2 | F12 |
| HP | F10 | F9 |
| Lenovo | F1 / Enter | F12 |
| ASUS | F2 / Del | F8 |
| MSI | Del | F11 |
| Acer | F2 | F12 |

## Modificar a ordem de inicialização

1. Acessar o BIOS/UEFI
2. Encontrar a seção "Boot" ou "Inicialização"
3. Mover "USB Drive" para a primeira posição
4. Salvar e reiniciar (geralmente F10)

## Configurações UEFI importantes

### Ativar/Desativar Secure Boot

```
UEFI → Security → Secure Boot → Disabled
```

::: tip Dica
O Debian 13 suporta Secure Boot. Geralmente não é necessário desativá-lo, mas alguns sistemas mais antigos podem exigir isso.
:::

## Após a instalação

Lembre-se de restaurar a ordem de inicialização ao seu estado original após a instalação.
