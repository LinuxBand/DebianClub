---
title: Distribuições Derivadas do Debian
description: Uma visão geral das distribuições Linux mais notáveis derivadas do Debian
---

# Distribuições Derivadas do Debian

O Debian serve como base upstream para centenas de distribuições Linux conhecidas. Graças ao seu robusto ecossistema de pacotes, padrões de qualidade rigorosos e gerenciador de pacotes APT maduro, uma grande variedade de projetos é construída sobre o Debian para atender diferentes públicos e casos de uso.

Abaixo está uma visão geral selecionada de dez dos derivados Debian mais proeminentes, abrangendo usabilidade de desktop, testes de penetração, proteção de privacidade e ambientes ultra-leves.

## Tabela comparativa

| Distribuição | Baseado em | Desktop | Usuários-alvo | Destaques |
|---|---|---|---|---|
| [Ubuntu](/pt/variants/ubuntu) | Debian unstable/testing | GNOME | Usuários gerais | Linux desktop mais popular |
| [Kali Linux](/pt/variants/kali) | Debian testing | Xfce | Pesquisadores de segurança | 600+ ferramentas de pentest |
| [Linux Mint / LMDE](/pt/variants/mint) | Ubuntu / Debian stable | Cinnamon | Iniciantes | Extremamente amigável |
| [MX Linux](/pt/variants/mx-linux) | Debian stable | Xfce | Usuários intermediários | Leve, estável, ferramentas |
| [Raspberry Pi OS](/pt/variants/raspberry-pi-os) | Debian | LXDE/Pixel | Usuários Pi | Otimizado para ARM, oficial |
| [Tails](/pt/variants/tails) | Debian stable | GNOME | Usuários de privacidade | Roteamento Tor, sem rastros |
| [Parrot OS](/pt/variants/parrot) | Debian testing | MATE/KDE | Segurança/devs | Ferramentas + uso diário |
| [Deepin](/pt/variants/deepin) | Debian stable | DDE | Usuários chineses e globais | Interface linda, desktop personalizado |
| [Devuan](/pt/variants/devuan) | Debian | Xfce/outro | Usuários anti-systemd | Substitui systemd por sysvinit |
| [antiX](/pt/variants/antix) | Debian stable | IceWM | Usuários de hardware antigo | Funciona com 256 MB de RAM |

## Resumos individuais

### [Ubuntu](/pt/variants/ubuntu)
A distribuição Linux desktop mais popular do mundo, mantida pela Canonical Ltd. Lançada a cada seis meses com uma versão LTS a cada dois anos. Possui um enorme ecossistema e forte suporte comunitário.

### [Kali Linux](/pt/variants/kali)
Criado especificamente para testes de penetração e pesquisa de cibersegurança, com mais de 600 ferramentas de segurança. Mantido pela Offensive Security, segue um modelo de lançamento contínuo baseado no Debian testing.

### [Linux Mint / LMDE](/pt/variants/mint)
Renomado por sua simplicidade e acessibilidade. A edição principal é baseada no Ubuntu; LMDE (Linux Mint Debian Edition) é baseado diretamente no Debian stable. Escolha ideal para usuários migrando do Windows.

### [MX Linux](/pt/variants/mx-linux)
Um favorito perene do DistroWatch, combinando a confiabilidade do Debian stable com o conjunto MX Tools e as bases leves do antiX. Excelente equilíbrio entre desempenho e usabilidade.

### [Raspberry Pi OS](/pt/variants/raspberry-pi-os)
O sistema operacional oficial recomendado para hardware Raspberry Pi, baseado no Debian e otimizado para processadores ARM. Disponível nas edições Desktop e Lite (headless).

### [Tails](/pt/variants/tails)
Um sistema live amnésico projetado para privacidade e anonimato. Todo o tráfego de rede é roteado pelo Tor, e o sistema não deixa rastros na máquina host após o desligamento.

### [Parrot OS](/pt/variants/parrot)
Desenvolvido pela equipe italiana Frozenbox, o Parrot OS equilibra ferramentas de segurança com uso cotidiano de desktop. Oferece edições Security, Home e HTB para diferentes fluxos de trabalho.

### [Deepin](/pt/variants/deepin)
Criado pela Wuhan Deepin Technology (China), o Deepin apresenta o magnífico DDE (Deepin Desktop Environment), amplamente considerado um dos ambientes de desktop Linux mais refinados visualmente.

### [Devuan](/pt/variants/devuan)
Um fork do Debian que substitui o systemd por sistemas init tradicionais (sysvinit, runit ou OpenRC). Os números de versão se alinham com os lançamentos do Debian.

### [antiX](/pt/variants/antix)
Um derivado Debian ultra-leve que funciona confortavelmente com apenas 256 MB de RAM. Usa sysvinit em vez de systemd e suporta hardware legado de 32 bits.

---

::: tip Como escolher?
- Desktop diário, ecossistema rico → **Ubuntu** ou **Linux Mint**
- Testes de penetração / pesquisa de segurança → **Kali Linux** ou **Parrot OS**
- Privacidade e anonimato → **Tails**
- Projetos Raspberry Pi → **Raspberry Pi OS**
- Hardware antigo ou com poucos recursos → **antiX** ou **MX Linux**
- Interface bonita → **Deepin**
- Sem systemd → **Devuan** ou **antiX**
:::
