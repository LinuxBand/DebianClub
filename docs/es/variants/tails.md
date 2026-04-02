---
title: Tails — Derivada de Debian
description: Un SO live amnésico construido para la privacidad y el anonimato — enruta todo el tráfico a través de Tor y no deja rastro después de apagarse.
---

# Tails

Tails — abreviatura de **The Amnesic Incognito Live System** (Sistema Live Incógnito Amnésico) — es un sistema operativo live construido sobre Debian stable, diseñado con un objetivo principal: proteger tu privacidad y anonimato. Está diseñado para arrancar desde una unidad USB, funciona completamente en RAM y no deja rastro en el equipo anfitrión cuando se apaga. Todo el tráfico de red se fuerza a través de la red de anonimato Tor.

## Información Básica

| Atributo | Detalles |
|---|---|
| Basada en | Debian stable |
| Ciclo de versiones | Actualizaciones de seguridad aproximadamente cada 6-8 semanas |
| Escritorio predeterminado | GNOME (personalizado, simplificado) |
| Usuarios objetivo | Periodistas, activistas, usuarios preocupados por la privacidad, personas en situaciones de alto riesgo |
| Sitio web | [https://tails.boum.org](https://tails.boum.org) |

## Características Principales

- **Amnésico por diseño**: El sistema funciona en RAM. Cuando se apaga, todos los archivos temporales, historial de navegación y metadatos son purgados de la memoria — nada se escribe en el disco duro interno.
- **Enrutamiento Tor obligatorio**: Cada conexión de red se enruta a través de Tor. Cualquier aplicación que intente conectarse fuera de Tor es automáticamente bloqueada, evitando filtraciones accidentales de IP.
- **Suite de herramientas de privacidad**: Tor Browser, Thunderbird con cifrado de correo OpenPGP, OnionShare (compartición anónima de archivos), KeePassXC (gestor de contraseñas) y más se incluyen de forma predeterminada.
- **Almacenamiento persistente cifrado**: Una partición cifrada opcional en la unidad USB puede almacenar documentos, marcadores y claves criptográficas entre sesiones, sin comprometer la naturaleza amnésica del sistema.
- **Descargas verificadas**: Tails proporciona firmas OpenPGP y una extensión de navegador para verificar la integridad de las imágenes descargadas antes de su uso.

## Relación con Debian

Tails está construido sobre Debian stable y utiliza su gestión de paquetes e infraestructura de actualizaciones de seguridad. Sobre Debian, el equipo de Tails aplica un endurecimiento extenso: deshabilitando servicios innecesarios, ajustando perfiles AppArmor, modificando parámetros del kernel para minimizar la filtración de información e integrando la pila completa de software del Proyecto Tor. El equipo de Tails publica actualizaciones de seguridad aproximadamente cada seis a ocho semanas, siguiendo de cerca los avisos de seguridad de Debian.

## Primeros Pasos

```bash
# Tails debe ejecutarse desde una unidad USB (mínimo 8 GB)
# Pasos de instalación oficiales:

# Paso 1 — Descarga la imagen:
# https://tails.boum.org/install/

# Paso 2 — Escribe en USB:
# Primera instalación: usa balenaEtcher (https://www.balena.io/etcher/)
# Instalaciones posteriores: usa el Instalador de Tails desde una sesión Tails en ejecución
# (la clonación preserva la partición de almacenamiento persistente)

# Paso 3 — Verifica la descarga (muy recomendado):
# El sitio web de Tails proporciona una extensión de navegador y firmas OpenPGP
# para confirmar que la imagen no ha sido manipulada.

# Nota: Ejecutar Tails dentro de una máquina virtual debilita significativamente sus
# garantías de seguridad. El arranque físico desde USB es el método recomendado.
```

## ¿Para Quién Es?

- Periodistas y abogados que necesitan comunicarse de forma segura y proteger fuentes
- Activistas de derechos humanos que trabajan en entornos de alto riesgo
- Usuarios cotidianos que quieren una fuerte privacidad en computadoras compartidas o no confiables
- Cualquiera que necesite eludir la censura o acceder a servicios .onion

::: warning Limitaciones
Tails protege tu privacidad durante una sesión, pero no puede defenderse contra la vigilancia a nivel de hardware (p. ej., implantes BIOS, keyloggers físicos), ni contra errores cometidos por el usuario (como iniciar sesión en cuentas personales mientras usa Tails).
:::

## Enlaces Relacionados

- Sitio web: [https://tails.boum.org](https://tails.boum.org)
- Guía de instalación: [https://tails.boum.org/install/](https://tails.boum.org/install/)
- Documentación: [https://tails.boum.org/doc/](https://tails.boum.org/doc/)
- Proyecto Tor: [https://www.torproject.org](https://www.torproject.org)

---

## Próximos Pasos

Vuelve a la [visión general de Derivadas de Debian](/es/variants/) para explorar otras distribuciones basadas en Debian.
