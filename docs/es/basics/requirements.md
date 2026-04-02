---
title: Requisitos del sistema
description: Guía de verificación de requisitos de hardware y compatibilidad antes de instalar Debian 13
---

# Verificación de requisitos del sistema

Antes de instalar Debian 13, es muy importante asegurarse de que su computadora cumple con los requisitos básicos. Esta página le ayudará a verificar la compatibilidad del hardware y los requisitos del sistema.

## 🖥️ Requisitos de hardware

### Requisitos mínimos del sistema

| Componente | Requisito mínimo | Explicación |
|------|----------|------|
| **Procesador** | 1 GHz un núcleo | Arquitectura amd64 (recomendada) o arm64 |
| **Memoria** | 2 GB de RAM | Los entornos de escritorio requieren más memoria |
| **Almacenamiento** | 25 GB | Incluye sistema básico y aplicaciones |
| **Tarjeta gráfica** | Soporta 1024×768 | Gráficos integrados son suficientes |
| **Red** | Cableada o inalámbrica | Configurar fuentes de software después de la instalación |

### Configuración recomendada

| Componente | Configuración recomendada | Ventaja |
|------|----------|------|
| **Procesador** | Doble núcleo 2 GHz+ | Multitarea más fluida |
| **Memoria** | 8 GB de RAM+ | Soporta múltiples aplicaciones simultáneas |
| **Almacenamiento** | 50 GB SSD | Arranque y respuesta más rápidos |
| **Tarjeta gráfica** | Tarjeta gráfica dedicada | Soporta aceleración por hardware y juegos |

::: tip 💡 Consejo para principiantes
Si no está seguro de la configuración de su hardware, en Windows puede presionar <span class="kbd">Win + R</span>, escribir `dxdiag` para ver la información del sistema.
:::

## 🔍 Verificación de compatibilidad de hardware

### 1. Verificación de arquitectura del procesador

Debian 13 soporta múltiples arquitecturas de procesador:

#### Arquitecturas soportadas
- **amd64** (64 bits) - Procesadores Intel/AMD de 64 bits (recomendación principal)
- **arm64** - Procesadores ARM de 64 bits (nuevos Mac, Raspberry Pi 4, etc.)
- **armhf** - Procesadores ARM de 32 bits (Raspberry Pi antiguos, etc.)
- **riscv64** - Procesadores RISC-V de 64 bits (🆕 nuevo en Debian 13)
- **ppc64el** - Procesadores IBM Power little-endian de 64 bits
- **s390x** - Procesadores IBM z/Architecture de 64 bits

::: warning Estado del soporte para i386 (32 bits)
Debian 13 (Trixie) **ya no incluye i386 como arquitectura de instalación regular**. No hay kernel de instalación oficial i386, ni Debian Installer para i386. El propósito de mantener i386 en Debian es: ejecutar aplicaciones heredadas de 32 bits en modo multiarquitectura (multiarch) en sistemas amd64, no instalar un sistema i386 completo de forma independiente. Si su hardware solo soporta 32 bits, considere distribuciones como antiX Linux que aún mantienen versiones de instalación i386.
:::

#### Cómo verificar su arquitectura

**En Windows:**
```cmd
# Presione Win + R, escriba cmd, luego ejecute:
wmic computersystem get systemtype
```

**En Linux existente:**
```bash
# Ver arquitectura del procesador
uname -m
```

### 2. Verificación de memoria

#### Requisitos de memoria para diferentes entornos de escritorio

| Entorno de escritorio | Memoria mínima | Memoria recomendada | Características |
|----------|----------|----------|------|
| **GNOME** | 4 GB | 8 GB | Moderno, rico en funciones |
| **KDE Plasma** | 4 GB | 8 GB | Altamente personalizable |
| **Xfce** | 2 GB | 4 GB | Ligero, ideal para máquinas antiguas |
| **LXDE** | 1 GB | 2 GB | Mínimo y ligero |
| **Línea de comandos** | 512 MB | 1 GB | Solo interfaz de texto |

::: warning ⚠️ Impacto de memoria insuficiente
Si la memoria es insuficiente, el sistema puede usar frecuentemente espacio de intercambio (swap), causando una grave degradación del rendimiento.
:::

### 3. Verificación de espacio de almacenamiento

#### Recomendaciones de asignación de espacio en disco

```bash
# Esquema de particiones recomendado (50GB espacio total)
/          # Partición raíz: 25 GB
/home      # Directorio de usuario: 20 GB  
swap       # Partición de intercambio: 4 GB (igual al tamaño de la memoria)
/boot/efi  # Partición EFI: 1 GB (sistemas UEFI)
```

#### Necesidades de espacio para diferentes usos

| Uso | Espacio mínimo | Espacio recomendado | Explicación |
|------|----------|----------|------|
| **Sistema básico** | 10 GB | 20 GB | Solo sistema central |
| **Uso de escritorio** | 25 GB | 50 GB | Incluye software de oficina |
| **Entorno de desarrollo** | 50 GB | 100 GB | Incluye herramientas de desarrollo |
| **Trabajo multimedia** | 100 GB | 500 GB+ | Edición de video, etc. |

