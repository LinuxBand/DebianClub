---
title: Crear medios de arranque
description: Crear una unidad USB o DVD de arranque para instalar Debian 13
---

# Crear medios de arranque

## Método recomendado: Unidad USB

### Herramientas disponibles

#### Windows
- **Rufus** (recomendado): [https://rufus.ie/](https://rufus.ie/)
- **Balena Etcher**: [https://www.balena.io/etcher/](https://www.balena.io/etcher/)

#### Linux/macOS
```bash
# Con dd (reemplace /dev/sdX con su unidad USB)
sudo dd if=debian-13.4.0-amd64-netinst.iso of=/dev/sdX bs=4M status=progress
sync
```

### Pasos con Rufus (Windows)
1. Insertar unidad USB (mínimo 8 GB)
2. Seleccionar archivo ISO de Debian
3. Elegir esquema de partición GPT
4. Seleccionar sistema destino UEFI
5. Hacer clic en INICIAR

## Próximos pasos

- [Guía de instalación](/es/basics/installation)
- [Configuración BIOS/UEFI](/es/basics/bios-settings)
