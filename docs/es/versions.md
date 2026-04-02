---
title: Comparación de versiones
description: Comparación detallada y guía de selección para Debian 11, 12 y 13
---

# Guía de comparación de versiones de Debian

::: info Acerca de esta página
Esta página ofrece una comparación detallada de las principales diferencias entre Debian 13 (Trixie), Debian 12 (Bookworm) y Debian 11 (Bullseye) para ayudarle a elegir la versión más adecuada.
:::

## 📋 Resumen de versiones

| Información | Debian 13 (Trixie) | Debian 12 (Bookworm) | Debian 11 (Bullseye) |
|---|---|---|---|
| **Estado de versión** | Estable actual | Estable anterior | LTS |
| **Fecha de lanzamiento** | agosto 2025 | junio 2023 | agosto 2021 |
| **Última versión puntual** | 13.4 (2026-03-08) | 12.13 (2026-01-10) | — |
| **Fin de soporte** | ~2030 (incl. LTS) | ~junio 2028 | junio 2026 |
| **Kernel Linux** | 6.12 | 6.1 LTS | 5.10 LTS |
| **Versión de GNOME** | 48 | 43 | 3.38 |

## ⚙️ Componentes principales y herramientas de desarrollo

| Software/Herramienta | Trixie (Debian 13) | Bookworm (Debian 12) | Bullseye (Debian 11) |
|---|---|---|---|
| **GCC** | 15.x | 12.2 | 10.2 |
| **LLVM/Clang** | 16+ | 14.0 | 11.0 |
| **Python** | 3.12 | 3.11 | 3.9 |
| **Node.js** | 20.x | 18.13 | 12.22 |
| **Go** | 1.21+ | 1.19 | 1.15 |
| **Rust** | 1.70+ | 1.63 | 1.48 |
| **PHP** | 8.3 | 8.2 | 7.4 |

## 🎯 Guía de selección de versiones

### Por caso de uso

- **🖥️ Usuario de escritorio**:
  - **Recomendado**: Elija **Debian 13 (Trixie)**. Es la versión estable actual con los últimos entornos de escritorio GNOME 48 / KDE Plasma 6.3.
  - **Opción conservadora**: **Debian 12 (Bookworm)** como oldstable sigue siendo mantenida, adecuada para usuarios que prefieren no migrar de inmediato.

- **💻 Desarrollador**:
  - **Desarrollo de aplicaciones modernas**: Elija **Debian 13 (Trixie)**. Incluye GCC 14.2, Python 3.13, PHP 8.3 y las cadenas de herramientas más recientes.
  - **Compatibilidad primero**: **Debian 12 (Bookworm)** sigue recibiendo actualizaciones de seguridad, adecuada para proyectos que requieren un entorno oldstable.

- **🖧 Administrador de servidores**:
  - **Nuevos despliegues**: Se recomienda encarecidamente **Debian 13 (Trixie)**. Como versión estable actual, tiene los últimos parches de seguridad y un ciclo de soporte completo.
  - **Mantenimiento de sistemas antiguos**: **Debian 12 (Bookworm)** como oldstable sigue siendo mantenida (hasta ~2028). El soporte LTS de **Debian 11 (Bullseye)** finaliza en junio de 2026; planifique su actualización pronto.

### Ruta de actualización

- **Desde Debian 11**: Actualice primero a **Debian 12** y luego a **Debian 13**. Las actualizaciones entre versiones deben realizarse paso a paso.
- **Desde Debian 12**: Se recomienda actualizar a **Debian 13**. Con múltiples versiones puntuales (13.4), está bien consolidada.

---

**¿Desea consultar una versión de software específica?** [Visite packages.debian.org](https://packages.debian.org/) | [Ver guía de instalación →](/es/basics/installation)
