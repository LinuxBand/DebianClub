---
title: antiX — Derivado de Debian
description: Un derivado de Debian ultra-ligero que funciona con solo 256 MB de RAM, usa sysvinit y da nueva vida al hardware antiguo.
---

# antiX

antiX es un derivado de Debian stable extremadamente ligero liderado por el desarrollador griego anticapitalista, diseñado específicamente para computadoras antiguas y hardware con pocos recursos. Funciona sin systemd (usando sysvinit en su lugar) y puede ejecutarse cómodamente con solo 256 MB de RAM. Es también la capa base sobre la que se construye MX Linux.

## Información básica

| Atributo | Detalles |
|---|---|
| Basado en | Debian stable |
| Ciclo de lanzamiento | Sigue Debian stable; lanzamientos actualizados periódicos |
| Escritorio predeterminado | IceWM (predeterminado), Fluxbox, JWM, Herbstluftwm |
| Usuarios objetivo | Propietarios de hardware antiguo, minimalistas, usuarios anti-systemd |
| Sitio web | [https://antixlinux.com](https://antixlinux.com) |

## Características principales

- **Huella radicalmente ligera**: Un escritorio antiX completo usa 150–200 MB de RAM en reposo.
- **Sin systemd**: antiX usa sysvinit como sistema init.
- **Cuatro ediciones de instalación**: Full, Base, Core (solo línea de comandos) y Net.
- **Soporte legado de 32 bits**: Una de las pocas distribuciones mantenidas activamente que aún proporciona imágenes de 32 bits.

## Primeros pasos

```bash
# Descargar desde: https://antixlinux.com/download/
# Disponible en ediciones Full, Base, Core y Net — 32 y 64 bits

# Después de la instalación, actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Verificar el uso de RAM
free -h

# Gestión de servicios con sysvinit
sudo service <nombre-servicio> start
sudo update-rc.d <nombre-servicio> enable
```

::: tip antiX vs. MX Linux
antiX es la opción más extrema — más ligera, más cercana a la línea de comandos. MX Linux se construye sobre antiX pero añade herramientas gráficas y una interfaz más amigable.
:::

## Enlaces relacionados

- Sitio web: [https://antixlinux.com](https://antixlinux.com)
- Descarga: [https://antixlinux.com/download/](https://antixlinux.com/download/)
- Foros de la comunidad: [https://www.antixforum.com](https://www.antixforum.com)

---

## Próximos pasos

Volver a la [descripción general de distribuciones derivadas de Debian](/es/variants/).
