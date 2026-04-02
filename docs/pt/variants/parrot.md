---
title: Parrot OS — Distribuição Derivada do Debian
description: Uma distribuição Debian de lançamento contínuo que equilibra ferramentas de pesquisa de segurança com um desktop cotidiano capaz.
---

# Parrot OS

Parrot OS é uma distribuição de lançamento contínuo baseada no Debian, desenvolvida pela equipe italiana Frozenbox. Ao contrário das distribuições puramente focadas em segurança, o Parrot OS é projetado para ser tanto uma plataforma de pesquisa de segurança quanto um desktop cotidiano confortável.

## Informações básicas

| Atributo | Detalhes |
|---|---|
| Baseado em | Debian testing (rolling) |
| Ciclo de lançamento | Lançamento contínuo |
| Desktop padrão | MATE (Security/Home), KDE Plasma (opcional) |
| Usuários-alvo | Pesquisadores de segurança, desenvolvedores, usuários preocupados com privacidade |
| Site | [https://parrotsec.org](https://parrotsec.org) |

## Recursos principais

- **Múltiplas edições com propósito**: Security (kit de ferramentas de pentest completo), Home (desktop leve para uso diário), HTB (pré-configurado para Hack The Box).
- **Mais leve que o Kali**: O desktop MATE combinado com ajustes do kernel mantém o uso de RAM mais baixo. Roda confortavelmente com 2 GB de RAM.
- **Ferramentas de privacidade integradas**: AnonSurf (roteamento Tor com um clique), Firejail, OnionShare.
- **Edição Home amigável para desenvolvedores**: Sem ferramentas de segurança pesadas, mas com runtimes de programação populares.

## Primeiros passos

```bash
# Baixar o ISO da edição apropriada de: https://parrotsec.org/download/

# Após a instalação, atualizar usando o comando Parrot
sudo parrot-upgrade

# Habilitar AnonSurf para rotear todo o tráfego pelo Tor
sudo anonsurf start
sudo anonsurf status
sudo anonsurf stop
```

::: tip Parrot OS vs. Kali Linux
O Kali Linux prioriza a completude de sua biblioteca de ferramentas de segurança. O Parrot OS é uma escolha melhor se você quer uma estação de trabalho de uso geral que também lide com trabalho de segurança.
:::

## Links úteis

- Site: [https://parrotsec.org](https://parrotsec.org)
- Download: [https://parrotsec.org/download/](https://parrotsec.org/download/)

---

## Próximos passos

Voltar à [visão geral das distribuições derivadas do Debian](/pt/variants/).
