---
title: "Configuración de gráficos duales NVIDIA Optimus"
description: "Configuración de gráficos híbridos NVIDIA Optimus en una computadora portátil Debian 13, instalación de controladores y uso de descarga de renderizado PRIME"
---

# Configuración de gráficos duales NVIDIA Optimus

Muchas computadoras portátiles cuentan simultáneamente con **gráficos integrados Intel/AMD** y **gráficos dedicados NVIDIA**. Esta tecnología se denomina **Optimus** por NVIDIA. En el uso diario, la GPU integrada ahorra energía y maneja la pantalla; cuando se necesita alto rendimiento (juegos, renderizado, CUDA), se cambia a la GPU dedicada. Este artículo explica cómo instalar correctamente los controladores en Debian 13 y utilizar la descarga de renderizado PRIME.

## Paso 1: Confirmar el hardware

```bash
# Listar todas las tarjetas gráficas, confirmando que coexisten Intel/AMD y NVIDIA
lspci | grep -E "VGA|3D"
```

Si se ven dos tarjetas gráficas (por ejemplo, una Intel y una NVIDIA), entonces es una arquitectura híbrida Optimus.

## Paso 2: Habilitar los repositorios non-free-firmware y non-free

El controlador propietario de NVIDIA se encuentra en el componente `non-free`. Asegúrese de que la fuente de software incluya `non-free` y `non-free-firmware` (la sintaxis deb822 predeterminada en Debian 13 se explica en [Formato de fuente deb822](/es/administration/deb822)):

```text
Components: main contrib non-free non-free-firmware
```

Después de modificar, ejecute:

```bash
sudo apt update
```

## Paso 3: Instalar el controlador NVIDIA

El repositorio oficial de Debian ya incluye controladores NVIDIA probados. **Es preferible usar los paquetes oficiales** en lugar del instalador `.run` del sitio web de NVIDIA:

```bash
# Instalar los encabezados del kernel (necesarios para compilar el módulo del controlador)
sudo apt install linux-headers-amd64

# Instalar el controlador NVIDIA y soporte PRIME
sudo apt install nvidia-driver firmware-misc-nonfree

# Reiniciar para cargar el controlador
sudo reboot
```

El proceso de instalación compilará automáticamente el módulo para el kernel actual mediante DKMS. El paquete `nvidia-driver` de Debian configura PRIME por defecto: al iniciar, la GPU integrada maneja el escritorio y la GPU dedicada se activa según sea necesario, exactamente el comportamiento de ahorro de energía que se desea en una computadora portátil.

## Paso 4: Verificación

```bash
# Ver el estado de la GPU dedicada (cuando el controlador funciona correctamente, muestra información de la GPU)
nvidia-smi

# Confirmar el renderizador OpenGL actual (por defecto debería ser la GPU integrada Intel/AMD)
glxinfo | grep "OpenGL renderer"
```

`glxinfo` proviene del paquete `mesa-utils` (`sudo apt install mesa-utils`).

## Paso 5: Ejecutar programas con la GPU dedicada bajo demanda (PRIME Render Offload)

En el uso diario, se usa la GPU integrada para ahorrar energía, y solo cuando se necesita, se asigna un **programa individual** a la GPU dedicada para renderizar. Esto se llama **descarga de renderizado PRIME**:

```bash
# Ejecutar un programa con la GPU dedicada
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia <nombre_del_programa>

# Por ejemplo, ejecutar glxgears con la GPU dedicada para probar
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxgears
```

Para mayor comodidad, se puede definir un alias en `~/.bashrc`:

```bash
alias nv-run='__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia'
# Luego se puede usar: nv-run blender
```

Los entornos de escritorio (GNOME/KDE) suelen proporcionar una opción en el menú contextual de las aplicaciones para "Ejecutar con la GPU dedicada", cuyo mecanismo subyacente es el descrito anteriormente.

## CUDA / Uso para cómputo

Si solo se va a ejecutar cómputo CUDA (por ejemplo, inferencia de IA) y no renderizado gráfico, basta con que el controlador esté instalado y `nvidia-smi` reconozca la GPU dedicada; no se necesita descarga PRIME. Para instalar el kit de herramientas CUDA:

```bash
sudo apt install nvidia-cuda-toolkit
```

## Wayland y problemas comunes

- **Wayland**: Los controladores NVIDIA más recientes tienen un buen soporte para Wayland. Si se encuentran problemas de pantalla distorsionada o imposibilidad de iniciar sesión, se puede cambiar a una sesión **Xorg** en la pantalla de inicio de sesión para solucionarlo.
- **Pantalla negra / No se puede acceder al escritorio**: Agregue temporalmente `nomodeset` al final de la línea `linux` en la entrada de arranque de GRUB para entrar en un escritorio de baja resolución y luego verifique la instalación del controlador.
- **`nvidia-smi` informa "No devices found"**: Generalmente significa que el módulo del controlador no se compiló correctamente para el kernel actual. Verifique que se haya instalado `linux-headers-amd64` y vuelva a ejecutar `sudo apt install --reinstall nvidia-driver`.

## Resumen

- Habilitar el repositorio `non-free` → instalar `linux-headers-amd64` + `nvidia-driver` → reiniciar.
- Por defecto, la GPU integrada ahorra energía; use `__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia` para invocar la GPU dedicada bajo demanda.
- Es preferible usar los paquetes de controladores oficiales de Debian, evitando el instalador `.run` del sitio web de NVIDIA.

Lecturas relacionadas: [Compatibilidad de hardware](/en/basics/hardware-compatibility) · [Formato de fuente deb822](/es/administration/deb822)
