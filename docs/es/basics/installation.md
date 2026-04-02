---
title: Guía de instalación
description: Guía de instalación completa paso a paso para Debian 13
---

# Guía de instalación de Debian 13

## Preparación antes de la instalación

- ✅ Medios de arranque creados
- ✅ Datos importantes respaldados
- ✅ Conexión de red disponible (recomendada)

::: warning Importante
La instalación nueva **borrará completamente** los datos del disco duro. ¡Realice una copia de seguridad de los archivos importantes!
:::

## Iniciando el instalador

### Acceder a la configuración BIOS/UEFI

Teclas comunes:
- **Dell**: F2 o F12
- **HP**: F10 o F9
- **Lenovo**: F1 o F12
- **ASUS**: F2 o Del

### Pasos de instalación

1. **Seleccionar idioma** — Español o su idioma preferido
2. **Configurar red** — Conexión por cable recomendada
3. **Particionar disco** — Usar particionado guiado para principiantes
4. **Instalar sistema base** — Descarga automática
5. **Seleccionar software** — Elegir entorno de escritorio
6. **Instalar cargador GRUB** — Instalar en disco principal
7. **Completar instalación** — Reiniciar

## Esquema de particionado recomendado

| Partición | Tamaño | Sistema de archivos | Notas |
|----------|--------|---------------------|-------|
| `/boot/efi` | 512 MB | FAT32 | Solo sistemas UEFI |
| `/` | 20-50 GB | ext4 | Partición raíz |
| `swap` | 2-8 GB | swap | Memoria virtual |
| `/home` | Espacio restante | ext4 | Datos de usuario |

## Próximos pasos

- [Primer arranque](/es/basics/first-boot)
- [Configuración del sistema](/es/basics/configuration)
