---
title: Configuración BIOS/UEFI
description: Configurar los ajustes BIOS/UEFI para arrancar desde medios USB
---

# Configuración BIOS/UEFI

Para arrancar desde su medio de instalación de Debian, es posible que necesite modificar la configuración BIOS/UEFI.

## Acceder al BIOS/UEFI

Presione la tecla correspondiente a su fabricante al inicio:

| Fabricante | Tecla BIOS | Tecla Menú Boot |
|-----------|-----------|----------------|
| Dell | F2 | F12 |
| HP | F10 | F9 |
| Lenovo | F1 / Enter | F12 |
| ASUS | F2 / Del | F8 |
| MSI | Del | F11 |
| Acer | F2 | F12 |

## Modificar el orden de arranque

1. Acceder al BIOS/UEFI
2. Encontrar la sección "Boot" o "Arranque"
3. Mover "USB Drive" a la primera posición
4. Guardar y reiniciar (generalmente F10)

## Configuraciones UEFI importantes

### Activar/Desactivar Secure Boot

```
UEFI → Security → Secure Boot → Disabled
```

::: tip Consejo
Debian 13 soporta Secure Boot. Generalmente no es necesario desactivarlo, pero algunos sistemas más antiguos pueden requerirlo.
:::

## Después de la instalación

Recuerde restaurar el orden de arranque a su estado original después de la instalación.
