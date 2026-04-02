---
title: Fim de vida das versões (EOL)
description: Conheça o ciclo de vida e as datas de fim de suporte de cada versão do Debian.
---

# Fim de vida das versões do Debian (EOL)

Entender o ciclo de vida da versão do Debian que você está usando é fundamental para garantir que seu sistema continue recebendo atualizações de segurança e suporte técnico.

## Modelos de versões do Debian

O Debian tem principalmente três ramos de versões:

-   **Estável (Stable)**: Esta é a versão oficial e é recomendada para ambientes de produção. Passou por testes extensivos e oferece a maior estabilidade e segurança.
-   **Em testes (Testing)**: Este ramo contém pacotes destinados à próxima versão estável. É relativamente estável, mas não tão confiável quanto a versão `stable`. É adequada para desenvolvedores e usuários avançados que desejam software mais recente.
-   **Instável (Unstable, codinome Sid)**: Este é o ramo de desenvolvimento ativo dos pacotes do Debian. Contém o software mais recente, mas pode ter problemas de estabilidade e não é recomendado para sistemas de missão crítica.

## Suporte de longo prazo (LTS)

Após seu lançamento oficial, cada versão estável do Debian recebe aproximadamente 3 anos de suporte de segurança da Equipe de Segurança do Debian.

Após esse período, uma equipe independente de voluntários e empresas assume para fornecer Suporte de Longo Prazo (LTS) adicional, normalmente por mais 2 anos. Isso significa que cada versão estável do Debian recebe um total de aproximadamente 5 anos de atualizações de segurança.

## Tabela de referência rápida de EOL

A tabela abaixo lista as datas de lançamento e as datas de fim de vida (EOL) das versões recentes do Debian.

| Codinome                     | Data de lançamento | Fim do suporte regular | Fim do suporte de longo prazo (LTS) |
| :--------------------------- | :----------------- | :--------------------- | :---------------------------------- |
| **Debian 13 (Trixie)**       | 2025-08-09         | ~ agosto 2028          | ~ agosto 2030                       |
| **Debian 12 (Bookworm)**     | 2023-06-10         | ~ junho 2026           | ~ junho 2028                        |
| **Debian 11 (Bullseye)**     | 2021-08-14         | julho 2024             | 2026-06-30                          |
| **Debian 10 (Buster)**       | 2019-07-06         | 2022-09-10             | 2024-06-30                          |
| **Debian 9 (Stretch)**       | 2017-06-17         | 2020-07-06             | 2022-06-30                          |
| **Debian 8 (Jessie)**        | 2015-04-25         | 2018-06-17             | 2020-06-30                          |

::: tip
Datas marcadas com `~` são estimativas e podem estar sujeitas a pequenas alterações. Acompanhe os anúncios oficiais do Debian para obter as informações mais precisas.
:::

É altamente recomendável planejar e atualizar para uma versão estável mais recente antes que o período LTS da sua versão atual termine, para garantir que seu sistema permaneça seguro.
