---
title: Kali Linux — Derivada de Debian
description: La distribución de ciberseguridad y pruebas de penetración estándar de la industria, con más de 600 herramientas de seguridad preinstaladas.
---

# Kali Linux

Kali Linux es la distribución Linux enfocada en seguridad más reconocida, lanzada por Offensive Security en 2013 como sucesora de BackTrack Linux. Basada en Debian testing y siguiendo un modelo de lanzamiento continuo, incluye más de 600 herramientas preinstaladas para pruebas de penetración, análisis forense digital e ingeniería inversa.

## Información Básica

| Atributo | Detalles |
|---|---|
| Basada en | Debian testing (rolling) |
| Ciclo de versiones | Lanzamiento continuo |
| Escritorio predeterminado | Xfce (desde 2019); GNOME, KDE disponibles |
| Usuarios objetivo | Profesionales de seguridad, pentesters, participantes de CTF |
| Sitio web | [https://www.kali.org](https://www.kali.org) |

## Características Principales

- **Más de 600 herramientas de seguridad**: Nmap, Metasploit, Burp Suite, Wireshark, Aircrack-ng, John the Ripper, y cientos más — todas agrupadas por categoría y listas para usar inmediatamente después de la instalación.
- **Modelo de lanzamiento continuo**: Sigue Debian testing, por lo que las herramientas se actualizan continuamente sin necesidad de una reinstalación completa.
- **Soporte multiplataforma**: Disponible para x86_64, ARM, WSL (Subsistema de Windows para Linux), Docker e imágenes dedicadas para Raspberry Pi.
- **Modo Live**: Arranca directamente desde una unidad USB sin instalar en disco, ideal para evaluaciones temporales y trabajo de campo.
- **Modo Kali Undercover**: Transformación de un clic del escritorio para parecerse a Windows 10, útil cuando se trabaja en espacios públicos.

## Relación con Debian

Kali Linux está basado en Debian testing, sincronizando regularmente paquetes de esa rama. Offensive Security añade parches personalizados al kernel (como soporte de inyección de tarjetas inalámbricas) y mantiene un repositorio separado de herramientas de seguridad que no se encuentran en Debian. La gestión de paquetes de Kali es compatible con APT de Debian, pero **mezclar repositorios de Debian o Ubuntu en un sistema Kali está fuertemente desaconsejado** ya que puede romper las dependencias de herramientas y la estabilidad del sistema.

## Primeros Pasos

```bash
# Descarga la ISO desde: https://www.kali.org/get-kali/
# Recomendado: la edición Installer para instalación completa, o Live para arranque USB

# Después de la instalación, actualiza el sistema
sudo apt update && sudo apt full-upgrade -y

# Instala la suite completa de herramientas
sudo apt install kali-linux-everything -y

# Instala solo las 10 herramientas más utilizadas
sudo apt install kali-tools-top10 -y

# Cambia al escritorio GNOME (opcional)
sudo apt install kali-desktop-gnome -y
```

## ¿Para Quién Es?

- Pentesters profesionales que realizan evaluaciones de seguridad autorizadas
- Competidores de CTF (Capture The Flag) y participantes en desafíos de seguridad
- Estudiantes que cursan certificaciones de ciberseguridad (OSCP, CEH, etc.)
- Analistas de análisis forense digital e investigadores de malware

::: warning Aviso Legal
Las herramientas incluidas en Kali Linux solo deben usarse contra sistemas de tu propiedad o para los que tengas permiso escrito explícito para realizar pruebas. El uso no autorizado de herramientas de pruebas de penetración es ilegal en la mayoría de las jurisdicciones.
:::

## Enlaces Relacionados

- Sitio web: [https://www.kali.org](https://www.kali.org)
- Descarga: [https://www.kali.org/get-kali/](https://www.kali.org/get-kali/)
- Documentación: [https://www.kali.org/docs/](https://www.kali.org/docs/)
- Índice de herramientas: [https://www.kali.org/tools/](https://www.kali.org/tools/)
- Formación Offensive Security: [https://www.offsec.com](https://www.offsec.com)

---

## Próximos Pasos

Vuelve a la [visión general de Derivadas de Debian](/es/variants/) para explorar otras distribuciones basadas en Debian.
