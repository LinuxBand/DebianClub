---
title: Fin de vie des versions (EOL)
description: Découvrez le cycle de vie et les dates de fin de support de chaque version de Debian.
---

# Fin de vie des versions Debian (EOL)

Comprendre le cycle de vie de la version Debian que vous utilisez est essentiel pour s'assurer que votre système continue de recevoir des mises à jour de sécurité et un support technique.

## Modèles de versions Debian

Debian dispose principalement de trois branches de versions :

-   **Stable** : Il s'agit de la version officielle, recommandée pour les environnements de production. Elle a été testée de façon exhaustive et offre la stabilité et la sécurité les plus élevées.
-   **Testing** : Cette branche contient les paquets destinés à la prochaine version stable. Elle est relativement stable, mais pas aussi fiable que la version `stable`. Elle convient aux développeurs et aux utilisateurs avancés souhaitant des logiciels plus récents.
-   **Unstable (nom de code Sid)** : Il s'agit de la branche de développement actif des paquets Debian. Elle contient les logiciels les plus récents, mais peut présenter des problèmes de stabilité et n'est pas recommandée pour les systèmes critiques.

## Support à long terme (LTS)

Après sa publication officielle, chaque version stable de Debian bénéficie d'environ 3 ans de support de sécurité de la part de l'équipe de sécurité Debian.

À l'issue de cette période, une équipe indépendante de bénévoles et d'entreprises prend le relais pour fournir un support à long terme (LTS) supplémentaire, généralement pendant 2 années supplémentaires. Cela signifie que chaque version stable de Debian bénéficie au total d'environ 5 ans de mises à jour de sécurité.

## Tableau de référence rapide EOL

Le tableau ci-dessous liste les dates de publication et de fin de vie (EOL) des versions récentes de Debian.

| Nom de code                | Date de publication | Fin du support standard | Fin du support à long terme (LTS) |
| :------------------------- | :------------------ | :---------------------- | :--------------------------------- |
| **Debian 13 (Trixie)**     | 2025-08-09          | ~ août 2028             | ~ août 2030                        |
| **Debian 12 (Bookworm)**   | 2023-06-10          | ~ juin 2026             | ~ juin 2028                        |
| **Debian 11 (Bullseye)**   | 2021-08-14          | Juillet 2024            | 2026-06-30                         |
| **Debian 10 (Buster)**     | 2019-07-06          | 2022-09-10              | 2024-06-30                         |
| **Debian 9 (Stretch)**     | 2017-06-17          | 2020-07-06              | 2022-06-30                         |
| **Debian 8 (Jessie)**      | 2015-04-25          | 2018-06-17              | 2020-06-30                         |

::: tip
Les dates marquées d'un `~` sont des estimations susceptibles de légères modifications. Veuillez suivre les annonces officielles de Debian pour obtenir les informations les plus précises.
:::

Il est vivement recommandé de planifier et d'effectuer la mise à niveau vers une version stable plus récente avant la fin de la période LTS de votre version actuelle, afin de garantir la sécurité de votre système.
