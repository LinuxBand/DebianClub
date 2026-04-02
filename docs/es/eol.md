---
title: Fin de vida de las versiones (EOL)
description: Conozca el ciclo de vida y las fechas de fin de soporte de cada versión de Debian.
---

# Fin de vida de las versiones de Debian (EOL)

Comprender el ciclo de vida de la versión de Debian que usted está utilizando es fundamental para garantizar que su sistema continúe recibiendo actualizaciones de seguridad y soporte técnico.

## Modelos de versiones de Debian

Debian tiene principalmente tres ramas de versiones:

-   **Estable (Stable)**: Esta es la versión oficial y se recomienda para entornos de producción. Ha pasado por pruebas exhaustivas y ofrece la mayor estabilidad y seguridad.
-   **En pruebas (Testing)**: Esta rama contiene paquetes destinados a la próxima versión estable. Es relativamente estable, aunque no tan confiable como la versión `stable`. Es adecuada para desarrolladores y usuarios avanzados que desean software más reciente.
-   **Inestable (Unstable, nombre en clave Sid)**: Esta es la rama de desarrollo activo de los paquetes Debian. Contiene el software más reciente, pero puede tener problemas de estabilidad y no se recomienda para sistemas de misión crítica.

## Soporte a largo plazo (LTS)

Después de su lanzamiento oficial, cada versión estable de Debian recibe aproximadamente 3 años de soporte de seguridad por parte del Equipo de Seguridad de Debian.

Tras ese período, un equipo independiente de voluntarios y empresas toma el relevo para proporcionar Soporte a Largo Plazo (LTS) adicional, normalmente durante otros 2 años. Esto significa que cada versión estable de Debian obtiene un total de aproximadamente 5 años de actualizaciones de seguridad.

## Tabla de referencia rápida de EOL

La siguiente tabla muestra las fechas de lanzamiento y las fechas de fin de vida (EOL) de las versiones recientes de Debian.

| Nombre en clave              | Fecha de lanzamiento | Fin del soporte regular | Fin del soporte a largo plazo (LTS) |
| :--------------------------- | :------------------- | :---------------------- | :---------------------------------- |
| **Debian 13 (Trixie)**       | 2025-08-09           | ~ agosto 2028           | ~ agosto 2030                       |
| **Debian 12 (Bookworm)**     | 2023-06-10           | ~ junio 2026            | ~ junio 2028                        |
| **Debian 11 (Bullseye)**     | 2021-08-14           | julio 2024              | 2026-06-30                          |
| **Debian 10 (Buster)**       | 2019-07-06           | 2022-09-10              | 2024-06-30                          |
| **Debian 9 (Stretch)**       | 2017-06-17           | 2020-07-06              | 2022-06-30                          |
| **Debian 8 (Jessie)**        | 2015-04-25           | 2018-06-17              | 2020-06-30                          |

::: tip
Las fechas marcadas con `~` son estimaciones y pueden estar sujetas a cambios menores. Siga los anuncios oficiales de Debian para obtener la información más precisa.
:::

Se recomienda encarecidamente planificar y actualizar a una versión estable más reciente antes de que finalice el período LTS de su versión actual, para garantizar que su sistema permanezca seguro.