## 🔧 Compatibilidad de hardware

### Compatibilidad de tarjetas gráficas

#### Tarjetas NVIDIA
```bash
# Soporte de Debian para NVIDIA
✅ Controlador de código abierto: nouveau (predeterminado)
✅ Controlador oficial: nvidia-driver (requiere instalación adicional)
⚠️  Modelos antiguos pueden tener soporte limitado
```

#### Tarjetas AMD
```bash
# Soporte para tarjetas AMD
✅ Controlador de código abierto: radeon/amdgpu (predeterminado)
✅ Controlador oficial: amdgpu-pro (opcional)
✅ La mayoría de modelos tienen buen soporte
```

#### Gráficos integrados Intel
```bash
# Soporte para gráficos Intel
✅ Controlador de código abierto: i915 (predeterminado)
✅ Soporte excelente, funciona inmediatamente
✅ Buen soporte para aceleración por hardware
```

### Compatibilidad de dispositivos de red

#### Chipsets Wi-Fi
La mayoría de chips Wi-Fi modernos tienen buen soporte, pero algunos requieren firmware no libre:

| Fabricante | Estado de soporte | Nota |
|------|----------|------|
| **Intel** | ✅ Excelente | Requiere paquete de firmware |
| **Broadcom** | ⚠️ Regular | Algunos modelos requieren controlador propietario |
| **Realtek** | ✅ Bueno | La mayoría de modelos soportados |
| **Atheros** | ✅ Excelente | Buen soporte con controladores de código abierto |

#### Red cableada
Casi todas las interfaces de red cableada tienen soporte completo.

## 📋 Lista de verificación previa a la instalación

### Elementos obligatorios

- [ ] **Procesador**: Confirmar arquitectura (amd64/arm64, para PC modernos se recomienda amd64)
- [ ] **Memoria**: Al menos 2 GB, recomendado 8 GB+
- [ ] **Almacenamiento**: Al menos 25 GB de espacio disponible
- [ ] **Red**: Confirmar que la conexión de red está disponible
- [ ] **Método de arranque**: Confirmar UEFI o Legacy BIOS

### Verificaciones recomendadas

- [ ] **Tarjeta gráfica**: Verificar modelo, preparar controlador correspondiente
- [ ] **Wi-Fi**: Anotar modelo del chipset
- [ ] **Impresora**: Verificar marca y modelo
- [ ] **Bluetooth**: Confirmar si es necesario
- [ ] **Tarjeta de sonido**: Generalmente soportada

## 🔬 Recopilación de información del sistema

### Recopilar información de hardware

Si desea información detallada del hardware, puede usar los siguientes métodos:

#### En Windows
1. Presione <span class="kbd">Win + R</span>
2. Escriba `msinfo32` y presione Enter
3. Vea la información del "Resumen del sistema"

#### Usando Live USB
```bash
# Ejecutar después de iniciar Debian Live USB
sudo lshw -short          # Resumen del hardware
lscpu                     # Información de la CPU
free -h                   # Información de memoria
lsblk                     # Dispositivos de almacenamiento
lspci                     # Dispositivos PCI
lsusb                     # Dispositivos USB
```

## ⚡ Recomendaciones de optimización de rendimiento

### SSD vs HDD

| Tipo de almacenamiento | Ventaja | Desventaja | Caso de uso |
|----------|------|------|----------|
| **SSD** | Velocidad rápida, sin ruido | Precio más alto | Recomendado como disco del sistema |
| **HDD** | Precio económico, gran capacidad | Velocidad lenta, con ruido | Adecuado para almacenar archivos |

### Configuración recomendada con dos discos
```bash
SSD (120GB+) → Sistema + programas
HDD (1TB+)   → Documentos + archivos multimedia
```

## 🆘 Solución de problemas de compatibilidad

### Problemas comunes

#### Wi-Fi no funciona
**Solución:**
1. Verificar si se necesita firmware no libre
2. Usar red cableada para instalar paquetes de firmware
3. Considerar usar adaptador Wi-Fi USB

#### Problemas con controladores gráficos
**Solución:**
1. Primero usar controladores de código abierto
2. Instalar controladores propietarios después de estabilizar el sistema
3. Tener gráficos integrados como alternativa

#### Sin salida de audio
**Solución:**
1. Verificar configuración de ALSA
2. Instalar PulseAudio
3. Actualizar el kernel puede resolverlo

## Siguientes pasos

Después de completar la verificación del hardware, puede continuar con:

1. [Probar en máquina virtual](/basics/virtual-machine) - Probar Debian primero en una máquina virtual sin riesgo
2. [Descargar imagen de Debian 13](/basics/download) - Obtener archivos de instalación
3. [Crear medio de arranque](/basics/bootable-media) - Preparar medio de instalación
4. [Comenzar proceso de instalación](/basics/installation) - Instalar el sistema formalmente

---

**¿Confirmada la compatibilidad del hardware?** [Comenzar a descargar Debian 13 →](/basics/download)